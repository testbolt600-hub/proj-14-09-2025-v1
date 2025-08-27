import { supabase } from '../../lib/supabase';
import { aiMentoringEngine } from './mentoring-engine';
import { dataIntegrationService } from './data-integration';
import { brandAnalysisService } from './brand-analysis';

export interface JobData {
  id: string;
  type: string;
  userId: string;
  data: any;
  priority: number;
  attempts: number;
  maxAttempts: number;
  scheduledAt: string;
  createdAt: string;
}

export interface JobResult {
  success: boolean;
  result?: any;
  error?: string;
  completedAt: string;
}

class BackgroundJobProcessor {
  private isProcessing = false;
  private jobQueue: JobData[] = [];

  async startProcessing(): Promise<void> {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    console.log('Starting background job processor...');

    while (this.isProcessing) {
      try {
        await this.processNextJob();
        await this.delay(5000); // Process jobs every 5 seconds
      } catch (error) {
        console.error('Error in job processing loop:', error);
        await this.delay(10000); // Wait longer on error
      }
    }
  }

  async stopProcessing(): Promise<void> {
    this.isProcessing = false;
    console.log('Stopping background job processor...');
  }

  async scheduleJob(jobData: Omit<JobData, 'id' | 'createdAt'>): Promise<string> {
    try {
      const job: JobData = {
        ...jobData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };

      // Store job in database
      const { error } = await supabase
        .from('background_jobs')
        .insert({
          id: job.id,
          job_type: job.type,
          user_id: job.userId,
          job_data: job.data,
          priority: job.priority,
          attempts: job.attempts,
          max_attempts: job.maxAttempts,
          scheduled_at: job.scheduledAt,
          status: 'pending',
          created_at: job.createdAt
        });

      if (error) {
        throw error;
      }

      return job.id;
    } catch (error) {
      console.error('Error scheduling job:', error);
      throw error;
    }
  }

  private async processNextJob(): Promise<void> {
    try {
      // Get next pending job
      const { data: jobs, error } = await supabase
        .from('background_jobs')
        .select('*')
        .eq('status', 'pending')
        .lte('scheduled_at', new Date().toISOString())
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(1);

      if (error) {
        throw error;
      }

      if (!jobs || jobs.length === 0) {
        return; // No jobs to process
      }

      const job = jobs[0];
      await this.executeJob(job);
    } catch (error) {
      console.error('Error processing job:', error);
    }
  }

  private async executeJob(job: any): Promise<void> {
    try {
      // Mark job as processing
      await this.updateJobStatus(job.id, 'processing');

      let result: JobResult;

      switch (job.job_type) {
        case 'daily-data-sync':
          result = await this.processDailyDataSync(job);
          break;
        case 'weekly-insight-generation':
          result = await this.processWeeklyInsightGeneration(job);
          break;
        case 'monthly-review-generation':
          result = await this.processMonthlyReviewGeneration(job);
          break;
        case 'brand-analysis':
          result = await this.processBrandAnalysis(job);
          break;
        case 'achievement-check':
          result = await this.processAchievementCheck(job);
          break;
        default:
          throw new Error(`Unknown job type: ${job.job_type}`);
      }

      // Update job with result
      await this.updateJobResult(job.id, result);

    } catch (error) {
      console.error(`Error executing job ${job.id}:`, error);
      
      // Increment attempts and potentially retry
      const newAttempts = job.attempts + 1;
      
      if (newAttempts >= job.max_attempts) {
        await this.updateJobStatus(job.id, 'failed', error instanceof Error ? error.message : 'Unknown error');
      } else {
        await this.retryJob(job.id, newAttempts);
      }
    }
  }

  private async processDailyDataSync(job: any): Promise<JobResult> {
    try {
      const { userId } = job.job_data;
      const syncResult = await dataIntegrationService.syncUserData(userId);
      
      return {
        success: syncResult.success,
        result: syncResult,
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Data sync failed',
        completedAt: new Date().toISOString()
      };
    }
  }

  private async processWeeklyInsightGeneration(job: any): Promise<JobResult> {
    try {
      const { userId } = job.job_data;
      
      // Get user context
      const context = await this.buildMentoringContext(userId);
      
      // Generate weekly insight
      const insight = await aiMentoringEngine.generateWeeklyInsight(context);
      
      // Schedule notification
      await this.scheduleNotification(userId, 'weekly-insight', insight);
      
      return {
        success: true,
        result: { insightId: insight.id },
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Weekly insight generation failed',
        completedAt: new Date().toISOString()
      };
    }
  }

  private async processMonthlyReviewGeneration(job: any): Promise<JobResult> {
    try {
      const { userId } = job.job_data;
      
      // Get user context
      const context = await this.buildMentoringContext(userId);
      
      // Generate monthly review
      const review = await aiMentoringEngine.generateMonthlyReview(context);
      
      // Schedule notification
      await this.scheduleNotification(userId, 'monthly-review', review);
      
      return {
        success: true,
        result: { reviewId: review.id },
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Monthly review generation failed',
        completedAt: new Date().toISOString()
      };
    }
  }

