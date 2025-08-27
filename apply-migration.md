# How to Apply the Database Migration

## Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `lptwmxggbpinmqgjkedi`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and Paste the Migration**
   - Open the file: `supabase/migrations/20250828000000_complete_schema.sql`
   - Copy all the content
   - Paste it into the SQL Editor

4. **Run the Migration**
   - Click "Run" to execute the migration
   - This will create all the necessary tables, policies, and functions

## Option 2: Using Supabase CLI (If Available)

If you have the Supabase CLI installed:

```bash
# Link your project (if not already linked)
supabase link --project-ref lptwmxggbpinmqgjkedi

# Apply the migration
supabase db push
```

## What This Migration Creates

### Tables Created:
1. **user_profiles** - User profile information
2. **brand_analyses** - Brand analysis results and scores
3. **mentor_insights** - AI-generated insights and recommendations
4. **user_goals** - User-defined goals and progress tracking
5. **linkedin_integrations** - LinkedIn OAuth tokens and connection status
6. **linkedin_profiles** - Cached LinkedIn profile data
7. **linkedin_posts** - LinkedIn post history and engagement data
8. **background_jobs** - Async job processing queue
9. **notifications** - User notification system
10. **data_sync_schedules** - Automated data synchronization
11. **user_achievements** - Achievement tracking and gamification

### Security Features:
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Policies ensure users can only access their own data
- ✅ Secure token storage for LinkedIn integration

### Performance Optimizations:
- ✅ Indexes on commonly queried columns
- ✅ Optimized for time-series data queries
- ✅ Foreign key constraints for data integrity

### Automation:
- ✅ Automatic user profile creation on signup
- ✅ Automatic timestamp updates
- ✅ Background job processing support

## Verification

After running the migration, you can verify it worked by:

1. **Check Tables**: Go to "Table Editor" in Supabase Dashboard
2. **Check Policies**: Go to "Authentication" > "Policies"
3. **Test Signup**: Try creating a new user account

## Next Steps

Once the migration is applied:
1. Your application should be able to handle user authentication
2. Users can sign up and access the dashboard
3. All AI Mentor features will have the necessary database structure
4. LinkedIn integration will work with proper token storage

## Troubleshooting

If you encounter any errors:
1. Check the Supabase logs in the dashboard
2. Ensure you have the correct permissions
3. Make sure your Supabase project is active
4. Contact support if issues persist
