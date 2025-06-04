
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, ArrowLeft } from "lucide-react";

const Speech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const navigate = useNavigate();

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording and go to analyzing page
      setIsRecording(false);
      navigate('/analyzing');
    } else {
      // Start recording
      setIsRecording(true);
      setShowMessage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center text-white mb-8 pt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/welcome')}
            className="text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Speech Assessment</h1>
        </div>

        <div className="text-center">
          {/* Message Card */}
          {showMessage && (
            <Card className="bg-white/90 backdrop-blur-sm p-6 mb-8 mx-auto max-w-md">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-800 text-left">
                  Hi, I'm here to help improve your speaking skills.
                </p>
              </div>
            </Card>
          )}

          {/* Microphone Button */}
          <div className="mb-8">
            <Button
              onClick={toggleRecording}
              size="lg"
              className={`w-32 h-32 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-12 h-12 text-white" />
              ) : (
                <Mic className="w-12 h-12 text-blue-600" />
              )}
            </Button>
          </div>

          {/* Status Text */}
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">
              {isRecording ? 'Recording...' : 'Start Speaking'}
            </h2>
            <p className="text-lg opacity-90 mb-6">
              {isRecording 
                ? 'Speak clearly into your device' 
                : 'Record up to 60 seconds of your speech'
              }
            </p>

            {!isRecording && (
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => navigate('/welcome')}
              >
                Back to Assessment
              </Button>
            )}
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-semibold">Recording</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Speech;
