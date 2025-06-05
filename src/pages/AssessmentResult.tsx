
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Target, ArrowRight, User } from "lucide-react";
import { theme } from "@/theme";
import Header from "@/components/Header";

const AssessmentResult = () => {
  const navigate = useNavigate();

  const feedbackItems = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: "Your pronunciation was clear",
      type: "success"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      text: "You used 12 filler words like 'um', 'like'",
      type: "warning"
    },
    {
      icon: <Target className="w-5 h-5 text-blue-500" />,
      text: "Your tone lacked confidence in sales pitch",
      type: "info"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background.primary }}>
      <Header 
        showBackButton={true} 
        onBackClick={() => navigate('/speech')} 
      />
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-2xl">
        <div className="text-center text-white mb-8 pt-8">
          {/* Profile icon */}
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Assessment Result</h1>
        </div>

        <div className="space-y-4 mb-8">
          {/* Feedback Cards */}
          {feedbackItems.map((item, index) => (
            <Card key={index} className="bg-[#3b6080]  backdrop-blur-sm p-4">
              <div className="flex items-center space-x-3">
                {item.icon}
                <p className="text-white flex-1">{item.text}</p>
              </div>
            </Card>
          ))}

          {/* Course Assignment Card */}
          <Card className="bg-[#3b6080] text-white backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-white font-medium">Assigned Course: Confidence in Sales</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-gray-600" />
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/80 text-sm mb-6">Powered by AUZ AI</p>
          
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/welcome')}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3"
            >
              Take Another Assessment
            </Button>
            
            <Button
              onClick={() => navigate('/welcome')}
              variant="outline"
              className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              View Assigned Course
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
