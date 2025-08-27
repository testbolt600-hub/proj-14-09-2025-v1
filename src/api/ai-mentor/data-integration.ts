import { supabase } from '../../lib/supabase';

export interface LinkedInTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  industry: string;
  location: string;
  connections: number;
  profilePicture?: string;
}

export interface DataSyncResult {
  success: boolean;
  dataPoints: number;
  lastSyncAt: string;
  errors?: string[];
}

class DataIntegrationService {
  private linkedInApiBase = 'https://api.linkedin.com/v2';
  private rateLimitDelay = 1000; // 1 second between requests

  async authenticateLinkedIn(authCode: string): Promise<LinkedInTokens> {
    try {
      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: authCode,
          client_id: process.env.LINKEDIN_CLIENT_ID || '',
          client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI || ''
        })
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange authorization code');
      }

      const tokenData = await tokenResponse.json();
      
      const tokens: LinkedInTokens = {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      };

      return tokens;
    } catch (error) {
      console.error('LinkedIn authentication error:', error);
      throw new Error('Failed to authenticate with LinkedIn');
    }
  }

  async fetchLinkedInProfile(accessToken: string): Promise<LinkedInProfile> {
    try {
      // Rate limiting
      await this.delay(this.rateLimitDelay);

      const profileResponse = await fetch(`${this.linkedInApiBase}/people/~:(id,firstName,lastName,headline,summary,industry,location,numConnections,profilePicture(displayImage~:playableStreams))`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!profileResponse.ok) {
        throw new Error(`LinkedIn API error: ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();
      
      const profile: LinkedInProfile = {
        id: profileData.id,
        firstName: profileData.firstName?.localized?.en_US || '',
        lastName: profileData.lastName?.localized?.en_US || '',
        headline: profileData.headline?.localized?.en_US || '',
        summary: profileData.summary?.localized?.en_US || '',
        industry: profileData.industry?.localized?.en_US || '',
        location: profileData.location?.name || '',
        connections: profileData.numConnections || 0,
        profilePicture: this.extractProfilePicture(profileData.profilePicture)
      };

      return profile;
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      throw error;
    }
  }

  async fetchLinkedInPosts(accessToken: string, profileId: string): Promise<any[]> {
    try {
      await this.delay(this.rateLimitDelay);

      const postsResponse = await fetch(`${this.linkedInApiBase}/shares?q=owners&owners=urn:li:person:${profileId}&sortBy=CREATED&count=50`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!postsResponse.ok) {
        throw new Error(`LinkedIn Posts API error: ${postsResponse.status}`);
      }

      const postsData = await postsResponse.json();
      return postsData.elements || [];
    } catch (error) {
      console.error('Error fetching LinkedIn posts:', error);
      return [];
    }
  }

  async syncUserData(userId: string): Promise<DataSyncResult> {
    try {
      // Get user's LinkedIn tokens
      const tokens = await this.getUserLinkedInTokens(userId);
      
      if (!tokens) {
        throw new Error('No LinkedIn tokens found for user');
      }

      // Check if token is expired
      if (new Date(tokens.expiresAt) < new Date()) {
        // Refresh token
        const newTokens = await this.refreshLinkedInToken(tokens.refreshToken);
        await this.storeLinkedInTokens(userId, newTokens);
        tokens.accessToken = newTokens.accessToken;
      }

      let dataPoints = 0;
      const errors: string[] = [];

      try {
        // Fetch profile data
        const profile = await this.fetchLinkedInProfile(tokens.accessToken);
        await this.storeLinkedInProfile(userId, profile);
        dataPoints++;

        // Fetch posts data
        const posts = await this.fetchLinkedInPosts(tokens.accessToken, profile.id);
        await this.storeLinkedInPosts(userId, posts);
        dataPoints += posts.length;

        // Update last sync timestamp
        await this.updateLastSyncTime(userId);

      } catch (apiError) {
        errors.push(`LinkedIn API error: ${apiError}`);
      }

      return {
        success: errors.length === 0,
        dataPoints,
        lastSyncAt: new Date().toISOString(),
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (error) {
      console.error('Error syncing user data:', error);
      return {
        success: false,
        dataPoints: 0,
        lastSyncAt: new Date().toISOString(),
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  async scheduleDataRefresh(userId: string): Promise<void> {
    try {
      // In a real implementation, this would add a job to a queue
      // For now, we'll simulate scheduling
      console.log(`Scheduling data refresh for user ${userId}`);
      
      // Store refresh schedule in database
      const { error } = await supabase
        .from('data_sync_schedules')
        .upsert({
          user_id: userId,
          next_sync_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          sync_frequency: '1 day',
          is_active: true,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error scheduling data refresh:', error);
      throw error;
    }
  }

  private async getUserLinkedInTokens(userId: string): Promise<LinkedInTokens | null> {
    try {
      const { data, error } = await supabase
        .from('linkedin_integrations')
        .select('access_token, refresh_token, expires_at')
        .eq('user_id', userId)
        .single();

      if (error || !data) {
        return null;
      }

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at
      };
    } catch (error) {
      console.error('Error getting LinkedIn tokens:', error);
      return null;
    }
  }

  private async storeLinkedInTokens(userId: string, tokens: LinkedInTokens): Promise<void> {
    try {
      const { error } = await supabase
        .from('linkedin_integrations')
        .upsert({
          user_id: userId,
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          expires_at: tokens.expiresAt,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error storing LinkedIn tokens:', error);
      throw error;
    }
  }

  private async refreshLinkedInToken(refreshToken: string): Promise<LinkedInTokens> {
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: process.env.LINKEDIN_CLIENT_ID || '',
          client_secret: process.env.LINKEDIN_CLIENT_SECRET || ''
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh LinkedIn token');
      }

      const tokenData = await response.json();
      
      return {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || refreshToken,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      };
    } catch (error) {
      console.error('Error refreshing LinkedIn token:', error);
      throw error;
    }
  }

  private async storeLinkedInProfile(userId: string, profile: LinkedInProfile): Promise<void> {
    try {
      const { error } = await supabase
        .from('linkedin_profiles')
        .upsert({
          user_id: userId,
          linkedin_id: profile.id,
          profile_data: profile,
          last_synced_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error storing LinkedIn profile:', error);
      throw error;
    }
  }

  private async storeLinkedInPosts(userId: string, posts: any[]): Promise<void> {
    try {
      const processedPosts = posts.map(post => ({
        user_id: userId,
        linkedin_post_id: post.id,
        post_data: post,
        created_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('linkedin_posts')
        .upsert(processedPosts);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error storing LinkedIn posts:', error);
      throw error;
    }
  }

  private async updateLastSyncTime(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('linkedin_profiles')
        .update({ 
          last_synced_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating last sync time:', error);
      throw error;
    }
  }

  private extractProfilePicture(profilePictureData: any): string | undefined {
    try {
      const displayImage = profilePictureData?.displayImage;
      if (displayImage?.elements && displayImage.elements.length > 0) {
        const element = displayImage.elements[0];
        if (element.identifiers && element.identifiers.length > 0) {
          return element.identifiers[0].identifier;
        }
      }
      return undefined;
    } catch (error) {
      console.error('Error extracting profile picture:', error);
      return undefined;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const dataIntegrationService = new DataIntegrationService();