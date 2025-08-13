# Repurpose Content Feature - Product Requirements Document (PRD)

## Overview
The Repurpose Content feature is a strategic content multiplier that transforms existing digital content (articles, videos, podcasts) into multiple LinkedIn post formats. It acts as an intelligent content strategist, analyzing source material and creating various content angles to maximize reach and engagement.

## Product Goals
- Maximize content ROI by creating multiple posts from single sources
- Reduce content creation time by leveraging existing materials
- Provide strategic content angles to reach different audience segments
- Ensure content originality while maintaining source value

## Target Users

### Primary Users
- **Content Marketers**: Professionals managing content across multiple channels
- **Thought Leaders**: Individuals with existing content libraries (blogs, videos, podcasts)
- **Agency Professionals**: Managing content for multiple clients
- **Business Owners**: Leveraging company content for personal branding

### User Personas
1. **Rachel, Content Marketing Manager** (32, B2B SaaS)
   - Manages company blog with 2-3 articles per week
   - Needs to amplify content reach across social platforms
   - Measures success through lead generation and brand awareness

2. **Tom, Industry Expert** (45, financial services)
   - Hosts weekly podcast and writes monthly articles
   - Wants to maintain LinkedIn presence without creating new content
   - Values authenticity and thought leadership positioning

3. **Sophie, Agency Account Manager** (28, digital marketing agency)
   - Manages 5+ client accounts with diverse content needs
   - Needs efficient way to create social content from client materials
   - Values scalability and consistency across accounts

## User Journey

### Primary Flow: Repurposing External Content
1. **Content Input**
   - User navigates to "Repurpose Content" from sidebar
   - Paste URL (blog post, YouTube video, LinkedIn article)
   - System validates and analyzes URL accessibility

2. **Content Analysis**
   - AI extracts and analyzes source content
   - Identifies key themes, quotes, statistics, insights
   - Determines content type and optimal repurposing strategies

3. **Format Selection**
   - System presents multiple post format options
   - User selects desired formats (can choose multiple)
   - Preview available for each format type

4. **Angle Customization**
   - User selects content angle/perspective
   - Option to customize tone and target audience
   - AI adjusts content accordingly

5. **Content Generation**
   - AI creates posts in selected formats
   - User reviews and edits generated content
   - Option to generate alternative versions

6. **Optimization & Publishing**
   - Apply post scoring and optimization
   - Add custom elements (tags, personal insights)
   - Publish immediately or schedule

### Alternative Flows
- **Batch Processing**: Upload multiple URLs for bulk repurposing
- **Recurring Content**: Set up automatic repurposing for new content from specific sources
- **Team Collaboration**: Share repurposed content for team review

## Functional Requirements

### Content Analysis Engine
- **Multi-Format Support**: Articles, YouTube videos, LinkedIn posts, podcasts (with transcripts)
- **Content Extraction**: 
  - Web scraping for articles and blog posts
  - YouTube transcript extraction
  - PDF parsing for documents
  - Audio transcription for podcasts

### Multi-Format Output System
Users can generate multiple post types from single source:

#### 1. Teaser Post
- **Purpose**: Drive traffic back to original content
- **Format**: 1-2 sentences + compelling question
- **Length**: 100-150 characters
- **CTA**: "Read the full article" or "Watch the complete video"

#### 2. Key Insights Post
- **Purpose**: Share valuable takeaways
- **Format**: "3 Key Insights from [Source]" structure
- **Length**: 200-300 words
- **Elements**: Bullet points, numbered lists, key statistics

#### 3. Listicle Post
- **Purpose**: Break down complex content into digestible points
- **Format**: "5 Ways to..." or "Top 3 Mistakes..."
- **Length**: 250-400 words
- **Structure**: Clear headings, brief explanations

#### 4. Carousel Outline
- **Purpose**: Visual storytelling format
- **Format**: 5-7 slide structure
- **Content**: Slide titles and key points
- **Integration**: Links to Carousel Maker for visual creation

#### 5. Quote Graphic Post
- **Purpose**: Highlight powerful statements
- **Format**: Pull quote + context
- **Length**: 50-100 words
- **Visual**: Designed quote graphic suggestion

### Content Angle Selector
Strategic perspectives to differentiate repurposed content:

