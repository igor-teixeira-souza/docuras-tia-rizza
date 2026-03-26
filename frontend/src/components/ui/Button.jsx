import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  fullWidth = false,
  loading = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800 focus:ring-black disabled:bg-gray-400 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-black border border-black hover:bg-gray-50 focus:ring-black disabled:bg-gray-100 disabled:border-gray-300",
    outline:
      "bg-transparent text-pink-600 border border-pink-300 hover:bg-pink-50 hover:border-pink-500 focus:ring-pink-500 disabled:border-gray-300 disabled:text-gray-400",
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-black focus:ring-gray-300 disabled:text-gray-400",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300 shadow-sm hover:shadow-md",
    success:
      "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 disabled:bg-green-300 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-2.5 text-base rounded-xl",
    lg: "px-8 py-3 text-lg rounded-xl",
  };

  const loadingSpinner = (
    <svg
      className="animate-spin h-4 w-4 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {loading && loadingSpinner}
      <span>{children}</span>
    </button>
  );
};

export default Button;
