import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, ChevronLeft, Bell, User, LogOut } from 'lucide-react';
import { theme } from '@/theme';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, onBackClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleLogout = () => {
    logout();
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
          {/* <span className="text-white opacity-90 mr-4">Learning Assistant</span> */}
          
          {/* Notification Bell */}
          {/* <div className="relative">
            <button className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-blue-800"></span>
            </button>
          </div> */}
          
          {/* User Profile Dropdown */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full items-center" style={{ backgroundColor: theme.background.secondary }}>
                  <User className="w-5 h-5 text-white" />
                  {/* <span className="text-white text-sm hidden md:inline">{user.name}</span> */}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                    {/* <span className="text-xs font-semibold mt-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full inline-block w-fit">{user.role}</span> */}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            location.pathname !== '/signin' && (
              <Button 
                variant="ghost" 
                className="text-white"
                style={{ backgroundColor: theme.background.secondary }}
                onClick={() => navigate('/signin')}
              >
                {/* <User className="w-5 h-5 mr-2" /> */}
                Sign In
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
