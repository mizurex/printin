'use client'
import { motion } from "motion/react";

interface CustomToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function CustomToggle({ checked, onChange, size = 'md' }: CustomToggleProps) {
  const sizeClasses = {
    sm: 'w-10 h-5',
    md: 'w-12 h-6', 
    lg: 'w-14 h-7'
  };

  const thumbSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const translateX = {
    sm: checked ? 20 : 2,
    md: checked ? 24 : 2,
    lg: checked ? 28 : 2
  };

  return (
    <motion.button
      type="button"
      onClick={() => onChange(!checked)}
      className={`${sizeClasses[size]} relative rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#026766] focus:ring-offset-2 ${
        checked 
          ? 'bg-[#026766] border-[#026766]' 
          : 'bg-gray-200 border-gray-300 hover:border-gray-400'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`${thumbSizes[size]} absolute top-0.5 bg-white rounded-full shadow-md`}
        animate={{
          x: translateX[size]
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
    </motion.button>
  );
}