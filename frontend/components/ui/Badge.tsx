import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "verified" | "pending" | "teal" | "navy" | "neutral" | "demo";
  size?: "sm" | "md";
  className?: string;
  icon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
  icon = true,
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
  };

  // Strictly solid colors, subtle 1px border
  const variantStyles = {
    verified: "bg-[#247A52]/10 text-[#247A52] border border-[#247A52]/30",
    pending: "bg-[#A66B19]/10 text-[#A66B19] border border-[#A66B19]/30",
    teal: "bg-[#147D78]/10 text-[#147D78] border border-[#147D78]/25",
    navy: "bg-[#102D46] text-white border border-[#102D46]",
    neutral: "bg-[#F3F6F5] text-[#172B3A] border border-[#E1E7E8]",
    demo: "bg-amber-50 text-amber-900 border border-amber-300 font-mono tracking-tight",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && variant === "verified" && <CheckCircle2 className="w-3.5 h-3.5 text-[#247A52]" />}
      {icon && (variant === "pending" || variant === "demo") && (
        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
      )}
      {children}
    </span>
  );
};
