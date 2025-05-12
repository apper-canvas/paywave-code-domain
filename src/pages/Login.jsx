import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../App';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[80vh] items-center justify-center"
    >
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-surface-800 rounded-2xl shadow-card">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">Welcome Back</h1>
          <p className="mt-2 text-surface-600 dark:text-surface-400">Sign in to your account</p>
        </div>
        
        <div id="authentication" className="min-h-[400px]"></div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;