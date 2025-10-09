'use client';
import { useState, useRef } from 'react';

export default function ImageUploader({ imgUrl, setImgUrl }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef();

  const handleFiles = async (file) => {
    setErrorMsg('');
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMsg('Only JPG, PNG, or WEBP files allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image too large (max 10 MB).');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      const result = await res.json();

      if (res.ok && result.url) {
        setImgUrl(result.url);
      } else setErrorMsg(result.error || 'Upload failed');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFiles(file);
  };

  const onChange = (e) => handleFiles(e.target.files[0]);

  return (
    <div className="my-6">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Upload Cover Image
      </label>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => inputRef.current.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${uploading ? 'opacity-60 pointer-events-none' : ''}
        `}
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-blue-600">Uploading...</p>
          </div>
        ) : imgUrl ? (
          <div>
            <img
              src={imgUrl}
              alt="Uploaded"
              className="mx-auto h-48 w-full object-cover rounded-lg border border-gray-200"
            />
            <p className="text-sm text-gray-600 mt-2">Click or drag another image to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01.88-7.905A5.002 5.002 0 0117 8a5.002 5.002 0 014.12 7.905A4 4 0 0117 20H7a4 4 0 01-4-4z"
              />
            </svg>
            <p className="text-gray-600">
              <span className="text-blue-600 font-medium">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP (max 10 MB)</p>
          </div>
        )}
      </div>

      {errorMsg && <p className="text-sm text-red-500 mt-2">{errorMsg}</p>}
    </div>
  );
}
