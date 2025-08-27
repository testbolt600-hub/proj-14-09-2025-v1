import { supabase } from '../../lib/supabase';

export interface BrandAnalysisData {
  linkedinProfile?: LinkedInData;
  resumeFile?: File;
  portfolioUrl?: string;
  manualInputs?: UserInputData;
}

export interface LinkedInData {
  headline: string;
  summary: string;
  experience: ExperienceItem[];
  skills: string[];
  connections: number;
  posts: PostData[];
  engagement: EngagementMetrics;
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface PostData {
  content: string;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  publishedAt: string;
}

export interface EngagementMetrics {
  averageLikes: number;
  averageComments: number;
  engagementRate: number;
  reachGrowth: number;
}

export interface UserInputData {
  industry: string;
  experienceLevel: string;
  careerGoals: string[];
  targetAudience: string;
}

export interface BrandAnalysis {
  id: string;
  userId: string;
  overallScore: number;
  scores: {
    visibility: number;
    engagement: number;
    professionalPresence: number;
    networkQuality: number;
  };
  recommendations: Recommendation[];
  benchmarks: {
    industryAverage: number;
    topPercentile: number;
    userPercentile: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: number;
  estimatedImpact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  actionSteps: string[];
}

class BrandAnalysisService {
  async analyzeProfile(userId: string, profileData: BrandAnalysisData): Promise<BrandAnalysis> {
    try {
      // 1. Profile Completeness Analysis
      const completenessScore = this.calculateCompletenessScore(profileData);
      
      // 2. Keyword Density Analysis
      const keywordScore = await this.analyzeKeywordDensity(profileData);
      
      // 3. Engagement Metrics Processing
      const engagementScore = this.calculateEngagementScore(profileData.linkedinProfile?.engagement);
      
      // 4. Professional Presence Evaluation
      const presenceScore = this.evaluateProfessionalPresence(profileData);
      
      // 5. Network Quality Assessment
      const networkScore = this.assessNetworkQuality(profileData.linkedinProfile);
      
      // 6. Calculate Overall Score
      const overallScore = Math.round(
        (completenessScore * 0.25) +
        (keywordScore * 0.20) +
        (engagementScore * 0.25) +
        (presenceScore * 0.15) +
        (networkScore * 0.15)
      );

      // 7. Generate Recommendations
      const recommendations = await this.generateRecommendations({
        completenessScore,
        keywordScore,
        engagementScore,
        presenceScore,
        networkScore,
        profileData
      });

      // 8. Get Industry Benchmarks
      const benchmarks = await this.getIndustryBenchmarks(
        profileData.manualInputs?.industry || 'technology'
      );

      const analysis: BrandAnalysis = {
        id: crypto.randomUUID(),
        userId,
        overallScore,
        scores: {
          visibility: completenessScore,
          engagement: engagementScore,
          professionalPresence: presenceScore,
          networkQuality: networkScore
        },
        recommendations,
        benchmarks,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store analysis in database
      await this.storeBrandAnalysis(analysis);
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing profile:', error);
      throw new Error('Failed to analyze brand profile');
    }
  }

  private calculateCompletenessScore(profileData: BrandAnalysisData): number {
    let score = 0;
    let maxScore = 100;

    if (profileData.linkedinProfile) {
      const profile = profileData.linkedinProfile;
      
      // Headline (20 points)
      if (profile.headline && profile.headline.length > 10) {
        score += 20;
      } else if (profile.headline) {
        score += 10;
      }

      // Summary (25 points)
      if (profile.summary && profile.summary.length > 100) {
        score += 25;
      } else if (profile.summary) {
        score += 15;
      }

      // Experience (25 points)
      if (profile.experience && profile.experience.length >= 3) {
        score += 25;
      } else if (profile.experience && profile.experience.length >= 1) {
        score += 15;
      }

      // Skills (15 points)
      if (profile.skills && profile.skills.length >= 10) {
        score += 15;
      } else if (profile.skills && profile.skills.length >= 5) {
        score += 10;
      }

      // Recent Activity (15 points)
      if (profile.posts && profile.posts.length >= 5) {
        score += 15;
      } else if (profile.posts && profile.posts.length >= 1) {
        score += 8;
      }
    }

    return Math.min(score, maxScore);
  }

  private async analyzeKeywordDensity(profileData: BrandAnalysisData): Promise<number> {
    // Simulate keyword analysis
    const industryKeywords = [
      'software engineer', 'react', 'typescript', 'node.js', 'aws',
      'leadership', 'team management', 'agile', 'scrum', 'ci/cd'
    ];

    let keywordMatches = 0;
    const profileText = this.extractProfileText(profileData);
    
    industryKeywords.forEach(keyword => {
      if (profileText.toLowerCase().includes(keyword.toLowerCase())) {
        keywordMatches++;
      }
    });

    return Math.round((keywordMatches / industryKeywords.length) * 100);
  }

  private calculateEngagementScore(engagement?: EngagementMetrics): number {
    if (!engagement) return 0;

    // Industry benchmarks
    const benchmarks = {
      averageLikes: 50,
      averageComments: 5,
      engagementRate: 3.0
    };

    let score = 0;

    // Likes performance (40%)
    const likesRatio = Math.min(engagement.averageLikes / benchmarks.averageLikes, 2);
    score += likesRatio * 40;

    // Comments performance (30%)
    const commentsRatio = Math.min(engagement.averageComments / benchmarks.averageComments, 2);
    score += commentsRatio * 30;

    // Engagement rate (30%)
    const engagementRatio = Math.min(engagement.engagementRate / benchmarks.engagementRate, 2);
    score += engagementRatio * 30;

    return Math.round(Math.min(score, 100));
  }

  private evaluateProfessionalPresence(profileData: BrandAnalysisData): number {
    let score = 0;

    if (profileData.linkedinProfile) {
      const profile = profileData.linkedinProfile;
      
      // Professional headline (30 points)
      if (profile.headline && this.isProfessionalHeadline(profile.headline)) {
        score += 30;
      }

      // Complete summary (25 points)
      if (profile.summary && profile.summary.length > 200) {
        score += 25;
      }

      // Detailed experience (25 points)
      if (profile.experience && profile.experience.every(exp => exp.description.length > 50)) {
        score += 25;
      }

      // Consistent posting (20 points)
      if (profile.posts && profile.posts.length >= 10) {
        score += 20;
      }
    }

    return Math.min(score, 100);
  }

  private assessNetworkQuality(linkedinProfile?: LinkedInData): number {
    if (!linkedinProfile) return 0;

    let score = 0;

    // Connection count (40 points)
    const connections = linkedinProfile.connections || 0;
    if (connections >= 5000) {
      score += 40;
    } else if (connections >= 1000) {
      score += 30;
    } else if (connections >= 500) {
      score += 20;
    } else if (connections >= 100) {
      score += 10;
    }

    // Engagement quality (30 points)
    if (linkedinProfile.engagement) {
      const avgComments = linkedinProfile.engagement.averageComments;
      if (avgComments >= 10) {
        score += 30;
      } else if (avgComments >= 5) {
        score += 20;
      } else if (avgComments >= 2) {
        score += 10;
      }
    }

    // Growth rate (30 points)
    if (linkedinProfile.engagement?.reachGrowth) {
      const growth = linkedinProfile.engagement.reachGrowth;
      if (growth >= 20) {
        score += 30;
      } else if (growth >= 10) {
        score += 20;
      } else if (growth >= 5) {
        score += 10;
      }
    }

    return Math.min(score, 100);
  }

  private async generateRecommendations(analysisData: any): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    // Generate recommendations based on weak areas
    if (analysisData.completenessScore < 80) {
      recommendations.push({
        id: crypto.randomUUID(),
        category: 'Profile Optimization',
        title: 'Complete Your LinkedIn Profile',
        description: 'Your profile is missing key information that could improve visibility.',
        priority: 5,
        estimatedImpact: '+15% profile views',
        difficulty: 'easy',
        actionSteps: [
          'Add a professional headline with keywords',
          'Write a compelling summary (200+ words)',
          'Add detailed job descriptions',
          'Include relevant skills and endorsements'
        ]
      });
    }

    if (analysisData.engagementScore < 70) {
      recommendations.push({
        id: crypto.randomUUID(),
        category: 'Content Strategy',
        title: 'Improve Content Engagement',
        description: 'Your posts could generate more engagement with better strategy.',
        priority: 4,
        estimatedImpact: '+25% engagement rate',
        difficulty: 'medium',
        actionSteps: [
          'Post consistently 3-5 times per week',
          'Use industry-relevant hashtags',
          'Ask questions to encourage comments',
          'Share personal insights and experiences'
        ]
      });
    }

    if (analysisData.networkScore < 75) {
      recommendations.push({
        id: crypto.randomUUID(),
        category: 'Network Building',
        title: 'Expand Your Professional Network',
        description: 'Growing your network strategically will increase your reach and opportunities.',
        priority: 3,
        estimatedImpact: '+20% visibility',
        difficulty: 'easy',
        actionSteps: [
          'Connect with colleagues and industry peers',
          'Engage with content from your network',
          'Join relevant LinkedIn groups',
          'Attend virtual networking events'
        ]
      });
    }

    return recommendations;
  }

