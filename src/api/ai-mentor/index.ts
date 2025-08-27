import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { 
  authenticateUser,
  analyzeBrand,
  getBrandAnalysis,
  getBrandAnalysisHistory,
  getMentorInsights,
  updateInsightFeedback,
  markInsightAsRead,
  createUserGoal,
  getUserGoals,
  updateGoalProgress,
  connectLinkedIn,
  disconnectLinkedIn,
  getUserProfile,
  updateUserProfile,
  getUserAnalytics,
  healthCheck,
  errorHandler
} from './api-routes';
import { cronScheduler } from './background-jobs';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.linkedin.com"]
    }
  }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check (no auth required)
app.get('/health', healthCheck);

// Authentication middleware for protected routes
app.use('/api', authenticateUser);

// Brand Analysis Routes
app.post('/api/brand/analyze', analyzeBrand);
app.get('/api/brand/analysis/:analysisId', getBrandAnalysis);
app.get('/api/brand/analysis/:userId/history', getBrandAnalysisHistory);

// Mentor Insights Routes
app.get('/api/mentor/insights/:userId', getMentorInsights);
app.post('/api/mentor/insights/:insightId/feedback', updateInsightFeedback);
app.put('/api/mentor/insights/:insightId/read', markInsightAsRead);

// User Goals Routes
app.post('/api/users/:userId/goals', createUserGoal);
app.get('/api/users/:userId/goals', getUserGoals);
app.put('/api/users/goals/:goalId/progress', updateGoalProgress);

// LinkedIn Integration Routes
app.post('/api/auth/linkedin/connect', connectLinkedIn);
app.delete('/api/auth/linkedin/disconnect', disconnectLinkedIn);

// User Profile Routes
app.get('/api/users/:userId/profile', getUserProfile);
app.put('/api/users/:userId/profile', updateUserProfile);

// Analytics Routes
app.get('/api/users/:userId/analytics', getUserAnalytics);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`AI Mentor Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Start background job processing
  if (process.env.NODE_ENV === 'production') {
    cronScheduler.start();
    console.log('Background job scheduler started');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  cronScheduler.stop();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  cronScheduler.stop();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;