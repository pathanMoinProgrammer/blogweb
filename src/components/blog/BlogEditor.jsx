// // 'use client';

// // import { EditorContent } from '@tiptap/react';
// // import MenuBar from './MenuBar';

// // export default function BlogEditor({ editor }) {
// //   return (
// //     <div className="mb-6">
// //       <h2 className="text-xl font-semibold mb-4">✍️ Write Your Blog</h2>
// //       <div
// //         className="outline-none rounded-lg overflow-hidden border-[0.5px] bg-white"
// //         onClick={() => editor?.commands.focus()}
// //       >
// //         <MenuBar editor={editor} />
// //         <EditorContent editor={editor} className="px-5 py-3 text-black " />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useCallback } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import TaskList from "@tiptap/extension-task-list";
// import TaskItem from "@tiptap/extension-task-item";
// import Superscript from "@tiptap/extension-superscript";
// import Subscript from "@tiptap/extension-subscript";
// import Image from "@tiptap/extension-image";
// import { lowlight } from "lowlight/lib/common";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

// import {
//   Bold,
//   Italic,
//   Strikethrough,
//   Underline as UnderlineIcon,
//   Code,
//   Highlighter,
//   Link as LinkIcon,
//   Undo,
//   Redo,
//   Heading1,
//   Heading2,
//   Heading3,
//   Heading4,
//   Heading5,
//   Heading6,
//   List,
//   ListOrdered,
//   ListTodo,
//   Quote,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
//   ImagePlus,
//   Superscript as SupIcon,
//   Subscript as SubIcon,
// } from "lucide-react";

// const MenuButton = ({ onClick, icon: Icon, isActive, disabled }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`p-2 rounded hover:bg-gray-200 ${
//       isActive ? "bg-gray-300" : ""
//     }`}
//   >
//     <Icon size={18} />
//   </button>
// );

// const TipTapEditor = () => {
//   const editor = useEditor({
//     immediatelyRender:false,
//     extensions: [
//       StarterKit.configure({
//         heading: {
//           levels: [1, 2, 3, 4, 5, 6],
//         },
//       }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//       }),
//       Highlight,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       TaskList,
//       TaskItem,
//       Superscript,
//       Subscript,
//       Image,
//       CodeBlockLowlight.configure({
//         lowlight,
//       }),
//     ],
//     content: "<p>Start typing...</p>",
//   });

//   const setLink = useCallback(() => {
//     if (!editor) return;
//     const previousUrl = editor.getAttributes("link").href;
//     const url = window.prompt("Enter URL", previousUrl);
//     if (url === null) return;
//     if (url === "") {
//       editor.chain().focus().unsetLink().run();
//       return;
//     }
//     editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//   }, [editor]);

//   const addImage = useCallback(() => {
//     const url = window.prompt("Enter image URL");
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   }, [editor]);

//   if (!editor) return null;

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-2 border-b pb-2 mb-3 items-center">

//         {/* Undo / Redo */}
//         <MenuButton onClick={() => editor.chain().focus().undo().run()} icon={Undo} />
//         <MenuButton onClick={() => editor.chain().focus().redo().run()} icon={Redo} />

//         <div className="border-l mx-2 h-5" />

//         {/* Heading Selector */}
//         <select
//           className="border rounded p-1 text-sm"
//           onChange={(e) => {
//             const level = parseInt(e.target.value);
//             editor.chain().focus().setHeading({ level }).run();
//           }}
//           defaultValue="0"
//         >
//           <option value="0">Normal</option>
//           {[1, 2, 3, 4, 5, 6].map((lvl) => (
//             <option key={lvl} value={lvl}>
//               H{lvl}
//             </option>
//           ))}
//         </select>

//         {/* Lists */}
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           icon={List}
//           isActive={editor.isActive("bulletList")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           icon={ListOrdered}
//           isActive={editor.isActive("orderedList")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleTaskList().run()}
//           icon={ListTodo}
//           isActive={editor.isActive("taskList")}
//         />

//         {/* Blockquote & Code Block */}
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           icon={Quote}
//           isActive={editor.isActive("blockquote")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           icon={Code}
//           isActive={editor.isActive("codeBlock")}
//         />

