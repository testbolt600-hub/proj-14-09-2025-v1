import { supabase } from '../../lib/supabase';

export interface ReputationScanResult {
  id: string;
  userId: string;
  overallScore: number;
  visibilityScore: number;
  sentimentScore: number;
  freshnessScore: number;
  authorityScore: number;
  scanData: {
    mentions: BrandMention[];
    recommendations: SEORecommendation[];
    alerts: ReputationAlert[];
  };
  createdAt: string;
}

export interface BrandMention {
  id: string;
  platform: 'google' | 'linkedin' | 'twitter' | 'github' | 'medium' | 'personal';
  title: string;
  url: string;
  snippet: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  ranking: number;
  date: string;
  relevance: number;
  isOwned: boolean;
  keywords: string[];
}

export interface SEORecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'visibility' | 'content' | 'optimization' | 'reputation';
  title: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  actionSteps: string[];
  estimatedTime: string;
  platforms: string[];
  completed: boolean;
}

export interface ReputationAlert {
  id: string;
  userId: string;
  type: 'new_mention' | 'ranking_change' | 'negative_content' | 'visibility_drop';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  data: any;
  isRead: boolean;
  actionRequired: boolean;
  createdAt: string;
}

export interface MonitoringSettings {
  userId: string;
  platforms: string[];
  keywords: string[];
  scanFrequency: 'daily' | 'weekly';
  alertFrequency: 'immediate' | 'daily' | 'weekly';
  isActive: boolean;
  lastScanAt?: string;
}

class ReputationMonitoringService {
  async scanUserReputation(userId: string, settings: MonitoringSettings): Promise<ReputationScanResult> {
    try {
      // 1. Scan each platform for mentions
      const mentions = await this.scanAllPlatforms(userId, settings);
      
      // 2. Analyze sentiment and relevance
      const analyzedMentions = await this.analyzeMentions(mentions);
      
      // 3. Calculate reputation scores
      const scores = this.calculateReputationScores(analyzedMentions);
      
      // 4. Generate SEO recommendations
      const recommendations = await this.generateSEORecommendations(analyzedMentions, scores);
      
      // 5. Detect alerts and issues
      const alerts = await this.detectReputationAlerts(analyzedMentions, scores);
      
      const scanResult: ReputationScanResult = {
        id: crypto.randomUUID(),
        userId,
        overallScore: scores.overall,
        visibilityScore: scores.visibility,
        sentimentScore: scores.sentiment,
        freshnessScore: scores.freshness,
        authorityScore: scores.authority,
        scanData: {
          mentions: analyzedMentions,
          recommendations,
          alerts
        },
        createdAt: new Date().toISOString()
      };

      // Store scan result
      await this.storeScanResult(scanResult);
      
      return scanResult;
    } catch (error) {
      console.error('Error scanning user reputation:', error);
      throw error;
    }
  }

  private async scanAllPlatforms(userId: string, settings: MonitoringSettings): Promise<BrandMention[]> {
    const mentions: BrandMention[] = [];
    
    for (const platform of settings.platforms) {
      try {
        const platformMentions = await this.scanPlatform(platform, settings.keywords);
        mentions.push(...platformMentions);
      } catch (error) {
        console.error(`Error scanning ${platform}:`, error);
      }
    }
    
    return mentions;
  }

  private async scanPlatform(platform: string, keywords: string[]): Promise<BrandMention[]> {
    // In a real implementation, this would call various APIs
    switch (platform) {
      case 'google':
        return this.scanGoogleSearch(keywords);
      case 'linkedin':
        return this.scanLinkedIn(keywords);
      case 'github':
        return this.scanGitHub(keywords);
      case 'twitter':
        return this.scanTwitter(keywords);
      case 'medium':
        return this.scanMedium(keywords);
      default:
        return [];
    }
  }

  private async scanGoogleSearch(keywords: string[]): Promise<BrandMention[]> {
    // Mock Google search results
    return [
      {
        id: 'google-1',
        platform: 'google',
        title: 'John Doe - Software Engineer Portfolio',
        url: 'https://johndoe.dev',
        snippet: 'Professional portfolio showcasing software engineering projects and expertise...',
        sentiment: 'positive',
        ranking: 1,
        date: '2024-01-20',
        relevance: 95,
        isOwned: true,
        keywords: keywords
      }
    ];
  }

