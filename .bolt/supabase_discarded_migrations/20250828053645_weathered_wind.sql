/*
  # Reputation Monitoring & Personal SEO Module

  1. New Tables
    - `reputation_scans` - Store reputation scan results and scores
    - `reputation_alerts` - Track alerts and notifications
    - `reputation_monitoring_settings` - User monitoring preferences
    - `brand_mentions` - Individual brand mentions and search results
    - `seo_recommendations` - AI-generated SEO recommendations

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to access their own data

  3. Integration
    - Connect with existing AI Mentor system
    - Link to user_profiles and mentor_insights tables
*/

-- Reputation scans table
CREATE TABLE IF NOT EXISTS reputation_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score DECIMAL(5,2),
  visibility_score DECIMAL(5,2),
  sentiment_score DECIMAL(5,2),
  freshness_score DECIMAL(5,2),
  authority_score DECIMAL(5,2),
  scan_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand mentions table
CREATE TABLE IF NOT EXISTS brand_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scan_id UUID REFERENCES reputation_scans(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  snippet TEXT,
  sentiment VARCHAR(20) DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  ranking INTEGER,
  relevance_score DECIMAL(5,2),
  is_owned BOOLEAN DEFAULT FALSE,
  keywords TEXT[],
  mention_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO recommendations table
CREATE TABLE IF NOT EXISTS seo_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scan_id UUID REFERENCES reputation_scans(id) ON DELETE CASCADE,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  category VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  impact_description TEXT,
  difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  action_steps JSONB,
  estimated_time VARCHAR(100),
  target_platforms TEXT[],
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reputation alerts table
CREATE TABLE IF NOT EXISTS reputation_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('new_mention', 'ranking_change', 'negative_content', 'visibility_drop')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  alert_data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  action_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reputation monitoring settings table
CREATE TABLE IF NOT EXISTS reputation_monitoring_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  platforms TEXT[] DEFAULT ARRAY['google', 'linkedin', 'github'],
  keywords TEXT[] DEFAULT ARRAY[],
  scan_frequency VARCHAR(20) DEFAULT 'daily' CHECK (scan_frequency IN ('daily', 'weekly')),
  alert_frequency VARCHAR(20) DEFAULT 'daily' CHECK (alert_frequency IN ('immediate', 'daily', 'weekly')),
  is_active BOOLEAN DEFAULT TRUE,
  last_scan_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reputation_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_monitoring_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reputation_scans
CREATE POLICY "Users can view their own reputation scans"
  ON reputation_scans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reputation scans"
  ON reputation_scans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reputation scans"
  ON reputation_scans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for brand_mentions
CREATE POLICY "Users can view their own brand mentions"
  ON brand_mentions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own brand mentions"
  ON brand_mentions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own brand mentions"
  ON brand_mentions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for seo_recommendations
CREATE POLICY "Users can view their own SEO recommendations"
  ON seo_recommendations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own SEO recommendations"
  ON seo_recommendations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own SEO recommendations"
  ON seo_recommendations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for reputation_alerts
CREATE POLICY "Users can view their own reputation alerts"
  ON reputation_alerts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reputation alerts"
  ON reputation_alerts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reputation alerts"
  ON reputation_alerts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for reputation_monitoring_settings
CREATE POLICY "Users can view their own monitoring settings"
  ON reputation_monitoring_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own monitoring settings"
  ON reputation_monitoring_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own monitoring settings"
  ON reputation_monitoring_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reputation_scans_user_id ON reputation_scans(user_id);
CREATE INDEX IF NOT EXISTS idx_reputation_scans_created_at ON reputation_scans(created_at);
CREATE INDEX IF NOT EXISTS idx_brand_mentions_user_id ON brand_mentions(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_mentions_platform ON brand_mentions(platform);
CREATE INDEX IF NOT EXISTS idx_brand_mentions_sentiment ON brand_mentions(sentiment);
CREATE INDEX IF NOT EXISTS idx_brand_mentions_ranking ON brand_mentions(ranking);
CREATE INDEX IF NOT EXISTS idx_seo_recommendations_user_id ON seo_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_seo_recommendations_priority ON seo_recommendations(priority);
CREATE INDEX IF NOT EXISTS idx_seo_recommendations_completed ON seo_recommendations(is_completed);
CREATE INDEX IF NOT EXISTS idx_reputation_alerts_user_id ON reputation_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_reputation_alerts_type ON reputation_alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_reputation_alerts_read ON reputation_alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_reputation_alerts_created_at ON reputation_alerts(created_at);

-- Triggers for updated_at columns
CREATE TRIGGER update_reputation_scans_updated_at
  BEFORE UPDATE ON reputation_scans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_recommendations_updated_at
  BEFORE UPDATE ON seo_recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reputation_alerts_updated_at
  BEFORE UPDATE ON reputation_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reputation_monitoring_settings_updated_at
  BEFORE UPDATE ON reputation_monitoring_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();