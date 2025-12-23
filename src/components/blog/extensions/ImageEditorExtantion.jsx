
'use client';

import Image from '@tiptap/extension-image';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deleteImageFromR2 } from '@/app/actions/delete-image-action'; // ← Import the server action

const ImageComponent = (props) => {
  const { node, deleteNode } = props;
  const src = node.attrs.src; // full image URL
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await deleteImageFromR2(src); // ← Call server action directly!

      if (!result.success) {
        throw new Error(result.error || 'Delete failed');
      }

      console.log('Delete success:', result.message);

      // Remove from editor (deferred)
      queueMicrotask(() => {
        deleteNode();
      });
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete from storage. Image removed from editor only.');

      // Optional: Still remove from editor even on failure
      queueMicrotask(() => {
        deleteNode();
      });
    }
  };

  return (
    <NodeViewWrapper className="relative inline-block group">
      <img
        src={src}
        alt={node.attrs.alt || 'Blog image'}
        className="max-w-full rounded-lg shadow-md block my-4"
      />

      {/* Trash button */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Confirmation popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Delete Image?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This will permanently delete the image from your blog and storage. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setShowConfirm(false);
                }}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
};

const CustomImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
  draggable: true,
});

export default CustomImage;