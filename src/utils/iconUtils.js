import * as LucideIcons from 'lucide-react';

/**
 * Utility function to get a Lucide icon component by name
 * @param {string} iconName - Name of the icon to retrieve
 * @returns {Component} - The requested icon component, or a fallback
 */
const getIcon = (iconName) => {
  if (LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  
  // Fallback to a default icon if the requested one doesn't exist
  console.warn(`Icon "${iconName}" not found, using fallback`);
  return LucideIcons.HelpCircle;
};

export default getIcon;