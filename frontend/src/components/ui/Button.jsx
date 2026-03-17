import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled = false, type = 'button', className = '', ...props }) => {
  const baseStyles = 'rounded-lg font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black disabled:bg-gray-400',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-100 focus:ring-black disabled:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;