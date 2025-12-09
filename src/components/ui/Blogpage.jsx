// import Link from 'next/link';
// import Reactions from '@/components/ui/ReactionBtns';
// import { getCachedLangPosts } from '../blog/blogpost';

// export default async function BlogPage({ params, t }) {
//   const param = await params;
//   const locale = param.locale;

//   const blogs = await getCachedLangPosts(locale);

//   return (
//     <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen relative ">
//       <div className="max-w-380 mx-auto ">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {blogs?.map((blog, index) => (
//             <div
//               key={index}
//               className="group transform rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative">
//                 <Link
//                   href={`/${locale}/blogpost/${blog.slug}`}
//                   className="block"
//                 >
//                   <img
//                     src={blog.imgUrl}
//                     alt={blog.title}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//                   />

//                       {blog?.timetoread && (
//                         <span className="text-sm text-white dark:text-gray-400 flex justify-end ">
//                           {blog?.timetoread + "time to read"}
//                         </span>
//                       )}
//                   <div className="p-6 flex flex-col justify-between min-h-[200px] relative ">
//                     <div className=''>
//                       <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-1">
//                         {blog.title}
//                       </h2>

//                       <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
//                         {/* {blog.description} */}
//                         {"dadsasdo iasdiaisdoiaoisdoiasdoiaodasdioaduiaudiaudsipuapdiuasodiuohfiuh asidfggfgas fy gasifg isagdfiusgfiuog fiuagsf iusagfiuagsf iasdgfuiags fiuasgdfuigsa fiusgfiusagdf iuasdfguiasdgf iusafgiuasgdfiusgfiusag fiasdgf iasdgfiuasgd fiuasgdfiuga fiuagsfiugasf iuasfg siufgasiufg aiusdgf adsgfi"}
//                       </p>
//                     </div>

//                     <button className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer transition-colors duration-300">
//                       {t.readmore}
//                     </button>
//                   </div>
//                 </Link>

//                 <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40  py-3 flex items-center justify-center">
//                   <Reactions
//                     slug={blog.slug}
//                     postid={blog.id}
//                     locale={locale}
//                     reactionsArray={blog?.reactions}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from 'next/link';
import Reactions from '@/components/ui/ReactionBtns';
import { getCachedLangPosts } from '../blog/blogpost';

export default async function BlogPage({ params, t }) {
  const param = await params;
  const locale = param.locale;
  const blogs = await getCachedLangPosts(locale);

  return (
    <section className="py-16 px-4 bg-gradient-to-b dark:to-gray-800 min-h-screen">
      <div className="max-w-380 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs?.map((blog, index) => (
            <div
              key={index}
              className="group rounded-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
                {/* IMAGE SECTION */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Link href={`/${locale}/blogpost/${blog.slug}`}>
                    <img
                      src={blog.imgUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                    />
                  </Link>

                  {/* TIME TO READ BADGE */}
                  {blog?.timetoread && blog.timetoread !== '' && (
                    <span className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-black/60 text-white backdrop-blur-md">
                      {blog.timetoread} read
                    </span>
                  )}
                </div>

                {/* CONTENT AREA */}
                <div className="flex flex-col flex-grow p-6">
                  {/* TITLE */}
                  <Link href={`/${locale}/blogpost/${blog.slug}`}>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-1 cursor-pointer">
                      {blog.title}
                    </h2>
                  </Link>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                    {blog.description || ''}
                  </p>

                  {/* READ MORE BUTTON (FIXED POSITION ABOVE REACTIONS) */}
                  <div className="mt-auto">
                    <Link
                      href={`/${locale}/blogpost/${blog.slug}`}
                      className="block bg-blue-600 dark:bg-blue-500 w-max dark:text-white text-blacl font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                      style={{color:"white"}}
                    >
                      {t.readmore}
                    </Link>
                  </div>
                </div>

                {/* REACTION BAR (STICKES AT BOTTOM ALWAYS) */}
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 py-3 w-full flex items-center justify-center">
                  <Reactions
                    slug={blog.slug}
                    postid={blog.id}
                    locale={locale}
                    reactionsArray={blog?.reactions}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
