import React, { useState, useEffect } from 'react';
import PromptStep from '@/components/PromptStep';
import VideoUploadStep from '@/components/VideoUploadStep';
import ResultsStep from '@/components/ResultsStep';
import { processVideoWithGemini } from '@/lib/videoUtils';
import { VideoAnalysis } from "@/components/VideoAnalysis";

type Step = 'prompt' | 'upload' | 'result';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [processingResult, setProcessingResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Handle prompt submission
  const handlePromptSubmit = (enteredPrompt: string) => {
    setPrompt(enteredPrompt);
    setCurrentStep('upload');
  };

  // Handle video submission
  const handleVideoSubmit = async (file: File) => {
    setVideoFile(file);
    setCurrentStep('result');
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      // Use the Gemini API integration instead of simulation
      const result = await processVideoWithGemini(
        file, 
        prompt,
        (progress) => setProcessingProgress(progress)
      );
      
      if (result.success && result.result) {
        setProcessingResult(result.result);
      } else {
        throw new Error(result.error || 'An error occurred during processing');
      }
    } catch (error) {
      console.error('Processing error:', error);
      setProcessingResult('Error: Unable to process the video. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset the application state
  const handleReset = () => {
    setCurrentStep('prompt');
    setPrompt('');
    setVideoFile(null);
    setProcessingResult(null);
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep === 'upload') {
      setCurrentStep('prompt');
    } else if (currentStep === 'result') {
      setCurrentStep('upload');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <VideoAnalysis />
      </main>
    </div>
  );
};

export default Index;
