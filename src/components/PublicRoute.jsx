import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicRoute() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  
  // If already authenticated and trying to access login/signup, redirect to dashboard
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Otherwise, render the public content
  return <Outlet />;
}

export default PublicRoute;