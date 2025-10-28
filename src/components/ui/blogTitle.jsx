import { useSafeInputHandler } from '@/hooks/costumHooks/blogMetaDataChecker';
import React from 'react';

const BlogTitle = ({ formik , inputRefs}) => {
  const { values, errors, touched, setFieldValue, handleBlur } = formik;
  const { handleSafeChange, slugError, renderWarning } =
    useSafeInputHandler(setFieldValue);
  return (
    <div className="w-[100%] max-[1400px]:w-[90%]">
      
      <input
      ref={inputRefs.title}
        type="text"
        name="title"
        value={values.title}
        onChange={handleSafeChange}
        onBlur={handleBlur}
        className="w-[100%]  border border-gray-300 dark:border-gray-600 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-[10px] min-h-12 "
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

