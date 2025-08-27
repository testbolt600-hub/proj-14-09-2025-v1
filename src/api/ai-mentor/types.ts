// Core type definitions for AI Mentor system

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  industry?: string;
  experienceLevel?: string;
  primaryGoal?: string;
  linkedinConnected: boolean;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}

export interface BrandScore {
  overall: number;
  visibility: number;
  engagement: number;
  professionalPresence: number;
  networkQuality: number;
}

export interface BrandAnalysis {
  id: string;
  userId: string;
  overallScore: number;
  scores: BrandScore;
  recommendations: Recommendation[];
  benchmarks: IndustryBenchmarks;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: number; // 1-5 scale
  estimatedImpact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  actionSteps: string[];
}

export interface IndustryBenchmarks {
  industryAverage: number;
  topPercentile: number;
  userPercentile: number;
}

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
  userFeedback?: UserFeedback;
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

export interface UserFeedback {
  rating: number; // 1-5 scale
  completed: boolean;
  comments?: string;
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
  progress: number; // Calculated field 0-100
}

export interface Achievement {
  id: string;
  userId: string;
  achievementType: string;
  achievementData: any;
  unlockedAt: string;
  createdAt: string;
}

export interface LinkedInIntegration {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
  isActive: boolean;
  lastSyncedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LinkedInProfile {
  id: string;
  userId: string;
  linkedinId: string;
  profileData: LinkedInProfileData;
  lastSyncedAt: string;
  syncFrequency: string;
  createdAt: string;
  updatedAt: string;
}

export interface LinkedInProfileData {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  industry: string;
  location: string;
  connections: number;
  profilePicture?: string;
  experience: ExperienceItem[];
  skills: string[];
  posts: PostData[];
  engagement: EngagementMetrics;
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
  location?: string;
}

export interface PostData {
  id: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  publishedAt: string;
  engagementRate: number;
}

export interface EngagementMetrics {
  averageLikes: number;
  averageComments: number;
  averageShares: number;
  engagementRate: number;
  reachGrowth: number;
  postFrequency: number;
}

export interface BackgroundJob {
  id: string;
  jobType: string;
  userId: string;
  jobData: any;
  priority: number;
  attempts: number;
  maxAttempts: number;
  scheduledAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  resultData?: any;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  notificationType: string;
  title: string;
  content: string;
  data: any;
  scheduledAt: string;
  sentAt?: string;
  readAt?: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export interface DataSyncSchedule {
  id: string;
  userId: string;
  nextSyncAt: string;
  syncFrequency: string;
  isActive: boolean;
  lastSyncAt?: string;
  syncCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MentoringContext {
  userProfile: User;
  currentBrandScore: BrandAnalysis;
  historicalData: BrandAnalysis[];
  userGoals: UserGoal[];
  engagementHistory: PostData[];
  industryBenchmarks: IndustryBenchmarks;
}

export interface AnalysisRequest {
  linkedinProfile?: LinkedInProfileData;
  resumeFile?: File;
  portfolioUrl?: string;
  manualInputs?: {
    industry: string;
    experienceLevel: string;
    careerGoals: string[];
    targetAudience: string;
  };
}

export interface AnalysisResponse {
  analysisId: string;
  jobId: string;
  estimatedCompletion: string;
  message: string;
}

export interface InsightGenerationRequest {
  userId: string;
  insightType: 'weekly' | 'monthly';
  forceRegenerate?: boolean;
}

export interface GoalCreationRequest {
  goalType: string;
  targetValue: number;
  deadline: string;
  category?: string;
}

export interface GoalUpdateRequest {
  currentValue?: number;
  targetValue?: number;
  deadline?: string;
}

export interface FeedbackRequest {
  rating?: number;
  helpful?: boolean;
  comments?: string;
}

export interface LinkedInAuthRequest {
  authCode: string;
  redirectUri: string;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  industry?: string;
  experienceLevel?: string;
  primaryGoal?: string;
}

export interface AnalyticsQuery {
  timeframe?: '7d' | '30d' | '90d';
  metrics?: string[];
}

export interface AnalyticsResponse {
  timeframe: string;
  scoreHistory: {
    date: string;
    overallScore: number;
    visibilityScore: number;
    engagementScore: number;
  }[];
  insights: {
    total: number;
    weekly: number;
    monthly: number;
    achievements: number;
  };
  goals: {
    total: number;
    completed: number;
    inProgress: number;
  };
  achievements: {
    total: number;
    thisMonth: number;
  };
}

// Error types
export interface APIError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError extends APIError {
  code: 'VALIDATION_ERROR';
  field: string;
  value: any;
}

export interface AuthenticationError extends APIError {
  code: 'AUTHENTICATION_ERROR';
}

export interface AuthorizationError extends APIError {
  code: 'AUTHORIZATION_ERROR';
}

export interface ExternalAPIError extends APIError {
  code: 'EXTERNAL_API_ERROR';
  service: string;
  statusCode: number;
}

export interface DatabaseError extends APIError {
  code: 'DATABASE_ERROR';
  query?: string;
}

// Success response wrapper
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: string;
  requestId: string;
}

// Pagination types
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Webhook types for external integrations
export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature: string;
}

export interface LinkedInWebhookEvent {
  eventType: 'profile_update' | 'post_published' | 'connection_added';
  userId: string;
  data: any;
}

// Configuration types
export interface AIModelConfig {
  provider: 'openai' | 'anthropic';
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface SystemConfig {
  aiModel: AIModelConfig;
  rateLimit: {
    windowMs: number;
    max: number;
  };
  dataRetention: {
    analysisRetentionDays: number;
    insightRetentionDays: number;
    jobRetentionDays: number;
  };
  notifications: {
    enabled: boolean;
    channels: string[];
  };
}

// Monitoring and metrics types
export interface SystemMetrics {
  activeUsers: number;
  analysesCompleted: number;
  insightsGenerated: number;
  averageResponseTime: number;
  errorRate: number;
  uptime: number;
}

export interface UserMetrics {
  userId: string;
  brandScoreImprovement: number;
  goalsCompleted: number;
  insightsActedUpon: number;
  engagementGrowth: number;
  lastActiveAt: string;
}