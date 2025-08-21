import React from 'react';
import { X } from 'lucide-react';

interface FormattingSettings {
  fontStyle: string;
  fontSize: number;
  headingSize: number;
  sectionSpacing: number;
  paragraphSpacing: number;
  lineSpacing: number;
  topBottomMargin: number;
  sideMargins: number;
  paragraphIndent: number;
}

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
}

interface ResumePreviewProps {
  content: string;
  templateId: string;
  colors: Colors;
  formatting: FormattingSettings;
  activeSections: string[];
  onDeleteSection: (section: string) => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  content,
  templateId,
  colors,
  formatting,
  activeSections,
  onDeleteSection
}) => {
  // Parse content into sections
  const parseContentIntoSections = (content: string) => {
    const lines = content.split('\n');
    const sections: { [key: string]: string[] } = {};
    let currentSection = 'Heading';
    let currentLines: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check if this line is a section header
      const sectionHeaders = [
        'PROFESSIONAL SUMMARY', 'PROFILE', 'SUMMARY',
        'CORE SKILLS', 'SKILLS', 'TECHNICAL SKILLS',
        'EXPERIENCE', 'WORK EXPERIENCE', 'EMPLOYMENT',
        'EDUCATION', 'ACADEMIC BACKGROUND',
        'CERTIFICATIONS', 'CERTIFICATES',
        'AWARDS', 'ACHIEVEMENTS', 'ACCOMPLISHMENTS',
        'LANGUAGES', 'REFERENCES'
      ];
      
      const matchedHeader = sectionHeaders.find(header => 
        trimmedLine.toUpperCase().includes(header)
      );
      
      if (matchedHeader) {
        // Save previous section
        if (currentLines.length > 0) {
          sections[currentSection] = currentLines;
        }
        
        // Start new section
        if (matchedHeader.includes('SUMMARY') || matchedHeader.includes('PROFILE')) {
          currentSection = 'Profile';
        } else if (matchedHeader.includes('SKILLS')) {
          currentSection = 'Core Skills';
        } else if (matchedHeader.includes('EXPERIENCE') || matchedHeader.includes('EMPLOYMENT')) {
          currentSection = 'Experience';
        } else if (matchedHeader.includes('EDUCATION')) {
          currentSection = 'Education';
        } else if (matchedHeader.includes('CERTIFICATION')) {
          currentSection = 'Certifications and Licenses';
        } else if (matchedHeader.includes('AWARD') || matchedHeader.includes('ACHIEVEMENT')) {
          currentSection = 'Awards, Accomplishments, and Honors';
        } else if (matchedHeader.includes('LANGUAGE')) {
          currentSection = 'Languages';
        } else if (matchedHeader.includes('REFERENCE')) {
          currentSection = 'References';
        }
        
        currentLines = [trimmedLine];
      } else {
        currentLines.push(line);
      }
    }
    
    // Save last section
    if (currentLines.length > 0) {
      sections[currentSection] = currentLines;
    }
    
    return sections;
  };

  const sections = parseContentIntoSections(content);

  const getTemplateStyles = () => {
    const baseStyles = {
      fontFamily: formatting.fontStyle,
      fontSize: `${formatting.fontSize}px`,
      lineHeight: formatting.lineSpacing,
      padding: `${formatting.topBottomMargin}px ${formatting.sideMargins}px`,
      textIndent: `${formatting.paragraphIndent}px`
    };

    // Template-specific styles
    if (templateId.includes('modern')) {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)`,
        border: `2px solid ${colors.primary}30`
      };
    } else if (templateId.includes('photo')) {
      return {
        ...baseStyles,
        background: `linear-gradient(to right, ${colors.primary}10, ${colors.secondary}05)`,
        border: `1px solid ${colors.primary}40`
      };
    } else {
      return {
        ...baseStyles,
        background: 'white',
        border: `1px solid ${colors.secondary}40`
      };
    }
  };

  const getSectionHeaderStyle = () => ({
    fontSize: `${formatting.headingSize}px`,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: `${formatting.paragraphSpacing}px`,
    marginTop: `${formatting.sectionSpacing}px`
  });

  return (
    <div className="h-full bg-slate-900 p-6">
      <div className="bg-white rounded-lg shadow-lg h-full overflow-y-auto">
        <div style={getTemplateStyles()} className="min-h-full relative">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 sticky top-0 bg-white/90 backdrop-blur-sm p-2 border-b border-slate-200">
            Formatted Resume Preview
          </h3>
          
          {activeSections.map((sectionName) => {
            const sectionContent = sections[sectionName];
            if (!sectionContent || sectionContent.length === 0) return null;

            return (
              <div key={sectionName} className="relative group mb-4">
                {/* Delete Section Button */}
                <button
                  onClick={() => onDeleteSection(sectionName)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title={`Delete ${sectionName} section`}
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Section Content */}
                <div>
                  {sectionName !== 'Heading' && (
                    <h4 style={getSectionHeaderStyle()}>
                      {sectionName.toUpperCase()}
                    </h4>
                  )}
                  
                  <div style={{ 
                    marginBottom: `${formatting.sectionSpacing}px`,
                    color: colors.secondary 
                  }}>
                    {sectionContent.map((line, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: line.trim() === '' ? `${formatting.paragraphSpacing}px` : '2px',
                          fontWeight: sectionName === 'Heading' && index < 3 ? '600' : 'normal',
                          fontSize: sectionName === 'Heading' && index === 0 ? `${formatting.headingSize + 4}px` : 
                                   sectionName === 'Heading' && index === 1 ? `${formatting.headingSize}px` : 
                                   `${formatting.fontSize}px`,
                          color: sectionName === 'Heading' && index < 2 ? colors.primary : colors.secondary
                        }}
                      >
                        {line || '\u00A0'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {activeSections.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500">No sections selected. Add sections from the Resume Sections tab.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;