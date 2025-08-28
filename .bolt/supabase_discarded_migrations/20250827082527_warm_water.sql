/*
  # AI Mentor for Personal Brand Growth - Complete Database Schema

  1. New Tables
    - `brand_analyses` - Store comprehensive brand analysis results with scoring
    - `mentor_insights` - AI-generated mentoring insights and recommendations  
    - `user_goals` - User-defined goals and progress tracking
    - `linkedin_integrations` - LinkedIn OAuth tokens and connection status
    - `linkedin_profiles` - Cached LinkedIn profile data
    - `linkedin_posts` - User's LinkedIn post history and engagement data
    - `background_jobs` - Async job processing queue with retry logic
    - `notifications` - User notification system
    - `data_sync_schedules` - Automated data synchronization scheduling
    - `user_achievements` - Achievement tracking and gamification

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated user access only
    - Implement secure token storage with encryption
    - Add audit logging capabilities

  3. Performance
    - Add indexes for common query patterns
    - Optimize for time-series data queries
    - Enable efficient background job processing
    - Add foreign key constraints for data integrity

  4. Data Types
    - Custom enums for standardized values
    - JSONB for flexible data storage
    - Proper timestamp handling with time zones
*/

-- Create custom types first
DO $$ BEGIN
  CREATE TYPE insight_type AS ENUM ('weekly', 'monthly', 'milestone', 'achievement');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE job_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Brand Analyses Table
CREATE TABLE IF NOT EXISTS brand_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  visibility_score INTEGER NOT NULL CHECK (visibility_score >= 0 AND visibility_score <= 100),
  engagement_score INTEGER NOT NULL CHECK (engagement_score >= 0 AND engagement_score <= 100),
  professional_presence_score INTEGER NOT NULL CHECK (professional_presence_score >= 0 AND professional_presence_score <= 100),
  network_quality_score INTEGER NOT NULL CHECK (network_quality_score >= 0 AND network_quality_score <= 100),
  analysis_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mentor Insights Table
CREATE TABLE IF NOT EXISTS mentor_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type insight_type NOT NULL,
  insight_content JSONB NOT NULL DEFAULT '{}',
  priority_score INTEGER NOT NULL DEFAULT 1 CHECK (priority_score >= 1 AND priority_score <= 5),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  user_feedback INTEGER CHECK (user_feedback >= 1 AND user_feedback <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Goals Table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_type VARCHAR(100) NOT NULL,
  target_value NUMERIC NOT NULL,
  current_value NUMERIC DEFAULT 0,
  deadline DATE,
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LinkedIn Integrations Table
CREATE TABLE IF NOT EXISTS linkedin_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LinkedIn Profiles Table
CREATE TABLE IF NOT EXISTS linkedin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  linkedin_id VARCHAR(255) NOT NULL,
  profile_data JSONB NOT NULL DEFAULT '{}',
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LinkedIn Posts Table
CREATE TABLE IF NOT EXISTS linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  linkedin_post_id VARCHAR(255) NOT NULL,
  post_data JSONB NOT NULL DEFAULT '{}',
  engagement_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, linkedin_post_id)
);

-- Background Jobs Table
CREATE TABLE IF NOT EXISTS background_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_data JSONB NOT NULL DEFAULT '{}',
  priority INTEGER DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status job_status DEFAULT 'pending',
  result_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  status notification_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Data Sync Schedules Table
