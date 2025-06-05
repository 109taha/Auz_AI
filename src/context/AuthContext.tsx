import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define user type
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Define dummy users
export const dummyUsers: User[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'STUDENT',
    avatar: '/avatars/alex.png'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'STUDENT',
    avatar: '/avatars/sarah.png'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'TEACHER',
    avatar: '/avatars/michael.png'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'ADMIN',
    avatar: '/avatars/emma.png'
  }
];

// Define auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = (email: string, password: string): boolean => {
    // In a real app, you would validate the password
    // For this demo, we'll accept any password
    const foundUser = dummyUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
