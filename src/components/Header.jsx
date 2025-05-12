import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import getIcon from '../utils/iconUtils';

const Header = ({ isDarkMode, toggleDarkMode, isAuthenticated, logout }) => {
  const user = useSelector(state => state.user.user);
  const Moon = getIcon('Moon');
  const Sun = getIcon('Sun');
  const Wallet = getIcon('Wallet');
  const LogOut = getIcon('LogOut');
  const User = getIcon('User');

  return (
    <header className="py-4 px-4 md:px-6 bg-white dark:bg-surface-800 shadow-soft">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary via-primary-light to-accent flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Wallet className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              PayWave
            </h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="flex items-center mr-4">
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{user?.firstName || 'User'}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 ml-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  aria-label="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;