#### 1. Summarize Key Points
- **Approach**: Distill main arguments and conclusions
- **Tone**: Neutral, informative
- **Best For**: Educational content, research articles

#### 2. Find Contrarian Opinion
- **Approach**: Present alternative viewpoint or challenge assumptions
- **Tone**: Thought-provoking, respectful disagreement
- **Best For**: Opinion pieces, industry trends

#### 3. Ask Questions
- **Approach**: Transform statements into discussion starters
- **Tone**: Curious, engaging
- **Best For**: Controversial topics, personal experiences

#### 4. Personal Experience
- **Approach**: Connect content to user's own experience
- **Tone**: Personal, authentic
- **Best For**: Career advice, business insights

#### 5. Industry Application
- **Approach**: Apply general concepts to specific industry
- **Tone**: Practical, relevant
- **Best For**: Universal principles, case studies

### Smart Attribution System
- **Source Attribution**: Automatic crediting of original authors
- **Link Preservation**: Include links to original content
- **Copyright Compliance**: Ensure fair use guidelines
- **Relationship Building**: Tag original authors when appropriate

## Technical Requirements

### Frontend Architecture (Bolt.new/Next.js)
```typescript
// Component Structure
RepurposeContent/
├── UrlInput/
│   ├── UrlValidator.tsx
│   ├── ContentPreview.tsx
│   └── BatchUpload.tsx
├── FormatSelector/
│   ├── FormatOptions.tsx
│   ├── FormatPreview.tsx
│   └── MultiSelect.tsx
├── AngleSelector/
│   ├── AngleOptions.tsx
│   ├── ToneSelector.tsx
│   └── AudienceTargeting.tsx
├── ContentGeneration/
│   ├── GeneratedPosts.tsx
│   ├── PostEditor.tsx
│   └── AlternativeVersions.tsx
└── Output/
    ├── PublishOptions.tsx
    ├── SchedulingPanel.tsx
    └── ContentLibrary.tsx
```

### Backend API Endpoints (Cursor Implementation)

#### 1. Content Analysis
```typescript
// /api/repurpose/analyze
POST /api/repurpose/analyze
{
  "url": "https://example.com/article",
  "contentType": "article" // or "video", "podcast"
}
```

#### 2. Content Generation
```typescript
// /api/repurpose/generate
POST /api/repurpose/generate
{
  "sourceContent": "extracted content text",
  "formats": ["teaser", "insights", "listicle"],
  "angle": "summarize",
  "tone": "professional",
  "targetAudience": "business professionals"
}
```

#### 3. Batch Processing
```typescript
// /api/repurpose/batch
POST /api/repurpose/batch
{
  "urls": ["url1", "url2", "url3"],
  "defaultFormat": "insights",
  "defaultAngle": "summarize"
}
```

### Database Schema (Supabase)
```sql
-- Repurposed content tracking
CREATE TABLE repurposed_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  source_url TEXT NOT NULL,
  source_title TEXT,
  source_author TEXT,
  source_type VARCHAR(50), -- article, video, podcast
  extracted_content TEXT,
  generated_posts JSONB, -- Array of generated post variations
  selected_formats TEXT[],
  content_angle VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content sources for recurring processing
CREATE TABLE content_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  source_name VARCHAR(255),
  source_url TEXT, -- RSS feed, YouTube channel, etc.
  auto_process BOOLEAN DEFAULT false,
  default_formats TEXT[],
  default_angle VARCHAR(50),
  last_processed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Cursor.com Implementation Prompts

### 1. Content Extraction System
```
"Create a comprehensive content extraction system with these functions:

1. Article Scraper (/api/repurpose/extract-article):
   - Use Cheerio to parse HTML and extract main content
   - Handle various blog formats and CMSs
   - Remove ads, navigation, and irrelevant content
   - Return title, author, content, and metadata

2. YouTube Transcript Extractor (/api/repurpose/extract-youtube):
   - Use youtube-transcript library to get video transcripts
   - Handle videos with and without captions
   - Extract video metadata (title, description, duration)
   - Return formatted transcript with timestamps

3. Generic URL Analyzer:
   - Detect content type from URL patterns
   - Route to appropriate extraction method
   - Handle errors and edge cases gracefully
   - Return standardized content object"
```

### 2. Multi-Format Content Generator
```
"Build a flexible content generation API (/api/repurpose/generate) that:

