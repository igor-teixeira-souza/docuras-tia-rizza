import React from "react";

const Loader = ({ size = "md", fullScreen = false, message = "" }) => {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const loader = (
    <div className="flex flex-col justify-center items-center gap-3">
      <div
        className={`${sizes[size]} border-secondary border-t-black rounded-full animate-spin`}
      />
      {message && (
        <p className="text-gray-500 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
