import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { theme } from "@/theme";
import Header from "@/components/Header";

const AnalyzingSpeech = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState("Analyzing speech patterns...");

  useEffect(() => {
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Update analysis steps
    const steps = [
      "Analyzing speech patterns...",
      "Evaluating pronunciation...",
      "Assessing fluency...",
      "Calculating accuracy score...",
      "Generating feedback..."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnalysisStep(step);
      }, index * 1000);
    });

    // Redirect to results
    const timer = setTimeout(() => {
      navigate('/result');
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background.primary }}>
      <Header 
        showBackButton={false}
      />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-white max-w-md w-full px-4">
          {/* Progress bar */}
          <div className="mb-8 relative">
            <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-white/70 mt-2 text-right">{progress}% Completed</p>
          </div>
          
          {/* Analysis text */}
          <h2 className="text-2xl font-bold mb-6">{analysisStep}</h2>
          
          {/* Audio waveform animation */}
          <div className="mb-8 flex justify-center items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 bg-blue-400 rounded-full animate-pulse" 
                style={{
                  height: `${20 + Math.random() * 30}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.7 + Math.random() * 0.6}s`
                }}
              ></div>
            ))}
            {/* <div className="w-8"></div>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i+5} 
                className="w-1.5 bg-blue-400 rounded-full animate-pulse" 
                style={{
                  height: `${20 + Math.random() * 30}px`,
                  animationDelay: `${(i+5) * 0.1}s`,
                  animationDuration: `${0.7 + Math.random() * 0.6}s`
                }}
              ></div>
            ))} */}
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-1 mb-8">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>

          <p className="text-lg opacity-90 mb-2">Please wait while we analyze your speech...</p>
          <p className="text-sm text-white/70">This will only take a few moments</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingSpeech;
