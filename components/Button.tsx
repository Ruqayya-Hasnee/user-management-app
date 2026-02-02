"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "disable";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", ...props }) => {
  const base = "px-4 py-2 rounded-md font-medium transition-colors";

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "secondary") {
    variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";
  }
  else {
    variantClasses = "bg-gray-400 text-gray-700 cursor-not-allowed opacity-50";
  }

  return (
    <button
      className={`${base} ${variantClasses} ${className}`}
      {...props}
    />
  );
};

export default Button;
