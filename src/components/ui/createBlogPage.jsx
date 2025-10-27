'use client';
import React from 'react';
import Notification from '../blog/Notification';
import EditorPreviewTabs from '../tabsScreen/EditorPreview';
import BlogMetadataForm from '../blog/BlogMetadataForm';
import ActionButton from './actionButton';

const CreateBlogPage = ({
  loading,
  error,
  setShowNotification,
  showNotification,
  formData,
  formik,
  postid,
  refArray,
  locale,
  notifyMessage,
  setNotifiMessage,
  languages,
  isFullscreen,
  setIsFullscreen,
  type
  
}) => {
  return (
    <div onSubmit={formik.handleSubmit} className="relative p-[1px] max-[840px]:py-[25px]">
      <Notification
        message={
          notifyMessage ||  'Operation was Successfull !'
        }
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <EditorPreviewTabs
        formData={formData}
        formik={formik}
        setNotifiMessage={setNotifiMessage}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        
      />
      <div className="max-[1300px]:hidden">
        <BlogMetadataForm
          formData={formData}
          formik={formik}
          setNotifiMessage={setNotifiMessage}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
        />
      </div>
      <ActionButton
        loading={loading}
        formik={formik}
        postid={postid}
        refArray={refArray}
        locale={locale}
        setNotifiMessage={setNotifiMessage}
        languages={languages}
        type={type}
      />
    </div>
  );
};

export default CreateBlogPage;
