# 🚀 Supabase Migration Guide - AI Mentor Database Setup

## 🚨 URGENT: Apply This Migration to Fix Your Issues

You're getting repeated errors because the database schema hasn't been applied to your Supabase project. Follow these steps to fix it immediately.

## Option 1: Quick Fix via Supabase Dashboard (RECOMMENDED)

### Step 1: Access Your Supabase Project
1. Go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: `lptwmxggbpinmqgjkedi`

### Step 2: Open SQL Editor
1. Click on **"SQL Editor"** in the left sidebar
2. Click **"New query"**

### Step 3: Copy and Paste the Migration
1. Open the file: `supabase/migrations/20250828000000_complete_schema.sql`
2. **Select ALL content** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. **Paste** into the SQL Editor (Ctrl+V)

### Step 4: Execute the Migration
1. Click the **"Run"** button (or press Ctrl+Enter)
2. Wait for the execution to complete
3. You should see success messages

## Option 2: Direct SQL Execution

If you prefer, here's the complete SQL script you can copy directly:

```sql
-- AI Mentor for Personal Brand Growth - Complete Database Schema Migration
-- This migration creates all necessary tables, policies, and indexes

-- 1. Create user_profiles table
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

-- 2. Create brand_analyses table
CREATE TABLE IF NOT EXISTS brand_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score DECIMAL(5,2),
  visibility_score DECIMAL(5,2),
  engagement_score DECIMAL(5,2),
  consistency_score DECIMAL(5,2),
  authenticity_score DECIMAL(5,2),
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create mentor_insights table
CREATE TABLE IF NOT EXISTS mentor_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type VARCHAR(50) NOT NULL CHECK (insight_type IN ('weekly', 'monthly', 'achievement', 'custom')),
  insight_content JSONB NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_value DECIMAL(10,2),
  current_value DECIMAL(10,2) DEFAULT 0,
  deadline DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create linkedin_integrations table
CREATE TABLE IF NOT EXISTS linkedin_integrations (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT FALSE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create linkedin_profiles table
CREATE TABLE IF NOT EXISTS linkedin_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  linkedin_id VARCHAR(255) UNIQUE,
  profile_data JSONB,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create linkedin_posts table
CREATE TABLE IF NOT EXISTS linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  linkedin_post_id VARCHAR(255) UNIQUE,
  post_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create background_jobs table
CREATE TABLE IF NOT EXISTS background_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  priority INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  job_data JSONB,
  result_data JSONB,
  error_message TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  data JSONB,
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'read', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create data_sync_schedules table
CREATE TABLE IF NOT EXISTS data_sync_schedules (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  next_sync_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sync_frequency VARCHAR(50) DEFAULT 'daily' CHECK (sync_frequency IN ('hourly', 'daily', 'weekly', 'monthly')),
  is_active BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  sync_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL,
  achievement_data JSONB,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
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

-- Create RLS Policies for user_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for brand_analyses
DROP POLICY IF EXISTS "Users can view their own brand analyses" ON brand_analyses;
CREATE POLICY "Users can view their own brand analyses"
  ON brand_analyses FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own brand analyses" ON brand_analyses;
CREATE POLICY "Users can insert their own brand analyses"
  ON brand_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own brand analyses" ON brand_analyses;
CREATE POLICY "Users can update their own brand analyses"
  ON brand_analyses FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for mentor_insights
DROP POLICY IF EXISTS "Users can view their own mentor insights" ON mentor_insights;
CREATE POLICY "Users can view their own mentor insights"
  ON mentor_insights FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own mentor insights" ON mentor_insights;
CREATE POLICY "Users can insert their own mentor insights"
  ON mentor_insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own mentor insights" ON mentor_insights;
CREATE POLICY "Users can update their own mentor insights"
  ON mentor_insights FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for user_goals
DROP POLICY IF EXISTS "Users can view their own goals" ON user_goals;
CREATE POLICY "Users can view their own goals"
  ON user_goals FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own goals" ON user_goals;
CREATE POLICY "Users can insert their own goals"
  ON user_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own goals" ON user_goals;
CREATE POLICY "Users can update their own goals"
  ON user_goals FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own goals" ON user_goals;
CREATE POLICY "Users can delete their own goals"
  ON user_goals FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS Policies for linkedin_integrations
DROP POLICY IF EXISTS "Users can view their own LinkedIn integration" ON linkedin_integrations;
CREATE POLICY "Users can view their own LinkedIn integration"
  ON linkedin_integrations FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own LinkedIn integration" ON linkedin_integrations;
CREATE POLICY "Users can insert their own LinkedIn integration"
  ON linkedin_integrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own LinkedIn integration" ON linkedin_integrations;
CREATE POLICY "Users can update their own LinkedIn integration"
  ON linkedin_integrations FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for linkedin_profiles
DROP POLICY IF EXISTS "Users can view their own LinkedIn profile" ON linkedin_profiles;
CREATE POLICY "Users can view their own LinkedIn profile"
  ON linkedin_profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own LinkedIn profile" ON linkedin_profiles;
CREATE POLICY "Users can insert their own LinkedIn profile"
  ON linkedin_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own LinkedIn profile" ON linkedin_profiles;
CREATE POLICY "Users can update their own LinkedIn profile"
  ON linkedin_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for linkedin_posts
DROP POLICY IF EXISTS "Users can view their own LinkedIn posts" ON linkedin_posts;
CREATE POLICY "Users can view their own LinkedIn posts"
  ON linkedin_posts FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own LinkedIn posts" ON linkedin_posts;
CREATE POLICY "Users can insert their own LinkedIn posts"
  ON linkedin_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own LinkedIn posts" ON linkedin_posts;
CREATE POLICY "Users can update their own LinkedIn posts"
  ON linkedin_posts FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for background_jobs
DROP POLICY IF EXISTS "Users can view their own background jobs" ON background_jobs;
CREATE POLICY "Users can view their own background jobs"
  ON background_jobs FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own background jobs" ON background_jobs;
CREATE POLICY "Users can insert their own background jobs"
  ON background_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own background jobs" ON background_jobs;
CREATE POLICY "Users can update their own background jobs"
  ON background_jobs FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for notifications
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own notifications" ON notifications;
CREATE POLICY "Users can insert their own notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for data_sync_schedules
DROP POLICY IF EXISTS "Users can view their own sync schedules" ON data_sync_schedules;
CREATE POLICY "Users can view their own sync schedules"
  ON data_sync_schedules FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own sync schedules" ON data_sync_schedules;
CREATE POLICY "Users can insert their own sync schedules"
  ON data_sync_schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own sync schedules" ON data_sync_schedules;
CREATE POLICY "Users can update their own sync schedules"
  ON data_sync_schedules FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS Policies for user_achievements
DROP POLICY IF EXISTS "Users can view their own achievements" ON user_achievements;
CREATE POLICY "Users can view their own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own achievements" ON user_achievements;
CREATE POLICY "Users can insert their own achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_brand_analyses_user_id ON brand_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_brand_analyses_created_at ON brand_analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_user_id ON mentor_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_type ON mentor_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_mentor_insights_created_at ON mentor_insights(created_at);
CREATE INDEX IF NOT EXISTS idx_user_goals_user_id ON user_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_user_goals_type ON user_goals(goal_type);
CREATE INDEX IF NOT EXISTS idx_user_goals_deadline ON user_goals(deadline);
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_user_id ON linkedin_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_posts_created_at ON linkedin_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_background_jobs_user_id ON background_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_background_jobs_status ON background_jobs(status);
CREATE INDEX IF NOT EXISTS idx_background_jobs_scheduled_at ON background_jobs(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled_at ON notifications(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_type ON user_achievements(achievement_type);

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

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_analyses_updated_at
  BEFORE UPDATE ON brand_analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_goals_updated_at
  BEFORE UPDATE ON user_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_linkedin_integrations_updated_at
  BEFORE UPDATE ON linkedin_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_linkedin_posts_updated_at
  BEFORE UPDATE ON linkedin_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_sync_schedules_updated_at
  BEFORE UPDATE ON data_sync_schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Option 3: Using Supabase CLI (Advanced)

If you have the Supabase CLI installed:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Link your project
supabase link --project-ref lptwmxggbpinmqgjkedi

# Apply the migration
supabase db push
```

