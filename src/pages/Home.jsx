import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const Wallet = getIcon('Wallet');
  const Shield = getIcon('Shield');
  const CreditCard = getIcon('CreditCard');
  const BarChart = getIcon('BarChart');
  const ChevronRight = getIcon('ChevronRight');
  const Users = getIcon('Users');
  const Check = getIcon('Check');
  
  const features = [
    {
      title: "Secure Transactions",
      description: "Every transaction is encrypted and secured using the latest technologies.",
      icon: Shield,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Real-time Banking",
      description: "Connect your bank accounts and track all your finances in one place.",
      icon: CreditCard,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Financial Insights",
      description: "Get detailed analytics and insights about your spending habits.",
      icon: BarChart,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Smart Payments",
      description: "Send and request money instantly with just a few taps.",
      icon: Wallet,
      color: "from-amber-500 to-orange-500"
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Manage Your Money with <span className="gradient-text">PayWave</span>
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-300">
              Send money, receive payments, and manage your finances all in one secure platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
              <Link to="/login" className="btn btn-outline">Sign In</Link>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(id => (
                  <div key={id} className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-800 overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/100x100/?portrait,person&sig=${id}`} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-primary font-bold">2,000+</span> people joined this week
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl"></div>
            <img 
              src="https://source.unsplash.com/featured/600x400/?finance,app,wallet" 
              alt="PayWave App Interface" 
              className="w-full rounded-2xl shadow-2xl relative z-10"
            />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Choose PayWave</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            We provide the tools you need to take control of your financial life with confidence and ease.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="card card-hover overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-surface-600 dark:text-surface-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Ready to simplify your financial life?</h2>
            <p className="text-surface-600 dark:text-surface-400">
              Join thousands of users who are already enjoying the benefits of PayWave.
            </p>
            
            <div className="space-y-4">
              {[
                "Send and receive money instantly",
                "Connect all your bank accounts",
                "Track expenses and set budgets",
                "Get insights about your spending habits"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Link to="/signup" className="btn btn-primary">
                Create Free Account
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              src="https://source.unsplash.com/featured/500x500/?finance,mobile,payment" 
              alt="Mobile Payment" 
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what some of our satisfied users have to say.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Alex Thompson",
              role: "Small Business Owner",
              avatar: "https://source.unsplash.com/100x100/?portrait,man,1",
              quote: "PayWave has transformed how I handle my business finances. The real-time tracking and insights are invaluable."
            },
            {
              name: "Sarah Chen",
              role: "Freelance Designer",
              avatar: "https://source.unsplash.com/100x100/?portrait,woman,1",
              quote: "The simplicity of sending invoices and receiving payments has made my freelance work so much easier to manage."
            },
            {
              name: "Michael Rodriguez",
              role: "Digital Nomad",
              avatar: "https://source.unsplash.com/100x100/?portrait,man,2",
              quote: "As someone who travels frequently, having all my finances in one secure app has been a game-changer."
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="card card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-surface-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-surface-600 dark:text-surface-400 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-6">Start Your Financial Journey Today</h2>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn btn-primary">Sign Up Now</Link>
          <button 
            onClick={() => toast.info("Contact feature coming soon!")}
            className="btn btn-outline"
          >
            Contact Sales
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;