import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-6 bg-surface-100 dark:bg-surface-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center text-surface-500 dark:text-surface-400 text-sm">
          © {new Date().getFullYear()} PayWave. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;