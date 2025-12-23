// // working code
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import YouTube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common';
import CustomImage from '../blog/extensions/ImageEditorExtantion';

const DEFAULT_CONTENT = '<p>Start writing your blog...</p>';

export default function useTiptapEditor({ formik }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Underline,
      Superscript,
      Subscript,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false }),
      // Image,
      CustomImage,
      Blockquote,
      HorizontalRule,
      YouTube.configure({ controls: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: DEFAULT_CONTENT,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  const [customColor, setCustomColor] = useState('#000000');
  const [customBgColor, setCustomBgColor] = useState('#ffff00');
  const [activeTab, setActiveTab] = useState('editor');
  const [showHeadings, setShowHeadings] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [linkPopup, setLinkPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);
  const [videoPopup, setVideoPopup] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');

  useEffect(() => {
    if (editor && !isHtmlMode) {
      setHtmlCode(editor.getHTML());
    }
  }, [editor, isHtmlMode]);

  useEffect(() => {
    if (!editor || !formik?.setFieldValue) return;

    let isUpdating = false; 

    const updateFormik = () => {
      if (isUpdating) return;
      isUpdating = true;

      setTimeout(() => {
        const html = editor.getHTML();
        formik.setFieldValue('content', html);
        formik.setFieldValue('HtmContent', html);
        isUpdating = false;
      }, 0);
    };

    editor.on('update', updateFormik);
    updateFormik();

    return () => editor.off('update', updateFormik);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();
    const formikContent = formik?.values?.content || DEFAULT_CONTENT;

    // Only set content if editor still has default and formik has different content
    if (currentContent === DEFAULT_CONTENT && formikContent !== DEFAULT_CONTENT) {
      setTimeout(() => {
        editor.commands.setContent(formikContent, false);
      }, 0);
    }
  }, [editor, formik?.values?.content]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 && activeTab === 'metadata') {
        setActiveTab('editor');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const toggleHtmlMode = () => {
    if (!editor) return;
    if (!isHtmlMode) {
      setHtmlCode(editor.getHTML());
    } else {
      editor.commands.setContent(htmlCode || DEFAULT_CONTENT, false);
    }
    setIsHtmlMode((prev) => !prev);
  };

  const handleAddLink = () => {
    if (editor && linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setLinkPopup(false);
    }
  };

  const handleAddImage = () => {
    if (editor && imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setImagePopup(false);
    }
  };

  const handleAddVideo = () => {
    if (editor && videoUrl) {
      editor.commands.setYoutubeVideo({ src: videoUrl });
      setVideoUrl('');
      setVideoPopup(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload image files only');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result;
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const startSpeechToText = () => {
    if (!editor) return;
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech Recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      editor.chain().focus().insertContent(`${text} `).run();
    };
    recognition.start();
  };

  const copyText = () => {
    if (!editor) return;
    navigator.clipboard.writeText(editor.getText());
  };

  const copyHTML = () => {
    if (!editor) return;
    navigator.clipboard.writeText(editor.getHTML());
  };

  const cutText = () => {
    if (!editor) return;
    navigator.clipboard.writeText(editor.getText());
    editor.commands.clearContent();
  };

  const handlePublish = async () => {
    if (!editor) return;
    try {
      setIsPublishing(true);
      // TODO: integrate real publish flow (formik + firestore)
      console.info('Preview publish payload', editor.getHTML());
    } finally {
      setIsPublishing(false);
    }
  };

  const handleTabClick = (tab) => {
    if (window.innerWidth <= 700) {
      setActiveTab(tab);
    } else {
      setActiveTab('editor');
    }
  };

  return {
    editor,
    activeTab,
    setActiveTab,
    handleTabClick,
    isHtmlMode,
    toggleHtmlMode,
    htmlCode,
    setHtmlCode,
    showHeadings,
    setShowHeadings,
    linkPopup,
    setLinkPopup,
    linkUrl,
    setLinkUrl,
    handleAddLink,
    imagePopup,
    setImagePopup,
    imageUrl,
    setImageUrl,
    handleAddImage,
    videoPopup,
    setVideoPopup,
    videoUrl,
    setVideoUrl,
    handleAddVideo,
    handleFileUpload,
    startSpeechToText,
    copyText,
    copyHTML,
    cutText,
    handlePublish,
    isPublishing,
    customColor,
    setCustomColor,
    customBgColor,
    setIsHtmlMode,
    setCustomBgColor,
    setFieldValue: formik?.setFieldValue || null,
  };
}
