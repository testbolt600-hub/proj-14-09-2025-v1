# Carousel Maker Feature - Product Requirements Document (PRD)

## Overview
The Carousel Maker is a professional design tool that transforms users from content creators into visual storytellers. It enables the creation of multi-slide PDF carousels with AI-powered content generation, professional design templates, and comprehensive flow analysis for maximum LinkedIn engagement.

## Product Goals
- Enable users to create professional-quality carousel content without design skills
- Provide AI-powered content structuring for optimal information flow
- Ensure brand consistency across all carousel designs
- Maximize engagement through scientifically-backed carousel design principles

## Target Users

### Primary Users
- **Thought Leaders**: Professionals sharing insights through visual storytelling
- **Marketers**: Creating educational content for lead generation
- **Consultants**: Demonstrating expertise through structured content
- **Educators**: Breaking down complex topics into digestible slides

### User Personas
1. **Michael, Business Consultant** (38, strategy consultant)
   - Creates 2-3 carousels per week on business strategy
   - Needs professional appearance to maintain credibility
   - Values efficiency and consistency in design

2. **Lisa, Marketing Director** (31, B2B SaaS company)
   - Creates educational content for lead generation
   - Needs brand-consistent materials
   - Measures success through engagement and conversions

3. **Alex, Career Coach** (29, personal branding expert)
   - Creates how-to guides and tips
   - Needs templates for consistent content production
   - Values accessibility and mobile optimization

## User Journey

### Primary Flow: Creating a Professional Carousel
1. **Initiation**
   - User clicks "Carousel Maker" from sidebar or quick action menu
   - System loads carousel workspace with template selection

2. **Template Selection**
   - User browses template library (Minimalist, Corporate, Bold, etc.)
   - AI suggests template based on topic/industry (optional)
   - User selects template or starts with blank canvas

3. **Content Generation**
   - User inputs topic/theme for carousel
   - AI generates structured content for 5-7 slides
   - System creates slide-by-slide content with titles and descriptions

4. **Content Customization**
   - User reviews generated content slide by slide
   - Edit text, adjust messaging, refine structure
   - Add custom slides or remove unnecessary ones

5. **Visual Enhancement**
   - Access integrated media library (Unsplash, Noun Project)
   - Add icons, images, or graphics to slides
   - Apply brand kit colors, fonts, and logos

6. **Quality Analysis**
   - Run "Carousel Flow Score" analysis
   - Review feedback on structure, flow, and call-to-action
   - Make optimizations based on suggestions

7. **Final Output**
   - Preview complete carousel
   - Download high-quality PDF
   - Option to schedule or publish directly

### Alternative Flows
- **Brand Template Creation**: Save custom template for future use
- **Collaboration**: Share with team for review and approval
- **Multi-Format Export**: Create additional formats (images, presentation)

## Functional Requirements

### Template System
- **Dynamic Template Library**: 15+ professional templates
- **Template Categories**: 
  - Business (Corporate, Professional, Executive)
  - Creative (Bold, Artistic, Modern)
  - Educational (Clean, Academic, Tutorial)
  - Personal (Casual, Friendly, Approachable)

### AI-Powered Content Generation
- **Topic Analysis**: AI breaks down topics into logical flow
- **Slide Structure**: Automatic title slide, content slides, CTA slide
- **Content Optimization**: Each slide focused on single key point
- **Industry Customization**: Content adapted to user's industry context

### Brand Kit Integration
Users can define and save their brand identity:
- **Logo Upload**: Multiple format support (PNG, SVG, JPG)
- **Color Palette**: Primary, secondary, accent colors
- **Typography**: Font selections for headers and body text
- **Style Guidelines**: Spacing, alignment, visual hierarchy

### Carousel Flow Scoring System
Comprehensive analysis providing score out of 100:

#### 1. Structure Score (25 points)
- **Title Slide Quality**: Hook, clarity, visual appeal
- **Content Flow**: Logical progression of ideas
- **Conclusion Strength**: Clear summary and next steps

#### 2. Engagement Score (25 points)
- **Visual Appeal**: Color contrast, typography, spacing
- **Content Balance**: Text-to-visual ratio optimization
- **Mobile Readability**: Legibility on mobile devices