1. Accepts source content and generation parameters
2. Uses OpenAI API with specific prompts for each format:
   - Teaser: Create compelling hook with CTA
   - Insights: Extract 3-5 key takeaways
   - Listicle: Structure as numbered list
   - Carousel: Create slide-by-slide breakdown
   - Quote: Identify most impactful quotes

3. Applies selected content angle and tone
4. Ensures proper attribution and linking
5. Returns array of generated content with metadata
6. Includes character counts and optimization suggestions"
```

### 3. Batch Processing System
```
"Create efficient batch processing with:
1. Queue system for handling multiple URLs
2. Progress tracking and status updates
3. Error handling for failed extractions
4. Rate limiting to prevent API abuse
5. Results aggregation and reporting
6. Option to process recurring content sources"
```

### 4. Smart Attribution Engine
```
"Implement attribution system that:
1. Extracts author information from source content
2. Generates proper citation formats
3. Creates LinkedIn tag suggestions for authors
4. Maintains attribution database for relationship building
5. Ensures compliance with fair use guidelines
6. Provides templates for crediting sources"
```

## Success Metrics

### User Adoption
- **Feature Usage**: 35% of active users try repurposing within first month
- **Repeat Usage**: 60% of users who try feature use it again within 30 days
- **Content Volume**: Average of 5 pieces repurposed per user per month

### Content Quality
- **Output Satisfaction**: 4.2+ star rating on generated content
- **Edit Rate**: <30% of generated posts require significant editing
- **Publication Rate**: 70% of repurposed content gets published

### Efficiency Gains
- **Time Savings**: 75% reduction in content creation time
- **Content Multiplication**: Average 3.2 posts created per source
- **Engagement Lift**: 25% higher engagement on repurposed vs. original posts

## Risk Considerations

### Technical Risks
- **Content Extraction Failures**: Websites blocking scraping or changing formats
- **API Dependencies**: YouTube, web scraping services may limit access
- **Quality Control**: Generated content may not capture source nuance

### Mitigation Strategies
- Build multiple extraction methods with fallbacks
- Implement caching to reduce API calls
- Add human review checkpoints for quality assurance

### Legal and Ethical Risks
- **Copyright Infringement**: Repurposing may violate fair use
- **Attribution Requirements**: Failure to properly credit sources
- **Platform Policies**: Potential violation of LinkedIn's content policies

### Mitigation Strategies
- Implement strict attribution requirements
- Provide fair use guidelines and education
- Build content originality checkers
- Regular policy compliance reviews

## Future Enhancements

### Phase 2 Features
- **RSS Integration**: Automatic processing of RSS feeds
- **Podcast Transcription**: Direct audio file processing
- **Multi-Language Support**: Content translation capabilities
- **Trend Analysis**: Identify trending topics for repurposing

### Phase 3 Features
- **AI Content Mixing**: Combine multiple sources for unique insights
- **Personalization Engine**: Learn user preferences for better generation
- **Collaboration Networks**: Connect users with complementary content
- **Performance Optimization**: AI-driven format selection based on historical performance

## Acceptance Criteria

### Must Have
- [ ] URL input with validation and preview
- [ ] Multi-format content generation (5 formats minimum)
- [ ] Content angle selection with 3+ options
- [ ] Proper source attribution and linking
- [ ] Integration with Post Generator for editing
- [ ] Batch processing for multiple URLs

### Should Have
- [ ] YouTube transcript extraction
- [ ] Content quality scoring
- [ ] Historical repurposing tracking
- [ ] Export options for generated content

### Could Have
- [ ] Automatic source monitoring
- [ ] Team collaboration features
- [ ] Advanced customization options
- [ ] Performance analytics by source type

## Security and Compliance

### Data Handling
- **Source Content**: Temporary storage with automatic cleanup
- **Generated Content**: Encrypted storage with user access controls
- **Attribution Data**: Maintain source relationship records

### Compliance
- **Copyright Compliance**: Built-in fair use guidelines
- **Platform Policies**: Adherence to LinkedIn content policies
- **Privacy Protection**: No storage of sensitive extracted data

### Rate Limiting
- **API Protection**: Prevent abuse of extraction services
- **User Limits**: Fair usage policies for batch processing
- **Quality Controls**: Limit generation requests per time period