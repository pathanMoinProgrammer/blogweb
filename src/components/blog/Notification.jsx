'use client';

import { useEffect } from 'react';

export default function Notification({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 text-sm text-gray-700">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        {message}
      </div>
    </div>
  );
}