#### 3. Call-to-Action Score (25 points)
- **CTA Presence**: Clear action for reader
- **CTA Placement**: Strategic positioning
- **CTA Clarity**: Specific, actionable language

#### 4. Completeness Score (25 points)
- **Slide Count**: Optimal length (5-7 slides)
- **Content Depth**: Sufficient detail without overwhelm
- **Professional Polish**: Consistent formatting, error-free

### Integrated Media Library
- **Unsplash Integration**: High-quality stock photography
- **Noun Project Integration**: Professional icon library
- **Custom Upload**: User's own images and graphics
- **Smart Search**: AI-powered media recommendations based on content

### Advanced Design Features
- **Smart Alignment**: Automatic element positioning
- **Color Intelligence**: Suggestions based on color theory
- **Typography Pairing**: Optimal font combinations
- **Responsive Design**: Ensures readability across devices

## Technical Requirements

### Frontend Architecture (Bolt.new/Next.js)
```typescript
// Component Structure
CarouselMaker/
├── TemplateSelector/
│   ├── TemplateGallery.tsx
│   ├── TemplatePreview.tsx
│   └── AITemplateSuggestion.tsx
├── ContentEditor/
│   ├── SlideEditor.tsx
│   ├── ContentGenerator.tsx
│   └── SlideNavigation.tsx
├── DesignTools/
│   ├── BrandKitPanel.tsx
│   ├── MediaLibrary.tsx
│   └── DesignControls.tsx
├── Analysis/
│   ├── FlowScorePanel.tsx
│   ├── ScoreBreakdown.tsx
│   └── OptimizationSuggestions.tsx
└── Export/
    ├── PreviewModal.tsx
    ├── PDFGenerator.tsx
    └── ExportOptions.tsx
```

### Backend API Endpoints (Cursor Implementation)

#### 1. Carousel Content Generation
```typescript
// /api/carousel/generate-content
POST /api/carousel/generate-content
{
  "topic": "project management best practices",
  "slideCount": 6,
  "targetAudience": "business professionals",
  "industry": "technology"
}
```

#### 2. Template Management
```typescript
// /api/carousel/templates
GET /api/carousel/templates?category=business&style=minimal

// /api/carousel/templates/suggest
POST /api/carousel/templates/suggest
{
  "topic": "leadership skills",
  "industry": "consulting"
}
```

#### 3. Flow Analysis
```typescript
// /api/carousel/analyze-flow
POST /api/carousel/analyze-flow
{
  "slides": [
    {"title": "...", "content": "...", "type": "title"},
    {"title": "...", "content": "...", "type": "content"}
  ],
  "userId": "user-uuid"
}
```

#### 4. PDF Generation
```typescript
// /api/carousel/generate-pdf
POST /api/carousel/generate-pdf
{
  "slides": [...],
  "template": "professional-blue",
  "brandKit": {...}
}
```

