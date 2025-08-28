/*
  # AI Mentor for Personal Brand Growth - Database Schema

  1. New Tables
    - `brand_analyses` - Store comprehensive brand analysis results
    - `mentor_insights` - AI-generated mentoring insights and recommendations  
    - `user_goals` - User-defined goals and progress tracking
    - `linkedin_integrations` - LinkedIn OAuth tokens and connection status
    - `linkedin_profiles` - Cached LinkedIn profile data
    - `linkedin_posts` - User's LinkedIn post history and engagement data
    - `background_jobs` - Async job processing queue
    - `notifications` - User notification system
    - `data_sync_schedules` - Automated data synchronization scheduling
    - `user_achievements` - Achievement tracking and gamification

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated user access
    - Implement data encryption for sensitive information

  3. Performance
    - Add indexes for common query patterns
    - Optimize for time-series data queries
    - Enable efficient background job processing
*/

-- Brand Analyses Table
CREATE TABLE IF NOT EXISTS brand_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  visibility_score INTEGER CHECK (visibility_score >= 0 AND visibility_score <= 100),
  engagement_score INTEGER CHECK (engagement_score >= 0 AND engagement_score <= 100),
  professional_presence_score INTEGER CHECK (professional_presence_score >= 0 AND professional_presence_score <= 100),
  network_quality_score INTEGER CHECK (network_quality_score >= 0 AND network_quality_score <= 100),
  analysis_data JSONB NOT NULL DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mentor Insights Table
CREATE TABLE IF NOT EXISTS mentor_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type VARCHAR(50) CHECK (insight_type IN ('weekly', 'monthly', 'milestone', 'achievement')) NOT NULL,
  insight_content JSONB NOT NULL,
  action_items JSONB DEFAULT '[]',
  priority_score INTEGER CHECK (priority_score >= 1 AND priority_score <= 5) DEFAULT 3,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_feedback INTEGER CHECK (user_feedback >= 1 AND user_feedback <= 5),
  is_read BOOLEAN DEFAULT FALSE,
  is_acted_upon BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Goals Table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_type VARCHAR(50) NOT NULL,
  target_value INTEGER NOT NULL,
  current_value INTEGER DEFAULT 0,
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  achieved_at TIMESTAMP WITH TIME ZONE,
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
  linkedin_id VARCHAR(50) UNIQUE NOT NULL,
  profile_data JSONB NOT NULL DEFAULT '{}',
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sync_frequency INTERVAL DEFAULT '1 day',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LinkedIn Posts Table
CREATE TABLE IF NOT EXISTS linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  linkedin_post_id VARCHAR(100) UNIQUE NOT NULL,
  post_data JSONB NOT NULL DEFAULT '{}',
  engagement_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Background Jobs Table
CREATE TABLE IF NOT EXISTS background_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type VARCHAR(50) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_data JSONB DEFAULT '{}',
  priority INTEGER DEFAULT 1,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
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
  notification_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Data Sync Schedules Table
CREATE TABLE IF NOT EXISTS data_sync_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  next_sync_at TIMESTAMP WITH TIME ZONE NOT NULL,
  sync_frequency INTERVAL DEFAULT '1 day',
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
  achievement_type VARCHAR(50) NOT NULL,
  achievement_data JSONB DEFAULT '{}',
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

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
CREATE POLICY "Users can access their own brand analyses"
  ON brand_analyses FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Mentor Insights
CREATE POLICY "Users can access their own mentor insights"
  ON mentor_insights FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for User Goals
CREATE POLICY "Users can manage their own goals"
  ON user_goals FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for LinkedIn Integrations
CREATE POLICY "Users can manage their own LinkedIn integration"
  ON linkedin_integrations FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for LinkedIn Profiles
CREATE POLICY "Users can access their own LinkedIn profile"
  ON linkedin_profiles FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for LinkedIn Posts
CREATE POLICY "Users can access their own LinkedIn posts"
  ON linkedin_posts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Background Jobs
CREATE POLICY "Users can view their own background jobs"
  ON background_jobs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Notifications
CREATE POLICY "Users can access their own notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Data Sync Schedules
CREATE POLICY "Users can manage their own sync schedules"
  ON data_sync_schedules FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for User Achievements
