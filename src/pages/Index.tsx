
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-6">AUZ AI</h1>
        <p className="text-xl mb-8 opacity-90">AI-Powered Learning Assistant</p>
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/signin')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
