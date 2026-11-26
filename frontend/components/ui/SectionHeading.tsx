import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className = "",
}) => {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p
          className={`text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 ${
            isDark ? "text-white" : "text-[#147D78]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${
          isDark ? "text-white" : "text-[#102D46]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base md:text-lg leading-relaxed ${
            isDark ? "text-gray-300" : "text-[#647580]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
