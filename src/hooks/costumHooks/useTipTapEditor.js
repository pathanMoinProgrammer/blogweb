import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useCreatePost from "@/app/components/firebaseHooks/useCreatePost";

export default function useTiptapEditor() {
  const params = useParams();
  const locale = params.locale;
  const id = params.postId;

  const { formik, editor, FireStoreAdd, state } = useCreatePost({ locale, id });

  const [customColor, setCustomColor] = useState("#000000");
  const [customBgColor, setCustomBgColor] = useState("#ffff00");
  const [activeTab, setActiveTab] = useState("editor");
  const [showHeadings, setShowHeadings] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [linkPopup, setLinkPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);
  const [videoPopup, setVideoPopup] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [htmlCode, setHtmlCode] = useState("");

  // Sync editor HTML when not in HTML mode
  useEffect(() => {
    if (editor && !isHtmlMode) {
      setHtmlCode(editor.getHTML());
    }
  }, [editor, isHtmlMode]);

  // Responsive tab reset
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 && activeTab === "metadata") {
        setActiveTab("editor");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  // Toggle HTML Mode
  const toggleHtmlMode = () => {
    if (!isHtmlMode) {
      setHtmlCode(editor.getHTML());
    } else {
      editor.commands.setContent(htmlCode);
    }
    setIsHtmlMode(!isHtmlMode);
  };

  // Link, Image, Video Handlers
  const handleAddLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setLinkPopup(false);
    }
  };

  const handleAddImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setImagePopup(false);
    }
  };

  const handleAddVideo = () => {
    if (videoUrl) {
      editor.commands.setYoutubeVideo({ src: videoUrl });
      setVideoUrl("");
      setVideoPopup(false);
    }
  };

  // File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result;
        if (url) editor.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload image files only");
    }
  };

  // Speech to Text
  const startSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      editor.chain().focus().insertContent(text + " ").run();
    };
    recognition.start();
  };

  // Copy / Cut
  const copyText = () => {
    navigator.clipboard.writeText(editor.getText());
    alert("Text copied!");
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(editor.getHTML());
    alert("HTML copied!");
  };

  const cutText = () => {
    navigator.clipboard.writeText(editor.getText());
    editor.commands.clearContent();
    alert("Text cut!");
  };

  // Publish
  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const htmlContent = editor.getHTML();
      // console.log("Published HTML:", htmlContent);
      await formik.submitForm();
      await FireStoreAdd();
    } catch (error) {
      console.error("Publish Error:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  // Tab Click (Mobile Responsive)
  const handleTabClick = (tab) => {
    if (window.innerWidth <= 700) {
      setActiveTab(tab);
    } else {
      setActiveTab("editor");
    }
  };

  // Return everything needed in UI
  return {
    editor,
    formik,
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
    setCustomBgColor,
  };
}