  private async getIndustryBenchmarks(industry: string) {
    // Mock industry benchmarks - in real implementation, this would query a database
    const benchmarks = {
      technology: { average: 72, topPercentile: 85 },
      marketing: { average: 68, topPercentile: 82 },
      finance: { average: 65, topPercentile: 80 },
      healthcare: { average: 63, topPercentile: 78 },
      consulting: { average: 70, topPercentile: 84 }
    };

    const industryData = benchmarks[industry as keyof typeof benchmarks] || benchmarks.technology;
    
    return {
      industryAverage: industryData.average,
      topPercentile: industryData.topPercentile,
      userPercentile: 75 // This would be calculated based on user's score vs. all users
    };
  }

  private async storeBrandAnalysis(analysis: BrandAnalysis): Promise<void> {
    try {
      const { error } = await supabase
        .from('brand_analyses')
        .insert({
          id: analysis.id,
          user_id: analysis.userId,
          overall_score: analysis.overallScore,
          visibility_score: analysis.scores.visibility,
          engagement_score: analysis.scores.engagement,
          professional_presence_score: analysis.scores.professionalPresence,
          network_quality_score: analysis.scores.networkQuality,
          analysis_data: {
            recommendations: analysis.recommendations,
            benchmarks: analysis.benchmarks
          },
          created_at: analysis.createdAt,
          updated_at: analysis.updatedAt
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error storing brand analysis:', error);
      throw error;
    }
  }

  private extractProfileText(profileData: BrandAnalysisData): string {
    let text = '';
    
    if (profileData.linkedinProfile) {
      const profile = profileData.linkedinProfile;
      text += profile.headline + ' ';
      text += profile.summary + ' ';
      text += profile.skills.join(' ') + ' ';
      text += profile.experience.map(exp => exp.title + ' ' + exp.description).join(' ');
    }

    return text;
  }

  private isProfessionalHeadline(headline: string): boolean {
    const professionalKeywords = [
      'engineer', 'manager', 'director', 'analyst', 'consultant',
      'developer', 'designer', 'specialist', 'lead', 'senior'
    ];
    
    return professionalKeywords.some(keyword => 
      headline.toLowerCase().includes(keyword)
    );
  }
}

export const brandAnalysisService = new BrandAnalysisService();