# Product Requirements Document: Smart Resume Studio

**Version:** 1.0  
**Date:** August 20, 2025  
**Product:** Career & Personal Brand Platform  
**Feature:** Smart Resume Studio (Career Hub)  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technical Stack Integration](#technical-stack-integration)
3. [Feature Architecture](#feature-architecture)
4. [Database Schema](#database-schema)
5. [Component Structure](#component-structure)
6. [API Specifications](#api-specifications)
7. [User Interface Requirements](#user-interface-requirements)
8. [AI Integration Requirements](#ai-integration-requirements)
9. [User Stories & Acceptance Criteria](#user-stories--acceptance-criteria)
10. [Implementation Guidelines](#implementation-guidelines)
11. [Security & Performance](#security--performance)
12. [Testing Requirements](#testing-requirements)

---

## Executive Summary

The Smart Resume Studio is a core feature within the Career Hub that serves as an intelligent resume creation and optimization center. It implements a two-resume strategy: Master Resume (foundational) and Campaign Resumes (job-specific). The feature integrates seamlessly with the Job Copilot for application workflows.

**Key Objectives:**
- Eliminate ATS black holes through intelligent optimization
- Enable strategic resume tailoring at scale
- Provide AI-powered content enhancement
- Integrate with existing Job Copilot workflow

---

## Technical Stack Integration

### Frontend Implementation
```typescript
// React 18.3.1 with TypeScript 5.5.3
// File Structure: src/components/career-hub/smart-resume-studio/

interface TechStackRequirements {
  framework: "React 18.3.1";
  language: "TypeScript 5.5.3";
  routing: "React Router DOM 7.8.0";
  styling: "Tailwind CSS 3.4.1";
  icons: "Lucide React 0.344.0";
  backend: "Supabase 2.55.0";
  buildTool: "Vite 5.4.2";
}
```

### Routing Structure
```typescript
// Add to existing router configuration
{
  path: "/career-hub/smart-resume-studio",
  element: <SmartResumeStudio />,
  children: [
    {
      path: "",
      element: <ResumeLibrary />
    },
    {
      path: "editor/:resumeId",
      element: <ResumeEditor />
    },
    {
      path: "create-new",
      element: <CreateNewResume />
    }
  ]
}
```

---

## Feature Architecture

### Core Components Hierarchy
```
SmartResumeStudio/
├── ResumeLibrary/
│   ├── MasterResumeCard
│   ├── CampaignResumeList
│   └── ActionButtons
├── ResumeEditor/
│   ├── DocumentEditor
│   ├── AICopilotSidebar
│   └── ToolbarActions
├── AITools/
│   ├── ATSOptimizer
│   ├── KeywordMatcher
│   ├── ImpactEnhancer
│   └── GapJustifier
└── Shared/
    ├── ResumePreview
    ├── ExportOptions
    └── VersionHistory
```

### State Management
```typescript
interface ResumeStudioState {
  resumes: Resume[];
  activeResume: Resume | null;
  isLoading: boolean;
  aiProcessing: boolean;
  atsScore: number;
  optimizationSuggestions: Suggestion[];
}

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: ResumeContent;
  atsScore: number;
  targetJobId?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
```

---

## Database Schema

### Supabase Table Structures

```sql
-- Main Resumes Table
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type resume_type NOT NULL DEFAULT 'campaign',
  content JSONB NOT NULL,
  ats_score INTEGER DEFAULT 0,
  target_job_id UUID REFERENCES jobs(id),
  is_master BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom Types
CREATE TYPE resume_type AS ENUM ('master', 'campaign');

-- ATS Optimization Results Table
CREATE TABLE ats_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  issues JSONB NOT NULL,
  suggestions JSONB NOT NULL,
  optimized_content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume Versions for History
CREATE TABLE resume_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  version_number INTEGER NOT NULL,
  change_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Processing Jobs
CREATE TABLE ai_processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL, -- 'ats_optimization', 'tailoring', 'impact_enhancement'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  input_data JSONB,
  result_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for Performance
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_type ON resumes(type);
CREATE INDEX idx_resumes_is_master ON resumes(is_master) WHERE is_master = TRUE;
CREATE INDEX idx_ats_optimizations_resume_id ON ats_optimizations(resume_id);
```

---

## Component Structure

### Main Studio Component
```typescript
// src/components/career-hub/smart-resume-studio/SmartResumeStudio.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useResumes } from '../../../hooks/useResumes';
import ResumeLibrary from './components/ResumeLibrary';
import ResumeEditor from './components/ResumeEditor';

interface SmartResumeStudioProps {}

export const SmartResumeStudio: React.FC<SmartResumeStudioProps> = () => {
  const { user } = useAuth();
  const { resumes, loading, fetchResumes } = useResumes();
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Resume Library */}
      <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <ResumeLibrary
          resumes={resumes}
          activeResumeId={activeResumeId}
          onSelectResume={setActiveResumeId}
          loading={loading}
        />
      </div>

      {/* Right Panel - Editor & AI Copilot */}
      <div className="flex-1 flex">
        <ResumeEditor
          resumeId={activeResumeId}
          onSave={fetchResumes}
        />
      </div>
    </div>
  );
};
```

### Resume Library Component
```typescript
// src/components/career-hub/smart-resume-studio/components/ResumeLibrary.tsx
import React from 'react';
import { Star, Plus, Upload, FileText } from 'lucide-react';

interface ResumeLibraryProps {
  resumes: Resume[];
  activeResumeId: string | null;
  onSelectResume: (id: string) => void;
  loading: boolean;
}

export const ResumeLibrary: React.FC<ResumeLibraryProps> = ({
  resumes,
  activeResumeId,
  onSelectResume,
  loading
}) => {
  const masterResume = resumes.find(r => r.type === 'master');
  const campaignResumes = resumes.filter(r => r.type === 'campaign');

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">My Resumes</h2>

      {/* Master Resume */}
      {masterResume && (
        <div
          className={`p-3 rounded-lg border-2 mb-4 cursor-pointer transition-colors ${
            activeResumeId === masterResume.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelectResume(masterResume.id)}
        >
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium text-gray-900">Master Resume</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">
              ATS Optimized: {masterResume.atsScore}%
            </span>
          </div>
        </div>
      )}

      {/* Campaign Resumes */}
      <div className="flex-1 overflow-y-auto">
        {campaignResumes.map((resume) => (
          <div
            key={resume.id}
            className={`p-3 rounded-lg border mb-2 cursor-pointer transition-colors ${
              activeResumeId === resume.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectResume(resume.id)}
          >
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900 text-sm">
                {resume.title}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(resume.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Create New Resume
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <Upload className="w-4 h-4" />
          Import Resume
        </button>
      </div>
    </div>
  );
};
```

### Resume Editor Component
```typescript
// src/components/career-hub/smart-resume-studio/components/ResumeEditor.tsx
import React, { useState, useEffect } from 'react';
import { useResume } from '../../../../hooks/useResume';
import DocumentEditor from './DocumentEditor';
import AICopilotSidebar from './AICopilotSidebar';

interface ResumeEditorProps {
  resumeId: string | null;
  onSave: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resumeId,
  onSave
}) => {
  const { resume, loading, updateResume } = useResume(resumeId);
  const [content, setContent] = useState<string>('');
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    if (resume?.content) {
      setContent(resume.content);
    }
  }, [resume]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = async () => {
    if (resume) {
      await updateResume(resume.id, { content });
      onSave();
    }
  };

  if (!resumeId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Welcome to Smart Resume Studio
          </h3>
          <p className="text-gray-600">
            Select a resume from the library or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex">
      {/* Document Editor */}
      <div className="flex-1 bg-white">
        <DocumentEditor
          content={content}
          onChange={handleContentChange}
          onSave={handleSave}
          onTextSelect={setSelectedText}
        />
      </div>

      {/* AI Copilot Sidebar */}
      <div className="w-80 bg-gray-50 border-l border-gray-200">
        <AICopilotSidebar
          resume={resume}
          selectedText={selectedText}
          onContentUpdate={handleContentChange}
        />
      </div>
    </div>
  );
};
```

---

## API Specifications

### Supabase Functions
```typescript
// src/api/resumes.ts
import { supabase } from '../lib/supabase';

export interface ResumeAPI {
  // CRUD Operations
  createResume: (data: CreateResumeData) => Promise<Resume>;
  updateResume: (id: string, data: Partial<Resume>) => Promise<Resume>;
  deleteResume: (id: string) => Promise<void>;
  getUserResumes: (userId: string) => Promise<Resume[]>;
  getResumeById: (id: string) => Promise<Resume | null>;

  // AI Operations
  optimizeForATS: (resumeId: string) => Promise<ATSOptimizationResult>;
  tailorForJob: (resumeId: string, jobDescription: string) => Promise<TailoredResume>;
  enhanceImpact: (text: string) => Promise<string>;
  justifyGap: (gapInfo: GapInfo) => Promise<GapJustification>;

  // Export Functions
  exportToPDF: (resumeId: string) => Promise<Blob>;
  exportToDocx: (resumeId: string) => Promise<Blob>;
}

// Implementation
export const resumeAPI: ResumeAPI = {
  async createResume(data: CreateResumeData): Promise<Resume> {
    const { data: resume, error } = await supabase
      .from('resumes')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return resume;
  },

  async updateResume(id: string, data: Partial<Resume>): Promise<Resume> {
    const { data: resume, error } = await supabase
      .from('resumes')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return resume;
  },

  async getUserResumes(userId: string): Promise<Resume[]> {
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return resumes || [];
  },

  // AI Functions will integrate with external APIs
  async optimizeForATS(resumeId: string): Promise<ATSOptimizationResult> {
    // This will call external AI service with API keys
    const response = await fetch('/api/ai/ats-optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeId })
    });
    
    return response.json();
  }
};
```

### AI Integration Endpoints
```typescript
// API endpoints that will use provided API keys
interface AIEndpoints {
  '/api/ai/ats-optimize': {
    method: 'POST';
    body: { resumeId: string };
    response: ATSOptimizationResult;
  };

  '/api/ai/tailor-resume': {
    method: 'POST';
    body: { resumeId: string; jobDescription: string };
    response: TailoredResume;
  };

  '/api/ai/enhance-impact': {
    method: 'POST';
    body: { text: string; context?: string };
    response: { enhancedText: string; suggestions: string[] };
  };

  '/api/ai/justify-gap': {
    method: 'POST';
    body: GapInfo;
    response: GapJustification;
  };
}
```

---

## User Interface Requirements

### Design System Integration
- Use existing Tailwind CSS 3.4.1 configuration
- Follow platform's design tokens and component library
- Implement responsive design (mobile-first approach)
- Use Lucide React icons consistently

### Key UI Components Specifications

#### 1. ATS Score Display
```typescript
interface ATSScoreProps {
  score: number;
  className?: string;
}

const ATSScore: React.FC<ATSScoreProps> = ({ score, className }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} />
      <span className={`text-sm font-medium ${getScoreColor(score)}`}>
        ATS Optimized: {score}%
      </span>
    </div>
  );
};
```

#### 2. AI Copilot Sidebar States
```typescript
interface AICopilotSidebarProps {
  mode: 'foundational' | 'targeted';
  resume: Resume;
  targetJob?: JobDescription;
  selectedText?: string;
}

// Foundational Check Mode (Master Resume)
const FoundationalCheckMode = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Foundational Check</h3>
    <ATSScore score={resume.atsScore} className="mb-4" />
    
    <div className="space-y-3">
      <AITool
        icon={<CheckCircle className="w-4 h-4" />}
        title="ATS Compatibility"
        description="Scan for formatting issues"
        action={() => runATSCheck()}
      />
      
      <AITool
        icon={<TrendingUp className="w-4 h-4" />}
        title="Impact Enhancer"
        description="Transform bullets into achievements"
        action={() => enhanceSelectedText()}
        disabled={!selectedText}
      />
      
      <AITool
        icon={<Clock className="w-4 h-4" />}
        title="Gap Justifier"
        description="Address career breaks"
        action={() => justifyGaps()}
      />
    </div>
  </div>
);

// Targeted Optimization Mode (Campaign Resume)
const TargetedOptimizationMode = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Targeted Optimization</h3>
    
    {/* Job Description Pin */}
    <div className="bg-blue-50 p-3 rounded-lg mb-4">
      <h4 className="font-medium text-sm mb-2">Target Job</h4>
      <p className="text-xs text-gray-600 line-clamp-3">
        {targetJob?.title} at {targetJob?.company}
      </p>
    </div>

    {/* Keyword Matcher */}
    <div className="mb-4">
      <h4 className="font-medium text-sm mb-2">Keywords Analysis</h4>
      <div className="space-y-1">
        {keywords.map((keyword) => (
          <div key={keyword.term} className="flex items-center justify-between">
            <span className="text-sm">{keyword.term}</span>
            {keyword.present ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <button
                className="w-4 h-4 text-red-500 hover:text-red-700"
                onClick={() => suggestKeywordPlacement(keyword.term)}
              >
                <X />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Auto-Tailor Button */}
    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
      🚀 Auto-Tailor for this Job
    </button>
  </div>
);
```

---

## AI Integration Requirements

### Required API Keys Configuration
The following API keys will be needed for full functionality:

```typescript
// Environment Variables (.env)
VITE_OPENAI_API_KEY=<provided_by_user>
VITE_ANTHROPIC_API_KEY=<provided_by_user>
VITE_RESUME_PARSER_API_KEY=<provided_by_user>

// AI Service Configuration
interface AIServiceConfig {
  openai: {
    apiKey: string;
    model: 'gpt-4' | 'gpt-3.5-turbo';
    maxTokens: number;
  };
  anthropic: {
    apiKey: string;
    model: 'claude-3-sonnet' | 'claude-3-haiku';
  };
  resumeParser: {
    apiKey: string;
    endpoint: string;
  };
}
```

### AI Processing Flow
```typescript
// src/services/aiService.ts
export class AIService {
  async processATSOptimization(resume: Resume): Promise<ATSOptimizationResult> {
    // 1. Parse resume structure
    const parsedResume = await this.parseResumeStructure(resume.content);
    
    // 2. Run ATS compatibility checks
    const atsIssues = await this.detectATSIssues(parsedResume);
    
    // 3. Generate optimization suggestions
    const suggestions = await this.generateOptimizationSuggestions(atsIssues);
    
    // 4. Calculate ATS score
    const score = this.calculateATSScore(atsIssues);

    return {
      score,
      issues: atsIssues,
      suggestions,
      optimizedContent: await this.applyOptimizations(parsedResume, suggestions)
    };
  }

  async tailorResumeForJob(
    resume: Resume, 
    jobDescription: string
  ): Promise<TailoredResume> {
    // 1. Extract key requirements from job description
    const jobRequirements = await this.extractJobRequirements(jobDescription);
    
    // 2. Analyze skill gaps
    const skillGapAnalysis = await this.analyzeSkillGaps(resume, jobRequirements);
    
    // 3. Generate keyword integration suggestions
    const keywordSuggestions = await this.generateKeywordSuggestions(
      resume, 
      jobRequirements
    );
    
    // 4. Adapt language and tone
    const adaptedContent = await this.adaptLanguageAndTone(
      resume.content, 
      jobDescription
    );

    return {
      content: adaptedContent,
      skillGaps: skillGapAnalysis,
      keywordSuggestions,
      matchScore: this.calculateMatchScore(resume, jobRequirements)
    };
  }
}
```

---

## User Stories & Acceptance Criteria

### Epic 1: Master Resume Management

#### User Story 1.1: Create Master Resume
**As a** job seeker  
**I want to** create and optimize my master resume  
**So that** I have a foundational document for all applications

**Acceptance Criteria:**
- [ ] User can import existing resume (PDF/DOCX)
- [ ] User can create new resume from scratch
- [ ] System automatically designates first resume as "Master"
- [ ] Master resume displays with star icon in library
- [ ] ATS optimization runs automatically on creation
- [ ] ATS score is displayed and updates in real-time

#### User Story 1.2: ATS Optimization
**As a** job seeker  
**I want to** optimize my resume for ATS compatibility  
**So that** my resume passes initial screening systems

**Acceptance Criteria:**
- [ ] System scans for common ATS issues (formatting, columns, fonts)
- [ ] User receives specific issue explanations
- [ ] One-click optimization applies suggested fixes
- [ ] ATS score updates after optimization
- [ ] User can accept/reject individual suggestions

### Epic 2: Campaign Resume Creation

#### User Story 2.1: Job-Specific Tailoring
**As a** job seeker  
**I want to** create tailored resumes for specific jobs  
**So that** I can maximize my chances for each application

**Acceptance Criteria:**
- [ ] User can create campaign resume from master resume
- [ ] System extracts keywords from job description
- [ ] Keyword presence/absence is clearly indicated
- [ ] User can click to get keyword placement suggestions
- [ ] Auto-tailor function optimizes entire resume at once
- [ ] Tailored resume saves with job-specific title

#### User Story 2.2: Skill Gap Analysis
**As a** job seeker  
**I want to** see what skills I'm missing for a role  
**So that** I can address gaps in my application strategy

**Acceptance Criteria:**
- [ ] System compares resume skills to job requirements
- [ ] Missing skills are highlighted in red
- [ ] Present skills are highlighted in green
- [ ] System suggests how to bridge skill gaps
- [ ] Analysis updates when resume content changes

### Epic 3: AI Content Enhancement

#### User Story 3.1: Impact Enhancement
**As a** job seeker  
**I want to** transform my job duties into impactful achievements  
**So that** my resume demonstrates value rather than just responsibilities

**Acceptance Criteria:**
- [ ] User can highlight text and request enhancement
- [ ] AI suggests metric-driven alternatives
- [ ] User can accept/reject suggestions
- [ ] Enhancement maintains factual accuracy
- [ ] Multiple enhancement options provided

#### User Story 3.2: Career Gap Justification
**As a** job seeker with career gaps  
**I want to** frame my breaks positively  
**So that** I can address this concern proactively

**Acceptance Criteria:**
- [ ] System detects employment gaps automatically
- [ ] User provides reason for gap (career break, education, etc.)
- [ ] AI generates professional explanations
- [ ] Explanations can be tailored to specific companies/roles
- [ ] User can choose where to integrate explanations

---

## Implementation Guidelines

### Phase 1: Core Infrastructure (Weeks 1-2)
1. **Database Setup**
   - Create Supabase tables and relationships
   - Set up RLS policies for user data security
   - Configure database functions and triggers

2. **Basic Component Structure**
   - Implement main SmartResumeStudio component
   - Create ResumeLibrary with CRUD operations
   - Build basic DocumentEditor with text editing

3. **Authentication Integration**
   - Connect to existing auth system
   - Implement user-specific data filtering
   - Set up proper error handling

### Phase 2: Resume Management (Weeks 3-4)
1. **File Import/Export**
   - PDF/DOCX import functionality
   - Resume parsing and content extraction
   - Export to multiple formats

2. **Master Resume Logic**
   - Auto-designation of master resume
   - Master resume special handling
   - Version history tracking

3. **Campaign Resume Creation**
   - Copy from master workflow
   - Job-specific metadata storage
   - Title generation and management

### Phase 3: AI Integration (Weeks 5-7)
1. **ATS Optimization Engine**
   - Connect to AI service APIs
   - Implement scoring algorithm
   - Build suggestion application system

2. **Content Enhancement Tools**
   - Impact enhancement AI integration
   - Text selection and suggestion UI
   - Batch processing capabilities

3. **Job Tailoring System**
   - Job description parsing
   - Keyword extraction and matching
   - Auto-tailoring workflow

### Phase 4: Advanced Features (Weeks 8-9)
1. **Gap Justification Tool**
   - Gap detection algorithms
   - Context-aware explanation generation
   - Integration with cover letter system

2. **Advanced AI Features**
   - Company-specific optimization
   - Industry-specific suggestions
   - Continuous learning from user feedback

### Phase 5: Integration & Polish (Weeks 10-11)
1. **Job Copilot Integration**
   - Resume selection in application flow
   - Autopilot configuration
   - Cross-feature data sharing

2. **Performance Optimization**
   - Lazy loading implementation
   - Caching strategies
   - Real-time updates optimization

3. **Testing & Bug Fixes**
   - Comprehensive testing suite
   - User acceptance testing
   - Performance testing

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Database migrations
npm run db:migrate

# Generate types from Supabase
npm run generate-types
```

---

## Security & Performance

### Security Requirements
1. **Data Protection**
   - All resume data encrypted at rest
   - Secure file upload with virus scanning
   - User data isolation through RLS policies

2. **API Security**
   - Rate limiting for AI API calls
   - Secure API key management
   - Input validation and sanitization

3. **Authentication**
   - Integration with existing auth system
   - Proper session management
   - Secure password handling

### Performance Requirements
1. **Loading Performance**
   - Initial page load < 3 seconds
   - Resume rendering < 1 second
   - AI processing feedback within 5 seconds

2. **Scalability**
   - Support for 10,000+ concurrent users
   - Efficient database queries with proper indexing
   - CDN integration for file storage

3. **Offline Capabilities**
   - Local storage for draft content
   - Sync when connection restored
   - Offline editing support

---

## Testing Requirements

### Unit Testing
```typescript
// Example test structure
describe('SmartResumeStudio', () => {
  describe('ResumeLibrary', () => {
    test('displays master resume with star icon', () => {
      // Test implementation
    });

    test('filters campaign resumes correctly', () => {
      // Test implementation
    });
  });

  describe('ATSOptimizer', () => {
    test('calculates ATS score accurately', () => {
      // Test implementation
    });

    test('identifies common ATS issues', () => {
      // Test implementation
    });
  });
});
```

### Integration Testing
- Test Supabase database operations
- Test AI API integrations
- Test file upload/download workflows
- Test cross-component communication

### End-to-End Testing
- Complete user journey from resume creation to job application
- AI processing workflows
- Export functionality
- Multi-device compatibility

### Performance Testing
- Load testing with concurrent users
- Database query performance
- AI processing response times
- File upload/download speeds

---

## Deployment & Configuration

### Environment Setup
```bash
# Required environment variables
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
VITE_OPENAI_API_KEY=<provided_by_user>
VITE_ANTHROPIC_API_KEY=<provided_by_user>
VITE_APP_ENV=production
```

### Build Configuration
```typescript
// vite.config.ts additions
export default defineConfig({
  // existing config...
  define: {
    'process.env.VITE_FEATURE_RESUME_STUDIO': true,
  },
  optimizeDeps: {
    include: ['react-quill', 'html2pdf.js'],
  },
});
```

### Supabase Configuration
```sql
-- Enable RLS
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can only access their own resumes"
  ON resumes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own optimizations"
  ON ats_optimizations FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM resumes 
    WHERE resumes.id = ats_optimizations.resume_id 
    AND resumes.user_id = auth.uid()
  ));
```

---

This PRD provides comprehensive technical specifications for implementing the Smart Resume Studio feature within your existing React/TypeScript/Supabase tech stack. The document is structured to guide cursor.com through the complete implementation process, from database setup to UI components to AI integration.

Key points for cursor.com implementation:
1. All components use your existing tech stack (React 18.3.1, TypeScript 5.5.3, Tailwind CSS 3.4.1)
2. Database schema is designed for Supabase with proper RLS policies
3. AI integration points are clearly defined for API key injection
4. Component structure follows React best practices
5. The implementation is broken down into manageable phases
6. Security and performance requirements are specified
7. Testing requirements ensure quality delivery

Once you provide the necessary API keys, cursor.com will be able to implement a fully functional Smart Resume Studio that integrates seamlessly with your existing platform architecture.