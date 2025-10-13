'use client';
import { useState, useRef } from 'react';

function ImageUploader({ imgUrl, setImgUrl }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef();

  const handleFiles = async (file) => {
    setErrorMsg('');
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMsg('Only JPG, PNG, or WEBP files allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image too large (max 10 MB).');
      return;
    }

    setUploading(true);
    setTimeout(() => {
      setImgUrl(URL.createObjectURL(file));
      setUploading(false);
    }, 1500);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer?.files?.[0];
    if (file) handleFiles(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onChange = (e) => handleFiles(e.target.files[0]);

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 z-10">
        <label className="block text-sm font-semibold text-gray-700 dark:text-white">
          🖼️ Cover Image
        </label>
      </div>

      {/* Drop Zone */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`h-full min-h-[300px] border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all flex items-center justify-center
            ${isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
            }
            ${uploading ? 'opacity-60 pointer-events-none' : ''}
          `}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onChange}
            className="hidden"
          />
          
          {uploading ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 border-2 border-blue-400 dark:border-blue-300 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Uploading...</p>
            </div>
          ) : imgUrl ? (
            <div className="flex flex-col items-center space-y-3 w-full">
              <img
                src={imgUrl}
                alt="Uploaded"
                className="max-h-96 w-full object-contain rounded-lg border border-gray-300 dark:border-gray-600"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">Click to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Click or drag image</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WEBP (max 10 MB)</p>
            </div>
          )}
        </div>
        
        {errorMsg && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-3 px-1">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;