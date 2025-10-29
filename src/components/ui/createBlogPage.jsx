'use client';
import React from 'react';
import Notification from '../blog/Notification';
import EditorPreviewTabs from '../tabsScreen/EditorPreview';
import BlogMetadataForm from '../blog/BlogMetadataForm';
import ActionButton from './actionButton';
import BlogTitle from './blogTitle';
import JoditEditor from '../blog/joditeditor';

const CreateBlogPage = ({
  loading,
  error,
  setShowNotification,
  showNotification,
  setNotifiMessage,
  formData,
  formik,
  postid,
  refArray,
  locale,
  notifyMessage,
  languages,
  isFullscreen,
  setIsFullscreen,
  type,
  inputRefs,
  handleFocusField
}) => {
  const { HtmContent } = formik.values;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative p-px max-[840px]:py-[25px] bg-[#f0eded]"
    >
      <Notification
        messages={notifyMessage}
        isVisible={showNotification}
        handleFocusField={handleFocusField}
        onClose={() => setShowNotification(false)}
      />
      <div className="max-[1300px]:hidden w-full min-h-screen flex flex-col  p-5">
        <label className="w-full text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          Blog Title <span className="text-purple-500">*</span>
        </label>
        <div className="w-full flex  gap-lg  justify-around pb-3">
          <BlogTitle formik={formik} inputRefs={inputRefs}/>
          <div className=" ">
            <ActionButton
              loading={loading}
              formik={formik}
              postid={postid}
              refArray={refArray}
              locale={locale}
              languages={languages}
              type={type}
              setNotifiMessage={setNotifiMessage}
              setShowNotification={setShowNotification}
              showNotification={showNotification}
            />
          </div>
        </div>

        <div className="flex gap-[20px] w-full min-h-[900px] ">
          <div className="w-[77%] bg-red-600 max-[1400px]:w-[70%] max-[1544px]:w-[72%] ">
            <JoditEditor
              storageKey="myBlogPost"
              formData={formData}
              formik={formik}
            />
          </div>

          <div className="max-[1300px]:hidden w-[23%] max-[1400px]:w-[30%] max-[1544px]:w-[28%] ">
            <BlogMetadataForm
              formData={formData}
              formik={formik}
              setNotifiMessage={setNotifiMessage}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
              inputRefs={inputRefs}
            />
          </div>
        </div>
      </div>
      <div className="min-[1300px]:hidden ">
        <EditorPreviewTabs
          formData={formData}
          formik={formik}
          setNotifiMessage={setNotifiMessage}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          loading={loading}
          postid={postid}
          refArray={refArray}
          locale={locale}
          languages={languages}
          type={type}
          setShowNotification={setShowNotification}
          showNotification={showNotification}
          inputRefs={inputRefs}
        />
      </div>
    </form>
  );
};

export default CreateBlogPage;