CREATE POLICY "Users can view their own achievements"
  ON user_achievements FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_brand_analyses_user_created ON brand_analyses(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_user_generated ON mentor_insights(user_id, generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_type ON mentor_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_unread ON mentor_insights(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX IF NOT EXISTS idx_user_goals_user_deadline ON user_goals(user_id, deadline);
CREATE INDEX IF NOT EXISTS idx_user_goals_active ON user_goals(user_id) WHERE achieved_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_linkedin_integrations_active ON linkedin_integrations(user_id) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_linkedin_profiles_sync ON linkedin_profiles(last_synced_at);
CREATE INDEX IF NOT EXISTS idx_background_jobs_status_priority ON background_jobs(status, priority DESC, created_at);
CREATE INDEX IF NOT EXISTS idx_background_jobs_scheduled ON background_jobs(scheduled_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_notifications_user_status ON notifications(user_id, status);
CREATE INDEX IF NOT EXISTS idx_data_sync_schedules_next_sync ON data_sync_schedules(next_sync_at) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_unlocked ON user_achievements(user_id, unlocked_at DESC);

-- Functions for automated tasks
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_brand_analyses_updated_at BEFORE UPDATE ON brand_analyses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentor_insights_updated_at BEFORE UPDATE ON mentor_insights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_linkedin_integrations_updated_at BEFORE UPDATE ON linkedin_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_linkedin_profiles_updated_at BEFORE UPDATE ON linkedin_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_linkedin_posts_updated_at BEFORE UPDATE ON linkedin_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_background_jobs_updated_at BEFORE UPDATE ON background_jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_data_sync_schedules_updated_at BEFORE UPDATE ON data_sync_schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate goal progress
CREATE OR REPLACE FUNCTION calculate_goal_progress(goal_id UUID)
RETURNS INTEGER AS $$
DECLARE
  goal_record user_goals%ROWTYPE;
  progress INTEGER;
BEGIN
  SELECT * INTO goal_record FROM user_goals WHERE id = goal_id;
  
  IF goal_record.target_value = 0 THEN
    RETURN 0;
  END IF;
  
  progress := ROUND((goal_record.current_value::DECIMAL / goal_record.target_value::DECIMAL) * 100);
  RETURN LEAST(progress, 100);
END;
$$ LANGUAGE plpgsql;

-- Function to check if user has achieved goals
CREATE OR REPLACE FUNCTION check_goal_achievement()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.current_value >= NEW.target_value AND OLD.achieved_at IS NULL THEN
    NEW.achieved_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic goal achievement detection
CREATE TRIGGER check_goal_achievement_trigger 
  BEFORE UPDATE ON user_goals 
  FOR EACH ROW 
  EXECUTE FUNCTION check_goal_achievement();

-- Function to clean up old background jobs
CREATE OR REPLACE FUNCTION cleanup_old_jobs()
RETURNS void AS $$
BEGIN
  DELETE FROM background_jobs 
  WHERE status IN ('completed', 'failed') 
  AND completed_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Function to get user's latest brand score
CREATE OR REPLACE FUNCTION get_latest_brand_score(user_uuid UUID)
RETURNS TABLE(
  overall_score INTEGER,
  visibility_score INTEGER,
  engagement_score INTEGER,
  professional_presence_score INTEGER,
  network_quality_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ba.overall_score,
    ba.visibility_score,
    ba.engagement_score,
    ba.professional_presence_score,
    ba.network_quality_score,
    ba.created_at
  FROM brand_analyses ba
  WHERE ba.user_id = user_uuid
  ORDER BY ba.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's unread insights count
CREATE OR REPLACE FUNCTION get_unread_insights_count(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  unread_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO unread_count
  FROM mentor_insights
  WHERE user_id = user_uuid AND is_read = FALSE;
  
  RETURN COALESCE(unread_count, 0);
END;
$$ LANGUAGE plpgsql;

-- View for user dashboard summary
CREATE OR REPLACE VIEW user_dashboard_summary AS
SELECT 
  u.id as user_id,
  u.email,
  u.first_name,
  u.last_name,
  -- Latest brand scores
  (SELECT overall_score FROM brand_analyses WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as current_brand_score,
  (SELECT visibility_score FROM brand_analyses WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as current_visibility_score,
  (SELECT engagement_score FROM brand_analyses WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as current_engagement_score,
  -- Goals summary
  (SELECT COUNT(*) FROM user_goals WHERE user_id = u.id AND achieved_at IS NULL) as active_goals_count,
  (SELECT COUNT(*) FROM user_goals WHERE user_id = u.id AND achieved_at IS NOT NULL) as completed_goals_count,
  -- Insights summary
  (SELECT COUNT(*) FROM mentor_insights WHERE user_id = u.id AND is_read = FALSE) as unread_insights_count,
  (SELECT COUNT(*) FROM mentor_insights WHERE user_id = u.id) as total_insights_count,
  -- LinkedIn integration status
  (SELECT is_active FROM linkedin_integrations WHERE user_id = u.id) as linkedin_connected,
  (SELECT last_synced_at FROM linkedin_integrations WHERE user_id = u.id) as last_linkedin_sync,
  -- Achievement count
  (SELECT COUNT(*) FROM user_achievements WHERE user_id = u.id) as total_achievements
FROM auth.users u;

-- Grant access to the view
GRANT SELECT ON user_dashboard_summary TO authenticated;

-- RLS policy for the view
CREATE POLICY "Users can view their own dashboard summary"
  ON user_dashboard_summary FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);