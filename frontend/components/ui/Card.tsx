import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-white border border-[#E1E7E8] rounded-lg overflow-hidden transition-all duration-200 ${
        hoverEffect ? "hover:border-[#147D78]/40 hover:shadow-sm" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
