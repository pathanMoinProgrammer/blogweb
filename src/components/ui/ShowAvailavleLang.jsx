// 'use client';
// import { Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// const ShowAvailavleLang = ({ locale, languages, postid }) => {
//   const [show, setShow] = useState(false);
//   const [availableLangs, setAvailableLangs] = useState([]);
//   const router = useRouter();
//   const langs = {
//     en: 'English (en)',
//     hi: 'हिन्दी  (hi)',
//     pt: 'Português  (pt)',
//     zh: '中文  (zh)',
//     'pt-BR': 'Português (Brasil)  (pt-BR)',
//     es: 'Español  (es)',
//   };

//   const existedLanguages = ['en', 'hi', 'pt', 'zh', 'pt-BR', 'es'];

//   useEffect(() => {
//     const filtered = existedLanguages.filter(
//       (lang) => !languages.includes(lang),
//     );
//     setAvailableLangs(filtered);
//   }, [languages, locale]);

//   const handleLangClick = (lang) => {
//     router.push(`/${lang}/blogpost/create-new-blog/${postid}`);
//     setTimeout(() => {
//       setShow(false);
//     }, 100);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setShow(true)}
//         className="flex  justify-center bg-blue-100 cursor-pointer dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full p-1 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
//       >
//         <Plus className="w-5 h-5" />
//       </button>

//       {show && (
//         <div className="fixed inset-0 bg-black/50 z-50  flex items-center justify-center">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm text-center space-y-4">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//               Choose Language
//             </h2>

//             <div className="flex justify-center gap-4">
//               {availableLangs.map((langItem, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleLangClick(langItem)}
//                   className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition cursor-pointer"
//                 >
//                   {langs[langItem]}
//                 </button>
//               ))}

              
//             </div>

//             <button
//               onClick={() => setShow(false)}
//               className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 cursor-pointer dark:hover:text-gray-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ShowAvailavleLang;




'use client';

import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ShowAvailableLang = ({ locale, languages = [], postid }) => {
  const [show, setShow] = useState(false);
  const [availableLangs, setAvailableLangs] = useState([]);
  const router = useRouter();

  const allLangs = {
    en: 'English (EN)',
    hi: 'हिन्दी (HI)',
    pt: 'Português (PT)',
    zh: '中文 (ZH)',
    'pt-BR': 'Português (Brasil)',
    es: 'Español (ES)',
  };

  useEffect(() => {
    const filtered = Object.keys(allLangs).filter(
      (lang) => !languages.includes(lang)
    );
    setAvailableLangs(filtered);
  }, [languages]);

  const handleLangClick = (lang) => {
    setShow(false);
    router.push(`/${lang}/blogpost/create-new-blog/${postid}`);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShow(true)}
        className="flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 cursor-pointer rounded-full p-2 hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow-md"
        aria-label="Add Language"
      >
        <Plus className="w-2.5 h-2.5" />
      </button>


      {show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md text-center relative transition-all">

            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
              Choose Language
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {availableLangs.length > 0 ? (
                availableLangs.map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => handleLangClick(langKey)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-sm"
                  >
                    {allLangs[langKey]}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 col-span-2">
                  All languages added
                </p>
              )}
            </div>

            <button
              onClick={() => setShow(false)}
              className="mt-6 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAvailableLang;