  private async scanLinkedIn(keywords: string[]): Promise<BrandMention[]> {
    // Mock LinkedIn results
    return [
      {
        id: 'linkedin-1',
        platform: 'linkedin',
        title: 'John Doe - Senior Software Engineer',
        url: 'https://linkedin.com/in/johndoe',
        snippet: 'Experienced software engineer with expertise in React, Node.js...',
        sentiment: 'positive',
        ranking: 1,
        date: '2024-01-19',
        relevance: 98,
        isOwned: true,
        keywords: keywords
      }
    ];
  }

  private async scanGitHub(keywords: string[]): Promise<BrandMention[]> {
    // Mock GitHub results
    return [
      {
        id: 'github-1',
        platform: 'github',
        title: 'johndoe (John Doe) · GitHub',
        url: 'https://github.com/johndoe',
        snippet: 'Software engineer building scalable web applications...',
        sentiment: 'positive',
        ranking: 2,
        date: '2024-01-18',
        relevance: 90,
        isOwned: true,
        keywords: keywords
      }
    ];
  }

  private async scanTwitter(keywords: string[]): Promise<BrandMention[]> {
    // Mock Twitter results
    return [];
  }

  private async scanMedium(keywords: string[]): Promise<BrandMention[]> {
    // Mock Medium results
    return [
      {
        id: 'medium-1',
        platform: 'medium',
        title: 'Building Scalable React Applications',
        url: 'https://medium.com/@johndoe/react-apps',
        snippet: 'In this article, I share my experience building large-scale React applications...',
        sentiment: 'positive',
        ranking: 5,
        date: '2023-08-22',
        relevance: 85,
        isOwned: true,
        keywords: keywords
      }
    ];
  }

