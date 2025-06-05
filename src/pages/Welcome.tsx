
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, GraduationCap } from "lucide-react";
import { theme } from "@/theme";
import Header from "@/components/Header";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/speech');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background.primary }}>
      <Header />
      <div className="flex-1 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        {/* <div className="text-center text-white mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold">AUZ AI</h1>
          </div>
          <p className="text-lg opacity-90">Welcome Alex Johnson</p>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Student Information Card */}
          <Card className="bg-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-800">Alex Johnson</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-gray-800">STUDENT</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">December 26, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ready to Begin Section */}
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-lg opacity-90 mb-6 leading-relaxed">
              Start your AI assessment Journey assessment and get instant feedback on your pronunciation and fluency.
            </p>
            <Button
              onClick={handleStartAssessment}
              className="bg-[#FFC95E] text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Assessment
            </Button>
            <p className="text-sm opacity-75 mt-4">
              Click to start a quick 5-10 minute assessment
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Welcome;
