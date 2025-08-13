import React, { useState } from 'react';
import { MessageCircle, Target, Sparkles, Copy, RefreshCw, Send, ThumbsUp } from 'lucide-react';

const CommentHelper = () => {
  const [postUrl, setPostUrl] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('start_conversation');
  const [selectedTone, setSelectedTone] = useState('professional_friendly');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComments, setGeneratedComments] = useState<string[]>([]);
  const [postContent, setPostContent] = useState('');

  const goals = [
    { id: 'start_conversation', name: 'Start Conversation', description: 'Comments designed to encourage dialogue' },
    { id: 'show_support', name: 'Show Support', description: 'Positive reinforcement and agreement' },
    { id: 'share_experience', name: 'Share Experience', description: 'Personal anecdotes and relevant experiences' },
    { id: 'ask_question', name: 'Ask Clarifying Question', description: 'Thoughtful questions showing genuine interest' },
    { id: 'demonstrate_expertise', name: 'Demonstrate Expertise', description: 'Subtly showcase knowledge and skills' },
    { id: 'offer_different_perspective', name: 'Offer Different Perspective', description: 'Respectful alternative viewpoints' }
  ];

  const tones = [
    { id: 'professional_friendly', name: 'Professional Friendly', description: 'Warm, peer-to-peer interaction' },
    { id: 'formal_executive', name: 'Formal Executive', description: 'Conservative, executive-level communication' },
    { id: 'industry_expert', name: 'Industry Expert', description: 'Authoritative but approachable expertise' },
    { id: 'curious_learner', name: 'Curious Learner', description: 'Inquisitive, learning-focused engagement' },
    { id: 'collaborative', name: 'Collaborative Professional', description: 'Team-oriented, partnership-focused' },
    { id: 'enthusiastic', name: 'Enthusiastic Advocate', description: 'Positive, energetic support' }
  ];

  const generateComments = async () => {
    if (!postContent.trim() && !postUrl.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockComments = [
        "This really resonates with me! I've seen similar challenges in my experience with remote teams. How do you handle time zone differences when implementing these strategies?",
        "Great insights here! 👏 The point about communication tools is spot-on. We've found that setting clear expectations upfront makes all the difference. What's been your biggest learning curve?",
        "Love this perspective! I'm curious about your thoughts on maintaining company culture in a remote setting. Have you found any particular approaches that work well?",
        "Excellent points! This aligns perfectly with what we've implemented at our company. The results have been remarkable, especially around productivity metrics.",
        "Thanks for sharing this! 🙌 I'd love to hear more about the tools you mentioned. Are there any specific platforms you'd recommend for teams just starting their remote journey?"
      ];
      
      setGeneratedComments(mockComments);
    } catch (error) {
      console.error('Error generating comments:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyComment = (comment: string) => {
    navigator.clipboard.writeText(comment);
    // You could add a toast notification here
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Comment Helper</h1>
          <p className="text-gray-400 mt-1">Generate strategic comments for engagement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Input */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-400" />
              Post to Comment On
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn Post URL (Optional)
                </label>
                <input
                  type="url"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  placeholder="https://linkedin.com/posts/..."
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="text-center text-gray-400 text-sm">
                — OR —
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Paste Post Content
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Paste the post content you want to comment on..."
                  rows={6}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Goal Selection */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Comment Goal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    selectedGoal === goal.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h4 className={`font-medium mb-1 ${
                    selectedGoal === goal.id ? 'text-indigo-400' : 'text-gray-50'
                  }`}>
                    {goal.name}
                  </h4>
                  <p className="text-sm text-gray-400">{goal.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Communication Style
            </h3>
            
            <div className="space-y-3">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedTone === tone.id
                      ? 'bg-indigo-500/20 border border-indigo-500/30'
                      : 'bg-gray-700/30 hover:bg-gray-700/50'
                  }`}
                >
                  <h4 className="font-medium text-gray-50 mb-1">{tone.name}</h4>
                  <p className="text-sm text-gray-400">{tone.description}</p>
                </button>
              ))}
            </div>

            <button
              onClick={generateComments}
              disabled={(!postContent.trim() && !postUrl.trim()) || isGenerating}
              className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Comments...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Comments
                </>
              )}
            </button>
          </div>

          {/* Generated Comments */}
          {generatedComments.length > 0 && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Generated Comments</h3>
              <div className="space-y-4">
                {generatedComments.map((comment, index) => (
                  <div key={index} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-300 mb-4 leading-relaxed">{comment}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Engagement Score: {85 + (index * 2)}/100</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyComment(comment)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                          <Send className="w-4 h-4" />
                          Use
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Comment Tips */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Engagement Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Ask thoughtful questions to encourage responses</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Share relevant personal experiences</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Add value with insights or resources</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Keep comments authentic and genuine</p>
              </div>
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-50 font-medium">Tech Leadership Post</p>
                <p className="text-gray-400">3 replies • 2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-50 font-medium">Remote Work Discussion</p>
                <p className="text-gray-400">8 replies • 1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-50 font-medium">Industry Trends Analysis</p>
                <p className="text-gray-400">2 replies • 3 days ago</p>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Comment Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">This Week</span>
                <span className="text-indigo-400 font-semibold">12 comments</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg. Replies</span>
                <span className="text-green-400 font-semibold">2.4 per comment</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Connections Made</span>
                <span className="text-blue-400 font-semibold">5 new</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentHelper;

