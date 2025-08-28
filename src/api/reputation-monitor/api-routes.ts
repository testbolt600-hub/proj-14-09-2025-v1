import { Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { reputationMonitoringService } from './reputation-service';
import { aiMentoringEngine } from '../ai-mentor/mentoring-engine';

// Start reputation scan
export const startReputationScan = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Get user's monitoring settings
    const settings = await reputationMonitoringService.getMonitoringSettings(userId);
    
    if (!settings) {
      return res.status(400).json({ error: 'Monitoring settings not configured' });
    }

    // Start reputation scan
    const scanResult = await reputationMonitoringService.scanUserReputation(userId, settings);
    
    // Generate AI Mentor insights from reputation data
    const mentorInsights = await reputationMonitoringService.generateMentorInsightFromReputation(userId, scanResult);
    
    // Create mentor insight if significant findings
    if (mentorInsights.reputationFocus !== 'authority_building') {
      await aiMentoringEngine.generateReputationInsight(userId, mentorInsights);
    }

    res.json({
      scanId: scanResult.id,
      overallScore: scanResult.overallScore,
      scores: {
        visibility: scanResult.visibilityScore,
        sentiment: scanResult.sentimentScore,
        freshness: scanResult.freshnessScore,
        authority: scanResult.authorityScore
      },
      mentionsCount: scanResult.scanData.mentions.length,
      recommendationsCount: scanResult.scanData.recommendations.length,
      alertsCount: scanResult.scanData.alerts.length,
      createdAt: scanResult.createdAt
    });
  } catch (error) {
    console.error('Error starting reputation scan:', error);
    res.status(500).json({ error: 'Failed to start reputation scan' });
  }
};

// Get reputation scan results
export const getReputationScan = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { scanId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { data: scan, error } = await supabase
      .from('reputation_scans')
      .select('*')
      .eq('id', scanId)
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    res.json({
      id: scan.id,
      overallScore: scan.overall_score,
      scores: {
        visibility: scan.visibility_score,
        sentiment: scan.sentiment_score,
        freshness: scan.freshness_score,
        authority: scan.authority_score
      },
      mentions: scan.scan_data?.mentions || [],
      recommendations: scan.scan_data?.recommendations || [],
      alerts: scan.scan_data?.alerts || [],
      createdAt: scan.created_at
    });
  } catch (error) {
    console.error('Error fetching reputation scan:', error);
    res.status(500).json({ error: 'Failed to fetch reputation scan' });
  }
};

// Get reputation history
export const getReputationHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { limit = 10 } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const history = await reputationMonitoringService.getUserReputationHistory(userId, Number(limit));

    res.json({
      scans: history.map(scan => ({
        id: scan.id,
        overallScore: scan.overallScore,
        scores: {
          visibility: scan.visibilityScore,
          sentiment: scan.sentimentScore,
          freshness: scan.freshnessScore,
          authority: scan.authorityScore
        },
        mentionsCount: scan.scanData.mentions.length,
        createdAt: scan.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching reputation history:', error);
    res.status(500).json({ error: 'Failed to fetch reputation history' });
  }
};

// Get brand mentions
export const getBrandMentions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { platform, sentiment, limit = 50 } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    let query = supabase
      .from('brand_mentions')
      .select('*')
      .eq('user_id', userId)
      .order('ranking', { ascending: true })
      .limit(Number(limit));

    if (platform && platform !== 'all') {
      query = query.eq('platform', platform);
    }

    if (sentiment && sentiment !== 'all') {
      query = query.eq('sentiment', sentiment);
    }

    const { data: mentions, error } = await query;

    if (error) throw error;

    res.json({
      mentions: mentions?.map(mention => ({
        id: mention.id,
        platform: mention.platform,
        title: mention.title,
        url: mention.url,
        snippet: mention.snippet,
        sentiment: mention.sentiment,
        ranking: mention.ranking,
        relevance: mention.relevance_score,
        isOwned: mention.is_owned,
        keywords: mention.keywords,
        date: mention.mention_date,
        createdAt: mention.created_at
      })) || []
    });
  } catch (error) {
    console.error('Error fetching brand mentions:', error);
    res.status(500).json({ error: 'Failed to fetch brand mentions' });
  }
};

// Get SEO recommendations
export const getSEORecommendations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { priority, category, completed } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    let query = supabase
      .from('seo_recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('priority', { ascending: false });

    if (priority && priority !== 'all') {
      query = query.eq('priority', priority);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (completed !== undefined) {
      query = query.eq('is_completed', completed === 'true');
    }

    const { data: recommendations, error } = await query;

    if (error) throw error;

    res.json({
      recommendations: recommendations?.map(rec => ({
        id: rec.id,
        priority: rec.priority,
        category: rec.category,
        title: rec.title,
        description: rec.description,
        impact: rec.impact_description,
        difficulty: rec.difficulty,
        actionSteps: rec.action_steps,
        estimatedTime: rec.estimated_time,
        platforms: rec.target_platforms,
        completed: rec.is_completed,
        completedAt: rec.completed_at,
        createdAt: rec.created_at
      })) || []
    });
  } catch (error) {
    console.error('Error fetching SEO recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch SEO recommendations' });
  }
};

