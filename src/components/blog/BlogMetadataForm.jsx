'use client';
import { useState, useEffect } from 'react';
import UrlChecker from './UrlChecker';

function BlogMetadataForm({
  blogName,
  setBlogName,
  author,
  enurl,
  setEnurl,
  title,
  setTitle,
  description,
  setDescription,
  imgUrl,
  setImgUrl,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="w-full h-screen space-y-4 p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-blue-50/30 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Blog Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
              Blog Name *
            </label>
            <input
              type="text"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="e.g., AI Frontier Blog"
            />
          </div>

          <UrlChecker enurl={enurl} setEnurl={setEnurl} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Blog Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Gemini's Edge in Multimodal AI"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Brief description of your blog post..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Image URL
          </label>
          <input
            type="url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Author
          </label>
          <input
            type="text"
            value={author}
            disabled
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
          />
        </div>

        {imgUrl && (
          <div
            className="mt-3 relative group cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          >
            <img
              src={imgUrl}
              alt="Preview"
              className="max-h-48 w-full object-cover rounded-lg border border-gray-300 dark:border-gray-600 transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center text-white font-medium text-sm transition-opacity">
              Click to view fullscreen
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={imgUrl}
            alt="Fullscreen preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}

export default BlogMetadataForm;