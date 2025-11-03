'use client';
import { useSafeInputHandler } from '@/hooks/costumHooks/blogMetaDataChecker';
import React, { useEffect, useState } from 'react';

const BlogTitle = ({ formik, inputRefs, metadataT, reff }) => {
  const { values, errors, touched, setFieldValue, handleBlur } = formik;
  const { handleSafeChange, slugError, renderWarning } =
    useSafeInputHandler(setFieldValue);

  useEffect(() => {
    if (!inputRefs[name]) inputRefs[name] = [];
    inputRefs[name].push(reff);
    return () => {
      inputRefs[name] = inputRefs[name].filter((r) => r !== reff);
    };
  }, []);

  return (
    <div className="w-[77%] max-[1300px]:w-full max-[1400px]:w-[70%] max-[1544px]:w-[72%]">
      <input
        // ref={reff}
        ref={(el) => (reff.current = el)}
        type="text"
        name="title"
        value={values?.title}
        onChange={handleSafeChange}
        onBlur={handleBlur}
        className="w-[100%]  max-[1300px]:rounded-[12px] border border-gray-300 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-[10px] min-h-12 "
        placeholder={metadataT?.blogTitle?.placeholder}
      />
      {renderWarning('title')}
      {touched?.title && errors?.title && (
        <p className="text-red-500 text-sm mt-1">{errors?.title}</p>
      )}
    </div>
  );
};

export default BlogTitle;
