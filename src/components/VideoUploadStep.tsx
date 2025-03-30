
import React, { useState, useRef } from 'react';
import FrostedPanel from './FrostedPanel';
import ProgressBar from './ProgressBar';
import { validateVideo, formatFileSize, ALLOWED_FILE_TYPES } from '@/lib/videoUtils';

interface VideoUploadStepProps {
  prompt: string;
  onBack: () => void;
  onVideoSubmit: (file: File) => void;
}

const VideoUploadStep = ({ prompt, onBack, onVideoSubmit }: VideoUploadStepProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validation = validateVideo(file);
    
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setSelectedFile(null);
      return;
    }
    
    setError('');
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onVideoSubmit(selectedFile);
    } else {
      setError('Please select a video to upload');
    }
  };

  return (
    <div className="animate-slide-up w-full max-w-2xl mx-auto">
      <FrostedPanel className="p-8">
        <div className="mb-6 flex items-center">
          <div className="step-indicator active">2</div>
          <h2 className="ml-3 text-xl font-semibold text-glido-charcoal">Upload your video</h2>
        </div>
        
        <div className="mb-5">
          <p className="text-sm font-medium text-glido-charcoal mb-1">Analysis prompt:</p>
          <div className="bg-glido-light-purple/30 p-3 rounded-lg text-sm text-glido-charcoal/90 border border-glido-purple/10">
            {prompt}
          </div>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragging 
              ? 'border-glido-purple/70 bg-glido-purple/5' 
              : selectedFile 
                ? 'border-green-400/70 bg-green-50/30' 
                : 'border-glido-gray/40 hover:border-glido-purple/40 hover:bg-glido-light-purple/10'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={ALLOWED_FILE_TYPES.join(',')}
            className="hidden"
          />
          
          {selectedFile ? (
            <div className="py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-medium text-glido-charcoal">{selectedFile.name}</p>
              <p className="text-sm text-glido-charcoal/70 mt-1">{formatFileSize(selectedFile.size)}</p>
            </div>
          ) : (
            <div className="py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-glido-purple/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="font-medium text-glido-charcoal mb-1">
                Drag and drop your video here
              </p>
              <p className="text-sm text-glido-charcoal/70">
                or click to browse files
              </p>
              <p className="text-xs text-glido-charcoal/50 mt-3">
                Supported formats: MP4, MOV, WebM (Max size: 50MB)
              </p>
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-3 text-red-500 text-sm">{error}</p>
        )}
        
        <div className="flex justify-between mt-6">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onBack}
          >
            Back
          </button>
          
          <button 
            type="button" 
            className={`btn-primary ${!selectedFile && 'opacity-50 cursor-not-allowed'}`}
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Analyze Video
          </button>
        </div>
      </FrostedPanel>
    </div>
  );
};

export default VideoUploadStep;
