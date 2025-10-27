'use client';
import { useState, useEffect, useRef } from 'react';

export default function UrlChecker({
  enurl = 'slug' ,
  errors,
  touched,
  setFieldValue,
  handleBlur,
}) {
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [urlExists, setUrlExists] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validSlugRegex = /^[a-z0-9-]*$/;
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, '-');
    setFieldValue('slug', value);
  };

  useEffect(() => {
    if (!slug) {
      setUrlExists(false);
      setErrorMsg('');
      return;
    }

    if (!validSlugRegex.test(slug)) {
      setErrorMsg('Only lowercase letters, numbers, and hyphens are allowed.');
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
          body: JSON.stringify({  slug: slug }),
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
  }, [slug]);

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
        URL Slug <span className="text-purple-500">*</span>
      </label>

      <div className="relative flex items-center">
        <input
          type="text"
          value={enurl}
          name="slug"
          onChange={handleChange}
          onBlur={handleBlur} //
          placeholder="gemini-multimodal-edge"
          className={`w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base
            ${
              touched.slug && errors.slug
                ? 'border-red-400 dark:border-red-500 focus:ring-red-500'
                : errorMsg
                ? 'border-red-400 dark:border-red-500 focus:ring-red-500'
                : isCheckingUrl
                ? 'border-blue-400 dark:border-blue-300 focus:ring-blue-400'
                : urlExists
                ? 'border-red-400 dark:border-red-500 focus:ring-red-500'
                : slug
                ? 'border-green-400 dark:border-green-500 focus:ring-green-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
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

          {!isCheckingUrl && slug && !urlExists && !errorMsg && (
            <div className="text-green-500 dark:text-green-400 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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

          {!isCheckingUrl && slug && (urlExists || errorMsg) && (
            <div className="text-red-500 dark:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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

      <div className="mt-1 min-h-[1.25rem]">
        {touched.slug && errors.slug ? (
          <p className="text-sm text-red-600 font-medium">{errors.slug}</p>
        ) : errorMsg ? (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {errorMsg}
          </p>
        ) : isCheckingUrl ? (
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Checking availability...
          </p>
        ) : !isCheckingUrl && slug && !urlExists ? (
          <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
            ✅ This URL is available!
          </p>
        ) : !isCheckingUrl && slug && urlExists ? (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
            ⚠️ This URL is already taken.
          </p>
        ) : null}
      </div>
    </div>
  );
}
