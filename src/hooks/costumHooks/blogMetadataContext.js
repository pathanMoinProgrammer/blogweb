'use client';
import { createContext, useContext, useState } from 'react';

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [blogName, setBlogName] = useState('');
  const [enurl, setEnurl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [content, setContent] = useState('<p>Start Writing New Blog</p>');
  const [HtmContent, setHtmContent] = useState('<p>Start Writing New Blog</p>');
  const [author, setAuthor] = useState('Admin User');
  const [clickable, setClickable] = useState(true);

  const value = {
    blogName, setBlogName,
    enurl, setEnurl,
    title, setTitle,
    description, setDescription,
    imgUrl, setImgUrl,
    content, setContent,
    HtmContent, setHtmContent,
    author, setAuthor,
    clickable, setClickable,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlogContext() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlogContext must be used inside BlogProvider');
  return ctx;
}
