"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const Card = ({ children, className = "", padding = "md" }: CardProps) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`rounded-xl bg-white dark:bg-[#1a1b21] border border-[#e5e5e7] dark:border-gray-800 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

