
import React, { useState } from 'react';
import FrostedPanel from './FrostedPanel';

interface PromptStepProps {
  onPromptSubmit: (prompt: string) => void;
}

const PromptStep = ({ onPromptSubmit }: PromptStepProps) => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate prompt
    if (!prompt.trim()) {
      setError('Please enter an analysis prompt');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Submit the prompt
    onPromptSubmit(prompt);
  };

  return (
    <div className="animate-slide-up w-full max-w-2xl mx-auto">
      <FrostedPanel className="p-8">
        <div className="mb-6 flex items-center">
          <div className="step-indicator active">1</div>
          <h2 className="ml-3 text-xl font-semibold text-glido-charcoal">What would you like to analyze?</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label 
              htmlFor="prompt" 
              className="block mb-2 text-sm font-medium text-glido-charcoal"
            >
              Describe what aspects of the video you want feedback on
            </label>
            <textarea
              id="prompt"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-glido-gray/30 focus:border-glido-purple/50 focus:ring-2 focus:ring-glido-purple/20 focus:outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none"
              placeholder="E.g., Analyze this video for storytelling effectiveness, visual pacing, and audience engagement potential..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="btn-primary flex items-center gap-2"
            >
              <span>Continue</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>
      </FrostedPanel>
    </div>
  );
};

export default PromptStep;
