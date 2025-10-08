// TODO: Solved Problem that automatic localStorage not give data at mount and give localStorage is not defined error (but working at screen just error faces) and solved by adding coopy button and on the top show start new blog

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import HardBreak from '@tiptap/extension-hard-break';
import { Extension } from '@tiptap/core';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import checkmarkAnim from '../../../../components/Checkmark.json';

const CustomHorizontalRule = Extension.create({
  name: 'horizontalRule',
  addAttributes() {
    return {
      width: { default: '100%' },
      thickness: { default: '2px' },
      color: { default: '#cbd5e1' },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const { width, thickness, color } = HTMLAttributes;
    return [
      'hr',
      {
        style: `width:${width};border:0;border-top:${thickness} solid ${color};margin:1rem auto;`,
      },
    ];
  },
});

const MenuBar = ({ editor }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!editor) return;
    const update = () => setTick((t) => t + 1);
    editor.on('transaction', update);
    return () => editor.off('transaction', update);
  }, [editor]);

  if (!editor) return null;

  const handleInsertTab = () =>
    editor.chain().focus().insertContent('      ').run();

  const isActive = (name, attrs = {}) => {
    try {
      return editor.isActive(name, attrs);
    } catch {
      return false;
    }
  };

  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2 bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded border ${
          isActive('bold')
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-white border-gray-300'
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded border ${
          isActive('italic')
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-white border-gray-300'
        }`}
        title="Italic"
      >
        <em>I</em>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline?.()?.run()}
        className={`px-3 py-1 rounded border ${
          isActive('underline')
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-white border-gray-300'
        }`}
        title="Underline"
      >
        <u>U</u>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 rounded border ${
          isActive('strike')
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-white border-gray-300'
        }`}
        title="Strikethrough"
      >
        <s>S</s>
      </button>

      <div className="border-l border-gray-300 mx-1"></div>

      <button
        onClick={() =>
          editor.chain().focus().toggleList('bulletList', 'listItem').run()
        }
        className={`px-3 py-1 rounded border ${
          isActive('bulletList')
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-white border-gray-300'
        }`}
        title="Bullet List"
      >
        •
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleList('orderedList', 'listItem', false, { order: 1 })
            .run()
        }
        className={`px-3 py-1 rounded border ${
          isActive('orderedList')
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-white border-gray-300'
        }`}
        title="Numbered List"
      >
        1.
      </button>

      <div className="border-l border-gray-300 mx-1"></div>

      <button
        onClick={() =>
          editor.chain().focus().insertContent({ type: 'horizontalRule' }).run()
        }
        className="px-3 py-1 rounded border bg-white border-gray-300"
        title="Insert Horizontal Rule"
      >
        — HR —
      </button>

      <button
        onClick={handleInsertTab}
        className="px-3 py-1 rounded border bg-white border-gray-300"
        title="Insert Tab (6 spaces)"
      >
        ↦ Tab
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="px-3 py-1 rounded border bg-white border-gray-300 disabled:opacity-50"
        title="Undo"
      >
        ↶
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="px-3 py-1 rounded border bg-white border-gray-300 disabled:opacity-50"
        title="Redo"
      >
        ↷
      </button>
    </div>
  );
};

const Notification = ({ message, isVisible, onClose }) => {
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
};

// COMMENTED OUT - ORIGINAL NOTIFICATION (for future use)
// const Notification = ({ message, isVisible, onClose }) => {
//   useEffect(() => {
//     if (isVisible) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible, onClose]);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 duration-300">
//       <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 text-sm text-gray-700">
//         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//         {message}
//       </div>
//     </div>
//   );
// };

export default function TipTapEditor() {
  const [content, setContent] = useState('<p>Start Writing New Blog</p>');
  const [isMounted, setIsMounted] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const AUTO_SAVE_DELAY = 2000;
  let saveTimeout = null;

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blogContent');
      if (saved) setContent(saved);
    }
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, TextStyle, HardBreak, CustomHorizontalRule],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);

      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('blogContent', html);
          console.log('Autosaved!');
        }
      }, AUTO_SAVE_DELAY);
    },
    editorProps: {
      handleKeyDown(view, event) {
        const { state, dispatch, schema } = view;

        // Tab
        if (event.key === 'Tab' && !event.shiftKey) {
          event.preventDefault();
          dispatch(
            state.tr.insertText(
              '      ',
              state.selection.from,
              state.selection.to,
            ),
          );
          return true;
        }

        // Shift+Enter → hard break
        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          const hardBreak = schema.nodes.hardBreak;
          if (hardBreak) {
            dispatch(
              state.tr
                .replaceSelectionWith(hardBreak.create())
                .scrollIntoView(),
            );
            return true;
          }
          dispatch(
            state.tr.insertText('\n', state.selection.from, state.selection.to),
          );
          return true;
        }

        return false; // Plain Enter handled by TipTap (list continuation)
      },
      attributes: {
        class:
          'outline-none focus:outline-none focus:ring-0 whitespace-pre-wrap cursor-text min-h-[400px]',
      },
    },
  });

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

      setNotificationMessage('✅ Copied to clipboard!');
      setShowNotification(true);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 1000);
    } catch (error) {
      console.error('Copy failed:', error);
      setNotificationMessage('❌ Failed to copy!');
      setShowNotification(true);
    }
  };

  if (!isMounted)
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500">
        Loading editor...
      </div>
    );

  return (
    <>
      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <div className="max-w-4xl mx-auto my-3 p-4 font-sans ">
        <h1 className="text-3xl font-bold mb-4">📝 Write Your Blog</h1>

        <div
          className="outline-none rounded-lg overflow-hidden border-[0.5px] bg-white"
          onClick={() => editor?.commands.focus()}
        >
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="px-5 py-3" />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">🖋️ Live Preview</h2>

          <div className="relative">
            <button
              onClick={handleCopy}
              disabled={isCopying}
              className={`absolute top-3 right-3 w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all duration-500 transform ${
                isCopying
                  ? 'bg-green-500 text-white scale-110 '
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              } disabled:opacity-70`}
            >
              {isCopying ? (
                <Lottie
                  animationData={checkmarkAnim}
                  loop={false}
                  autoplay
                  className="w-7 h-7"
                />
              ) : (
                <svg
                  className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[-5deg]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
              className="p-4 border min-h-95 rounded bg-gray-50 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* <div className="p-4 border min-h-95 rounded bg-gray-50 whitespace-pre-wrap">
              {editor?.getText()}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
