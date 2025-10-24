'use client';
import { useState } from 'react';
import UrlChecker from './UrlChecker';

const BlogMetadataForm = ({ formData, formik }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { values, errors, touched, setFieldValue, handleBlur } = formik;

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  return (
    <div className="w-full mt-5 min-[1000px]:h-screen space-y-4 p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-blue-50/30 dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Blog Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Blog Name <span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            name="blogName"
            value={values.blogName}
            onChange={handleCustomChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., AI Frontier Blog"
          />
          {touched.blogName && errors.blogName && (
            <p className="text-red-500 text-sm mt-1">{errors.blogName}</p>
          )}
        </div>

        <UrlChecker
          enurl={values.enurl}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Blog Title <span className="text-purple-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleCustomChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Gemini's Edge in Multimodal AI"
        />
        {touched.title && errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Description <span className="text-purple-500">*</span>
        </label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleCustomChange}
          rows={3}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Brief description of your blog post..."
        />
        {touched.description && errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Image URL <span className="text-purple-500">*</span>
        </label>
        <input
          type="url"
          name="imgUrl"
          value={values.imgUrl}
          onChange={handleCustomChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="https://..."
        />
        {touched.imgUrl && errors.imgUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.imgUrl}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={values.author}
          disabled
          // onBlur={formik.onBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
        />
      </div>

      {values.imgUrl && (
        <div
          className="mt-3 h-[30%] relative group cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={values.imgUrl}
            alt="Preview"
            className="h-full w-full object-cover rounded-lg border border-gray-300 dark:border-gray-600 
              transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div
            className="absolute inset-0 z-10 bg-black/50 group-hover:opacity-100 
              rounded-lg flex items-center justify-center text-white 
              font-medium text-sm transition-opacity"
          >
            Click to view fullscreen
          </div>
        </div>
      )}

      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={values.imgUrl}
            alt="Fullscreen preview"
            className="max-w-full max-h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default BlogMetadataForm;