### Database Schema (Supabase)
```sql
-- Carousels table
CREATE TABLE carousels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(255),
  template_id VARCHAR(100),
  slides JSONB NOT NULL, -- Array of slide objects
  brand_kit JSONB, -- User's brand settings
  flow_score INTEGER, -- Latest analysis score
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand kits table
CREATE TABLE brand_kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  logo_url TEXT,
  primary_color VARCHAR(7), -- Hex color
  secondary_color VARCHAR(7),
  accent_color VARCHAR(7),
  primary_font VARCHAR(100),
  secondary_font VARCHAR(100),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Template library
CREATE TABLE carousel_templates (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  style VARCHAR(50),
  preview_url TEXT,
  template_data JSONB NOT NULL, -- Design specifications
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Cursor.com Implementation Prompts

### 1. AI Content Generation
```
"Create a Next.js API route at /api/carousel/generate-content.ts that:
1. Accepts topic, slide count, and audience parameters
2. Calls OpenAI API with a structured prompt to create carousel content
3. Returns JSON array of slides with title, content, and suggested slide type
4. Ensures logical flow from introduction to conclusion with clear CTA
5. Includes error handling and input validation"
```

### 2. PDF Generation System
```
"Build a carousel PDF generation system using Puppeteer:
1. Create HTML/CSS templates for each design style
2. Accept slide content and brand kit configuration
3. Generate individual slide images at high resolution
4. Compile slides into a single PDF using pdf-lib
5. Store generated PDFs in Supabase Storage
6. Return download URL with expiration"
```

### 3. Flow Analysis Engine
```
"Develop a carousel analysis API that:
1. Evaluates slide structure and content flow
2. Checks for proper introduction, development, and conclusion
3. Analyzes call-to-action presence and effectiveness
4. Assesses visual hierarchy and readability
5. Provides specific improvement suggestions
6. Returns detailed scoring breakdown with actionable feedback"
```

### 4. Template Management
```
"Create template system with:
1. Dynamic template loading from database
2. AI-powered template suggestions based on content topic
3. Template customization with brand kit integration
4. Template preview generation
5. User custom template saving functionality"
```

### 5. Media Library Integration
```
"Implement integrated media library with:
1. Unsplash API integration for stock photos
2. Noun Project API for professional icons
3. Smart search based on slide content
4. Image optimization and CDN integration
5. User upload and management system"
```

## Success Metrics

### User Engagement
- **Adoption Rate**: 60% of users try Carousel Maker within first month
- **Completion Rate**: 75% of started carousels are completed
- **Template Usage**: Average of 3 different templates per user per month

### Content Quality
- **Flow Score**: Average score improvement of 20 points after optimization
- **Download Rate**: 80% of completed carousels are downloaded
- **Sharing Frequency**: 40% of carousels are published within 24 hours

### Business Impact
- **Premium Conversions**: 15% of free users upgrade for premium templates
- **User Retention**: 45% monthly retention for Carousel Maker users
- **Time Savings**: Average creation time under 15 minutes

## Risk Considerations

### Technical Risks
- **PDF Generation Performance**: Large carousels may cause timeouts
- **Template Scalability**: Growing template library may slow loading
- **Media API Limits**: Third-party API rate limiting

### Mitigation Strategies
- Implement progressive PDF generation with status updates
- Cache popular templates and implement lazy loading
- Build fallback systems for media API failures
- Optimize image processing and storage

### Content Quality Risks
- **AI Generation Accuracy**: Generated content may not match user intent
- **Template Limitations**: Fixed templates may not suit all use cases
- **Brand Consistency**: User brand kits may not translate well across templates

### Mitigation Strategies
- Allow extensive content editing and customization
- Provide template customization options
- Include brand kit validation and preview systems

## Future Enhancements

### Phase 2 Features
- **Animation Support**: Animated GIF export for social platforms
- **Video Carousels**: Convert carousels to video format
- **Collaboration Tools**: Multi-user editing and commenting
- **Advanced Analytics**: Track carousel performance across platforms

### Phase 3 Features
- **AI Design Assistant**: Real-time design suggestions
- **Interactive Elements**: Clickable elements within PDFs
- **Multi-Language**: Content generation in multiple languages
- **White-Label**: Custom branding for agencies

## Acceptance Criteria

### Must Have
- [ ] Template selection with 10+ professional options
- [ ] AI-powered content generation for 5-7 slides
- [ ] Brand kit integration with logo, colors, fonts
- [ ] Flow scoring system with detailed feedback
- [ ] High-quality PDF export functionality
- [ ] Integrated media library with search

### Should Have
- [ ] Template customization options
- [ ] Real-time preview during editing
- [ ] Mobile-responsive design interface
- [ ] Batch export capabilities

### Could Have
- [ ] Advanced animation options
- [ ] Social media format exports
- [ ] Collaboration features
- [ ] Performance analytics integration

## Security & Privacy

### Data Protection
- **User Content**: All carousel content encrypted at rest
- **Brand Assets**: Secure storage of logos and brand materials
- **Generated PDFs**: Temporary storage with automatic cleanup

### API Security
- **Rate Limiting**: Prevent abuse of PDF generation
- **Input Validation**: Sanitize all user inputs
- **Access Control**: User-specific content isolation