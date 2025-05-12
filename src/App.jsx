import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './store/userSlice';
import getIcon from './utils/iconUtils';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Components
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [todoData, setTodoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState({
    utc: dayjs().utc().format('YYYY-MM-DD HH:mm:ss'),
    local: dayjs().format('YYYY-MM-DD HH:mm:ss')
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime({
        utc: dayjs().utc().format('YYYY-MM-DD HH:mm:ss'),
        local: dayjs().format('YYYY-MM-DD HH:mm:ss')
      });
    }, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Fetch todo data using axios
  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
        setTodoData(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
        toast.error('Failed to fetch todo data');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function(user) {
        // Store user data in Redux store
        if (user && user.isAuthenticated) {
          dispatch(setUser(user));
          navigate('/dashboard');
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
        toast.error("Authentication failed. Please try again.");
      }
    });
    
    setIsInitialized(true);
  }, [dispatch, navigate]);
  
  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
        toast.success("You have been logged out successfully");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  return (
    <AuthContext.Provider value={authMethods}>
      <div className="min-h-screen font-sans flex flex-col">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          isAuthenticated={isAuthenticated} 
          logout={authMethods.logout}
        />
        
        <main className="container mx-auto px-4 py-6 md:px-6 md:py-8 flex-grow">
          {/* Display current time with dayjs */}
          <div className="mb-6 p-4 bg-white dark:bg-surface-800 rounded-xl shadow-card">
            <h2 className="text-xl font-semibold mb-3">Current Time:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">UTC Time:</p>
                <p className="text-xl font-mono">{currentTime.utc}</p>
              </div>
              <div className="p-3 bg-surface-100 dark:bg-surface-700 rounded-lg">
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">
                  Local Time ({dayjs.tz.guess()}):
                </p>
                <p className="text-xl font-mono">{currentTime.local}</p>
              </div>
            </div>
          </div>
          
          {/* Display fetched todo data */}
          <div className="mb-6 p-4 bg-white dark:bg-surface-800 rounded-xl shadow-card">
            <h2 className="text-xl font-semibold mb-3">Todo from JSONPlaceholder:</h2>
            {loading && <p className="text-surface-600 dark:text-surface-400">Loading todo data...</p>}
            {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
            {todoData && !loading && !error && (
              <div className="space-y-2">
                <p><strong>ID:</strong> {todoData.id}</p>
                <p><strong>Title:</strong> {todoData.title}</p>
                <p><strong>Completed:</strong> {todoData.completed ? 'Yes' : 'No'}</p>
                <p><strong>User ID:</strong> {todoData.userId}</p>
              </div>
            )}
          </div>

          <Routes>
            {/* Public routes - accessible only when NOT authenticated */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add other protected routes here */}
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
          className="mt-16 md:mt-0"
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;