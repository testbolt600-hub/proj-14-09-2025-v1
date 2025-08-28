-- Fix for user_dashboard_summary view - correct column references
-- This migration fixes the error: column u.first_name does not exist

-- Drop the problematic view first
DROP VIEW IF EXISTS user_dashboard_summary;

-- Recreate the view with correct column references
CREATE OR REPLACE VIEW user_dashboard_summary AS
SELECT 
  u.id as user_id,
  u.email,
  up.first_name,
  up.last_name,
  up.industry,
  up.experience_level,
  up.primary_goal,
  -- Latest brand scores
  (SELECT overall_score FROM brand_analyses WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as current_brand_score,
  (SELECT visibility_score FROM brand_analyses WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as current_visibility_score,
  (SELECT engagement_score FROM brand_analyses WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as current_engagement_score,
  -- Goals summary
  (SELECT COUNT(*) FROM user_goals WHERE user_id = u.id AND is_completed = FALSE) as active_goals_count,
  (SELECT COUNT(*) FROM user_goals WHERE user_id = u.id AND is_completed = TRUE) as completed_goals_count,
  -- Insights summary
  (SELECT COUNT(*) FROM mentor_insights WHERE user_id = u.id AND is_read = FALSE) as unread_insights_count,
  (SELECT COUNT(*) FROM mentor_insights WHERE user_id = u.id) as total_insights_count,
  -- LinkedIn integration status
  (SELECT is_active FROM linkedin_integrations WHERE user_id = u.id) as linkedin_connected,
  (SELECT last_synced_at FROM linkedin_integrations WHERE user_id = u.id) as last_linkedin_sync,
  -- Achievement count
  (SELECT COUNT(*) FROM user_achievements WHERE user_id = u.id) as total_achievements
FROM auth.users u
LEFT JOIN user_profiles up ON up.user_id = u.id;

-- Grant access to the view
GRANT SELECT ON user_dashboard_summary TO authenticated;

-- RLS policy for the view
DROP POLICY IF EXISTS "Users can view their own dashboard summary" ON user_dashboard_summary;
CREATE POLICY "Users can view their own dashboard summary"
  ON user_dashboard_summary FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Also fix any other views that might have similar issues
-- Drop and recreate any other problematic views
DROP VIEW IF EXISTS user_profile_summary;

CREATE OR REPLACE VIEW user_profile_summary AS
SELECT 
  u.id as user_id,
  u.email,
  up.first_name,
  up.last_name,
  up.industry,
  up.experience_level,
  up.primary_goal,
  up.created_at as profile_created_at,
  up.updated_at as profile_updated_at
FROM auth.users u
LEFT JOIN user_profiles up ON up.user_id = u.id;

-- Grant access to the profile summary view
GRANT SELECT ON user_profile_summary TO authenticated;

-- RLS policy for the profile summary view
CREATE POLICY "Users can view their own profile summary"
  ON user_profile_summary FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
