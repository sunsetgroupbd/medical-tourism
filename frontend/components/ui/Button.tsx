import React from "react";
import { Link } from "@/i18n/routing";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "teal" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  // Radius strictly 6-8px
  const radius = "rounded-md";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs tracking-wide",
    md: "px-5 py-2.5 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold",
  };

  // Strictly solid colors - absolutely NO gradients
  const variantStyles = {
    primary:
      "bg-[#102D46] hover:bg-[#183F5B] text-white focus:ring-[#102D46]",
    secondary:
      "bg-[#183F5B] hover:bg-[#102D46] text-white focus:ring-[#183F5B]",
    teal:
      "bg-[#147D78] hover:bg-[#105F5B] text-white focus:ring-[#147D78]",
    outline:
      "border border-[#102D46] text-[#102D46] hover:bg-[#F3F6F5] focus:ring-[#102D46] bg-transparent",
    ghost:
      "text-[#172B3A] hover:bg-[#F3F6F5] hover:text-[#102D46] focus:ring-[#147D78] bg-transparent",
  };

  const combinedClasses = `${baseStyles} ${radius} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
