import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Layout, 
  Plus, 
  Upload, 
  Brain,
  Shield,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  RefreshCw,
  CheckCircle,
  X
} from 'lucide-react';

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

interface Template {
  id: string;
  name: string;
  category: 'classic' | 'photo' | 'modern';
  preview: string;
  description: string;
}

interface DesignFormattingSidebarProps {
  selectedTemplateId: string;
  onTemplateSelect: (id: string) => void;
  selectedColors: Colors;
  onColorsChange: (colors: Colors) => void;
  formattingSettings: FormattingSettings;
  onFormattingChange: (settings: FormattingSettings) => void;
  activeSections: string[];
  onAddSection: (section: string) => void;
  onDeleteSection: (section: string) => void;
  onCreateNew: () => void;
  onImportResume: () => void;
}

const DesignFormattingSidebar: React.FC<DesignFormattingSidebarProps> = ({
  selectedTemplateId,
  onTemplateSelect,
  selectedColors,
  onColorsChange,
  formattingSettings,
  onFormattingChange,
  activeSections,
  onAddSection,
  onDeleteSection,
  onCreateNew,
  onImportResume
}) => {
  const [activeTab, setActiveTab] = useState<'design' | 'formatting' | 'sections' | 'ai'>('design');
  const [templateCategory, setTemplateCategory] = useState<'all' | 'classic' | 'photo' | 'modern'>('all');

  const colorPalettes = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#64748B', accent: '#8B5CF6' },
    { name: 'Green', primary: '#10B981', secondary: '#64748B', accent: '#F59E0B' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#64748B', accent: '#EF4444' },
    { name: 'Orange', primary: '#F97316', secondary: '#64748B', accent: '#06B6D4' },
    { name: 'Red', primary: '#EF4444', secondary: '#64748B', accent: '#10B981' },
    { name: 'Teal', primary: '#14B8A6', secondary: '#64748B', accent: '#F59E0B' },
    { name: 'Indigo', primary: '#6366F1', secondary: '#64748B', accent: '#EC4899' },
    { name: 'Gray', primary: '#6B7280', secondary: '#9CA3AF', accent: '#3B82F6' }
  ];

  const templates: Template[] = [
    // Classic Templates
    { id: 'classic-1', name: 'Professional Classic', category: 'classic', preview: 'bg-white border-2 border-gray-300', description: 'Traditional professional layout' },
    { id: 'classic-2', name: 'Executive Classic', category: 'classic', preview: 'bg-gray-50 border-2 border-gray-400', description: 'Executive-level traditional design' },
    { id: 'classic-3', name: 'Academic Classic', category: 'classic', preview: 'bg-white border-2 border-blue-300', description: 'Academic and research focused' },
    { id: 'classic-4', name: 'Corporate Classic', category: 'classic', preview: 'bg-blue-50 border-2 border-blue-400', description: 'Corporate environment optimized' },
    { id: 'classic-5', name: 'Minimal Classic', category: 'classic', preview: 'bg-white border border-gray-200', description: 'Clean minimal approach' },
    
    // Photo Templates
    { id: 'photo-1', name: 'Professional Photo', category: 'photo', preview: 'bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300', description: 'Photo-centric professional' },
    { id: 'photo-2', name: 'Creative Photo', category: 'photo', preview: 'bg-gradient-to-r from-purple-100 to-pink-200 border-2 border-purple-300', description: 'Creative industries focused' },
    { id: 'photo-3', name: 'Executive Photo', category: 'photo', preview: 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-400', description: 'Executive with photo' },
    { id: 'photo-4', name: 'Modern Photo', category: 'photo', preview: 'bg-gradient-to-r from-green-100 to-teal-200 border-2 border-green-300', description: 'Modern photo layout' },
    { id: 'photo-5', name: 'Artistic Photo', category: 'photo', preview: 'bg-gradient-to-r from-orange-100 to-red-200 border-2 border-orange-300', description: 'Artistic and creative' },
    
    // Modern Templates
    { id: 'modern-1', name: 'Tech Modern', category: 'modern', preview: 'bg-gradient-to-br from-indigo-500 to-purple-600', description: 'Technology industry modern' },
    { id: 'modern-2', name: 'Creative Modern', category: 'modern', preview: 'bg-gradient-to-br from-pink-500 to-rose-600', description: 'Creative and bold design' },
    { id: 'modern-3', name: 'Business Modern', category: 'modern', preview: 'bg-gradient-to-br from-blue-500 to-cyan-600', description: 'Modern business approach' },
    { id: 'modern-4', name: 'Startup Modern', category: 'modern', preview: 'bg-gradient-to-br from-green-500 to-emerald-600', description: 'Startup environment focused' },
    { id: 'modern-5', name: 'Minimalist Modern', category: 'modern', preview: 'bg-gradient-to-br from-gray-500 to-slate-600', description: 'Ultra-modern minimal' }
  ];

  const availableSections = [
    'Heading',
    'Profile',
    'Core Skills',
    'Experience',
    'Education',
    'Initiatives Accomplishments',
    'Rewards Recognition',
    'Online Courses Certifications',
    'Activities',
    'Awards, Accomplishments, and Honors',
    'Certifications and Licenses',
    'Languages',
    'References',
    'Add Your Own'
  ];

  const fontStyles = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro', 'Century Gothic'
  ];

  const filteredTemplates = templateCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === templateCategory);

  const updateFormatting = (key: keyof FormattingSettings, value: number | string) => {
    onFormattingChange({
      ...formattingSettings,
      [key]: value
    });
  };

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Tab Navigation */}
      <div className="p-4 border-b border-slate-700">
        <div className="grid grid-cols-2 gap-1 bg-slate-900 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('design')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'design' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Design
          </button>
          <button
            onClick={() => setActiveTab('formatting')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'formatting' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Formatting
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-slate-900 rounded-lg p-1 mt-2">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'sections' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Resume Sections
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            AI Copilot
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* Colors */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Colors</h4>
              <div className="grid grid-cols-4 gap-2">
                {colorPalettes.map((palette) => (
                  <button
                    key={palette.name}
                    onClick={() => onColorsChange(palette)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      selectedColors.primary === palette.primary
                        ? 'border-white scale-110'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    style={{ backgroundColor: palette.primary }}
                    title={palette.name}
                  />
                ))}
              </div>
            </div>

            {/* Templates */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Templates</h4>
              
              {/* Template Categories */}
              <div className="flex flex-wrap gap-1 mb-4">
                <button
                  onClick={() => setTemplateCategory('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    templateCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTemplateCategory('classic')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    templateCategory === 'classic' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  Classic
                </button>
                <button
                  onClick={() => setTemplateCategory('photo')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    templateCategory === 'photo' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  Photo
                </button>
                <button
                  onClick={() => setTemplateCategory('modern')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    templateCategory === 'modern' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  Modern
                </button>
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-2 gap-3">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => onTemplateSelect(template.id)}
                    className={`p-2 rounded-lg border transition-all ${
                      selectedTemplateId === template.id
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className={`w-full h-20 rounded mb-2 ${template.preview}`}></div>
                    <h5 className="text-xs font-medium text-white">{template.name}</h5>
                    <p className="text-xs text-slate-400 mt-1">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formatting' && (
          <div className="space-y-6">
            {/* Font Formatting */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Font Formatting</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Font Style</label>
                  <select
                    value={formattingSettings.fontStyle}
                    onChange={(e) => updateFormatting('fontStyle', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:border-indigo-500 focus:outline-none"
                  >
                    {fontStyles.map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Font Size: {formattingSettings.fontSize}pt
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="16"
                    value={formattingSettings.fontSize}
                    onChange={(e) => updateFormatting('fontSize', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Heading Size: {formattingSettings.headingSize}pt
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="20"
                    value={formattingSettings.headingSize}
                    onChange={(e) => updateFormatting('headingSize', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Document Formatting */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Document Formatting</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Section Spacing</label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={formattingSettings.sectionSpacing}
                    onChange={(e) => updateFormatting('sectionSpacing', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Paragraph Spacing</label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={formattingSettings.paragraphSpacing}
                    onChange={(e) => updateFormatting('paragraphSpacing', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Line Spacing</label>
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.1"
                    value={formattingSettings.lineSpacing}
                    onChange={(e) => updateFormatting('lineSpacing', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Top & Bottom Margin</label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={formattingSettings.topBottomMargin}
                    onChange={(e) => updateFormatting('topBottomMargin', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Side Margins</label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={formattingSettings.sideMargins}
                    onChange={(e) => updateFormatting('sideMargins', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">Paragraph Indent</label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={formattingSettings.paragraphIndent}
                    onChange={(e) => updateFormatting('paragraphIndent', Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white mb-3">Resume Sections</h4>
            
            <div className="space-y-2">
              {availableSections.map((section) => {
                const isActive = activeSections.includes(section);
                return (
                  <div
                    key={section}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      isActive ? 'border-green-500 bg-green-500/10' : 'border-slate-600 bg-slate-700/30'
                    }`}
                  >
                    <span className={`text-sm ${isActive ? 'text-green-400' : 'text-slate-300'}`}>
                      {section}
                    </span>
                    {isActive ? (
                      <button
                        onClick={() => onDeleteSection(section)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onAddSection(section)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">AI-Powered Optimization</span>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">ATS Compatibility</div>
                  <div className="text-xs text-slate-400">Scan for formatting issues</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">Impact Enhancer</div>
                  <div className="text-xs text-slate-400">Transform bullets into achievements</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <Clock className="w-4 h-4 text-orange-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">Gap Justifier</div>
                  <div className="text-xs text-slate-400">Address career breaks</div>
                </div>
              </button>
            </div>

            {/* AI Tips */}
            <div className="bg-slate-700 rounded-lg p-4 mt-6">
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                AI Tips
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Use action verbs to start bullet points</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Include quantifiable achievements</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Match keywords from job descriptions</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons at Bottom */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button 
          onClick={onCreateNew}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Create New Resume
        </button>
        <button 
          onClick={onImportResume}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-700 text-slate-300 rounded-lg hover:border-slate-600 hover:text-white transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import Resume
        </button>
      </div>
    </div>
  );
};

export default DesignFormattingSidebar;