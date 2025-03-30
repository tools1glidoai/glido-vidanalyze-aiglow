
import React, { useState, useEffect } from 'react';
import FrostedPanel from './FrostedPanel';
import ProgressBar from './ProgressBar';

interface ResultsStepProps {
  prompt: string;
  videoFile: File;
  onReset: () => void;
  processingResult: string | null;
  isProcessing: boolean;
  processingProgress: number;
}

const ResultsStep = ({ 
  prompt, 
  videoFile, 
  onReset, 
  processingResult, 
  isProcessing,
  processingProgress 
}: ResultsStepProps) => {
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  
  // Format the result with line breaks
  const formattedResult = processingResult?.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  // Show shortened prompt if it's too long
  const displayPrompt = prompt.length > 100 && !showFullPrompt
    ? `${prompt.substring(0, 100)}...`
    : prompt;

  return (
    <div className="animate-slide-up w-full max-w-3xl mx-auto">
      <FrostedPanel className="p-8">
        <div className="mb-6 flex items-center">
          <div className="step-indicator active">3</div>
          <h2 className="ml-3 text-xl font-semibold text-glido-charcoal">
            {isProcessing ? 'Processing your video' : 'Analysis Results'}
          </h2>
        </div>
        
        {/* Summary section */}
        <div className="mb-6 bg-white/50 rounded-lg p-4 border border-glido-gray/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-glido-charcoal/70">Prompt</p>
              <p className="text-sm text-glido-charcoal mt-1">
                {displayPrompt}
                {prompt.length > 100 && (
                  <button
                    type="button"
                    className="ml-1 text-glido-purple hover:text-glido-purple/80 text-xs font-medium"
                    onClick={() => setShowFullPrompt(!showFullPrompt)}
                  >
                    {showFullPrompt ? 'Show less' : 'Show more'}
                  </button>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-glido-charcoal/70">Video</p>
              <p className="text-sm text-glido-charcoal mt-1">{videoFile.name}</p>
            </div>
          </div>
        </div>
        
        {isProcessing ? (
          <div className="py-10 text-center">
            <div className="mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium text-glido-purple">
                  {Math.round(processingProgress)}%
                </p>
              </div>
              <svg className="w-32 h-32 mx-auto animate-pulse-soft" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E5DEFF"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#9b87f5"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - processingProgress / 100)}
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <div className="max-w-md mx-auto">
              <p className="text-glido-charcoal font-medium mb-4">Analyzing your video</p>
              <p className="text-sm text-glido-charcoal/70 mb-6">
                Our AI is processing the video and generating insightful feedback based on your prompt.
                This may take a moment...
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-glido-purple/20 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${processingProgress > 30 ? 'bg-glido-purple' : 'bg-transparent'}`}></div>
                  </div>
                  <p className={`text-sm ${processingProgress > 30 ? 'text-glido-charcoal' : 'text-glido-charcoal/50'}`}>Analyzing composition and framing</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-glido-purple/20 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${processingProgress > 60 ? 'bg-glido-purple' : 'bg-transparent'}`}></div>
                  </div>
                  <p className={`text-sm ${processingProgress > 60 ? 'text-glido-charcoal' : 'text-glido-charcoal/50'}`}>Evaluating pacing and transitions</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-glido-purple/20 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${processingProgress > 85 ? 'bg-glido-purple' : 'bg-transparent'}`}></div>
                  </div>
                  <p className={`text-sm ${processingProgress > 85 ? 'text-glido-charcoal' : 'text-glido-charcoal/50'}`}>Generating detailed feedback</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="mb-3 flex items-center">
              <div className="w-3 h-3 bg-glido-purple rounded-full mr-2"></div>
              <h3 className="text-lg font-medium text-glido-charcoal">AI Analysis</h3>
            </div>
            
            <FrostedPanel intensity="light" className="p-6 mb-6">
              <div className="prose prose-sm max-w-none text-glido-charcoal/90 whitespace-pre-line">
                {formattedResult}
              </div>
            </FrostedPanel>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={onReset}
              >
                Start New Analysis
              </button>
              
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  // Here you would implement download functionality
                  alert('Download functionality would be implemented here');
                }}
              >
                Download Analysis
              </button>
            </div>
          </div>
        )}
      </FrostedPanel>
    </div>
  );
};

export default ResultsStep;
