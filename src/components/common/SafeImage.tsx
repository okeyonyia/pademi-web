'use client';

import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  fallbackInitial?: string;
  gradientClasses?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  className,

  fallbackInitial = '?',
  gradientClasses = 'from-gray-500 to-slate-600',
}) => {
  const isValidSrc = src && src.trim() !== '';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  // Show fallback immediately if no valid src or if image failed to load
  if (!isValidSrc || imageError) {
    return (
      <div
        className={`bg-gradient-to-r ${gradientClasses} flex items-center justify-center text-white text-2xl font-bold shadow-lg ${className}`}
        style={{
          width: width ? `${width}px` : '80px',
          height: height ? `${height}px` : '80px',
        }}
      >
        {fallbackInitial}
      </div>
    );
  }

  // Single container approach - no separate loading overlay
  return (
    <div
      className={`relative overflow-hidden ${className} ${!imageLoaded ? 'bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse' : ''}`}
      style={{
        width: width ? `${width}px` : '80px',
        height: height ? `${height}px` : '80px',
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default SafeImage;
