import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials (in production, this should be in a secure backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'ramstone2024!',
  id: 'admin-001',
  role: 'admin' as const
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const storedUser = localStorage.getItem('ramstone_admin_user');
        const sessionExpiry = localStorage.getItem('ramstone_admin_expiry');
        
        if (storedUser && sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry);
          const currentTime = Date.now();
          
          if (currentTime < expiryTime) {
            // Session is still valid
            setUser(JSON.parse(storedUser));
          } else {
            // Session expired, clear storage
            localStorage.removeItem('ramstone_admin_user');
            localStorage.removeItem('ramstone_admin_expiry');
          }
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('ramstone_admin_user');
        localStorage.removeItem('ramstone_admin_expiry');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const userData: User = {
          id: ADMIN_CREDENTIALS.id,
          username: ADMIN_CREDENTIALS.username,
          role: ADMIN_CREDENTIALS.role
        };
        
        // Set session expiry to 24 hours
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
        
        // Store in localStorage
        localStorage.setItem('ramstone_admin_user', JSON.stringify(userData));
        localStorage.setItem('ramstone_admin_expiry', expiryTime.toString());
        
        setUser(userData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ramstone_admin_user');
    localStorage.removeItem('ramstone_admin_expiry');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
