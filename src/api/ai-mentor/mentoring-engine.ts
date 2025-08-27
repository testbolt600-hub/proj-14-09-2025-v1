import { supabase } from '../../lib/supabase';
import { BrandAnalysis } from './brand-analysis';

export interface MentorInsight {
  id: string;
  userId: string;
  type: 'weekly' | 'monthly' | 'milestone' | 'achievement';
  title: string;
  content: string;
  actionItems: ActionItem[];
  priorityScore: number;
  estimatedImpact: string;
  generatedAt: string;
  isRead: boolean;
  userFeedback?: {
    rating: number;
    completed: boolean;
  };
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  category: string;
  completed: boolean;
}

export interface UserGoal {
  id: string;
  userId: string;
  goalType: string;
  targetValue: number;
  currentValue: number;
  deadline: string;
  createdAt: string;
  achievedAt?: string;
}

export interface MentoringContext {
  userProfile: any;
  currentBrandScore: BrandAnalysis;
  historicalData: BrandAnalysis[];
  userGoals: UserGoal[];
  engagementHistory: any[];
  industryBenchmarks: any;
}

class AIMentoringEngine {
  private openAIApiKey: string;

  constructor() {
    this.openAIApiKey = process.env.OPENAI_API_KEY || '';
  }

  async generateWeeklyInsight(context: MentoringContext): Promise<MentorInsight> {
    try {
      // 1. Analyze recent progress
      const progressAnalysis = this.analyzeWeeklyProgress(context);
      
      // 2. Identify key focus areas
      const focusAreas = this.identifyFocusAreas(context);
      
      // 3. Generate AI-powered insight
      const insightContent = await this.generateInsightContent('weekly', context, progressAnalysis);
      
      // 4. Create actionable items
      const actionItems = this.generateActionItems(focusAreas, 'weekly');

      const insight: MentorInsight = {
        id: crypto.randomUUID(),
        userId: context.userProfile.id,
        type: 'weekly',
        title: this.generateInsightTitle('weekly', progressAnalysis),
        content: insightContent,
        actionItems,
        priorityScore: this.calculatePriorityScore(progressAnalysis),
        estimatedImpact: this.estimateImpact(actionItems),
        generatedAt: new Date().toISOString(),
        isRead: false
      };

      await this.storeMentorInsight(insight);
      return insight;
    } catch (error) {
      console.error('Error generating weekly insight:', error);
      throw error;
    }
  }

  async generateMonthlyReview(context: MentoringContext): Promise<MentorInsight> {
    try {
      // 1. Comprehensive monthly analysis
      const monthlyAnalysis = this.analyzeMonthlyProgress(context);
      
      // 2. Long-term trend identification
      const trends = this.identifyTrends(context.historicalData);
      
      // 3. Strategic recommendations
      const strategicActions = this.generateStrategicActions(monthlyAnalysis, trends);
      
      // 4. Generate comprehensive review
      const reviewContent = await this.generateInsightContent('monthly', context, monthlyAnalysis);

      const review: MentorInsight = {
        id: crypto.randomUUID(),
        userId: context.userProfile.id,
        type: 'monthly',
        title: 'Monthly Brand Review: ' + this.getMonthlyTheme(monthlyAnalysis),
        content: reviewContent,
        actionItems: strategicActions,
        priorityScore: 5,
        estimatedImpact: this.estimateMonthlyImpact(strategicActions),
        generatedAt: new Date().toISOString(),
        isRead: false
      };

      await this.storeMentorInsight(review);
      return review;
    } catch (error) {
      console.error('Error generating monthly review:', error);
      throw error;
    }
  }