  private async analyzeMentions(mentions: BrandMention[]): Promise<BrandMention[]> {
    // In a real implementation, this would use sentiment analysis APIs
    return mentions.map(mention => ({
      ...mention,
      sentiment: this.calculateSentiment(mention.snippet),
      relevance: this.calculateRelevance(mention.title, mention.snippet)
    }));
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    // Simple sentiment analysis (in real implementation, use AI service)
    const positiveWords = ['excellent', 'great', 'amazing', 'professional', 'expert', 'successful'];
    const negativeWords = ['issues', 'problems', 'failed', 'poor', 'bad', 'terrible'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateRelevance(title: string, snippet: string): number {
    // Calculate how relevant the mention is to the user's professional brand
    const professionalKeywords = ['engineer', 'developer', 'software', 'tech', 'programming'];
    const text = (title + ' ' + snippet).toLowerCase();
    
    const matches = professionalKeywords.filter(keyword => text.includes(keyword)).length;
    return Math.min(100, (matches / professionalKeywords.length) * 100 + 50);
  }

  private calculateReputationScores(mentions: BrandMention[]) {
    const totalMentions = mentions.length;
    if (totalMentions === 0) {
      return { overall: 0, visibility: 0, sentiment: 0, freshness: 0, authority: 0 };
    }

    // Visibility Score: Based on search ranking and platform coverage
    const topRankings = mentions.filter(m => m.ranking <= 10).length;
    const visibility = Math.min(100, (topRankings / Math.max(1, totalMentions)) * 100);

    // Sentiment Score: Based on positive vs negative mentions
    const positiveMentions = mentions.filter(m => m.sentiment === 'positive').length;
    const negativeMentions = mentions.filter(m => m.sentiment === 'negative').length;
    const sentiment = Math.max(0, ((positiveMentions - negativeMentions) / totalMentions) * 100 + 50);

    // Freshness Score: Based on recency of content
    const recentMentions = mentions.filter(m => {
      const mentionDate = new Date(m.date);
      const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
      return mentionDate > sixMonthsAgo;
    }).length;
    const freshness = Math.min(100, (recentMentions / totalMentions) * 100);

    // Authority Score: Based on platform authority and owned content
    const ownedContent = mentions.filter(m => m.isOwned).length;
    const authorityPlatforms = mentions.filter(m => ['linkedin', 'github', 'medium'].includes(m.platform)).length;
    const authority = Math.min(100, ((ownedContent + authorityPlatforms) / (totalMentions * 2)) * 100);

    const overall = Math.round((visibility + sentiment + freshness + authority) / 4);

    return { overall, visibility, sentiment, freshness, authority };
  }

  private async generateSEORecommendations(mentions: BrandMention[], scores: any): Promise<SEORecommendation[]> {
    const recommendations: SEORecommendation[] = [];

    // Check for missing personal website
    const hasPersonalSite = mentions.some(m => m.isOwned && m.platform === 'google' && m.url.includes('.com'));
    if (!hasPersonalSite) {
      recommendations.push({
        id: 'website-creation',
        priority: 'high',
        category: 'visibility',
        title: 'Create Professional Website',
        description: 'You don\'t have a personal website ranking on Page 1. This is a major opportunity.',
        impact: '+25% search visibility',
        difficulty: 'medium',
        actionSteps: [
          'Register a domain with your name',
          'Create a professional landing page',
          'Include your bio and experience',
          'Optimize for SEO with relevant keywords'
        ],
        estimatedTime: '4-6 hours',
        platforms: ['google'],
        completed: false
      });
    }

    // Check for negative content
    const negativeContent = mentions.filter(m => m.sentiment === 'negative' && m.ranking <= 10);
    if (negativeContent.length > 0) {
      recommendations.push({
        id: 'negative-content-fix',
        priority: 'high',
        category: 'reputation',
        title: 'Address Negative Search Results',
        description: 'Negative content is appearing in your top search results.',
        impact: 'Remove negative impression',
        difficulty: 'easy',
        actionSteps: [
          'Review and fix issues in problematic content',
          'Archive or delete outdated negative content',
          'Create positive content to push down negative results',
          'Monitor ranking changes'
        ],
        estimatedTime: '2-3 hours',
        platforms: ['google'],
        completed: false
      });
    }

    // Check content freshness
    if (scores.freshness < 70) {
      recommendations.push({
        id: 'content-freshness',
        priority: 'medium',
        category: 'content',
        title: 'Publish Fresh Content',
        description: 'Your content is outdated. Fresh content improves search rankings.',
        impact: '+15% content freshness',
        difficulty: 'medium',
        actionSteps: [
          'Write new blog posts or articles',
          'Update your LinkedIn with recent achievements',
          'Share recent project updates',
          'Post about industry trends'
        ],
        estimatedTime: '3-4 hours per piece',
        platforms: ['medium', 'linkedin'],
        completed: false
      });
    }

    return recommendations;
  }

  private async detectReputationAlerts(mentions: BrandMention[], scores: any): Promise<ReputationAlert[]> {
    const alerts: ReputationAlert[] = [];

    // Check for negative content in top results
    const topNegative = mentions.filter(m => m.sentiment === 'negative' && m.ranking <= 10);
    if (topNegative.length > 0) {
      alerts.push({
        id: 'negative-top-result',
        userId: '',
        type: 'negative_content',
        title: 'Negative Content in Top Results',
        description: `${topNegative.length} negative result(s) found in top 10 search results`,
        severity: 'warning',
        data: { mentions: topNegative },
        isRead: false,
        actionRequired: true,
        createdAt: new Date().toISOString()
      });
    }

    // Check for low visibility
    if (scores.visibility < 60) {
      alerts.push({
        id: 'low-visibility',
        userId: '',
        type: 'visibility_drop',
        title: 'Low Search Visibility',
        description: 'Your name doesn\'t appear prominently in search results',
        severity: 'warning',
        data: { visibilityScore: scores.visibility },
        isRead: false,
        actionRequired: true,
        createdAt: new Date().toISOString()
      });
    }

    return alerts;
  }

  private async storeScanResult(result: ReputationScanResult): Promise<void> {
    try {
      const { error } = await supabase
        .from('reputation_scans')
        .insert({
          id: result.id,
          user_id: result.userId,
          overall_score: result.overallScore,
          visibility_score: result.visibilityScore,
          sentiment_score: result.sentimentScore,
          freshness_score: result.freshnessScore,
          authority_score: result.authorityScore,
          scan_data: result.scanData,
          created_at: result.createdAt
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error storing scan result:', error);
      throw error;
    }
  }

  async getUserReputationHistory(userId: string, limit: number = 10): Promise<ReputationScanResult[]> {
    try {
      const { data, error } = await supabase
        .from('reputation_scans')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data?.map(row => ({
        id: row.id,
        userId: row.user_id,
        overallScore: row.overall_score,
        visibilityScore: row.visibility_score,
        sentimentScore: row.sentiment_score,
        freshnessScore: row.freshness_score,
        authorityScore: row.authority_score,
        scanData: row.scan_data,
        createdAt: row.created_at
      })) || [];
    } catch (error) {
      console.error('Error fetching reputation history:', error);
      throw error;
    }
  }

  async updateMonitoringSettings(userId: string, settings: Partial<MonitoringSettings>): Promise<void> {
    try {
      const { error } = await supabase
        .from('reputation_monitoring_settings')
        .upsert({
          user_id: userId,
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating monitoring settings:', error);
      throw error;
    }
  }

  async getMonitoringSettings(userId: string): Promise<MonitoringSettings | null> {
    try {
      const { data, error } = await supabase
        .from('reputation_monitoring_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return data ? {
        userId: data.user_id,
        platforms: data.platforms,
        keywords: data.keywords,
        scanFrequency: data.scan_frequency,
        alertFrequency: data.alert_frequency,
        isActive: data.is_active,
        lastScanAt: data.last_scan_at
      } : null;
    } catch (error) {
      console.error('Error fetching monitoring settings:', error);
      return null;
    }
  }

  async createReputationAlert(alert: Omit<ReputationAlert, 'id' | 'createdAt'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('reputation_alerts')
        .insert({
          id: crypto.randomUUID(),
          user_id: alert.userId,
          alert_type: alert.type,
          title: alert.title,
          description: alert.description,
          severity: alert.severity,
          alert_data: alert.data,
          is_read: alert.isRead,
          action_required: alert.actionRequired,
          created_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating reputation alert:', error);
      throw error;
    }
  }

  async getUserAlerts(userId: string, limit: number = 20): Promise<ReputationAlert[]> {
    try {
      const { data, error } = await supabase
        .from('reputation_alerts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data?.map(row => ({
        id: row.id,
        userId: row.user_id,
        type: row.alert_type,
        title: row.title,
        description: row.description,
        severity: row.severity,
        data: row.alert_data,
        isRead: row.is_read,
        actionRequired: row.action_required,
        createdAt: row.created_at
      })) || [];
    } catch (error) {
      console.error('Error fetching user alerts:', error);
      throw error;
    }
  }

  async markAlertAsRead(alertId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('reputation_alerts')
        .update({ 
          is_read: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', alertId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking alert as read:', error);
      throw error;
    }
  }

  // Integration with AI Mentor
  async generateMentorInsightFromReputation(userId: string, scanResult: ReputationScanResult): Promise<any> {
    try {
      // Analyze reputation data for mentor insights
      const insights = {
        reputationFocus: this.identifyReputationFocus(scanResult),
        actionPriorities: this.prioritizeActions(scanResult.scanData.recommendations),
        weeklyGoals: this.generateWeeklyReputationGoals(scanResult),
        contentSuggestions: this.generateContentSuggestions(scanResult)
      };

      return insights;
    } catch (error) {
      console.error('Error generating mentor insight:', error);
      throw error;
    }
  }

  private identifyReputationFocus(scanResult: ReputationScanResult): string {
    if (scanResult.visibilityScore < 60) {
      return 'visibility_improvement';
    } else if (scanResult.sentimentScore < 70) {
      return 'reputation_repair';
    } else if (scanResult.freshnessScore < 70) {
      return 'content_freshness';
    } else {
      return 'authority_building';
    }
  }

  private prioritizeActions(recommendations: SEORecommendation[]): SEORecommendation[] {
    return recommendations
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 3);
  }

  private generateWeeklyReputationGoals(scanResult: ReputationScanResult): string[] {
    const goals = [];
    
    if (scanResult.visibilityScore < 70) {
      goals.push('Improve search visibility by creating fresh content');
    }
    
    if (scanResult.scanData.mentions.filter(m => m.sentiment === 'negative').length > 0) {
      goals.push('Address negative search results');
    }
    
    if (scanResult.authorityScore < 80) {
      goals.push('Build authority through thought leadership content');
    }
    
    return goals.slice(0, 2);
  }

  private generateContentSuggestions(scanResult: ReputationScanResult): string[] {
    const suggestions = [];
    
    if (scanResult.freshnessScore < 70) {
      suggestions.push('Write a blog post about recent industry trends');
      suggestions.push('Update your LinkedIn with recent achievements');
    }
    
    if (scanResult.authorityScore < 80) {
      suggestions.push('Share insights about your expertise area');
      suggestions.push('Comment on industry discussions');
    }
    
    return suggestions;
  }
}

export const reputationMonitoringService = new ReputationMonitoringService();