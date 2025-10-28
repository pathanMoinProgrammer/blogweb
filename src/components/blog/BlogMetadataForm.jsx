'use client';
import leoProfanity from 'leo-profanity';
import { useSafeInputHandler } from '@/hooks/costumHooks/blogMetaDataChecker';

leoProfanity.loadDictionary();

const BlogMetadataForm = ({
  formik,
  isFullscreen,
  setIsFullscreen,
  inputRefs,
}) => {
  const { values, errors, touched, setFieldValue, handleBlur } = formik;
  const { handleSafeChange, slugError, renderWarning } =
    useSafeInputHandler(setFieldValue);

  return (
    <div className="w-full min-h-[900px]  space-y-4 p-6  border-1 border-gray-300  dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Blog Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-[1400px]:[&>*>*]:text-[13px] max-[1544px]:[&>*>*]:text-[12px] [&>*]:text-[14px]">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white ">
            Blog Name <span className="text-purple-500">*</span>
          </label>
          <input
            ref={inputRefs.blogName}
            type="text"
            name="blogName"
            value={values.blogName}
            onChange={handleSafeChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., AI Frontier Blog"
          />
          {renderWarning('blogName')}
          {touched.blogName && errors.blogName && (
            <p className="text-red-500 text-sm mt-1">{errors.blogName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
            Blog Slug <span className="text-purple-500">*</span>
          </label>
          <input
            ref={inputRefs.slug}
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
            placeholder="e.g., ai-frontier-blog"
          />
          {slugError && (
            <p className="text-red-500 text-sm mt-1">{slugError}</p>
          )}
          {!slugError && touched.slug && errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
          )}
        </div>
      </div>

      <div className="max-[1400px]:[&>*]:text-[13px] max-[1544px]:[&>*]:text-[12px] [&>*]:text-[14px]">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Description <span className="text-purple-500">*</span>
        </label>
        <textarea
          ref={inputRefs.description}
          name="description"
          value={values.description}
          onChange={handleSafeChange}
          rows={3}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Brief description of your blog post..."
        />
        {renderWarning('description')}
        {touched.description && errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="max-[1400px]:[&>*]:text-[13px] max-[1544px]:[&>*]:text-[12px] [&>*]:text-[14px]">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Image URL <span className="text-purple-500">*</span>
        </label>
        <input
          ref={inputRefs.imgUrl}
          type="url"
          name="imgUrl"
          value={values.imgUrl}
          onChange={handleSafeChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="https://..."
        />
        {renderWarning('imgUrl')}
        {touched.imgUrl && errors.imgUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.imgUrl}</p>
        )}
      </div>

      <div className="max-[1400px]:[&>*]:text-[13px] max-[1544px]:[&>*]:text-[12px] [&>*]:text-[14px]">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={values.author}
          disabled
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
