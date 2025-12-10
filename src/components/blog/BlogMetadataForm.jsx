'use client';
import leoProfanity from 'leo-profanity';
import { useSafeInputHandler } from '@/hooks/costumHooks/blogMetaDataChecker';
import BlogTitle from '../ui/blogTitle';
import { useGameTranslations } from '../traslatorclient';
import { useEffect } from 'react';
import ImageUploader from './imageupload';

leoProfanity.loadDictionary();

const BlogMetadataForm = ({
  formik,
  isFullscreen,
  setIsFullscreen,
  setThumbnailFile,
  thumbPreview,
  setThumbPreview,
  metadataT,
  inputRefs,
}) => {
  const { values, errors, touched, setFieldValue, handleBlur } = formik;
  const { handleSafeChange, slugError, renderWarning } =
    useSafeInputHandler(setFieldValue);
  useEffect(() => {}, [touched.description, touched.time]);

  return (
    <div className="w-full min-h-[900px]  space-y-4 p-6  border border-gray-300  dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        {metadataT?.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-[1400px]:[&>*>*]:text-[13px] max-[1544px]:[&>*>*]:text-[12px] *:text-[14px]">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white ">
            {metadataT?.blogName?.label}{' '}
            <span className="text-purple-500">*</span>
          </label>
          <input
            ref={inputRefs.blogName[0]}
            type="text"
            name="blogName"
            value={values.blogName}
            onChange={handleSafeChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={metadataT?.blogName?.placeholder}
          />
          {renderWarning('blogName')}
          {touched.blogName && errors.blogName && (
            <p className="text-red-500 text-sm mt-1">{errors.blogName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            {metadataT?.slug?.label} <span className="text-purple-500">*</span>
          </label>
          <input
            ref={inputRefs.slug[0]}
            type="text"
            name="slug"
            value={values.slug}
            onChange={handleSafeChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded-lg 
              focus:ring-2 focus:border-transparent 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              ${
                slugError || (touched.slug && errors.slug)
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              }`}
            placeholder={metadataT?.slug?.placeholder}
          />
          {slugError && (
            <p className="text-red-500 text-sm mt-1">{slugError}</p>
          )}
          {!slugError && touched.slug && errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
          )}
        </div>
      </div>
      <div className="w-full min-[1300px]:hidden ">
        <label className="w-full text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          {metadataT?.blogTitle?.label}{' '}
          <span className="text-purple-500">*</span>
        </label>
        <BlogTitle
          formik={formik}
          inputRefs={inputRefs}
          metadataT={metadataT}
          reff={inputRefs.title[1]}
          name={'title'}
        />
      </div>

      <div className="max-[1400px]:*:text-[13px] max-[1544px]:*:text-[12px] *:text-[14px]">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          {metadataT?.description?.label}{' '}
          <span className="text-purple-500">*</span>
        </label>
        <textarea
          ref={inputRefs.description[0]}
          name="description"
          value={values.description}
          onChange={handleSafeChange}
          rows={3}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder={metadataT?.description?.placeholder}
        />
        {renderWarning('description')}
        {touched.description && errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      <div className="max-[1400px]:*:text-[13px] max-[1544px]:*:text-[12px] *:text-[14px]">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          {"Times To Read"}{' '}
          <span className="text-purple-500">*</span>
        </label>
        <input
          type='text'
          name="timetoread"
          value={values.timetoread}
          onChange={handleSafeChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder={ "e.g., 5 minute"}
        />
        {renderWarning('description')}
        {/* {touched.description && errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )} */}
      </div>

      <div className="max-[1400px]:*:text-[13px] max-[1544px]:*:text-[12px] *:text-[14px]">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          {metadataT?.imageUrl?.label}{' '}
          <span className="text-purple-500">*</span>
        </label>
        <input
          ref={inputRefs.imgUrl[0]}
          type="url"
          name="imgUrl"
          value={values.imgUrl}
          onChange={handleSafeChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder={metadataT?.imageUrl?.placeholder}
        />
        {renderWarning('imgUrl')}
        {touched.imgUrl && errors.imgUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.imgUrl}</p>
        )}
      </div>

      <div className="max-[1400px]:[&>*]:text-[13px] max-[1544px]:[&>*]:text-[12px] [&>*]:text-[14px]">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          {metadataT?.author?.label} <span className="text-purple-500">*</span>{' '}
          {'  '}(<span className="text-sm"> by</span>
          {` ${values.author} `})
        </label>
        <div className="flex">
          {/* <span className='text-[13px] flex items-center mr-[6px]'>By</span> */}
          <input
            type="text"
            name="author"
            value={values.author}
            onChange={handleSafeChange}
            onBlur={handleBlur}
            // disabled
            // className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
            //   bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
           focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={metadataT?.author?.label}
          />
        </div>
        {touched.author && errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author}</p>
        )}
      </div>
      <div className="space-y-4 max-[1400px]:[&>*]:text-[13px] max-[1544px]:[&>*]:text-[12px] [&>*]:text-[14px]">
        {/* DATE */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleSafeChange}
            onBlur={handleBlur}
            className="px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600
                 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-500"
          />
          {touched.date && errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* TIME */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Time
          </label>

          <div className="flex items-center gap-3">
            {/* HOUR */}
            <select
              name="hh"
              value={values.hh}
              onChange={handleSafeChange}
              className="px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600
         text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-500"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 1;
                const hourStr = String(hour).padStart(2, '0');
                return (
                  <option key={hourStr} value={hourStr}>
                    {hourStr}
                  </option>
                );
              })}
            </select>

            {/* MINUTE */}
            <select
              name="mm"
              value={values.mm}
              onChange={handleSafeChange}
              className="px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600
                   text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-500"
            >
              {Array.from({ length: 60 }, (_, i) =>
                String(i).padStart(2, '0'),
              ).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {/* AM / PM */}
            <select
              name="ampm"
              value={values.ampm}
              onChange={handleSafeChange}
              className="px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600
                   text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-500"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* {values.imgUrl && (
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
            {metadataT?.imagePreview?.clickToFullscreen}
          </div>
        </div>
      )} */}

      <ImageUploader
        setThumbnailFile={setThumbnailFile}
        thumbPreview={thumbPreview}
        formik={formik}
        setThumbPreview={setThumbPreview}
      />

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
