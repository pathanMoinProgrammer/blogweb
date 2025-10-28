// 'use client';


// import dynamic from 'next/dynamic';
// import 'jodit/es5/jodit.min.css';
// import leoProfanity from 'leo-profanity';
// import { useJoditEditor } from '@/hooks/costumHooks/useJoditeditor';

// leoProfanity.loadDictionary();

// const JoditEditorImport = dynamic(() => import('jodit-react'), { ssr: false });

// export default function JoditEditor(props) {
//   const {
//     editorRef,
//     mounted,
//     copied,
//     initialValue,
//     config,
//     scheduleSave,
//     copyHtml,
//     copyPlain,
//   } = useJoditEditor(props);

//   const { formData } = props;

//   return (
//     <div className="h-full max-[1300px]:w-full flex flex-col w-[100%]  border-1 border-gray-300  dark:border-gray-700">
//       <div className="flex justify-between items-center p-4 bg-white dark:text-black dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
//         <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
//           📝 Write Your Blog
//         </h2>
//         <div className="flex gap-2">
//           <button
//             onClick={copyHtml}
//             className={`px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
//               copied
//                 ? 'bg-green-500 dark:bg-green-600 text-white border-green-500 dark:border-green-500'
//                 : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
//             }`}
//           >
//             {copied ? 'Copied' : 'Copy HTML'}
//           </button>
//           <button
//             onClick={copyPlain}
//             className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white"
//           >
//             Copy Text
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 overflow-auto bg-white dark:text-black dark:bg-gray-900 border-none rounded-lg">
//         {!mounted ? (
//           <div className="h-full flex items-center justify-center text-gray-600 dark:text-gray-300">
//             Loading editor...
//           </div>
//         ) : (
//           <JoditEditorImport
//             ref={editorRef}
//             config={config}
//             value={formData.content || initialValue}
//             onBlur={(newContent) => scheduleSave(newContent)}
//             onChange={(newContent) => scheduleSave(newContent)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import 'jodit/es5/jodit.min.css';
import { Copy, FileText, CheckCircle } from 'lucide-react';
import { useJoditEditor } from '@/hooks/costumHooks/useJoditeditor';

const JoditEditorImport = dynamic(() => import('jodit-react'), { ssr: false });

const ActionButtons = memo(({ copied, copyHtml, copyPlain }) => (
  <div className="flex gap-2">
    <button
      onClick={copyHtml}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
      }`}
    >
      {copied ? (
        <>
          <CheckCircle className="w-4 h-4 inline mr-1.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 inline mr-1.5" />
          Copy HTML
        </>
      )}
    </button>
    <button
      onClick={copyPlain}
      className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
    >
      <FileText className="w-4 h-4 inline mr-1.5" />
      Copy Text
    </button>
  </div>
));

ActionButtons.displayName = 'ActionButtons';

export default function JoditEditor(props) {
  const {
    editorRef,
    mounted,
    copied,
    initialValue,
    config,
    scheduleSave,
    copyHtml,
    copyPlain,
  } = useJoditEditor(props);

  const { formData } = props;

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 p-4">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-4 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Content Editor</h2>
        <ActionButtons copied={copied} copyHtml={copyHtml} copyPlain={copyPlain} />
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {!mounted ? (
          <div className="h-full flex items-center justify-center text-slate-600">
            <div className="text-center">
              <div className="w-12 h-12 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm">Loading editor...</p>
            </div>
          </div>
        ) : (
          <JoditEditorImport
            ref={editorRef}
            config={config}
            value={formData.content || initialValue}
            onBlur={(newContent) => scheduleSave(newContent)}
            onChange={(newContent) => scheduleSave(newContent)}
          />
        )}
      </div>
    </div>
  );
}
