'use client';

import BlogMetadataForm from '@/components/blog/BlogMetadataForm';

export default function BlogFormSection({ formData, setFormData }) {
  return (
    <section className=" h-full w-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-gray-900 px-4">
      <div className="w-full md:flex-1 p-4 md:p-6 overflow-auto">
        <BlogMetadataForm formData={formData} setFormData={setFormData} />
      </div>
    </section>
  );
}
