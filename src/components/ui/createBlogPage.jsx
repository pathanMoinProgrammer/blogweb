'use client';
import React from 'react';
import Notification from '../blog/Notification'
import EditorPreviewTabs from '../tabsScreen/EditorPreview';
import BlogMetadataForm from '../blog/BlogMetadataForm';
import ActionButton from './actionButton';

const CreateBlogPage = ({
  loading,
  notificationMessage,
  setShowNotification,
  showNotification,
  formData,
  setFormData,
  handleCreateBlog,
  handleDelete,
  formik,
  postid
}) => {
  return (
    <div className="dark:bg-gray-800 relative">
      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <EditorPreviewTabs formData={formData} setFormData={setFormData} formik={formik}/>
      <div className="max-[1300px]:hidden">
        <BlogMetadataForm formData={formData} setFormData={setFormData} formik={formik} />
      </div>
      <ActionButton loading={loading} postid={postid} handleCreateBlog={handleCreateBlog} handleDelete={handleDelete}  />
    </div>
  );
};

export default CreateBlogPage;

