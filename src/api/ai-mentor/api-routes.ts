import { Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { brandAnalysisService } from './brand-analysis';
import { aiMentoringEngine } from './mentoring-engine';
import { dataIntegrationService } from './data-integration';
import { backgroundJobProcessor } from './background-jobs';

// Authentication middleware
export const authenticateUser = async (req: Request, res: Response, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Brand Analysis Routes
export const analyzeBrand = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { profileData } = req.body;
    
    if (!profileData) {
      return res.status(400).json({ error: 'Profile data is required' });
    }

    // Schedule background analysis job
    const jobId = await backgroundJobProcessor.scheduleJob({
      type: 'brand-analysis',
      userId,
      data: { userId, profileData },
      priority: 4,
      attempts: 0,
      maxAttempts: 3,
      scheduledAt: new Date().toISOString()
    });

    res.json({ 
      message: 'Brand analysis started',
      jobId,
      estimatedCompletion: '2-3 minutes'
    });
  } catch (error) {
    console.error('Error starting brand analysis:', error);
    res.status(500).json({ error: 'Failed to start brand analysis' });
  }
};

export const getBrandAnalysis = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { analysisId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { data: analysis, error } = await supabase
      .from('brand_analyses')
      .select('*')
      .eq('id', analysisId)
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      id: analysis.id,
      userId: analysis.user_id,
      overallScore: analysis.overall_score,
      scores: {
        visibility: analysis.visibility_score,
        engagement: analysis.engagement_score,
        professionalPresence: analysis.professional_presence_score,
        networkQuality: analysis.network_quality_score
      },
      recommendations: analysis.analysis_data?.recommendations || [],
      benchmarks: analysis.analysis_data?.benchmarks || {},
      createdAt: analysis.created_at,
      updatedAt: analysis.updated_at
    });
  } catch (error) {
    console.error('Error fetching brand analysis:', error);
    res.status(500).json({ error: 'Failed to fetch brand analysis' });
  }
};

export const getBrandAnalysisHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { limit = 10 } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { data: analyses, error } = await supabase
      .from('brand_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(Number(limit));

    if (error) {
      throw error;
    }

    const formattedAnalyses = analyses?.map(analysis => ({
      id: analysis.id,
      overallScore: analysis.overall_score,
      scores: {
        visibility: analysis.visibility_score,
        engagement: analysis.engagement_score,
        professionalPresence: analysis.professional_presence_score,
        networkQuality: analysis.network_quality_score
      },
      createdAt: analysis.created_at
    })) || [];

    res.json({ analyses: formattedAnalyses });
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    res.status(500).json({ error: 'Failed to fetch analysis history' });
  }
};

// Mentor Insights Routes
export const getMentorInsights = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { limit = 10, type } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    let query = supabase
      .from('mentor_insights')
      .select('*')
      .eq('user_id', userId)
      .order('generated_at', { ascending: false })
      .limit(Number(limit));

    if (type) {
      query = query.eq('insight_type', type);
    }

    const { data: insights, error } = await query;

    if (error) {
      throw error;
    }

    const formattedInsights = insights?.map(insight => ({
      id: insight.id,
      type: insight.insight_type,
      title: insight.insight_content?.title || '',
      content: insight.insight_content?.content || '',
      actionItems: insight.insight_content?.actionItems || [],
      priorityScore: insight.priority_score,
      estimatedImpact: insight.insight_content?.estimatedImpact || '',
      generatedAt: insight.generated_at,
      isRead: insight.is_read,
      userFeedback: insight.user_feedback ? {
        rating: insight.user_feedback,
        completed: true
      } : undefined
    })) || [];

    res.json({ insights: formattedInsights });
  } catch (error) {
    console.error('Error fetching mentor insights:', error);
    res.status(500).json({ error: 'Failed to fetch mentor insights' });
  }
};

export const updateInsightFeedback = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { insightId } = req.params;
    const { rating, helpful } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    await aiMentoringEngine.updateInsightFeedback(insightId, rating || (helpful ? 5 : 1));

    res.json({ message: 'Feedback updated successfully' });
  } catch (error) {
    console.error('Error updating insight feedback:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

export const markInsightAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { insightId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    await aiMentoringEngine.markInsightAsRead(insightId);

    res.json({ message: 'Insight marked as read' });
  } catch (error) {
    console.error('Error marking insight as read:', error);
    res.status(500).json({ error: 'Failed to mark insight as read' });
  }
};

// User Goals Routes
export const createUserGoal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { goalType, targetValue, deadline } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!goalType || !targetValue || !deadline) {
      return res.status(400).json({ error: 'Goal type, target value, and deadline are required' });
    }

    const goal = await aiMentoringEngine.createUserGoal(userId, {
      goalType,
      targetValue,
      deadline
    });

    res.json({ goal });
  } catch (error) {
    console.error('Error creating user goal:', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

export const getUserGoals = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { data: goals, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ goals: goals || [] });
  } catch (error) {
    console.error('Error fetching user goals:', error);
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
};

