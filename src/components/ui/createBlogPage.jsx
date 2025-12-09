'use client';
import React from 'react';
import Notification from '../blog/Notification';
import EditorPreviewTabs from '../tabsScreen/EditorPreview';
import BlogMetadataForm from '../blog/BlogMetadataForm';
import ActionButton from './actionButton';
import BlogTitle from './blogTitle';
// import JoditEditor from '../blog/joditeditor';
import TiptapEditor from '../blog/joditeditor';
import { useSafeInputHandler } from '@/hooks/costumHooks/blogMetaDataChecker';
import useCreateBlogPage from '@/hooks/costumHooks/useCreateBlogPage';


const CreateBlogPage = ({ editorT }) => {
  const {
    error,
    showNotification,
    setShowNotification,
    loading,
    formData,
    postid,
    formik,
    refArray,
    locale,
    notifyMessage,
    setNotifiMessage,
    languages,
    isFullscreen,
    setIsFullscreen,
    type,
    inputRefs,
    handleFocusField,
    pendingImages,
    setPendingImages,
    thumbnailFile,
    setThumbnailFile,
    thumbPreview,
    setThumbPreview,
    t,
    notifyT,
    metadataT,
  } = useCreateBlogPage();
  const { HtmContent } = formik.values;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative p-px max-[840px]:py-[25px] bg-[#f0eded]  dark:bg-[rgb(21,29,44)]"
    >
      <Notification
        messages={notifyMessage}
        isVisible={showNotification}
        handleFocusField={handleFocusField}
        onClose={() => setShowNotification(false)}
        notifyT={notifyT}
        inputRefs={inputRefs}
      />
      <div className="max-[1300px]:hidden w-full min-h-screen flex flex-col  p-5">
        <label className="w-full text-sm font-semibold mb-2 text-gray-700 dark:text-white">
          {metadataT?.BlogTitle} <span className="text-purple-500">*</span>
        </label>
        <div className="w-full flex  gap-[20px]  justify-around pb-3">
          <BlogTitle
            formik={formik}
            inputRefs={inputRefs}
            metadataT={metadataT}
            reff={inputRefs.title[0]}
            name={'title2'}
          />

          <div className="max-[1300px]:hidden w-[23%] max-[1400px]:w-[30%] max-[1544px]:w-[28%]">
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
          <div className="w-[77%]  max-[1400px]:w-[70%] max-[1544px]:w-[72%] h-screen">
            {/* <JoditEditor
              storageKey="myBlogPost"
              formData={formData}
              formik={formik}
              editorT={editorT}
              editorRef={inputRefs.editor[0]}
              name='editor'
            /> */}

            <TiptapEditor
              formData={formData}
              formik={formik}
              editorT={editorT}
              editorRef={inputRefs.editor[0]}
              name="editor"
              pendingImages={pendingImages}
              setPendingImages={setPendingImages}
              setNotifiMessage={setNotifiMessage}
              setShowNotification={setShowNotification}
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
              metadataT={metadataT}

              imgUrl={formData.imgUrl}

              setThumbnailFile={setThumbnailFile}
              thumbPreview={thumbPreview} setThumbPreview={setThumbPreview}
            />
            
          </div>
        </div>
      </div>
      <div className="min-[1300px]:hidden ">
        <EditorPreviewTabs
          c
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
          metadataT={metadataT}
          editorT={editorT}
          pendingImages={pendingImages}
          setPendingImages={setPendingImages}
        />
      </div>
    </form>
  );
};

export default CreateBlogPage;