  async generateAchievementInsight(userId: string, achievementType: string): Promise<MentorInsight> {
    try {
      const achievementInsights = {
        'consistent_posting': {
          title: 'Milestone Unlocked: Consistent Creator! 🎉',
          content: 'Congratulations! You\'ve posted consistently for 4 weeks straight. This consistency is building real momentum in your personal brand. Your audience is starting to recognize you as a reliable source of insights.',
          impact: 'Brand recognition boost'
        },
        'engagement_milestone': {
          title: 'Achievement Unlocked: Engagement Master! ⚡',
          content: 'Amazing work! You\'ve achieved a 5%+ engagement rate, which puts you in the top 20% of LinkedIn users. Your content is clearly resonating with your audience.',
          impact: '+30% visibility boost'
        },
        'network_growth': {
          title: 'Network Milestone: 3,000 Connections! 🌐',
          content: 'You\'ve reached 3,000 professional connections! This expanded network significantly increases your content reach and career opportunities.',
          impact: 'Expanded professional reach'
        }
      };

      const achievementData = achievementInsights[achievementType as keyof typeof achievementInsights];
      
      if (!achievementData) {
        throw new Error('Unknown achievement type');
      }

      const insight: MentorInsight = {
        id: crypto.randomUUID(),
        userId,
        type: 'achievement',
        title: achievementData.title,
        content: achievementData.content,
        actionItems: [],
        priorityScore: 3,
        estimatedImpact: achievementData.impact,
        generatedAt: new Date().toISOString(),
        isRead: false
      };

      await this.storeMentorInsight(insight);
      return insight;
    } catch (error) {
      console.error('Error generating achievement insight:', error);
      throw error;
    }
  }

  private analyzeWeeklyProgress(context: MentoringContext) {
    const current = context.currentBrandScore;
    const previous = context.historicalData[0]; // Most recent previous analysis
    
    if (!previous) {
      return {
        type: 'initial',
        overallChange: 0,
        improvements: [],
        concerns: []
      };
    }

    const overallChange = current.overallScore - previous.overallScore;
    const improvements = [];
    const concerns = [];

    // Check each score category
    if (current.scores.visibility > previous.scores.visibility) {
      improvements.push('visibility');
    } else if (current.scores.visibility < previous.scores.visibility) {
      concerns.push('visibility');
    }

    if (current.scores.engagement > previous.scores.engagement) {
      improvements.push('engagement');
    } else if (current.scores.engagement < previous.scores.engagement) {
      concerns.push('engagement');
    }

    return {
      type: overallChange > 0 ? 'positive' : overallChange < 0 ? 'negative' : 'stable',
      overallChange,
      improvements,
      concerns
    };
  }

  private analyzeMonthlyProgress(context: MentoringContext) {
    const monthlyData = context.historicalData.slice(0, 4); // Last 4 weeks
    
    if (monthlyData.length < 2) {
      return {
        type: 'insufficient_data',
        trends: [],
        achievements: [],
        focusAreas: []
      };
    }

    const trends = this.identifyTrends(monthlyData);
    const achievements = this.identifyAchievements(monthlyData);
    const focusAreas = this.identifyFocusAreas(context);

    return {
      type: 'comprehensive',
      trends,
      achievements,
      focusAreas
    };
  }

  private identifyFocusAreas(context: MentoringContext): string[] {
    const focusAreas = [];
    const scores = context.currentBrandScore.scores;

    // Identify lowest scoring areas
    const scoreEntries = Object.entries(scores).sort(([,a], [,b]) => a - b);
    
    // Focus on bottom 2 areas
    focusAreas.push(scoreEntries[0][0], scoreEntries[1][0]);

    return focusAreas;
  }

  private identifyTrends(historicalData: BrandAnalysis[]): any[] {
    if (historicalData.length < 3) return [];

    const trends = [];
    
    // Analyze overall score trend
    const scores = historicalData.map(d => d.overallScore);
    const isImproving = scores[0] > scores[scores.length - 1];
    
    trends.push({
      metric: 'overall_score',
      direction: isImproving ? 'up' : 'down',
      magnitude: Math.abs(scores[0] - scores[scores.length - 1])
    });

    return trends;
  }

