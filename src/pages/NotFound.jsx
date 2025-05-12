import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const AlertCircle = getIcon('AlertCircle');
  const Home = getIcon('Home');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="w-20 h-20 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-primary" />
      </div>
      
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        to={isAuthenticated ? "/dashboard" : "/"} 
        className="btn btn-primary flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        <span>Back to {isAuthenticated ? "Dashboard" : "Home"}</span>
      </Link>
    </motion.div>
  );
};

export default NotFound;