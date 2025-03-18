import React from "react";

interface CustomButtonProps {
  variant?: "secondary" | "destructive";
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ variant, onClick, children }) => {
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none cursor-pointer transition-colors";
  const variantStyles =
    variant === "secondary"
      ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
      : "bg-red-500 text-white hover:bg-red-600";

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;