//         <div className="border-l mx-2 h-5" />

//         {/* Text Styles */}
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           icon={Bold}
//           isActive={editor.isActive("bold")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           icon={Italic}
//           isActive={editor.isActive("italic")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           icon={Strikethrough}
//           isActive={editor.isActive("strike")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           icon={UnderlineIcon}
//           isActive={editor.isActive("underline")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleHighlight().run()}
//           icon={Highlighter}
//           isActive={editor.isActive("highlight")}
//         />
//         <MenuButton onClick={setLink} icon={LinkIcon} isActive={editor.isActive("link")} />

//         <div className="border-l mx-2 h-5" />

//         {/* Super/Sub Script */}
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleSuperscript().run()}
//           icon={SupIcon}
//           isActive={editor.isActive("superscript")}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().toggleSubscript().run()}
//           icon={SubIcon}
//           isActive={editor.isActive("subscript")}
//         />

//         <div className="border-l mx-2 h-5" />

//         {/* Alignment */}
//         <MenuButton
//           onClick={() => editor.chain().focus().setTextAlign("left").run()}
//           icon={AlignLeft}
//           isActive={editor.isActive({ textAlign: "left" })}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().setTextAlign("center").run()}
//           icon={AlignCenter}
//           isActive={editor.isActive({ textAlign: "center" })}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().setTextAlign("right").run()}
//           icon={AlignRight}
//           isActive={editor.isActive({ textAlign: "right" })}
//         />
//         <MenuButton
//           onClick={() => editor.chain().focus().setTextAlign("justify").run()}
//           icon={AlignJustify}
//           isActive={editor.isActive({ textAlign: "justify" })}
//         />

//         <div className="border-l mx-2 h-5" />

//         {/* Add Image */}
//         <MenuButton onClick={addImage} icon={ImagePlus} />
//       </div>

//       <EditorContent editor={editor} className="min-h-[200px] p-3 outline-none" />
//     </div>
//   );
// };

// export default TipTapEditor;

// TipTapEditorFull.jsx





'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

import HorizontalRule from '@tiptap/extension-horizontal-rule';
import History from '@tiptap/extension-history';
import { lowlight } from 'lowlight/lib/common';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Code,
  Highlighter,
  Link as LinkIcon,
  Undo,
  Redo,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImagePlus,
  Superscript as SupIcon,
  Subscript as SubIcon,
  Menu,
  File,
  Video,
  Search,
  Maximize,
  Eye,
  Printer,
  Trash2,
  Minimize2,
  Type,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

