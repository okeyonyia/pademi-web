"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className = "",
  disabled = false,
  label,
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg"
  };

  const buttonClasses = `
    ${sizeClasses[size]}
    w-full
    bg-white/80
    backdrop-blur-sm
    border border-gray-200
    rounded-xl
    shadow-sm
    hover:shadow-md
    focus:shadow-lg
    focus:ring-2 focus:ring-purple-500/20
    focus:border-purple-400
    transition-all duration-300
    flex items-center justify-between
    group
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-white hover:scale-[1.02]"}
    ${className}
  `;

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <button
        ref={buttonRef}
        type="button"
        className={buttonClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2 flex-1 text-left">
          {selectedOption?.icon && (
            <span className={selectedOption.color || "text-gray-500"}>
              {selectedOption.icon}
            </span>
          )}
          <span className={selectedOption ? "text-gray-900 font-medium" : "text-gray-500"}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        
        <ChevronDown
          size={18}
          className={`text-gray-400 group-hover:text-gray-600 transition-all duration-300 ${
            isOpen ? "rotate-180 text-purple-500" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown Content */}
          <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-xl animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <div className="py-2 max-h-60 overflow-y-auto">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      w-full px-4 py-3 text-left flex items-center gap-3
                      transition-all duration-200
                      hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50
                      focus:bg-gradient-to-r focus:from-purple-50 focus:to-pink-50
                      focus:outline-none
                      ${isSelected 
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 font-semibold" 
                        : "text-gray-700 hover:text-gray-900"
                      }
                    `}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.icon && (
                      <span className={option.color || (isSelected ? "text-purple-600" : "text-gray-500")}>
                        {option.icon}
                      </span>
                    )}
                    
                    <span className="flex-1">{option.label}</span>
                    
                    {isSelected && (
                      <Check size={16} className="text-purple-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSelect;
