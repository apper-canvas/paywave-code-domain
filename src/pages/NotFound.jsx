import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const AlertCircle = getIcon('AlertCircle');
  const Home = getIcon('Home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={itemVariants}
        className="w-24 h-24 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6"
      >
        <AlertCircle className="w-12 h-12 text-red-500" />
      </motion.div>
      
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        404
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl md:text-2xl font-medium mb-2"
      >
        Page Not Found
      </motion.p>
      
      <motion.p 
        variants={itemVariants}
        className="text-surface-600 dark:text-surface-400 max-w-md mb-8"
      >
        The page you are looking for doesn't exist or has been moved.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Link 
          to="/" 
          className="btn btn-primary flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;