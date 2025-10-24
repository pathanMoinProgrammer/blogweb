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
}) => {
  return (
    <div onSubmit={formik.handleSubmit} className='relative' >
      <Notification
        message={
          notifyMessage || error?.message || 'Operation was Successfull !'
        }
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <EditorPreviewTabs
        formData={formData}
        formik={formik}
        setNotifiMessage={setNotifiMessage}
      />
      <div className="max-[1300px]:hidden">
        <BlogMetadataForm
          formData={formData}
          formik={formik}
          setNotifiMessage={setNotifiMessage}
        />
      </div>
      <ActionButton
        loading={loading}
        formik={formik}
        postid={postid}
        refArray={refArray}
        locale={locale}
        setNotifiMessage={setNotifiMessage}
      />
    </div>
  );
};

export default CreateBlogPage;
