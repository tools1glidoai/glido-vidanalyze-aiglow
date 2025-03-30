import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function VideoAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a video file');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const analysisRequest = {
        prompt: prompt || 'Analyze the video for storytelling, hook effectiveness, and transitions.'
      };
      formData.append('analysis_request', JSON.stringify(analysisRequest));

      const response = await fetch('http://localhost:8000/api/analyze-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message);
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Video Analysis with Gemini AI</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload Video</label>
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Analysis Prompt (Optional)</label>
            <Textarea
              placeholder="Enter your analysis prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={loading || !file}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Video...
              </>
            ) : (
              'Analyze Video'
            )}
          </Button>

          {analysis && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Analysis Results:</h3>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {analysis}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 