'use client';
import { useState, useEffect, useRef } from 'react';

export default function UrlChecker({ enurl, setFieldValue }) {
 const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [urlExists, setUrlExists] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validSlugRegex = /^[a-z0-9-]*$/;
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, '-');
    setFieldValue('enurl', value);
  };

  useEffect(() => {
    if (!enurl) {
      setUrlExists(false);
      setErrorMsg('');
      return;
    }

    if (!validSlugRegex.test(enurl)) {
      setErrorMsg('Used character is not allowed.');
      setUrlExists(false);
      return;
    } else {
      setErrorMsg('');
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsCheckingUrl(true);
      try {
        const res = await fetch('/api/available-blog-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale: 'en', slug: enurl }),
        });

        const data = await res.json();
        setUrlExists(res.ok && Boolean(data.exists));
      } catch (err) {
        console.error('Error checking URL:', err);
        setUrlExists(false);
      } finally {
        setIsCheckingUrl(false);
      }
    }, 600);

    return () => clearTimeout(debounceRef.current);
  }, [enurl]);

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
        URL Slug <span className="text-purple-500">*</span>
      </label>

      <div className="relative flex items-center">
        <input
          type="text"
          value={enurl}
          onChange={handleChange}
          placeholder="gemini-multimodal-edge"
          className={`w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400
            ${
              errorMsg
                ? 'border-red-400 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                : isCheckingUrl
                ? 'border-blue-400 dark:border-blue-300 focus:ring-blue-400 dark:focus:ring-blue-300'
                : urlExists
                ? 'border-red-400 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                : enurl
                ? 'border-green-400 dark:border-green-500 focus:ring-green-500 dark:focus:ring-green-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-500'
            }`}
        />

        <div className="absolute right-3 flex items-center">
          {isCheckingUrl && (
            <div className="animate-spin w-5 h-5 text-blue-500 dark:text-blue-300">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          )}

          {!isCheckingUrl && enurl && !urlExists && !errorMsg && (
            <div className="text-green-500 dark:text-green-400 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}

          {!isCheckingUrl && enurl && (urlExists || errorMsg) && (
            <div className="text-red-500 dark:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 min-h-[1.25rem]">
        {errorMsg ? (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {errorMsg}
          </p>
        ) : isCheckingUrl ? (
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Checking availability...
          </p>
        ) : !isCheckingUrl && enurl && !urlExists ? (
          <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            This URL is available!
          </p>
        ) : !isCheckingUrl && enurl && urlExists ? (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 10-2 0 1 1 0z"
                clipRule="evenodd"
              />
            </svg>
            This URL is already taken.
          </p>
        ) : null}
      </div>
    </div>
  );
}
