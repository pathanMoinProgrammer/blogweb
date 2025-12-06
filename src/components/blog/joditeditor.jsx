'use client';

import { EditorContent } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  FileCode,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Copy,
  Scissors,
  Mic,
  Upload,
  Link2,
  ImageIcon,
  Video,
  Minus,
  ChevronDown,
  ArrowLeft,
  Code,
} from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';
import useTiptapEditor from '@/components/hooks/useTiptapEditor';
import { useEffect, useState } from 'react';

export default function TiptapEditor(props) {
  const {
    editor,
    isHtmlMode,
    setFieldValue,
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
    setIsHtmlMode,
    customColor,
    setCustomColor,
    customBgColor,
    setCustomBgColor,
  } = useTiptapEditor({ formik: props?.formik });

  if (!editor) {
    return (
      <div className="flex h-[520px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
        <p className="text-sm text-slate-500">Loading editor...</p>
      </div>
    );
  }

  const { setPendingImages, setNotifiMessage, setShowNotification } = props;

  const ImageUploadCustom = ({ setImageUrl, editor, setImagePopup }) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-20 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50"
        >
          <Upload size={28} height={15} className="text-slate-500" />
          <span className="mt-2 text-sm text-slate-600">
            Click to upload image
          </span>
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            const acceptable = ['gif', 'png', 'jpeg', 'webp'];
            const filetype = file.type?.split('/')?.[1].toLocaleLowerCase();
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
              let message = 'Image size Must be 2 MB or less.';
              setImagePopup(false);
              setShowNotification(true);
              setNotifiMessage({
                type: 'error',
                message: message,
              });

              setTimeout(() => {
                setNotifiMessage({ type: '', message: [] });
              }, 2000);
              return;
            }
            //  else if (!acceptable.includes(filetype)) {
            //   let message = 'Upoading File Should be Either Image or Gif';
            //   setImagePopup(false);

            //   setShowNotification(true);

            //   setNotifiMessage({
            //     type: 'error',
            //     message: message,
            //   });

            //   setTimeout(() => {
            //     setNotifiMessage({ type: '', message: [] });
            //   }, 2000);
            //   return;
            // }

            const localUrl = URL.createObjectURL(file);

            setImageUrl(localUrl);
            setImagePopup(false);

            props.setPendingImages((prev) => [...prev, file]);

            editor.chain().focus().setImage({ src: localUrl }).run();
          }}
          className="hidden"
        />
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex rounded-lg border border-slate-300 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => {
              if (isHtmlMode) {
                editor.commands.setContent(htmlCode || DEFAULT_CONTENT, false);
              }
              setIsHtmlMode(false);
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              !isHtmlMode
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visual Editor
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isHtmlMode) {
                setHtmlCode(editor.getHTML());
              }
              setIsHtmlMode(true);
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              isHtmlMode
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            HTML Code
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToolbarBadge label="Actions" />
          <button
            type="button"
            onClick={copyText}
            className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100"
          >
            <Copy className="h-4 w-4" /> Copy Text
          </button>
          <button
            type="button"
            onClick={copyHTML}
            className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
          >
            <Code className="h-4 w-4" /> Copy HTML
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={cutText}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            <Scissors className="h-4 w-4" /> Cut All
          </button>
          <button
            type="button"
            onClick={startSpeechToText}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            <Mic className="h-4 w-4" /> Dictate
          </button>
          <button
            type="button"
            onClick={toggleHtmlMode}
            className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
          >
            {isHtmlMode ? (
              <>
                <ArrowLeft className="h-4 w-4" /> Back to Editor
              </>
            ) : (
              <>
                <FileCode className="h-4 w-4" /> HTML View
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col border-b border-slate-200 bg-gradient-to-r from-slate-50 via-indigo-50 to-purple-50 px-3 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <ToolbarGroup label="Format">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive('bold')}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive('italic')}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive('underline')}
              title="Underline (Ctrl+U)"
            >
              <span className="font-semibold underline">U</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive('strike')}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup label="Headings">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowHeadings((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white  px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-50"
              >
                {editor.isActive('heading')
                  ? `H${editor.getAttributes('heading').level}`
                  : 'Normal'}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showHeadings ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showHeadings && (
                <div className="absolute left-0 top-full z-30 mt-2 w-52 max-h-64 dark:bg-[#444a51] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-2xl">
                  {headingOptions.map((heading) => (
                    <button
                      key={heading.level}
                      type="button"
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .setHeading({ level: heading.level })
                          .run();
                        setShowHeadings(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                        editor.isActive('heading', { level: heading.level })
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'hover:bg-slate-50 hover:text-black'
                      }`}
                    >
                      {heading.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setParagraph().run();
                      setShowHeadings(false);
                    }}
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 dark:text-white  transition hover:bg-slate-50 hover:text-black"
                  >
                    Paragraph
                  </button>
                </div>
              )}
            </div>
          </ToolbarGroup>

          <ToolbarGroup label="Lists">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive('orderedList')}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup label="Blocks">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive('blockquote')}
              title="Blockquote"
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal rule"
            >
              <Minus className="h-4 w-4" />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup label="Align">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              active={editor.isActive({ textAlign: 'left' })}
              title="Align left"
            >
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              active={editor.isActive({ textAlign: 'center' })}
              title="Align center"
            >
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              active={editor.isActive({ textAlign: 'right' })}
              title="Align right"
            >
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup label="Colors">
            
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1">
              <input
                type="color"
                value={customBgColor}
                onChange={(e) => {
                  setCustomBgColor(e.target.value);
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: e.target.value })
                    .run();
                }}
                className="h-7 w-7 cursor-pointer rounded border border-slate-200"
              />
              <span className="text-xs font-semibold text-slate-600">
                Highlight
              </span>
            </div>
          </ToolbarGroup>

          <ToolbarGroup label="Media">
            <ToolbarButton
              onClick={() => setLinkPopup(true)}
              title="Insert link"
            >
              <Link2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setImagePopup(true)}
              title="Insert image URL"
            >
              <ImageIcon className="h-4 w-4" />
            </ToolbarButton>

            <label className="flex cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600 transition hover:bg-indigo-50">
              <Upload className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <label className="cursor-pointer"></label>
            <ToolbarButton
              onClick={() => setVideoPopup(true)}
              title="Insert YouTube video"
            >
              <Video className="h-4 w-4" />
            </ToolbarButton>
          </ToolbarGroup>
        </div>
      </div>

      <div className="flex-1 bg-white">
        {isHtmlMode ? (
          <div className="h-full min-h-[540px] border-t border-slate-200">
            <MonacoEditor
              language="html"
              theme="vs-dark"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
              }}
            />
          </div>
        ) : (
          <>
            <style jsx global>{`
              .ProseMirror {
                min-height: 600px;
                padding: 2rem;
                outline: none;
                font-size: 16px;
                line-height: 1.8;
                color: #1f2937;
              }
              .ProseMirror h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin: 1.5rem 0 1rem;
                color: #111827;
              }
              .ProseMirror h2 {
                font-size: 2rem;
                font-weight: 600;
                margin: 1.25rem 0 0.875rem;
              }
              .ProseMirror h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin: 1rem 0 0.75rem;
              }
              .ProseMirror p {
                margin: 0.75rem 0;
              }
              .ProseMirror blockquote {
                border-left: 4px solid #6366f1;
                padding-left: 1.5rem;
                margin: 1.5rem 0;
                color: #6b7280;
                font-style: italic;
              }
              .ProseMirror img {
                max-width: 100%;
                height: auto;
                border-radius: 12px;
                margin: 1.5rem 0;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
              }
              .ProseMirror pre {
                background-color: #1f2937;
                color: #e5e7eb;
                padding: 1.5rem;
                border-radius: 12px;
                overflow-x: auto;
                margin: 1.5rem 0;
              }
            `}</style>
            <EditorContent editor={editor} />
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-white px-4 py-3">
        <ToolbarBadge label="Quick tools" />
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          Clear formatting
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
        >
          Redo
        </button>
      </div>

      {linkPopup && (
        <PopupCard
          title="Insert link"
          value={linkUrl}
          onChange={setLinkUrl}
          onClose={() => setLinkPopup(false)}
          onConfirm={handleAddLink}
          placeholder="https://example.com"
        />
      )}

      {imagePopup && (
        <PopupCard
          title="Insert image URL"
          value={imageUrl}
          onChange={setImageUrl}
          onClose={() => setImagePopup(false)}
          onConfirm={handleAddImage}
          tabs={2}
          placeholder="https://example.com/image.jpg"
          comps={[
            {
              label: 'Upload Image',
              component: (
                <ImageUploadCustom
                  setImageUrl={setImageUrl}
                  editor={editor}
                  setImagePopup={setImagePopup}
                />
              ),
            },
          ]}
        />
      )}

      {videoPopup && (
        <PopupCard
          title="Insert YouTube link"
          value={videoUrl}
          onChange={setVideoUrl}
          onClose={() => setVideoPopup(false)}
          onConfirm={handleAddVideo}
          placeholder="https://youtube.com/watch?v=..."
        />
      )}
    </div>
  );
}

const headingOptions = [
  { level: 1, label: 'Heading 1' },
  { level: 2, label: 'Heading 2' },
  { level: 3, label: 'Heading 3' },
  { level: 4, label: 'Heading 4' },
  { level: 5, label: 'Heading 5' },
  { level: 6, label: 'Heading 6' },
];

const ToolbarBadge = ({ label }) => (
  <span className="rounded-full border border-dashed border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
    {label}
  </span>
);

const ToolbarGroup = ({ label, children }) => (
  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-1">{children}</div>
  </div>
);

const ToolbarButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg px-2.5 py-1.5 text-sm transition ${
      active
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-indigo-50'
    }`}
    title={title}
  >
    {children}
  </button>
);

const PopupCard = ({
  title,
  value,
  onChange,
  onClose,
  onConfirm,
  placeholder,
  tabs = 1,
  comps = [],
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const defaultTab = (
    <div className="space-y-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );

  const allTabs =
    tabs === 1 ? ['Add Link'] : ['Add Link', ...comps.map((c) => c.label)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 space-y-2 ">
      <div className="w-full max-w-sm rounded-2xl border border-white/30 bg-white/95 p-6  shadow-2xl backdrop-blur-xl">
        {tabs <= 1 && (
          <h3 className="mb-4 text-lg font-semibold text-slate-800">{title}</h3>
        )}
        {/* TAB HEADERS */}
        {tabs > 1 && (
          <div className="flex mb-4 border-b">
            {allTabs.map((tab, index) => (
              <div key={index}>
                <button
                  type="button" // Add type="button" here
                  className={`px-4 py-2 text-sm font-medium transition ${
                    activeTab == index
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-slate-500 hover:text-indigo-500'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT */}
        {activeTab === 0 ? defaultTab : comps[activeTab - 1]?.component ?? null}

        {/* ACTION BUTTONS */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button" // Add type="button" here
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button" // Add type="button" here
            onClick={onConfirm}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};
