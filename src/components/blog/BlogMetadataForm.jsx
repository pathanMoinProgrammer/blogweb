'use client';

import { useState, useEffect } from 'react';
import UrlChecker from './UrlChecker';

export default function BlogMetadataForm({
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
  return (
    <div className="mb-6 space-y-4  dark:bg-purple-500/4 p-6 rounded-lg dark:border-[0.4px]">
      <h2 className="text-xl font-semibold mb-4">Blog Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-white text-gray-700">
            Blog Name *
          </label>
          <input
            type="text"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="w-full px-4 py-2 border border-gray-300 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg  dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of your blog post..."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 dark:text-white text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://..."
        />
        {imgUrl && (
          <img
            src={imgUrl}
            alt="Preview"
            className="mt-2 max-h-40 rounded-lg border"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 dark:text-white text-gray-700">
          Author
        </label>
        <input
          type="text"
          value={author}
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:text-black"
        />
      </div>
    </div>
  );
}