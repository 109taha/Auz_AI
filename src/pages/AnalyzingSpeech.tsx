
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AnalyzingSpeech = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate analysis time and redirect to results
    const timer = setTimeout(() => {
      navigate('/result');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="text-center text-white">
        {/* Spinning loader */}
        <div className="mb-8">
          <Loader2 className="w-16 h-16 animate-spin mx-auto text-white" />
        </div>

        {/* Analyzing text */}
        <h1 className="text-2xl font-semibold mb-6">Analyzing speech...</h1>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-1 mb-8">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Progress bars */}
        <div className="space-y-3 max-w-xs mx-auto">
          <div className="h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse w-3/4"></div>
          </div>
          <div className="h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse w-1/2" style={{ animationDelay: '0.3s' }}></div>
          </div>
          <div className="h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse w-2/3" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingSpeech;