// Mark SEO recommendation as completed
export const markRecommendationComplete = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { recommendationId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { error } = await supabase
      .from('seo_recommendations')
      .update({
        is_completed: true,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', recommendationId)
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ message: 'Recommendation marked as completed' });
  } catch (error) {
    console.error('Error marking recommendation complete:', error);
    res.status(500).json({ error: 'Failed to mark recommendation complete' });
  }
};

// Get reputation alerts
export const getReputationAlerts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { unreadOnly, limit = 20 } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const alerts = await reputationMonitoringService.getUserAlerts(userId, Number(limit));
    
    const filteredAlerts = unreadOnly === 'true' 
      ? alerts.filter(alert => !alert.isRead)
      : alerts;

    res.json({
      alerts: filteredAlerts.map(alert => ({
        id: alert.id,
        type: alert.type,
        title: alert.title,
        description: alert.description,
        severity: alert.severity,
        data: alert.data,
        isRead: alert.isRead,
        actionRequired: alert.actionRequired,
        createdAt: alert.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching reputation alerts:', error);
    res.status(500).json({ error: 'Failed to fetch reputation alerts' });
  }
};

// Mark alert as read
export const markAlertAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { alertId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    await reputationMonitoringService.markAlertAsRead(alertId);

    res.json({ message: 'Alert marked as read' });
  } catch (error) {
    console.error('Error marking alert as read:', error);
    res.status(500).json({ error: 'Failed to mark alert as read' });
  }
};

// Update monitoring settings
export const updateMonitoringSettings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { platforms, keywords, scanFrequency, alertFrequency, isActive } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    await reputationMonitoringService.updateMonitoringSettings(userId, {
      platforms,
      keywords,
      scanFrequency,
      alertFrequency,
      isActive
    });

    res.json({ message: 'Monitoring settings updated successfully' });
  } catch (error) {
    console.error('Error updating monitoring settings:', error);
    res.status(500).json({ error: 'Failed to update monitoring settings' });
  }
};

// Get monitoring settings
export const getMonitoringSettings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const settings = await reputationMonitoringService.getMonitoringSettings(userId);

    if (!settings) {
      // Return default settings
      return res.json({
        platforms: ['google', 'linkedin', 'github'],
        keywords: [],
        scanFrequency: 'daily',
        alertFrequency: 'daily',
        isActive: true,
        lastScanAt: null
      });
    }

    res.json({
      platforms: settings.platforms,
      keywords: settings.keywords,
      scanFrequency: settings.scanFrequency,
      alertFrequency: settings.alertFrequency,
      isActive: settings.isActive,
      lastScanAt: settings.lastScanAt
    });
  } catch (error) {
    console.error('Error fetching monitoring settings:', error);
    res.status(500).json({ error: 'Failed to fetch monitoring settings' });
  }
};

// Get reputation dashboard data
export const getReputationDashboard = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Get latest scan
    const { data: latestScan, error: scanError } = await supabase
      .from('reputation_scans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (scanError && scanError.code !== 'PGRST116') {
      throw scanError;
    }

    // Get unread alerts
    const unreadAlerts = await reputationMonitoringService.getUserAlerts(userId, 10);
    const unreadCount = unreadAlerts.filter(alert => !alert.isRead).length;

    // Get incomplete recommendations
    const { data: incompleteRecs, error: recsError } = await supabase
      .from('seo_recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('is_completed', false)
      .order('priority', { ascending: false })
      .limit(5);

    if (recsError) throw recsError;

    res.json({
      latestScan: latestScan ? {
        id: latestScan.id,
        overallScore: latestScan.overall_score,
        scores: {
          visibility: latestScan.visibility_score,
          sentiment: latestScan.sentiment_score,
          freshness: latestScan.freshness_score,
          authority: latestScan.authority_score
        },
        createdAt: latestScan.created_at
      } : null,
      unreadAlertsCount: unreadCount,
      pendingRecommendations: incompleteRecs?.length || 0,
      recentAlerts: unreadAlerts.slice(0, 3).map(alert => ({
        id: alert.id,
        type: alert.type,
        title: alert.title,
        description: alert.description,
        severity: alert.severity,
        createdAt: alert.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching reputation dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch reputation dashboard' });
  }
};