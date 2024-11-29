// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-6 transition-transform hover:scale-105 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
