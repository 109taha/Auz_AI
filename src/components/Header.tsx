import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronLeft, Bell, User } from 'lucide-react';
import { theme } from '@/theme';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, onBackClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="w-full py-4 px-6 shadow-lg relative z-10" style={{ backgroundColor: theme.background.primary }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
         
          {/* Logo and Title */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <img 
              src="/logo.png" 
              alt="AUZ AI Logo" 
              className="w-12 h-12 mr-3" 
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white">AUZ AI</h1>
              <span className="text-sm text-white">Speech Assessment</span>
            </div>
          </div>
        </div>

        {/* Right side - can be used for user info, menu, etc. */}
        <div className="flex items-center space-x-4">
          <span className="text-white opacity-90 mr-4">Learning Assistant</span>
          
          {/* Notification Bell */}
          <div className="relative">
            <button className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-blue-800"></span>
            </button>
          </div>
          
          {/* User Profile Icon */}
          <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
