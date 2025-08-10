'use client';

import React, { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  disabled?: boolean;
  allowedTypes?: string[];
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 5,
  maxFileSize = 5,
  disabled = false,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const newFiles = Array.from(files);
      
      // Check if adding these files would exceed max images
      if (images.length + newFiles.length > maxImages) {
        alert(`You can only upload a maximum of ${maxImages} images.`);
        return;
      }

      setIsUploading(true);
      const newImages: string[] = [];

      try {
        for (const file of newFiles) {
          // Validate file type
          if (!allowedTypes.includes(file.type)) {
            alert(`${file.name} is not a supported image type. Please use JPG, PNG, or WebP.`);
            continue;
          }

          // Validate file size
          if (file.size > maxFileSize * 1024 * 1024) {
            alert(`${file.name} is too large. Maximum file size is ${maxFileSize}MB.`);
            continue;
          }

          // Create preview URL (in production, you'd upload to a server/cloud storage)
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        }

        if (newImages.length > 0) {
          onImagesChange([...images, ...newImages]);
        }
      } catch (error) {
        console.error('Error processing images:', error);
        alert('Error uploading images. Please try again.');
      } finally {
        setIsUploading(false);
      }
    },
    [images, maxImages, maxFileSize, allowedTypes, onImagesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (disabled) return;
      
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles, disabled]
  );

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setDragActive(true);
    }
  }, [disabled]);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    if (disabled) return;
    
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    
    // Clean up object URL to prevent memory leaks
    const imageUrl = images[index];
    if (imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    if (disabled) return;
    
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    onImagesChange(newImages);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent"></div>
              <span className="text-sm text-gray-600">Uploading images...</span>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Upload Restaurant Images
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Drag and drop images here, or click to select files
              </p>
              <p className="text-xs text-gray-400">
                Max {maxImages} images • Max {maxFileSize}MB each • JPG, PNG, WebP
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {images.length}/{maxImages} images uploaded
              </p>
            </>
          )}
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`Restaurant image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Move Left */}
                  {index > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderImages(index, index - 1);
                      }}
                      className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
                      disabled={disabled}
                      title="Move left"
                    >
                      <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Move Right */}
                  {index < images.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reorderImages(index, index + 1);
                      }}
                      className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
                      disabled={disabled}
                      title="Move right"
                    >
                      <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Remove */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="w-6 h-6 bg-red-500 bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
                    disabled={disabled}
                    title="Remove image"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Primary Image Indicator */}
              {index === 0 && (
                <div className="absolute bottom-2 left-2">
                  <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Primary
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
