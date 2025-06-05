
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Info } from "lucide-react";
import { theme } from "@/theme";
import { useAuth, dummyUsers } from "@/context/AuthContext";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the page they were trying to access
  const from = location.state?.from?.pathname || "/welcome";

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(email, password)) {
      // Successful login
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background.primary }}>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex flex-col items-center ">
            <img 
              src="/logo.png" 
              alt="AUZ AI Logo" 
              className="w-20 h-20 mb-3" 
            />
            {/* <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">AUZ AI</h1>
              <span className="text-sm text-gray-600">Speech Assessment</span>
            </div> */}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-blue-500"
                required
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button 
              type="submit"
              className="w-full text-white py-3 rounded-lg font-semibold"
              style={{ backgroundColor: theme.background.secondary }}
            >
              Sign In
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account? <a href="#" className=" hover:underline" style={{ color: theme.colors.tertiary }}>Contact your administrator</a>
            </p>
          </div>
          
          {/* Demo Users Section */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex items-center mb-2">
              <Info className="w-4 h-4 text-blue-500 mr-2" />
              <p className="text-sm font-medium text-gray-700">Demo Users</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {dummyUsers.map(user => (
                <Button 
                  key={user.id}
                  type="button"
                  variant="outline"
                  className="text-xs py-1 h-auto justify-start"
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('password'); // Any password works for demo
                    toast.info(`Credentials filled for ${user.name}`);
                  }}
                >
                  <div className="truncate text-left">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default SignIn;
