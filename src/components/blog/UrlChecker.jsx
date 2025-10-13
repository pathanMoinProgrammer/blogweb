// 'use client';

// import { useState, useEffect } from 'react';

// export default function UrlChecker({ enurl, setEnurl }) {
//   const [isCheckingUrl, setIsCheckingUrl] = useState(false);
//   const [urlExists, setUrlExists] = useState(false);

//   useEffect(() => {
//     if (!enurl) {
//       setUrlExists(false);
//       return;
//     }

//     const delay = setTimeout(async () => {
//       setIsCheckingUrl(true);
//       try {
//         const res = await fetch('/api/available-blog-sync', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ locale: 'en', slug: enurl }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setUrlExists(data.exists || false);
//         } else {
//           setUrlExists(false);
//         }
//       } catch (err) {
//         console.error('Error checking URL:', err);
//         setUrlExists(false);
//       } finally {
//         setIsCheckingUrl(false);
//       }
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [enurl]);

//   return (
//     <div className="w-full">
//       <label className="block text-sm font-semibold mb-2 dark:text-white text-gray-700">
//         URL Slug *
//       </label>

//       <div className="relative flex items-center">
//         <input
//           type="text"
//           value={enurl}
//           onChange={(e) => setEnurl(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
//           placeholder="gemini-multimodal-edge"
//           className={`w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-gray-800 ${
//             isCheckingUrl
//               ? 'border-blue-400 focus:ring-blue-400'
//               : urlExists
//               ? 'border-red-400 focus:ring-red-500'
//               : enurl
//               ? 'border-green-400 focus:ring-green-500'
//               : 'border-gray-300 focus:ring-blue-500'
//           }`}
//         />

//         <div className="absolute right-3 flex items-center">
//           {isCheckingUrl && (
//             <div className="animate-spin w-5 h-5 text-blue-500">
//               <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
//               </svg>
//             </div>
//           )}

//           {!isCheckingUrl && enurl && !urlExists && (
//             <div className="text-green-500 animate-pulse">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//           )}

//           {!isCheckingUrl && enurl && urlExists && (
//             <div className="text-red-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-2 min-h-[1.25rem]">
//         {isCheckingUrl && (
//           <p className="text-sm text-blue-600">Checking availability...</p>
//         )}
//         {!isCheckingUrl && enurl && !urlExists && (
//           <p className="text-sm text-green-600 font-medium flex items-center gap-1">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             This URL is available!
//           </p>
//         )}
//         {!isCheckingUrl && enurl && urlExists && (
//           <p className="text-sm text-red-600 font-medium flex items-center gap-1">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
//             </svg>
//             This URL is already taken.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';

export default function UrlChecker({ enurl, setEnurl }) {
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [urlExists, setUrlExists] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validSlugRegex = /^[a-z0-9-]*$/;

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

    const delay = setTimeout(async () => {
      setIsCheckingUrl(true);
      try {
        const res = await fetch('/api/available-blog-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale: 'en', slug: enurl }),
        });

        const data = await res.json();
        if (res.ok) {
          setUrlExists(data.exists || false);
        } else {
          setUrlExists(false);
        }
      } catch (err) {
        console.error('Error checking URL:', err);
        setUrlExists(false);
      } finally {
        setIsCheckingUrl(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [enurl]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, '-');
    setEnurl(value);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-2 dark:text-white text-gray-700">
        URL Slug *
      </label>

      <div className="relative flex items-center">
        <input
          type="text"
          value={enurl}
          onChange={handleChange}
          placeholder="gemini-multimodal-edge"
          className={`w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-gray-800 ${
            errorMsg
              ? 'border-red-400 focus:ring-red-500'
              : isCheckingUrl
              ? 'border-blue-400 focus:ring-blue-400'
              : urlExists
              ? 'border-red-400 focus:ring-red-500'
              : enurl
              ? 'border-green-400 focus:ring-green-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />

        <div className="absolute right-3 flex items-center">
          {isCheckingUrl && (
            <div className="animate-spin w-5 h-5 text-blue-500">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          )}

          {!isCheckingUrl && enurl && !urlExists && !errorMsg && (
            <div className="text-green-500 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          {!isCheckingUrl && enurl && (urlExists || errorMsg) && (
            <div className="text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 min-h-[1.25rem]">
        {errorMsg ? (
          <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
        ) : isCheckingUrl ? (
          <p className="text-sm text-blue-600">Checking availability...</p>
        ) : !isCheckingUrl && enurl && !urlExists ? (
          <p className="text-sm text-green-600 font-medium flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            This URL is available!
          </p>
        ) : !isCheckingUrl && enurl && urlExists ? (
          <p className="text-sm text-red-600 font-medium flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 10-2 0 1 1 0z" clipRule="evenodd" />
            </svg>
            This URL is already taken.
          </p>
        ) : null}
      </div>
    </div>
  );
}
