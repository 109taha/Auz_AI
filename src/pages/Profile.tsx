import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Award, Calendar, Clock, BarChart, BookOpen } from "lucide-react";
import { theme } from "@/theme";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Mock assessment history data
  const assessmentHistory = [
    { id: 1, date: "June 5, 2025", score: 85, duration: "8 min" },
    { id: 2, date: "May 28, 2025", score: 78, duration: "7 min" },
    { id: 3, date: "May 15, 2025", score: 73, duration: "9 min" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background.primary }}>
      <Header />
      <div className="container mx-auto py-8 px-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile Card */}
          <Card className="shadow-xl border-none text-white" style={{ backgroundColor: theme.background.secondary }}>
            <CardHeader className="text-center pb-2">
                <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-4 border-4 border-blue-500">
                  <User className="w-12 h-12 text-white" />
                    </div>
                <CardTitle className="text-2xl font-bold text-white">{user?.name}</CardTitle>
                <p className="text-white font-medium">{user?.role}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-t border-white pt-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-5">
                    <Mail className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-sm text-white">Email</p>
                      <p className="font-medium text-white">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <Award className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-sm text-white">ID</p>
                      <p className="font-medium text-white">AUZ-{new Date().getFullYear()}-{user?.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5">
                    <Calendar className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-sm text-white">Joined</p>
                      <p className="font-medium text-white">January 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              </CardContent>
            </Card>

          <div className="flex flex-col gap-8 md:col-span-2">
            {/* Assessment Overview */}
            <Card className="shadow-xl border-none" style={{ backgroundColor: theme.background.secondary }}>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Assessment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  {assessmentHistory.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex flex-col items-center"
                    >
                      <div className="h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full mb-2">
                        <BarChart className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">{assessment.score}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-white opacity-75">Speech Assessment #{assessment.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Courses Assigned */}
            <Card className="shadow-xl border-none" style={{ backgroundColor: theme.background.secondary }} >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Courses Assigned</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Confidence in Sales */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <p className="text-white font-medium">Confidence in Sales</p>
                      <p className="text-xs text-white opacity-75">In Progress</p>
                    </div>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <p className="text-xs text-white">75%</p>
                  </div>
                </div>

                {/* Professional Presentations */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <p className="text-white font-medium">Professional Presentations</p>
                      <p className="text-xs text-white opacity-75">Completed</p>
                    </div>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <p className="text-xs text-white">100%</p>
                  </div>
                </div>

                {/* Advanced Communication */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <p className="text-white font-medium">Advanced Communication</p>
                      <p className="text-xs text-white opacity-75">In Progress</p>
                    </div>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <p className="text-xs text-white">30%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Feedback */}
          <Card className="shadow-xl border-none" style={{ backgroundColor: theme.background.secondary }} >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Assessment Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-5">
                {/* Excellent Pronunciation */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">Excellent Pronunciation</p>
                    <p className="text-xs text-white opacity-75">Your pronunciation was clear and well-articulated throughout the assessment.</p>
                  </div>
                </div>

                {/* Filler Words */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.9941 16H12.0031" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">Filler Words Detected</p>
                    <p className="text-xs text-white opacity-75">Used 12 filler words like 'um', 'like' - try to minimize these for better fluency.</p>
                  </div>
                </div>

                {/* Confidence Improvement */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">Confidence Improvement</p>
                    <p className="text-xs text-white opacity-75">Tone could be more confident in sales pitch scenarios. Practice assertive speaking.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
