'use client';

import { useState } from 'react';
import Lottie from 'lottie-react';
import checkmarkAnim from '../../components/Checkmark.json';

export default function BlogPreview({ content, editor }) {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = async () => {
    if (!editor) return;

    try {
      let htmlContent = editor.getHTML();
      let textWithHR = htmlContent
        .replace(/<hr\s*\/?>/gi, '\n--------------------------\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\u00a0/g, '');

      await navigator.clipboard.writeText(textWithHR);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 1000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ">

      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <pre className="text-lg font-semibold text-gray-700 dark:text-white font-sans"> 🖋️   Preview</pre>
        <button
          onClick={handleCopy}
          disabled={isCopying}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 ${
            isCopying
              ? 'bg-green-500 text-white border-green-500 scale-110'
              : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:scale-105 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'
          } disabled:opacity-70`}
        >
          {isCopying ? (
            <Lottie animationData={checkmarkAnim} loop={false} autoplay className="w-7 h-7" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Live Preview Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-800">
        <div
          className="prose prose-lg max-w-none text-black dark:text-white whitespace-pre-wrap leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
