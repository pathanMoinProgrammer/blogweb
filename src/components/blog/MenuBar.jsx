'use client';

import { useState, useEffect } from 'react';

export default function MenuBar({ editor }) {
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
    <div className="border-b border-gray-300 dark:border-gray-700 p-2 flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded border transition-colors duration-300 ${
          isActive('bold')
            ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded border transition-colors duration-300 ${
          isActive('italic')
            ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
        }`}
        title="Italic"
      >
        <em>I</em>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline?.()?.run()}
        className={`px-3 py-1 rounded border transition-colors duration-300 ${
          isActive('underline')
            ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
        }`}
        title="Underline"
      >
        <u>U</u>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 rounded border transition-colors duration-300 ${
          isActive('strike')
            ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
        }`}
        title="Strikethrough"
      >
        <s>S</s>
      </button>

      <div className="border-l border-gray-300 dark:border-gray-600 mx-1"></div>

      <button
        onClick={() =>
          editor.chain().focus().toggleList('bulletList', 'listItem').run()
        }
        className={`px-3 py-1 rounded border transition-colors duration-300 ${
          isActive('bulletList')
            ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
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
        className={`px-3 py-1 rounded border transition-colors duration-300 ${
          isActive('orderedList')
            ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-500'
            : 'bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
        }`}
        title="Numbered List"
      >
        1.
      </button>

      <div className="border-l border-gray-300 dark:border-gray-600 mx-1"></div>

      <button
        onClick={() =>
          editor.chain().focus().insertContent({ type: 'horizontalRule' }).run()
        }
        className="px-3 py-1 rounded border bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-colors duration-300"
        title="Insert Horizontal Rule"
      >
        — HR —
      </button>

      <button
        onClick={handleInsertTab}
        className="px-3 py-1 rounded border bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 transition-colors duration-300"
        title="Insert Tab (6 spaces)"
      >
        ↦ Tab
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="px-3 py-1 rounded border bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50 transition-colors duration-300"
        title="Undo"
      >
        ↶
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="px-3 py-1 rounded border bg-white border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:opacity-50 transition-colors duration-300"
        title="Redo"
      >
        ↷
      </button>
    </div>
  );
}