  private async processBrandAnalysis(job: any): Promise<JobResult> {
    try {
      const { userId, profileData } = job.job_data;
      
      // Perform brand analysis
      const analysis = await brandAnalysisService.analyzeProfile(userId, profileData);
      
      return {
        success: true,
        result: { analysisId: analysis.id },
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Brand analysis failed',
        completedAt: new Date().toISOString()
      };
    }
  }

  private async processAchievementCheck(job: any): Promise<JobResult> {
    try {
      const { userId } = job.job_data;
      
      // Check for new achievements
      const achievements = await this.checkUserAchievements(userId);
      
      // Generate achievement insights for new achievements
      for (const achievement of achievements) {
        await aiMentoringEngine.generateAchievementInsight(userId, achievement.type);
      }
      
      return {
        success: true,
        result: { newAchievements: achievements.length },
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Achievement check failed',
        completedAt: new Date().toISOString()
      };
    }
  }

  private async buildMentoringContext(userId: string): Promise<any> {
    try {
      // Get user profile from user_profiles table
      const { data: userProfile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError) {
        console.warn(`User profile not found for user ${userId}:`, profileError);
        // Return context with null profile - the system can still function
        return {
          userProfile: null,
          currentBrandScore: null,
          historicalData: [],
          userGoals: [],
          engagementHistory: [],
          industryBenchmarks: {}
        };
      }

      // Get current brand analysis
      const { data: currentAnalysis } = await supabase
        .from('brand_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      // Get historical data (last 4 analyses)
      const { data: historicalData } = await supabase
        .from('brand_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(4);

      // Get user goals
      const { data: userGoals } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', userId)
        .is('achieved_at', null);

      return {
        userProfile: userProfile ? {
          id: userProfile.user_id,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          industry: userProfile.industry,
          experienceLevel: userProfile.experience_level,
          primaryGoal: userProfile.primary_goal,
        } : null,
        currentBrandScore: currentAnalysis,
        historicalData: historicalData || [],
        userGoals: userGoals || [],
        engagementHistory: [], // Would be populated from LinkedIn data
        industryBenchmarks: {} // Would be populated from industry data
      };
    } catch (error) {
      console.error('Error building mentoring context:', error);
      throw error;
    }
  }

  private async checkUserAchievements(userId: string): Promise<any[]> {
    // Mock achievement checking logic
    // In real implementation, this would check various metrics against achievement criteria
    const achievements = [];
    
    try {
      // Get user's latest brand analysis
      const { data: analysis } = await supabase
        .from('brand_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (analysis) {
        // Check for engagement milestone
        if (analysis.engagement_score >= 80) {
          achievements.push({ type: 'engagement_milestone', score: analysis.engagement_score });
        }

        // Check for overall score milestone
        if (analysis.overall_score >= 85) {
          achievements.push({ type: 'brand_excellence', score: analysis.overall_score });
        }
      }

      // Check for posting consistency
      const { data: recentInsights } = await supabase
        .from('mentor_insights')
        .select('*')
        .eq('user_id', userId)
        .eq('insight_type', 'weekly')
        .gte('generated_at', new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString());

      if (recentInsights && recentInsights.length >= 4) {
        achievements.push({ type: 'consistent_posting', weeks: recentInsights.length });
      }

      return achievements;
    } catch (error) {
      console.error('Error checking achievements:', error);
      return [];
    }
  }

  private async scheduleNotification(userId: string, type: string, data: any): Promise<void> {
    try {
      // In a real implementation, this would integrate with a notification service
      console.log(`Scheduling ${type} notification for user ${userId}`);
      
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          notification_type: type,
          title: data.title,
          content: data.content,
          data: data,
          scheduled_at: new Date().toISOString(),
          status: 'pending'
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  private async updateJobStatus(jobId: string, status: string, errorMessage?: string): Promise<void> {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (errorMessage) {
        updateData.error_message = errorMessage;
      }

      const { error } = await supabase
        .from('background_jobs')
        .update(updateData)
        .eq('id', jobId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  }

  private async updateJobResult(jobId: string, result: JobResult): Promise<void> {
    try {
      const { error } = await supabase
        .from('background_jobs')
        .update({
          status: result.success ? 'completed' : 'failed',
          result_data: result.result,
          error_message: result.error,
          completed_at: result.completedAt,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating job result:', error);
    }
  }

  private async retryJob(jobId: string, attempts: number): Promise<void> {
    try {
      // Calculate exponential backoff delay
      const delayMinutes = Math.pow(2, attempts - 1) * 5; // 5, 10, 20, 40 minutes
      const retryAt = new Date(Date.now() + delayMinutes * 60 * 1000);

      const { error } = await supabase
        .from('background_jobs')
        .update({
          status: 'pending',
          attempts,
          scheduled_at: retryAt.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error retrying job:', error);
    }
  }

  async scheduleWeeklyInsights(): Promise<void> {
    try {
      // Get all active users
      const { data: users, error } = await supabase
        .from('users')
        .select('id')
        .gte('last_active_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        throw error;
      }

      // Schedule weekly insight generation for each user
      for (const user of users || []) {
        await this.scheduleJob({
          type: 'weekly-insight-generation',
          userId: user.id,
          data: { userId: user.id },
          priority: 3,
          attempts: 0,
          maxAttempts: 3,
          scheduledAt: new Date().toISOString()
        });
      }

      console.log(`Scheduled weekly insights for ${users?.length || 0} users`);
    } catch (error) {
      console.error('Error scheduling weekly insights:', error);
    }
  }

  async scheduleMonthlyReviews(): Promise<void> {
    try {
      // Get users who need monthly reviews (active in last 30 days)
      const { data: users, error } = await supabase
        .from('users')
        .select('id')
        .gte('last_active_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        throw error;
      }

      // Schedule monthly review generation for each user
      for (const user of users || []) {
        await this.scheduleJob({
          type: 'monthly-review-generation',
          userId: user.id,
          data: { userId: user.id },
          priority: 4,
          attempts: 0,
          maxAttempts: 3,
          scheduledAt: new Date().toISOString()
        });
      }

      console.log(`Scheduled monthly reviews for ${users?.length || 0} users`);
    } catch (error) {
      console.error('Error scheduling monthly reviews:', error);
    }
  }

  async scheduleDailyDataSync(): Promise<void> {
    try {
      // Get users with LinkedIn integration
      const { data: integrations, error } = await supabase
        .from('linkedin_integrations')
        .select('user_id')
        .eq('is_active', true);

      if (error) {
        throw error;
      }

      // Schedule data sync for each user
      for (const integration of integrations || []) {
        await this.scheduleJob({
          type: 'daily-data-sync',
          userId: integration.user_id,
          data: { userId: integration.user_id },
          priority: 2,
          attempts: 0,
          maxAttempts: 3,
          scheduledAt: new Date().toISOString()
        });
      }

      console.log(`Scheduled data sync for ${integrations?.length || 0} users`);
    } catch (error) {
      console.error('Error scheduling daily data sync:', error);
    }
  }

  async scheduleAchievementChecks(): Promise<void> {
    try {
      // Get all active users
      const { data: users, error } = await supabase
        .from('users')
        .select('id')
        .gte('last_active_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error) {
        throw error;
      }

      // Schedule achievement checks
      for (const user of users || []) {
        await this.scheduleJob({
          type: 'achievement-check',
          userId: user.id,
          data: { userId: user.id },
          priority: 1,
          attempts: 0,
          maxAttempts: 2,
          scheduledAt: new Date().toISOString()
        });
      }

      console.log(`Scheduled achievement checks for ${users?.length || 0} users`);
    } catch (error) {
      console.error('Error scheduling achievement checks:', error);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Cron job scheduler
class CronScheduler {
  private intervals: NodeJS.Timeout[] = [];

  start(): void {
    const jobProcessor = new BackgroundJobProcessor();
    
    // Start job processor
    jobProcessor.startProcessing();

    // Schedule daily data sync (every day at 6 AM)
    this.intervals.push(setInterval(async () => {
      const now = new Date();
      if (now.getHours() === 6 && now.getMinutes() === 0) {
        await jobProcessor.scheduleDailyDataSync();
      }
    }, 60000)); // Check every minute

    // Schedule weekly insights (every Monday at 9 AM)
    this.intervals.push(setInterval(async () => {
      const now = new Date();
      if (now.getDay() === 1 && now.getHours() === 9 && now.getMinutes() === 0) {
        await jobProcessor.scheduleWeeklyInsights();
      }
    }, 60000));

    // Schedule monthly reviews (first day of month at 10 AM)
    this.intervals.push(setInterval(async () => {
      const now = new Date();
      if (now.getDate() === 1 && now.getHours() === 10 && now.getMinutes() === 0) {
        await jobProcessor.scheduleMonthlyReviews();
      }
    }, 60000));

    // Schedule achievement checks (daily at 8 PM)
    this.intervals.push(setInterval(async () => {
      const now = new Date();
      if (now.getHours() === 20 && now.getMinutes() === 0) {
        await jobProcessor.scheduleAchievementChecks();
      }
    }, 60000));

    console.log('Cron scheduler started');
  }

  stop(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    console.log('Cron scheduler stopped');
  }
}

export const backgroundJobProcessor = new BackgroundJobProcessor();
export const cronScheduler = new CronScheduler();