export const updateGoalProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { goalId } = req.params;
    const { currentValue } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (typeof currentValue !== 'number') {
      return res.status(400).json({ error: 'Current value must be a number' });
    }

    await aiMentoringEngine.updateGoalProgress(goalId, currentValue);

    res.json({ message: 'Goal progress updated successfully' });
  } catch (error) {
    console.error('Error updating goal progress:', error);
    res.status(500).json({ error: 'Failed to update goal progress' });
  }
};

// LinkedIn Integration Routes
export const connectLinkedIn = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { authCode } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!authCode) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange code for tokens
    const tokens = await dataIntegrationService.authenticateLinkedIn(authCode);
    
    // Store tokens securely
    await this.storeLinkedInTokens(userId, tokens);
    
    // Schedule initial data sync
    await dataIntegrationService.scheduleDataRefresh(userId);

    res.json({ 
      message: 'LinkedIn connected successfully',
      connected: true
    });
  } catch (error) {
    console.error('Error connecting LinkedIn:', error);
    res.status(500).json({ error: 'Failed to connect LinkedIn' });
  }
};

export const disconnectLinkedIn = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Remove LinkedIn integration
    const { error } = await supabase
      .from('linkedin_integrations')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    res.json({ 
      message: 'LinkedIn disconnected successfully',
      connected: false
    });
  } catch (error) {
    console.error('Error disconnecting LinkedIn:', error);
    res.status(500.json({ error: 'Failed to disconnect LinkedIn' });
  }
};

// User Profile Routes
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    // Get LinkedIn connection status
    const { data: linkedinIntegration } = await supabase
      .from('linkedin_integrations')
      .select('is_active, last_synced_at')
      .eq('user_id', userId)
      .single();

    res.json({
      profile: {
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name,
        lastName: profile.last_name,
        industry: profile.industry,
        experienceLevel: profile.experience_level,
        primaryGoal: profile.primary_goal,
        linkedinConnected: linkedinIntegration?.is_active || false,
        lastSyncAt: linkedinIntegration?.last_synced_at
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName, industry, experienceLevel, primaryGoal } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { error } = await supabase
      .from('users')
      .update({
        first_name: firstName,
        last_name: lastName,
        industry,
        experience_level: experienceLevel,
        primary_goal: primaryGoal,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Analytics Routes
export const getUserAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { timeframe = '30d' } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Calculate date range
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Get brand score history
    const { data: scoreHistory, error: scoreError } = await supabase
      .from('brand_analyses')
      .select('overall_score, visibility_score, engagement_score, created_at')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (scoreError) {
      throw scoreError;
    }

    // Get insights count
    const { data: insightsCount, error: insightsError } = await supabase
      .from('mentor_insights')
      .select('insight_type')
      .eq('user_id', userId)
      .gte('generated_at', startDate.toISOString());

    if (insightsError) {
      throw insightsError;
    }

    // Get goals progress
    const { data: goals, error: goalsError } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId);

    if (goalsError) {
      throw goalsError;
    }

    res.json({
      timeframe,
      scoreHistory: scoreHistory || [],
      insights: {
        total: insightsCount?.length || 0,
        weekly: insightsCount?.filter(i => i.insight_type === 'weekly').length || 0,
        monthly: insightsCount?.filter(i => i.insight_type === 'monthly').length || 0,
        achievements: insightsCount?.filter(i => i.insight_type === 'achievement').length || 0
      },
      goals: {
        total: goals?.length || 0,
        completed: goals?.filter(g => g.achieved_at).length || 0,
        inProgress: goals?.filter(g => !g.achieved_at).length || 0
      }
    });
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

// Health Check Route
export const healthCheck = async (req: Request, res: Response) => {
  try {
    // Check database connection
    const { error: dbError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    const dbStatus = !dbError;

    // Check external API status (mock)
    const externalApiStatus = true;

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus ? 'healthy' : 'unhealthy',
        externalApis: externalApiStatus ? 'healthy' : 'unhealthy',
        backgroundJobs: 'healthy'
      },
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
};

// Error handling middleware
export const errorHandler = (error: any, req: Request, res: Response, next: any) => {
  console.error('API Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized access'
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
};