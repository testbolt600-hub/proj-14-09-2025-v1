import React, { useState } from 'react';
import { 
  Globe, 
  Upload, 
  Palette, 
  Eye, 
  Download, 
  Share2, 
  Settings,
  Sparkles,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  User,
  Briefcase,
  Award,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Camera,
  FileText,
  Target,
  Zap,
  Layout,
  Type,
  Image as ImageIcon,
  Star,
  BarChart3,
  Clock,
  Link
} from 'lucide-react';

interface PortfolioBlock {
  id: string;
  type: 'header' | 'about' | 'projects' | 'skills' | 'experience' | 'testimonials' | 'contact';
  title: string;
  content: any;
  position: number;
  visible: boolean;
}

interface Template {
  id: string;
  name: string;
  category: 'corporate' | 'creative' | 'tech' | 'minimalist';
  preview: string;
  description: string;
  blocks: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const CareerPortfolio = () => {
  const [step, setStep] = useState<'onboarding' | 'import' | 'template' | 'editor' | 'preview' | 'publish'>('onboarding');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [portfolioBlocks, setPortfolioBlocks] = useState<PortfolioBlock[]>([]);
  const [activeBlock, setActiveBlock] = useState<PortfolioBlock | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [seoSettings, setSeoSettings] = useState({
    title: '',
    description: '',
    keywords: ''
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    featured: false
  });

  const templates: Template[] = [
    {
      id: 'corporate-1',
      name: 'Executive Professional',
      category: 'corporate',
      preview: 'bg-gradient-to-br from-blue-600 to-blue-800',
      description: 'Clean, professional design for corporate environments',
      blocks: ['header', 'about', 'experience', 'skills', 'contact']
    },
    {
      id: 'tech-1',
      name: 'Developer Portfolio',
      category: 'tech',
      preview: 'bg-gradient-to-br from-gray-800 to-gray-900',
      description: 'Code-focused design with project showcases',
      blocks: ['header', 'about', 'projects', 'skills', 'experience', 'contact']
    },
    {
      id: 'creative-1',
      name: 'Creative Showcase',
      category: 'creative',
      preview: 'bg-gradient-to-br from-purple-600 to-pink-600',
      description: 'Visual-first design for creative professionals',
      blocks: ['header', 'about', 'projects', 'testimonials', 'contact']
    },
    {
      id: 'minimalist-1',
      name: 'Clean Minimal',
      category: 'minimalist',
      preview: 'bg-gradient-to-br from-gray-600 to-gray-700',
      description: 'Minimal design focusing on content',
      blocks: ['header', 'about', 'skills', 'experience', 'contact']
    }
  ];

  const blockLibrary = [
    {
      type: 'header',
      name: 'Header Section',
      icon: User,
      description: 'Name, title, and hero image'
    },
    {
      type: 'about',
      name: 'About Me',
      icon: FileText,
      description: 'Professional summary and bio'
    },
    {
      type: 'projects',
      name: 'Projects',
      icon: Briefcase,
      description: 'Portfolio projects and work samples'
    },
    {
      type: 'skills',
      name: 'Skills',
      icon: Target,
      description: 'Technical and soft skills'
    },
    {
      type: 'experience',
      name: 'Experience',
      icon: Clock,
      description: 'Work history and achievements'
    },
    {
      type: 'testimonials',
      name: 'Testimonials',
      icon: MessageSquare,
      description: 'Client and colleague recommendations'
    },
    {
      type: 'contact',
      name: 'Contact',
      icon: Mail,
      description: 'Contact information and social links'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file type (PDF or DOCX)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setUploadedFile(file);
      setImportStatus('uploading');
      
      // Simulate processing
      setTimeout(() => {
        setImportStatus('processing');
        setTimeout(() => {
          setImportStatus('success');
          setStep('template');
        }, 2000);
      }, 1000);
    }
  };

  const generatePortfolio = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock portfolio blocks
      const generatedBlocks: PortfolioBlock[] = selectedTemplate.blocks.map((blockType, index) => ({
        id: `${blockType}-${Date.now()}-${index}`,
        type: blockType as any,
        title: blockType.charAt(0).toUpperCase() + blockType.slice(1),
        content: generateMockContent(blockType),
        position: index,
        visible: true
      }));
      
      setPortfolioBlocks(generatedBlocks);
      setPortfolioUrl(`careerclarified.com/${Math.random().toString(36).substr(2, 9)}`);
      setStep('editor');
    } catch (error) {
      console.error('Error generating portfolio:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockContent = (blockType: string) => {
    switch (blockType) {
      case 'header':
        return {
          name: 'John Doe',
          title: 'Senior Software Engineer',
          tagline: 'Building scalable web applications with modern technologies',
          profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          backgroundImage: null
        };
      case 'about':
        return {
          summary: 'Passionate software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Love solving complex problems and mentoring junior developers.',
          highlights: [
            '5+ years of software development experience',
            'Led teams of 3-8 developers',
            'Built applications serving 100K+ users',
            'Expert in React, TypeScript, and AWS'
          ]
        };
      case 'projects':
        return [
          {
            id: '1',
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution built with React and Node.js',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
            imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/johndoe/ecommerce',
            featured: true
          },
          {
            id: '2',
            title: 'Task Management App',
            description: 'Collaborative task management tool with real-time updates',
            technologies: ['React', 'Firebase', 'Material-UI'],
            imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/johndoe/taskapp',
            featured: false
          }
        ];
      case 'skills':
        return {
          technical: [
            { name: 'React', level: 90 },
            { name: 'TypeScript', level: 85 },
            { name: 'Node.js', level: 80 },
            { name: 'AWS', level: 75 },
            { name: 'PostgreSQL', level: 70 }
          ],
          soft: [
            { name: 'Leadership', level: 85 },
            { name: 'Communication', level: 90 },
            { name: 'Problem Solving', level: 95 },
            { name: 'Mentoring', level: 80 }
          ]
        };
      case 'experience':
        return [
          {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            period: '2022 - Present',
            description: 'Led development of microservices architecture serving 100K+ users',
            achievements: [
              'Reduced deployment time by 60% through CI/CD implementation',
              'Mentored 3 junior developers',
              'Architected scalable backend systems'
            ]
          },
          {
            id: '2',
            title: 'Software Engineer',
            company: 'StartupXYZ',
            period: '2020 - 2022',
            description: 'Built responsive web applications using React and Node.js',
            achievements: [
              'Improved application performance by 40%',
              'Integrated third-party APIs',
              'Participated in agile development cycles'
            ]
          }
        ];
      case 'testimonials':
        return [
          {
            id: '1',
            name: 'Sarah Johnson',
            title: 'Product Manager',
            company: 'TechCorp Inc.',
            content: 'John is an exceptional engineer who consistently delivers high-quality solutions. His leadership and technical expertise make him invaluable to any team.',
            avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          {
            id: '2',
            name: 'Mike Wilson',
            title: 'CTO',
            company: 'StartupXYZ',
            content: 'Working with John was a pleasure. He brought innovative solutions to complex problems and helped mentor our entire development team.',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          }
        ];
      case 'contact':
        return {
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          website: 'https://johndoe.dev',
          social: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            twitter: 'https://twitter.com/johndoe'
          }
        };
      default:
        return {};
    }
  };

  const addProject = () => {
    if (!newProject.title || !newProject.description) return;
    
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies || [],
      imageUrl: newProject.imageUrl,
      liveUrl: newProject.liveUrl,
      githubUrl: newProject.githubUrl,
      featured: newProject.featured || false
    };
    
    setProjects([...projects, project]);
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      featured: false
    });
    setShowAddProject(false);
  };

  const publishPortfolio = () => {
    alert(`Portfolio published successfully!\nURL: https://${portfolioUrl}`);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      case 'desktop': return Monitor;
      default: return Monitor;
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">AI-Generated Career Portfolio/Microsite</h1>
          <p className="text-gray-400 mt-1">Create professional portfolio websites with AI</p>
        </div>
      </div>

      {/* Onboarding Step */}
      {step === 'onboarding' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Build Your Professional Portfolio in Minutes</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Our AI will analyze your resume and create a stunning, professional portfolio website that showcases your expertise and attracts opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1F2937] rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">1. Import Your Data</h3>
                <p className="text-gray-400 text-sm">Upload your resume or connect your LinkedIn profile</p>
              </div>
              
              <div className="bg-[#1F2937] rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">2. Choose Your Style</h3>
                <p className="text-gray-400 text-sm">Select from professional templates or let AI suggest</p>
              </div>
              
              <div className="bg-[#1F2937] rounded-lg p-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">3. AI Generates</h3>
                <p className="text-gray-400 text-sm">Get a complete portfolio ready to publish</p>
              </div>
            </div>

            <button
              onClick={() => setStep('import')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Start Building My Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Import Step */}
      {step === 'import' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Import Your Professional Data</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Resume Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-400" />
                  Upload Resume
                </h3>
                
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                      {importStatus === 'uploading' || importStatus === 'processing' ? (
                        <RefreshCw className="w-8 h-8 text-white animate-spin" />
                      ) : importStatus === 'success' ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <Upload className="w-8 h-8 text-white" />
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-50 mb-2">
                        {importStatus === 'uploading' ? 'Uploading...' :
                         importStatus === 'processing' ? 'Processing...' :
                         importStatus === 'success' ? 'Upload Complete!' :
                         uploadedFile ? uploadedFile.name : 'Drop your resume here'}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {importStatus === 'success' ? 'Ready to proceed to template selection' :
                         uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` :
                         'PDF or DOCX format (Max 5MB)'}
                      </p>
                    </div>
                    
                    {importStatus === 'idle' && (
                      <label
                        htmlFor="resume-upload"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer"
                      >
                        Choose File
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Integration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Link className="w-5 h-5 text-purple-400" />
                  Connect Profiles (Optional)
                </h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Linkedin className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Connect LinkedIn</div>
                      <div className="text-sm opacity-80">Import profile and experience</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    <Github className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Connect GitHub</div>
                      <div className="text-sm opacity-80">Showcase your repositories</div>
                    </div>
                  </button>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setStep('template')}
                disabled={importStatus !== 'success' && !uploadedFile}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Template Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Selection Step */}
      {step === 'template' && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Portfolio Template</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    selectedTemplate?.id === template.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-full h-32 rounded-lg mb-4 ${template.preview}`}></div>
                  <h4 className={`font-semibold mb-2 ${
                    selectedTemplate?.id === template.id ? 'text-blue-400' : 'text-gray-50'
                  }`}>
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.blocks.slice(0, 3).map((block) => (
                      <span key={block} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {block}
                      </span>
                    ))}
                    {template.blocks.length > 3 && (
                      <span className="text-xs text-gray-400">+{template.blocks.length - 3}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={generatePortfolio}
                disabled={!selectedTemplate || isGenerating}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    Generating Your Portfolio...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Generate My Portfolio
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Step */}
      {step === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Block Library */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-400" />
              Content Blocks
            </h3>
            
            <div className="space-y-3">
              {blockLibrary.map((block) => {
                const Icon = block.icon;
                const isActive = portfolioBlocks.some(b => b.type === block.type);
                
                return (
                  <div
                    key={block.type}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isActive 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${isActive ? 'text-green-400' : 'text-gray-50'}`}>
                          {block.name}
                        </h4>
                        <p className="text-xs text-gray-400">{block.description}</p>
                      </div>
                      {isActive && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3">AI Assistant</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors text-sm">
                  Enhance content with AI
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors text-sm">
                  Suggest color scheme
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors text-sm">
                  Optimize for SEO
                </button>
              </div>
            </div>
          </div>

          {/* Center - Portfolio Preview */}
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl border border-gray-700/50 overflow-hidden">
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">Portfolio Preview</h3>
                  <span className="text-sm text-gray-400">careerclarified.com/{portfolioUrl.split('/')[1]}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {['mobile', 'tablet', 'desktop'].map((device) => {
                    const Icon = getDeviceIcon(device);
                    return (
                      <button
                        key={device}
                        onClick={() => setPreviewDevice(device as any)}
                        className={`p-2 rounded-lg transition-colors ${
                          previewDevice === device 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Portfolio Preview Content */}
              <div className="p-6 bg-white min-h-96">
                <div className={`mx-auto transition-all duration-300 ${
                  previewDevice === 'mobile' ? 'max-w-sm' :
                  previewDevice === 'tablet' ? 'max-w-2xl' :
                  'max-w-full'
                }`}>
                  {/* Mock Portfolio Content */}
                  <div className="text-center mb-8">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">John Doe</h1>
                    <p className="text-xl text-gray-600 mb-4">Senior Software Engineer</p>
                    <p className="text-gray-700">Building scalable web applications with modern technologies</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
                      <p className="text-gray-700 leading-relaxed">
                        Passionate software engineer with 5+ years of experience building scalable web applications. 
                        Expertise in React, Node.js, and cloud technologies.
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">React</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">TypeScript</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="w-18 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Customization */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Customization</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio URL</label>
                  <div className="flex">
                    <span className="px-3 py-2 bg-gray-700 border border-gray-600 border-r-0 rounded-l-lg text-gray-300 text-sm">
                      careerclarified.com/
                    </span>
                    <input
                      type="text"
                      value={portfolioUrl.split('/')[1] || ''}
                      onChange={(e) => setPortfolioUrl(`careerclarified.com/${e.target.value}`)}
                      className="flex-1 px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-r-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                  <select className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
                    <option>Professional Blue</option>
                    <option>Creative Purple</option>
                    <option>Tech Dark</option>
                    <option>Minimal Gray</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Custom Domain (Premium)</label>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="yourname.com"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Page Title</label>
                  <input
                    type="text"
                    value={seoSettings.title}
                    onChange={(e) => setSeoSettings({...seoSettings, title: e.target.value})}
                    placeholder="John Doe - Senior Software Engineer"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
                  <textarea
                    value={seoSettings.description}
                    onChange={(e) => setSeoSettings({...seoSettings, description: e.target.value})}
                    placeholder="Professional portfolio showcasing..."
                    rows={3}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setStep('preview')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Preview Portfolio
              </button>
              
              <button
                onClick={publishPortfolio}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                Publish Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Step */}
      {step === 'preview' && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Portfolio Preview</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('editor')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={publishPortfolio}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Globe className="w-4 h-4" />
                  Publish
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 min-h-96">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">John Doe</h1>
                <p className="text-xl text-gray-600 mb-6">Senior Software Engineer</p>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Building scalable web applications with modern technologies. Passionate about creating 
                  exceptional user experiences and leading high-performing development teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Step */}
      {step === 'publish' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Portfolio Published Successfully!</h2>
            <p className="text-gray-300 mb-8">
              Your professional portfolio is now live and ready to share with potential employers and clients.
            </p>

            <div className="bg-[#1F2937] rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-gray-300 text-sm">Your portfolio is live at:</p>
                  <p className="text-blue-400 font-medium">https://{portfolioUrl}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(`https://${portfolioUrl}`)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => window.open(`https://${portfolioUrl}`, '_blank')}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep('editor')}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Continue Editing
              </button>
              <button
                onClick={() => alert('Sharing options coming soon!')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Share Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPortfolio;