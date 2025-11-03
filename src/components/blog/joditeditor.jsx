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
    editor,
  } = useJoditEditor(props);

  const { formData, editorT } = props;

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 ">
      <div className="flex-1 bg-white  shadow-sm border border-slate-200 overflow-hidden">
        {!mounted ? (
          <div className="h-full flex items-center justify-center text-slate-600">
            <div className="text-center">
              <div className="w-12 h-12 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm"> {editorT?.loading}</p>
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
