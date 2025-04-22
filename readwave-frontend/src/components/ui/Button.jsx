// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