  private identifyAchievements(monthlyData: BrandAnalysis[]): string[] {
    const achievements = [];
    
    // Check for significant improvements
    const latest = monthlyData[0];
    const oldest = monthlyData[monthlyData.length - 1];
    
    if (latest.overallScore - oldest.overallScore >= 10) {
      achievements.push('significant_improvement');
    }
    
    if (latest.scores.engagement >= 80) {
      achievements.push('high_engagement');
    }

    return achievements;
  }

  private async generateInsightContent(
    type: string, 
    context: MentoringContext, 
    analysis: any
  ): Promise<string> {
    // In a real implementation, this would call OpenAI API
    // For now, return template-based content
    
    const templates = {
      weekly: this.getWeeklyInsightTemplate(analysis),
      monthly: this.getMonthlyReviewTemplate(analysis)
    };

    return templates[type as keyof typeof templates] || 'Default insight content';
  }

  private getWeeklyInsightTemplate(analysis: any): string {
    if (analysis.type === 'positive') {
      return `Great progress this week! Your brand score improved by ${analysis.overallChange} points. ${
        analysis.improvements.length > 0 
          ? `Your ${analysis.improvements.join(' and ')} metrics are trending upward.` 
          : ''
      } Keep up the momentum by focusing on consistent, valuable content sharing.`;
    } else if (analysis.type === 'negative') {
      return `This week showed some challenges, but that's normal in brand building. Your score dipped by ${Math.abs(analysis.overallChange)} points, mainly in ${analysis.concerns.join(' and ')}. Let's focus on specific actions to get back on track.`;
    } else {
      return `Steady progress this week! Your brand metrics are stable, which shows consistency. Now let's focus on strategic improvements to accelerate your growth.`;
    }
  }

  private getMonthlyReviewTemplate(analysis: any): string {
    return `This month has been a journey of growth and learning. You've made meaningful progress in building your professional brand. ${
      analysis.achievements.length > 0 
        ? `Key achievements include ${analysis.achievements.join(', ')}.` 
        : ''
    } Looking ahead, focus on ${analysis.focusAreas.join(' and ')} to continue your upward trajectory.`;
  }

  private generateActionItems(focusAreas: string[], timeframe: string): ActionItem[] {
    const actionTemplates = {
      visibility: [
        {
          title: 'Optimize LinkedIn headline',
          description: 'Update your headline with industry keywords and value proposition',
          difficulty: 'easy' as const,
          estimatedTime: '10 minutes',
          category: 'profile'
        },
        {
          title: 'Share industry insights',
          description: 'Post about recent trends or developments in your field',
          difficulty: 'medium' as const,
          estimatedTime: '20 minutes',
          category: 'content'
        }
      ],
      engagement: [
        {
          title: 'Ask engaging questions',
          description: 'End your posts with thought-provoking questions',
          difficulty: 'easy' as const,
          estimatedTime: '5 minutes',
          category: 'content'
        },
        {
          title: 'Comment on industry posts',
          description: 'Engage meaningfully with 5 posts from your network',
          difficulty: 'easy' as const,
          estimatedTime: '15 minutes',
          category: 'engagement'
        }
      ]
    };

    const actions: ActionItem[] = [];
    
    focusAreas.forEach(area => {
      const templates = actionTemplates[area as keyof typeof actionTemplates] || [];
      templates.forEach(template => {
        actions.push({
          id: crypto.randomUUID(),
          ...template,
          completed: false
        });
      });
    });

    return actions.slice(0, timeframe === 'weekly' ? 2 : 4);
  }

  private generateInsightTitle(type: string, analysis: any): string {
    const titles = {
      weekly: {
        positive: [
          'Your LinkedIn Engagement is Trending Up! 📈',
          'Great Progress This Week! 🚀',
          'Brand Momentum Building! ⭐'
        ],
        negative: [
          'Let\'s Refocus Your Strategy 🎯',
          'Course Correction Time 🔄',
          'Opportunity for Improvement 💡'
        ],
        stable: [
          'Steady Growth Continues 📊',
          'Consistency Pays Off 🎯',
          'Building Strong Foundation 🏗️'
        ]
      }
    };

    const weeklyTitles = titles.weekly[analysis.type as keyof typeof titles.weekly] || titles.weekly.stable;
    return weeklyTitles[Math.floor(Math.random() * weeklyTitles.length)];
  }

