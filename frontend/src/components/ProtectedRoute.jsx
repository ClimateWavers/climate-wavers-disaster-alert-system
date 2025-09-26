import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../utils/factory';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = getUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the intended destination for redirect after login
    const currentPath = location.pathname + location.search;
    return <Navigate to={`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
