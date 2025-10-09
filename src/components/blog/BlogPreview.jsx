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
    <div className="mt-6 dark:border-[1px] rounded-xl p-[2px]">
      <h2 className="text-xl font-semibold mb-2 ">🖋️ Live Preview</h2>
      <div className="relative">
        <button
          onClick={handleCopy}
          disabled={isCopying}
          className={`absolute text-black top-3 right-3 w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all duration-500 transform ${
            isCopying
              ? 'bg-green-500 text-white scale-110'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
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

        <pre
          className="p-4 border min-h-95 rounded bg-gray-50 text-black whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}