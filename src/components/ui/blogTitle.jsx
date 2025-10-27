import { useSafeInputHandler } from '@/hooks/costumHooks/blogMetaDataChecker';
import React from 'react';

const BlogTitle = ({ formik }) => {
  const { values, errors, touched, setFieldValue, handleBlur } = formik;
  const { handleSafeChange, slugError, renderWarning } =
    useSafeInputHandler(setFieldValue);
  return (
    <div className="w-[77%]">
      <label className="w-full text-sm font-semibold mb-2 text-gray-700 dark:text-white">
        Blog Title <span className="text-purple-500">*</span>
      </label>
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={handleSafeChange}
        onBlur={handleBlur}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="Gemini's Edge in Multimodal AI"
      />
      {renderWarning('title')}
      {touched.title && errors.title && (
        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
      )}
    </div>
  );
};

export default BlogTitle;
