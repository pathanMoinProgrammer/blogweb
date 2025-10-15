// 'use client';

// import BlogMetadataForm from '@/components/blog/BlogMetadataForm';
// import ImageUploader from '@/components/blog/imageupload';

// export default function BlogFormSection({
//   blogName,
//   setBlogName,
//   author,
//   enurl,
//   setEnurl,
//   title,
//   setTitle,
//   description,
//   setDescription,
//   imgUrl,
//   setImgUrl,
// }) {
//   return (
//     <section className=" w-full h-screen flex flex-col md:flex-row overflow-hidden bg-blue-50/50 dark:bg-gray-900">
//       <div className="w-full md:flex-1 p-4 md:p-6 overflow-auto">
//         <BlogMetadataForm
//           blogName={blogName}
//           setBlogName={setBlogName}
//           author={author}
//           enurl={enurl}
//           setEnurl={setEnurl}
//           title={title}
//           setTitle={setTitle}
//           description={description}
//           setDescription={setDescription}
//           imgUrl={imgUrl}
//           setImgUrl={setImgUrl}
//         />
//       </div>
//       <div className="w-full  p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//         <ImageUploader imgUrl={imgUrl} setImgUrl={setImgUrl} />
//       </div>
//     </section>
//   );
// }






'use client';

import BlogMetadataForm from '@/components/blog/BlogMetadataForm';
import ImageUploader from '@/components/blog/imageupload';

export default function BlogFormSection({
  blogName,
  setBlogName,
  author,
  enurl,
  setEnurl,
  title,
  setTitle,
  description,
  setDescription,
  imgUrl,
  setImgUrl,
}) {
  return (
    <section className=" w-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-gray-900">
      <div className="w-full md:flex-1 p-4 md:p-6 overflow-auto">
        <BlogMetadataForm
          blogName={blogName}
          setBlogName={setBlogName}
          author={author}
          enurl={enurl}
          setEnurl={setEnurl}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        />
      </div>
      <div className="w-full md:w-1/3 p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <ImageUploader imgUrl={imgUrl} setImgUrl={setImgUrl} />
      </div>
    </section>
  );
}