const MenuButton = ({ onClick, icon: Icon, isActive, disabled, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded hover:bg-gray-100 disabled:opacity-50 ${
      isActive ? 'bg-gray-200' : ''
    }`}
    type="button"
  >
    <Icon size={18} />
  </button>
);

const FONT_FAMILIES = [
  { label: 'Default', value: '' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Courier New', value: "'Courier New', Courier, monospace" },
  { label: 'Georgia', value: 'Georgia, serif' },
  {
    label: 'Lucida Sans Unicode',
    value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
  },
  { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { label: 'Times New Roman', value: "'Times New Roman', Times, serif" },
  { label: 'Trebuchet MS', value: "'Trebuchet MS', Helvetica, sans-serif" },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
];

const FONT_SIZES = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72, 96,
];

const LIST_STYLES = [
  { label: 'Default (disc)', value: 'disc' },
  { label: 'Circle', value: 'circle' },
  { label: 'Square', value: 'square' },
  { label: 'Dot', value: 'disc' },
];

const ORDERED_STYLES = [
  { label: 'Default (1.)', value: 'decimal' },
  { label: 'Lower alpha (a.)', value: 'lower-alpha' },
  { label: 'Upper alpha (A.)', value: 'upper-alpha' },
  { label: 'Lower roman (i.)', value: 'lower-roman' },
  { label: 'Upper roman (I.)', value: 'upper-roman' },
  { label: 'Lower greek', value: 'lower-greek' },
];

const CLASS_NAMES = [
  { label: 'None', value: '' },
  { label: 'enabled', value: 'enabled' },
  { label: 'disabled', value: 'disabled' },
  { label: 'activated', value: 'activated' },
  { label: 'text-left', value: 'text-left' },
  { label: 'text-center', value: 'text-center' },
  { label: 'text-right', value: 'text-right' },
  { label: 'warning', value: 'warning' },
  { label: 'error', value: 'error' },
];

const SPECIAL_CHARS = [
  '©',
  '®',
  '™',
  '§',
  '±',
  'µ',
  '¶',
  '·',
  '•',
  '–',
  '—',
  '…',
  '¿',
  '¡',
  '€',
  '£',
  '¥',
  '¢',
  'º',
  'ª',
  '¼',
  '½',
  '¾',
  '÷',
  '×',
  'α',
  'β',
  'γ',
  'δ',
  'ε',
  'π',
  'φ',
  'Ω',
  '∞',
  '≈',
  '≠',
  '≤',
  '≥',
  '←',
  '→',
  '↑',
  '↓',
];

const TipTapEditorFull = () => {
  const [pasteHistory, setPasteHistory] = useState([]); // store pasted content
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [tableSize, setTableSize] = useState({ rows: 2, cols: 2 });
  const [showSpecialChar, setShowSpecialChar] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const [linkText, setLinkText] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [customFontSize, setCustomFontSize] = useState('');
  const [bulletStyle, setBulletStyle] = useState('disc');
  const [orderedStyle, setOrderedStyle] = useState('decimal');
  const [selectedClassname, setSelectedClassname] = useState('');
  const [spellCheck, setSpellCheck] = useState(true);
  const [speechRecognitionEnabled, setSpeechRecognitionEnabled] =
    useState(false);
  const [speechInterim, setSpeechInterim] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [isCodeMode, setIsCodeMode] = useState(false);

  const recognitionRef = useRef(null);
  const editorWrapperRef = useRef(null);



  const editor = useEditor({
    immediatelyRender:false,
  extensions: [
    StarterKit.configure({
      history: false, // disable built-in history
    }),
    History.configure({
      depth: 100,
      newGroupDelay: 500,
    }),
    Underline,
    Link.configure({ openOnClick: false }),
    Highlight,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TaskList,
    TaskItem,
    Superscript,
    Subscript,
    Image,
    TextStyle,
    Placeholder.configure({ placeholder: 'Start writing...' }),
    CharacterCount.configure({ limit: 100000 }),
    Table?.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    HorizontalRule,
    CodeBlockLowlight.configure({ lowlight }),
  ],
  content: '<p>Start typing...</p>',
});

  



  // Keep spellcheck toggled
  useEffect(() => {
    if (!editor) return;
    const view = editor.view;
    if (view && view.dom) {
      view.dom.spellcheck = spellCheck;
    }
  }, [spellCheck, editor]);

  // Paste listener to push into pasteHistory
  useEffect(() => {
    const handlePaste = (e) => {
      // Save both text and html if available
      const text =
        (e.clipboardData && e.clipboardData.getData('text/plain')) || '';
      const html =
        (e.clipboardData && e.clipboardData.getData('text/html')) || '';
      const entry = { text, html, time: new Date().toISOString() };
      setPasteHistory((prev) => [entry, ...prev].slice(0, 50));
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Speech recognition
  useEffect(() => {
    if (
      !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    ) {
      // Browser doesn't support
      recognitionRef.current = null;
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = speechInterim;
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let final = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      // Insert interim results into a temporary placeholder or final when final found
      if (final) {
        editor.chain().focus().insertContent(final).run();
      }
      // For interim: we won't insert permanently to keep editor clean
    };
    recognitionRef.current = recognition;
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [editor, speechInterim]);

  // Actions
  const toggleSpeech = () => {
    if (!recognitionRef.current)
      return alert('Speech Recognition not supported in this browser.');
    if (!speechRecognitionEnabled) {
      recognitionRef.current.start();
      setSpeechRecognitionEnabled(true);
    } else {
      recognitionRef.current.stop();
      setSpeechRecognitionEnabled(false);
    }
  };

  // Link dialog
  const openLinkDialog = () => {
    if (!editor) return;
    const attrs = editor.getAttributes('link');
    setLinkValue(attrs.href || '');
    setShowLinkDialog(true);
  };

  const applyLink = () => {
    if (!editor) return;
    if (!linkValue) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkValue })
        .run();
    }
    setShowLinkDialog(false);
  };

  // Image / File / Video modals (use file input)
  const insertImageFromFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: url, alt: file.name }).run();
  };

  const insertFileAsLink = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    editor
      .chain()
      .focus()
      .insertContent(
        `<a href="${url}" target="_blank" rel="noopener">${file.name}</a>`,
      )
      .run();
  };

  const insertVideoFromFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    editor
      .chain()
      .focus()
      .insertContent(`<video controls src="${url}"></video>`)
      .run();
  };

  // Table insertion
  const insertTable = (rows, cols) => {
    if (!editor) return;
    // construct table HTML
    let tableHtml = '<table>';
    for (let r = 0; r < rows; r++) {
      tableHtml += '<tr>';
      for (let c = 0; c < cols; c++) {
        tableHtml += '<td><p></p></td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    editor.chain().focus().insertContent(tableHtml).run();
    setShowTablePicker(false);
  };

  // Font family and size (use textStyle mark to apply CSS)
  const applyFontFamily = (value) => {
    setFontFamily(value);
    if (!editor) return;
    if (!value) {
      editor.chain().focus().unsetMark('textStyle').run();
      return;
    }
    const style = `font-family: ${value};`;
    editor.chain().focus().setMark('textStyle', { style }).run();
  };

  const applyFontSize = (value) => {
    if (!editor) return;
    setFontSize(value);
    if (!value) {
      editor.chain().focus().unsetMark('textStyle').run();
      return;
    }
    const style = `font-size: ${value}px;`;
    editor.chain().focus().setMark('textStyle', { style }).run();
  };

  const applyCustomFontSize = () => {
    const val = parseFloat(customFontSize);
    if (!val || !editor) return;
    applyFontSize(val);
  };

  // Clean formatting (remove marks and set paragraph)
  const cleanFormatting = () => {
    if (!editor) return;
    editor.chain().focus().clearNodes().unsetAllMarks().setParagraph().run();
  };

  // Change unordered list style by wrapping an ul with style
  const applyBulletStyle = (style) => {
    setBulletStyle(style);
    if (!editor) return;
    // TipTap doesn't provide list-style-type directly; we'll wrap selection in a list and then set attribute by converting the node HTML
    editor.chain().focus().toggleBulletList().run();
    // Ugly but pragmatic: update DOM style for nearest ul
    setTimeout(() => {
      const { view } = editor;
      const sel = view?.dom?.querySelector('ul');
      if (sel) sel.style.listStyleType = style;
    }, 30);
  };

  // Ordered list style
  const applyOrderedStyle = (style) => {
    setOrderedStyle(style);
    if (!editor) return;
    editor.chain().focus().toggleOrderedList().run();
    setTimeout(() => {
      const { view } = editor;
      const sel = view?.dom?.querySelector('ol');
      if (sel) sel.style.listStyleType = style;
    }, 30);
  };

  // Insert classname to current block (wrap with span using class)
  const applyClassName = (classname) => {
    setSelectedClassname(classname);
    if (!editor) return;
    const node = editor.state.selection.$from.node();
    if (!classname) {
      // remove class on current node by wrapping with same tag but no class
      return;
    }
    // wrap selection with span having class
    editor.chain().focus().setNode('paragraph', { class: classname }).run();
  };

  // Insert special character
  const insertSpecialChar = (ch) => {
    if (!editor) return;
    editor.chain().focus().insertContent(ch).run();
    setShowSpecialChar(false);
  };

  // Paste history: insert selected paste into editor
  const insertPasteEntry = (entry) => {
    if (!editor) return;
    if (entry.html) {
      editor.chain().focus().insertContent(entry.html).run();
    } else {
      editor.chain().focus().insertContent(entry.text).run();
    }
    setShowPasteModal(false);
  };

  // Find/Replace: simple implementation that searches HTML string
  const findNext = () => {
    if (!editor || !findText) return;
    const html = editor.getHTML();
    const idx = html.indexOf(findText);
    if (idx === -1) return alert('Not found');
    // crude method: select by replacing content with mark - for production you'd parse and locate pos
    alert(
      'Found — move caret and manually replace. (Lightweight demo for find/replace)',
    );
  };

  const replaceAll = () => {
    if (!editor || !findText) return;
    const html = editor.getHTML().split(findText).join(replaceText);
    editor.commands.setContent(html);
  };

  // Toggle code/native mode
  const toggleCodeMode = () => {
    if (!editor) return;
    setIsCodeMode((s) => {
      const next = !s;
      if (next) {
        // show raw HTML in codeblock
        const html = editor.getHTML();
        editor
          .chain()
          .focus()
          .setContent(`<pre><code>${html.replace(/</g, '&lt;')}</code></pre>`)
          .run();
      } else {
        // attempt to restore from codeblock
        const text = editor.getText();
        try {
          editor.commands.setContent(text);
        } catch (e) {
          console.warn('Failed to restore HTML from code mode.', e);
        }
      }
      return next;
    });
  };

  // Fullscreen / preview / print
  const toggleFullscreen = () => {
    setIsFullscreen((s) => !s);
    if (!isFullscreen && editorWrapperRef.current) {
      editorWrapperRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const preview = () => {
    setPreviewHtml(editor.getHTML());
    window.open().document.write(editor.getHTML());
  };

  const printEditor = () => {
    const w = window.open();
    w.document.write(editor.getHTML());
    w.print();
  };

  // Clipboard cut/copy/paste - enabling/disabling based on selection
  const canCutOrCopy = () => {
    if (!editor) return false;
    const sel = editor.state.selection;
    return !sel.empty;
  };

  const cutSelection = async () => {
    if (!editor) return;
    const text = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      '\n',
    );
    try {
      await navigator.clipboard.writeText(text);
      editor.chain().focus().deleteSelection().run();
    } catch (e) {
      alert('Cut failed (clipboard permission).');
    }
  };

  const copySelection = async () => {
    if (!editor) return;
    const text = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      '\n',
    );
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      alert('Copy failed (clipboard permission).');
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      editor.chain().focus().insertContent(text).run();
    } catch (e) {
      alert('Paste from clipboard failed — permission or unsupported.');
    }
  };

  // Insert horizontal rule
  const insertHorizontal = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  // Insert link quick
  const setLinkQuick = useCallback(() => {
    openLinkDialog();
  }, [editor]);

  // Insert code block
  const toggleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  if (!editor) return null;

  return (
    <div
      ref={editorWrapperRef}
      className={`border rounded-lg p-3 bg-white ${
        isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-3 items-center">
        {/* Undo / Redo */}
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={Undo}
          title="Undo"
        />
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={Redo}
          title="Redo"
        />

        <div className="border-l mx-2 h-5" />

        {/* Block format (paragraph, headings, quote, code) */}
        <select
          className="border rounded p-1 text-sm"
          onChange={(e) => {
            const val = e.target.value;
            if (val === '0') editor.chain().focus().setParagraph().run();
            else if (val.startsWith('h'))
              editor
                .chain()
                .focus()
                .setHeading({ level: parseInt(val.slice(1), 10) })
                .run();
            else if (val === 'quote')
              editor.chain().focus().toggleBlockquote().run();
            else if (val === 'code') toggleCodeBlock();
          }}
        >
          <option value="0">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="quote">Quote</option>
          <option value="code">Code</option>
        </select>

        <div className="border-l mx-2 h-5" />

        {/* Lists - plus style selectors */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
          isActive={editor.isActive('bulletList')}
          title="Bullet list"
        />
        <select
          className="border rounded p-1 text-sm"
          value={bulletStyle}
          onChange={(e) => applyBulletStyle(e.target.value)}
        >
          {LIST_STYLES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={ListOrdered}
          isActive={editor.isActive('orderedList')}
          title="Ordered list"
        />
        <select
          className="border rounded p-1 text-sm"
          value={orderedStyle}
          onChange={(e) => applyOrderedStyle(e.target.value)}
        >
          {ORDERED_STYLES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <MenuButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          icon={ListTodo}
          isActive={editor.isActive('taskList')}
          title="Task list"
        />

        <div className="border-l mx-2 h-5" />

        {/* Text styles */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
          isActive={editor.isActive('bold')}
          title="Bold"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
          isActive={editor.isActive('italic')}
          title="Italic"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          icon={Strikethrough}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={UnderlineIcon}
          isActive={editor.isActive('underline')}
          title="Underline"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          icon={Highlighter}
          isActive={editor.isActive('highlight')}
          title="Highlight"
        />
        <MenuButton
          onClick={() => {
            editor.chain().focus().toggleCode().run();
          }}
          icon={Code}
          isActive={editor.isActive('code')}
          title="Inline code"
        />
        <button
          className="px-2 py-1 border rounded ml-2 text-sm"
          onClick={cleanFormatting}
          title="Clean formatting"
        >
          Clear
        </button>

        <div className="border-l mx-2 h-5" />

        {/* Font family & size */}
        <select
          className="border rounded p-1 text-sm"
          value={fontFamily}
          onChange={(e) => applyFontFamily(e.target.value)}
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-1 text-sm"
          value={fontSize}
          onChange={(e) => applyFontSize(e.target.value)}
        >
          <option value="">Size</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}px
            </option>
          ))}
        </select>
        <input
          placeholder="Custom px"
          value={customFontSize}
          onChange={(e) => setCustomFontSize(e.target.value)}
          className="w-20 border rounded p-1 text-sm"
        />
        <button
          className="px-2 py-1 border rounded text-sm"
          onClick={applyCustomFontSize}
        >
          Apply
        </button>

        <div className="border-l mx-2 h-5" />

        {/* Super/Sub */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          icon={SupIcon}
          isActive={editor.isActive('superscript')}
          title="Superscript"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          icon={SubIcon}
          isActive={editor.isActive('subscript')}
          title="Subscript"
        />

        <div className="border-l mx-2 h-5" />

        {/* Align */}
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          icon={AlignLeft}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align left"
        />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          icon={AlignCenter}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align center"
        />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          icon={AlignRight}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align right"
        />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          icon={AlignJustify}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Justify"
        />

        <div className="border-l mx-2 h-5" />

        {/* Colors */}
        <label className="flex items-center gap-1">
          <span className="text-xs">Text</span>
          <input
            type="color"
            onChange={(e) =>
              editor
                .chain()
                .focus()
                .setMark('textStyle', { style: `color: ${e.target.value};` })
                .run()
            }
          />
        </label>
        <label className="flex items-center gap-1">
          <span className="text-xs">BG</span>
          <input
            type="color"
            onChange={(e) =>
              editor
                .chain()
                .focus()
                .setMark('textStyle', {
                  style: `background-color: ${e.target.value};`,
                })
                .run()
            }
          />
        </label>

        <div className="border-l mx-2 h-5" />

        {/* Link / Image / File / Video */}
        <MenuButton
          onClick={setLinkQuick}
          icon={LinkIcon}
          isActive={editor.isActive('link')}
          title="Insert link"
        />
        <MenuButton
          onClick={() => setShowImageModal(true)}
          icon={ImagePlus}
          title="Insert image"
        />
        <MenuButton
          onClick={() => setShowFileModal(true)}
          icon={File}
          title="Insert file"
        />
        <MenuButton
          onClick={() => setShowVideoModal(true)}
          icon={Video}
          title="Insert video"
        />

        <div className="border-l mx-2 h-5" />

        {/* Table / Special char / Horizontal rule */}
        <button
          className="px-2 py-1 border rounded text-sm"
          onClick={() => setShowTablePicker(true)}
        >
          Insert table
        </button>
        <button
          className="px-2 py-1 border rounded text-sm"
          onClick={() => setShowSpecialChar(true)}
        >
          Special char
        </button>
        <MenuButton
          onClick={insertHorizontal}
          icon={Minimize2}
          title="Horizontal rule"
        />

        <div className="border-l mx-2 h-5" />

        {/* Cut/Copy/Paste and paste history */}
        <button
          className="px-2 py-1 border rounded text-sm"
          disabled={!canCutOrCopy()}
          onClick={cutSelection}
        >
          Cut
        </button>
        <button
          className="px-2 py-1 border rounded text-sm"
          disabled={!canCutOrCopy()}
          onClick={copySelection}
        >
          Copy
        </button>
        <button
          className="px-2 py-1 border rounded text-sm"
          onClick={pasteFromClipboard}
        >
          Paste
        </button>
        <button
          className="px-2 py-1 border rounded text-sm"
          onClick={() => setShowPasteModal(true)}
        >
          Show all copies
        </button>

        <div className="border-l mx-2 h-5" />

        {/* Find/Replace */}
        <input
          placeholder="Find"
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          className="border rounded p-1 text-sm w-32"
        />
        <input
          placeholder="Replace"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          className="border rounded p-1 text-sm w-32"
        />
        <button className="px-2 py-1 border rounded text-sm" onClick={findNext}>
          Find next
        </button>
        <button
          className="px-2 py-1 border rounded text-sm"
          onClick={replaceAll}
        >
          Replace all
        </button>

        <div className="border-l mx-2 h-5" />

        {/* Mode / Full / Preview / Print */}
        <button
          className="px-2 py-1 border rounded text-sm"
          onClick={toggleCodeMode}
        >
          {isCodeMode ? 'Normal mode' : 'Code mode'}
        </button>
        <MenuButton
          onClick={toggleFullscreen}
          icon={Maximize}
          title="Fullscreen"
        />
        <MenuButton onClick={preview} icon={Eye} title="Preview" />
        <MenuButton onClick={printEditor} icon={Printer} title="Print" />

        <div className="border-l mx-2 h-5" />

        {/* Spellcheck / Speech */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={spellCheck}
            onChange={() => setSpellCheck((s) => !s)}
          />
          Spellcheck
        </label>
        <label className="flex items-center gap-1 text-sm ml-2">
          <input
            type="checkbox"
            checked={speechRecognitionEnabled}
            onChange={toggleSpeech}
          />
          Speech
        </label>
        <label className="flex items-center gap-1 text-sm ml-2">
          Interim
          <input
            type="checkbox"
            checked={speechInterim}
            onChange={() => setSpeechInterim((s) => !s)}
          />
        </label>
      </div>

      {/* Editor content area */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-3 outline-none"
      />

      {/* --- Modals & popovers (simple implementations) --- */}

      {/* Link dialog */}
      {showLinkDialog && (
        <div className="fixed top-24 right-24 bg-white border p-4 rounded shadow-lg z-60 w-96">
          <div className="flex justify-between items-center mb-2">
            <strong>Insert Link</strong>
            <button onClick={() => setShowLinkDialog(false)}>✕</button>
          </div>
          <input
            className="w-full border p-1 mb-2"
            placeholder="https://"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => {
                setLinkValue('');
                applyLink();
              }}
            >
              Remove
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={applyLink}
            >
              Insert
            </button>
          </div>
        </div>
      )}

      {/* Image modal */}
      {showImageModal && (
        <div className="fixed top-24 right-24 bg-white border p-4 rounded shadow-lg z-60 w-96">
          <div className="flex justify-between items-center mb-2">
            <strong>Insert Image</strong>
            <button onClick={() => setShowImageModal(false)}>✕</button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => insertImageFromFile(e.target.files[0])}
          />
          <div className="mt-2 text-sm text-gray-600">
            Or paste an image URL
          </div>
          <input
            className="w-full border p-1 mt-1"
            placeholder="Image URL"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editor.chain().focus().setImage({ src: e.target.value }).run();
                setShowImageModal(false);
              }
            }}
          />
          <div className="flex gap-2 justify-end mt-3">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setShowImageModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* File modal */}
      {showFileModal && (
        <div className="fixed top-24 right-24 bg-white border p-4 rounded shadow-lg z-60 w-96">
          <div className="flex justify-between items-center mb-2">
            <strong>Insert File</strong>
            <button onClick={() => setShowFileModal(false)}>✕</button>
          </div>
          <input
            type="file"
            onChange={(e) => insertFileAsLink(e.target.files[0])}
          />
          <div className="mt-2 text-sm text-gray-600">Or paste a file URL</div>
          <input
            className="w-full border p-1 mt-1"
            placeholder="File URL"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editor
                  .chain()
                  .focus()
                  .insertContent(
                    `<a href="${e.target.value}" target="_blank">${e.target.value}</a>`,
                  )
                  .run();
                setShowFileModal(false);
              }
            }}
          />
          <div className="flex gap-2 justify-end mt-3">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setShowFileModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Video modal */}
      {showVideoModal && (
        <div className="fixed top-24 right-24 bg-white border p-4 rounded shadow-lg z-60 w-96">
          <div className="flex justify-between items-center mb-2">
            <strong>Insert Video</strong>
            <button onClick={() => setShowVideoModal(false)}>✕</button>
          </div>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => insertVideoFromFile(e.target.files[0])}
          />
          <div className="mt-2 text-sm text-gray-600">
            Or paste an embed/URL
          </div>
          <input
            className="w-full border p-1 mt-1"
            placeholder="Video URL or embed code"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editor.chain().focus().insertContent(e.target.value).run();
                setShowVideoModal(false);
              }
            }}
          />
          <div className="flex gap-2 justify-end mt-3">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setShowVideoModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Table picker modal */}
      {showTablePicker && (
        <div className="fixed top-24 right-24 bg-white border p-4 rounded shadow-lg z-60 w-64">
          <div className="flex justify-between items-center mb-2">
            <strong>Insert Table</strong>
            <button onClick={() => setShowTablePicker(false)}>✕</button>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {/* A lightweight grid preview where hover sets size */}
            {Array.from({ length: 6 * 6 }).map((_, idx) => {
              const r = Math.floor(idx / 6) + 1;
              const c = (idx % 6) + 1;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setTableSize({ rows: r, cols: c })}
                  onClick={() => insertTable(r, c)}
                  className="w-6 h-6 border bg-gray-100 hover:bg-gray-300 cursor-pointer"
                />
              );
            })}
          </div>
          <div className="mt-2">
            Selected: {tableSize.rows} x {tableSize.cols}
          </div>
          <div className="flex gap-2 justify-end mt-3">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => insertTable(tableSize.rows, tableSize.cols)}
            >
              Insert
            </button>
          </div>
        </div>
      )}

      {/* Special character modal */}
      {showSpecialChar && (
        <div className="fixed top-20 right-20 bg-white border p-4 rounded shadow-lg z-60 w-96">
          <div className="flex justify-between items-center mb-2">
            <strong>Select Special Character</strong>
            <button onClick={() => setShowSpecialChar(false)}>✕</button>
          </div>
          <div className="grid grid-cols-8 gap-2 max-h-64 overflow-auto">
            {SPECIAL_CHARS.map((ch) => (
              <button
                key={ch}
                className="p-2 border rounded text-lg"
                onClick={() => insertSpecialChar(ch)}
              >
                {ch}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-end mt-3">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setShowSpecialChar(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Paste history modal */}
      {showPasteModal && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-white border p-4 rounded shadow-lg z-60 w-2/3 max-h-96 overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <strong>Paste history</strong>
            <button onClick={() => setShowPasteModal(false)}>✕</button>
          </div>
          <div className="space-y-2">
            {pasteHistory.length === 0 && (
              <div className="text-sm text-gray-500">
                No items yet. Paste something to store in history.
              </div>
            )}
            {pasteHistory.map((p, i) => (
              <div key={p.time + i} className="border rounded p-2">
                <div className="text-xs text-gray-500">
                  {new Date(p.time).toLocaleString()}
                </div>
                <div className="mt-1">
                  {p.html ? (
                    <div dangerouslySetInnerHTML={{ __html: p.html }} />
                  ) : (
                    <div>{p.text}</div>
                  )}
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    className="px-2 py-1 border rounded text-sm"
                    onClick={() => insertPasteEntry(p)}
                  >
                    Paste
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Small footer for classname selection */}
      <div className="mt-3 flex items-center gap-2">
        <label className="text-sm">Apply class to current block:</label>
        <select
          className="border rounded p-1 text-sm"
          value={selectedClassname}
          onChange={(e) => applyClassName(e.target.value)}
        >
          {CLASS_NAMES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TipTapEditorFull;
