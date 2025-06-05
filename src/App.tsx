
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";
import Speech from "./pages/Speech";
import AnalyzingSpeech from "./pages/AnalyzingSpeech";
import AssessmentResult from "./pages/AssessmentResult";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
            
            {/* Protected routes */}
            <Route path="/welcome" element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } />
            <Route path="/speech" element={
              <ProtectedRoute>
                <Speech />
              </ProtectedRoute>
            } />
            <Route path="/analyzing" element={
              <ProtectedRoute>
                <AnalyzingSpeech />
              </ProtectedRoute>
            } />
            <Route path="/result" element={
              <ProtectedRoute>
                <AssessmentResult />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