  private getMonthlyTheme(analysis: any): string {
    const themes = [
      'Strong Foundation Building',
      'Accelerating Growth',
      'Strategic Positioning',
      'Authority Development',
      'Network Expansion'
    ];
    
    return themes[Math.floor(Math.random() * themes.length)];
  }

  private calculatePriorityScore(analysis: any): number {
    if (analysis.type === 'negative') return 5;
    if (analysis.type === 'positive') return 3;
    return 4;
  }

  private estimateImpact(actionItems: ActionItem[]): string {
    const impacts = ['+12% engagement', '+8% visibility', '+15% network growth', '+10% brand score'];
    return impacts[Math.floor(Math.random() * impacts.length)];
  }

  private estimateMonthlyImpact(actionItems: ActionItem[]): string {
    return '+20% overall brand growth';
  }

  async storeMentorInsight(insight: MentorInsight): Promise<void> {
    try {
      const { error } = await supabase
        .from('mentor_insights')
        .insert({
          id: insight.id,
          user_id: insight.userId,
          insight_type: insight.type,
          insight_content: {
            title: insight.title,
            content: insight.content,
            actionItems: insight.actionItems,
            estimatedImpact: insight.estimatedImpact
          },
          priority_score: insight.priorityScore,
          generated_at: insight.generatedAt,
          is_read: insight.isRead
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error storing mentor insight:', error);
      throw error;
    }
  }

  async getUserInsights(userId: string, limit: number = 10): Promise<MentorInsight[]> {
    try {
      const { data, error } = await supabase
        .from('mentor_insights')
        .select('*')
        .eq('user_id', userId)
        .order('generated_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return data?.map(row => ({
        id: row.id,
        userId: row.user_id,
        type: row.insight_type,
        title: row.insight_content.title,
        content: row.insight_content.content,
        actionItems: row.insight_content.actionItems || [],
        priorityScore: row.priority_score,
        estimatedImpact: row.insight_content.estimatedImpact,
        generatedAt: row.generated_at,
        isRead: row.is_read,
        userFeedback: row.user_feedback ? {
          rating: row.user_feedback,
          completed: true
        } : undefined
      })) || [];
    } catch (error) {
      console.error('Error fetching user insights:', error);
      throw error;
    }
  }

  async updateInsightFeedback(insightId: string, rating: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('mentor_insights')
        .update({ 
          user_feedback: rating,
          updated_at: new Date().toISOString()
        })
        .eq('id', insightId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating insight feedback:', error);
      throw error;
    }
  }

  async markInsightAsRead(insightId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('mentor_insights')
        .update({ 
          is_read: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', insightId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error marking insight as read:', error);
      throw error;
    }
  }

  async createUserGoal(userId: string, goalData: Partial<UserGoal>): Promise<UserGoal> {
    try {
      const goal: UserGoal = {
        id: crypto.randomUUID(),
        userId,
        goalType: goalData.goalType || 'custom',
        targetValue: goalData.targetValue || 0,
        currentValue: goalData.currentValue || 0,
        deadline: goalData.deadline || '',
        createdAt: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_goals')
        .insert({
          id: goal.id,
          user_id: goal.userId,
          goal_type: goal.goalType,
          target_value: goal.targetValue,
          current_value: goal.currentValue,
          deadline: goal.deadline,
          created_at: goal.createdAt
        });

      if (error) {
        throw error;
      }

      return goal;
    } catch (error) {
      console.error('Error creating user goal:', error);
      throw error;
    }
  }

  async updateGoalProgress(goalId: string, currentValue: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_goals')
        .update({ 
          current_value: currentValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', goalId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating goal progress:', error);
      throw error;
    }
  }
}

export const aiMentoringEngine = new AIMentoringEngine();