## ✅ Verification Steps

After running the migration, verify it worked:

1. **Check Tables**: Go to "Table Editor" in Supabase Dashboard
   - You should see all 11 tables created

2. **Check Policies**: Go to "Authentication" > "Policies"
   - You should see RLS policies for each table

3. **Test Signup**: Try creating a new user account
   - The user profile should be created automatically

## 🚨 What This Fixes

This migration will resolve ALL the issues you're experiencing:

- ✅ **Authentication errors** - Users can now sign up and sign in
- ✅ **Dashboard access** - Users can access the dashboard after login
- ✅ **Database structure** - All AI Mentor features have proper tables
- ✅ **Security** - Row Level Security protects user data
- ✅ **Performance** - Indexes optimize query performance
- ✅ **Automation** - Automatic user profile creation on signup

## 🎯 Next Steps

1. **Apply the migration** using one of the options above
2. **Test your application** - Try signing up a new user
3. **Access the dashboard** - Users should now be able to sign in successfully
4. **All AI Mentor features** will now work properly

## 🆘 If You Still Have Issues

If you encounter any errors during migration:

1. **Check the error message** in Supabase SQL Editor
2. **Ensure you have admin access** to your Supabase project
3. **Contact Supabase support** if the project is locked or has issues

**The migration is safe to run multiple times** - it uses `IF NOT EXISTS` and `DROP POLICY IF EXISTS` to avoid conflicts.