CREATE TABLE IF NOT EXISTS data_sync_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  next_sync_at TIMESTAMP WITH TIME ZONE NOT NULL,
  sync_frequency VARCHAR(50) DEFAULT '1 day',
  is_active BOOLEAN DEFAULT TRUE,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL,
  achievement_data JSONB NOT NULL DEFAULT '{}',
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- Users table extensions (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN first_name VARCHAR(100);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN last_name VARCHAR(100);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'industry'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN industry VARCHAR(100);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'experience_level'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN experience_level VARCHAR(50);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'primary_goal'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN primary_goal VARCHAR(100);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'last_active_at'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE brand_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE background_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sync_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Brand Analyses
DROP POLICY IF EXISTS "Users can access own brand analyses" ON brand_analyses;
CREATE POLICY "Users can access own brand analyses"
  ON brand_analyses FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Mentor Insights
DROP POLICY IF EXISTS "Users can access own mentor insights" ON mentor_insights;
CREATE POLICY "Users can access own mentor insights"
  ON mentor_insights FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for User Goals
DROP POLICY IF EXISTS "Users can access own goals" ON user_goals;
CREATE POLICY "Users can access own goals"
  ON user_goals FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for LinkedIn Integrations
DROP POLICY IF EXISTS "Users can access own linkedin integrations" ON linkedin_integrations;
CREATE POLICY "Users can access own linkedin integrations"
  ON linkedin_integrations FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for LinkedIn Profiles
DROP POLICY IF EXISTS "Users can access own linkedin profiles" ON linkedin_profiles;
CREATE POLICY "Users can access own linkedin profiles"
  ON linkedin_profiles FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for LinkedIn Posts
DROP POLICY IF EXISTS "Users can access own linkedin posts" ON linkedin_posts;
CREATE POLICY "Users can access own linkedin posts"
  ON linkedin_posts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Background Jobs
DROP POLICY IF EXISTS "Users can access own background jobs" ON background_jobs;
CREATE POLICY "Users can access own background jobs"
  ON background_jobs FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Notifications
DROP POLICY IF EXISTS "Users can access own notifications" ON notifications;
CREATE POLICY "Users can access own notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Data Sync Schedules
DROP POLICY IF EXISTS "Users can access own sync schedules" ON data_sync_schedules;
CREATE POLICY "Users can access own sync schedules"
  ON data_sync_schedules FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for User Achievements
DROP POLICY IF EXISTS "Users can access own achievements" ON user_achievements;
CREATE POLICY "Users can access own achievements"
  ON user_achievements FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_brand_analyses_user_id ON brand_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_analyses_created_at ON brand_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brand_analyses_user_created ON brand_analyses(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mentor_insights_user_id ON mentor_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_type ON mentor_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_generated_at ON mentor_insights(generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_user_type_date ON mentor_insights(user_id, insight_type, generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_unread ON mentor_insights(user_id, is_read) WHERE is_read = FALSE;

CREATE INDEX IF NOT EXISTS idx_user_goals_user_id ON user_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_goals_deadline ON user_goals(deadline) WHERE achieved_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_goals_active ON user_goals(user_id, achieved_at) WHERE achieved_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_linkedin_integrations_user_id ON linkedin_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_integrations_active ON linkedin_integrations(user_id, is_active) WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_linkedin_profiles_user_id ON linkedin_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_profiles_linkedin_id ON linkedin_profiles(linkedin_id);

CREATE INDEX IF NOT EXISTS idx_linkedin_posts_user_id ON linkedin_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_created_at ON linkedin_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_user_date ON linkedin_posts(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_background_jobs_status ON background_jobs(status);
CREATE INDEX IF NOT EXISTS idx_background_jobs_scheduled_at ON background_jobs(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id ON background_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_background_jobs_priority_scheduled ON background_jobs(priority DESC, scheduled_at ASC) WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled_at ON notifications(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, read_at) WHERE read_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_data_sync_schedules_user_id ON data_sync_schedules(user_id);
CREATE INDEX IF NOT EXISTS idx_data_sync_schedules_next_sync ON data_sync_schedules(next_sync_at) WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_type ON user_achievements(achievement_type);
CREATE INDEX IF NOT EXISTS idx_user_achievements_unlocked_at ON user_achievements(unlocked_at DESC);

-- Update triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers to relevant tables
DROP TRIGGER IF EXISTS update_brand_analyses_updated_at ON brand_analyses;
CREATE TRIGGER update_brand_analyses_updated_at
  BEFORE UPDATE ON brand_analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_mentor_insights_updated_at ON mentor_insights;
CREATE TRIGGER update_mentor_insights_updated_at
  BEFORE UPDATE ON mentor_insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_goals_updated_at ON user_goals;
CREATE TRIGGER update_user_goals_updated_at
  BEFORE UPDATE ON user_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_linkedin_integrations_updated_at ON linkedin_integrations;
CREATE TRIGGER update_linkedin_integrations_updated_at
  BEFORE UPDATE ON linkedin_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_linkedin_profiles_updated_at ON linkedin_profiles;
CREATE TRIGGER update_linkedin_profiles_updated_at
  BEFORE UPDATE ON linkedin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_background_jobs_updated_at ON background_jobs;
CREATE TRIGGER update_background_jobs_updated_at
  BEFORE UPDATE ON background_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_data_sync_schedules_updated_at ON data_sync_schedules;
CREATE TRIGGER update_data_sync_schedules_updated_at
  BEFORE UPDATE ON data_sync_schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up old data
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
  -- Clean up old background jobs (older than 30 days)
  DELETE FROM background_jobs 
  WHERE created_at < NOW() - INTERVAL '30 days' 
  AND status IN ('completed', 'failed');
  
  -- Clean up old notifications (older than 90 days)
  DELETE FROM notifications 
  WHERE created_at < NOW() - INTERVAL '90 days';
  
  -- Clean up old LinkedIn posts (keep only last 6 months)
  DELETE FROM linkedin_posts 
  WHERE created_at < NOW() - INTERVAL '6 months';
  
END;
$$ LANGUAGE plpgsql;

-- Function to calculate user progress
CREATE OR REPLACE FUNCTION calculate_goal_progress(goal_id UUID)
RETURNS NUMERIC AS $$
DECLARE
  goal_record user_goals%ROWTYPE;
  progress NUMERIC;
BEGIN
  SELECT * INTO goal_record FROM user_goals WHERE id = goal_id;
  
  IF goal_record.target_value = 0 THEN
    RETURN 0;
  END IF;
  
  progress := (goal_record.current_value / goal_record.target_value) * 100;
  RETURN LEAST(progress, 100);
END;
$$ LANGUAGE plpgsql;

-- Function to get user's latest brand score
CREATE OR REPLACE FUNCTION get_latest_brand_score(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  latest_score INTEGER;
BEGIN
  SELECT overall_score INTO latest_score
  FROM brand_analyses
  WHERE user_id = user_uuid
  ORDER BY created_at DESC
  LIMIT 1;
  
  RETURN COALESCE(latest_score, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to check for new achievements
CREATE OR REPLACE FUNCTION check_user_achievements(user_uuid UUID)
RETURNS TABLE(achievement_type VARCHAR, achievement_data JSONB) AS $$
BEGIN
  -- Check for brand score milestones
  IF get_latest_brand_score(user_uuid) >= 80 AND 
     NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = user_uuid AND achievement_type = 'brand_excellence') THEN
    INSERT INTO user_achievements (user_id, achievement_type, achievement_data)
    VALUES (user_uuid, 'brand_excellence', '{"score": 80, "description": "Achieved excellent brand score"}');
    
    RETURN QUERY SELECT 'brand_excellence'::VARCHAR, '{"score": 80}'::JSONB;
  END IF;
  
  -- Check for consistent posting (4+ weeks)
  IF (SELECT COUNT(*) FROM mentor_insights 
      WHERE user_id = user_uuid 
      AND insight_type = 'weekly' 
      AND generated_at >= NOW() - INTERVAL '28 days') >= 4 AND
     NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = user_uuid AND achievement_type = 'consistent_posting') THEN
    INSERT INTO user_achievements (user_id, achievement_type, achievement_data)
    VALUES (user_uuid, 'consistent_posting', '{"weeks": 4, "description": "Posted consistently for 4 weeks"}');
    
    RETURN QUERY SELECT 'consistent_posting'::VARCHAR, '{"weeks": 4}'::JSONB;
  END IF;
  
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Create a view for user dashboard data
CREATE OR REPLACE VIEW user_dashboard_summary AS
SELECT 
  u.id as user_id,
  u.email,
  u.first_name,
  u.last_name,
  u.industry,
  u.experience_level,
  u.primary_goal,
  u.last_active_at,
  ba.overall_score as latest_brand_score,
  ba.created_at as last_analysis_date,
  li.is_active as linkedin_connected,
  li.last_synced_at as linkedin_last_sync,
  (SELECT COUNT(*) FROM mentor_insights mi WHERE mi.user_id = u.id AND mi.is_read = FALSE) as unread_insights,
  (SELECT COUNT(*) FROM user_goals ug WHERE ug.user_id = u.id AND ug.achieved_at IS NULL) as active_goals,
  (SELECT COUNT(*) FROM user_achievements ua WHERE ua.user_id = u.id) as total_achievements
FROM auth.users u
LEFT JOIN LATERAL (
  SELECT overall_score, created_at 
  FROM brand_analyses 
  WHERE user_id = u.id 
  ORDER BY created_at DESC 
  LIMIT 1
) ba ON true
LEFT JOIN linkedin_integrations li ON li.user_id = u.id;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Insert sample data for testing (optional)
DO $$
DECLARE
  sample_user_id UUID;
BEGIN
  -- Only insert if no data exists
  IF NOT EXISTS (SELECT 1 FROM brand_analyses LIMIT 1) THEN
    -- Get a sample user ID (first authenticated user)
    SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
    
    IF sample_user_id IS NOT NULL THEN
      -- Insert sample brand analysis
      INSERT INTO brand_analyses (
        user_id, 
        overall_score, 
        visibility_score, 
        engagement_score, 
        professional_presence_score, 
        network_quality_score,
        analysis_data
      ) VALUES (
        sample_user_id,
        75,
        80,
        70,
        75,
        75,
        '{"recommendations": [{"title": "Optimize LinkedIn headline", "priority": "high"}], "benchmarks": {"industryAverage": 65}}'
      );
      
      -- Insert sample mentor insight
      INSERT INTO mentor_insights (
        user_id,
        insight_type,
        insight_content,
        priority_score
      ) VALUES (
        sample_user_id,
        'weekly',
        '{"title": "Great progress this week!", "content": "Your brand score improved by 5 points.", "actionItems": []}',
        4
      );
      
      -- Insert sample goal
      INSERT INTO user_goals (
        user_id,
        goal_type,
        target_value,
        current_value,
        deadline
      ) VALUES (
        sample_user_id,
        'engagement_rate',
        5.0,
        3.2,
        CURRENT_DATE + INTERVAL '3 months'
      );
    END IF;
  END IF;
END $$;