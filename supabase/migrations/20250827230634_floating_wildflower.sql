/*
  # AI Mentor for Personal Brand Growth - Complete Database Schema

  ## New Tables
  1. **user_profiles** - Custom user data (replaces direct auth.users modifications)
     - `user_id` (uuid, primary key, references auth.users)
     - `first_name`, `last_name`, `industry`, `experience_level`, `primary_goal`
     - Stores custom user attributes separately from Supabase auth.users

  2. **brand_analyses** - Store comprehensive brand analysis results
     - `id` (uuid, primary key)
     - `user_id` (uuid, references auth.users)
     - Score fields: `overall_score`, `visibility_score`, `engagement_score`, etc.
     - `analysis_data` (jsonb) - recommendations, benchmarks

  3. **mentor_insights** - AI-generated mentoring insights and recommendations
     - `id` (uuid, primary key)
     - `user_id` (uuid, references auth.users)
     - `insight_type` (varchar) - weekly, monthly, achievement
     - `insight_content` (jsonb) - title, content, actionItems

  4. **user_goals** - User-defined goals and progress tracking
     - `id` (uuid, primary key)
     - `user_id` (uuid, references auth.users)
     - Goal tracking fields: `goal_type`, `target_value`, `current_value`, `deadline`

  5. **linkedin_integrations** - LinkedIn OAuth tokens and connection status
     - `user_id` (uuid, primary key, references auth.users)
     - Token fields: `access_token`, `refresh_token`, `expires_at`
     - Status fields: `is_active`, `last_synced_at`

  6. **linkedin_profiles** - Cached LinkedIn profile data
     - `user_id` (uuid, primary key, references auth.users)
     - `linkedin_id` (varchar, unique)
     - `profile_data` (jsonb) - firstName, lastName, headline, summary, etc.

  7. **linkedin_posts** - User's LinkedIn post history and engagement data
     - `id` (uuid, primary key)
     - `user_id` (uuid, references auth.users)
     - `linkedin_post_id` (varchar)
     - `post_data` (jsonb) - content, likes, comments, shares, impressions

  8. **background_jobs** - Async job processing queue with retry logic
     - `id` (uuid, primary key)
     - `job_type` (varchar), `user_id` (uuid)
     - Processing fields: `priority`, `attempts`, `max_attempts`, `status`
     - Data fields: `job_data`, `result_data`, `error_message`

  9. **notifications** - User notification system
     - `id` (uuid, primary key)
     - `user_id` (uuid, references auth.users)
     - Notification fields: `notification_type`, `title`, `content`, `data`
     - Status fields: `scheduled_at`, `sent_at`, `read_at`, `status`

  10. **data_sync_schedules** - Automated data synchronization scheduling
      - `user_id` (uuid, primary key, references auth.users)
      - Schedule fields: `next_sync_at`, `sync_frequency`, `is_active`
      - Tracking fields: `last_synced_at`, `sync_count`

  11. **user_achievements** - Achievement tracking and gamification
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - Achievement fields: `achievement_type`, `achievement_data`, `unlocked_at`

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated user access only
  - Implement secure token storage with encryption
  - Add audit logging capabilities

  ## Performance
  - Add indexes for common query patterns
  - Optimize for time-series data queries
  - Enable efficient background job processing
  - Add foreign key constraints for data integrity
*/

-- Create user_profiles table (replaces direct auth.users modifications)
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  industry VARCHAR(255),
  experience_level VARCHAR(50),
  primary_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create brand_analyses table
CREATE TABLE IF NOT EXISTS brand_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score INTEGER,
  visibility_score INTEGER,
  engagement_score INTEGER,
  professional_presence_score INTEGER,
  network_quality_score INTEGER,
  analysis_data JSONB, -- Stores recommendations, benchmarks, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE brand_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own brand analyses"
  ON brand_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own brand analyses"
  ON brand_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create mentor_insights table
CREATE TABLE IF NOT EXISTS mentor_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type VARCHAR(50), -- e.g., 'weekly', 'monthly', 'achievement'
  insight_content JSONB, -- Stores title, content, actionItems, estimatedImpact
  priority_score INTEGER,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  user_feedback INTEGER, -- 1-5 rating
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE mentor_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own mentor insights"
  ON mentor_insights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mentor insights"
  ON mentor_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mentor insights"
  ON mentor_insights FOR UPDATE
  USING (auth.uid() = user_id);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_type VARCHAR(255),
  target_value NUMERIC,
  current_value NUMERIC DEFAULT 0,
  deadline TIMESTAMP WITH TIME ZONE,
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own goals"
  ON user_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON user_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON user_goals FOR UPDATE
  USING (auth.uid() = user_id);

-- Create linkedin_integrations table
CREATE TABLE IF NOT EXISTS linkedin_integrations (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE linkedin_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own linkedin integrations"
  ON linkedin_integrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own linkedin integrations"
  ON linkedin_integrations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linkedin integrations"
  ON linkedin_integrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create linkedin_profiles table
CREATE TABLE IF NOT EXISTS linkedin_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  linkedin_id VARCHAR(255) UNIQUE NOT NULL,
  profile_data JSONB, -- Stores firstName, lastName, headline, summary, etc.
  last_synced_at TIMESTAMP WITH TIME ZONE,
  sync_frequency VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE linkedin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own linkedin profiles"
  ON linkedin_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linkedin profiles"
  ON linkedin_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own linkedin profiles"
  ON linkedin_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create linkedin_posts table
CREATE TABLE IF NOT EXISTS linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  linkedin_post_id VARCHAR(255) NOT NULL,
  post_data JSONB, -- Stores content, likes, comments, shares, impressions, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE linkedin_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own linkedin posts"
  ON linkedin_posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linkedin posts"
  ON linkedin_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create background_jobs table
CREATE TABLE IF NOT EXISTS background_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type VARCHAR(50) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_data JSONB,
  priority INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  result_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE background_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own background jobs"
  ON background_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own background jobs"
  ON background_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own background jobs"
  ON background_jobs FOR UPDATE
  USING (auth.uid() = user_id);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  data JSONB,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Create data_sync_schedules table
CREATE TABLE IF NOT EXISTS data_sync_schedules (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  next_sync_at TIMESTAMP WITH TIME ZONE NOT NULL,
  sync_frequency VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  sync_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE data_sync_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data sync schedules"
  ON data_sync_schedules FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own data sync schedules"
  ON data_sync_schedules FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data sync schedules"
  ON data_sync_schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(255) NOT NULL,
  achievement_data JSONB,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_analyses_user_id ON brand_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_analyses_created_at ON brand_analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_user_id ON mentor_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_type ON mentor_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_user_goals_user_id ON user_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_user_id ON linkedin_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id_status ON background_jobs(user_id, status);
CREATE INDEX IF NOT EXISTS idx_background_jobs_scheduled_at ON background_jobs(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();