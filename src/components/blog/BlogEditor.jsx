'use client';

import { EditorContent } from '@tiptap/react';
import MenuBar from './MenuBar';

export default function BlogEditor({ editor }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">✍️ Write Your Blog</h2>
      <div
        className="outline-none rounded-lg overflow-hidden border-[0.5px] bg-white"
        onClick={() => editor?.commands.focus()}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="px-5 py-3 text-black " />
      </div>
    </div>
  );
}