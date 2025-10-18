// 'use client';
// import Notification from '@/components/blog/Notification';
// import BlogFormSection from '@/components/tabsScreen/BlogMetaData';
// import EditorPreviewTabs from '@/components/tabsScreen/EditorPreview';
// import { Button } from '@/components/ui/button';
// import { useParams } from 'next/navigation';
// import { Loader2, Save } from 'lucide-react';
// import useCreateBlogPage from '@/components/MvcComponents/useCreateBlogPage';
// import { BlogProvider } from '@/hooks/costumHooks/blogMetadataContext';

// export default function CreateBlogContx() {
//   const params = useParams();
//   const locale = params.locale;
//   const {
//     loading,
//     error,
//     isMounted,
//     showNotification,
//     notificationMessage,
//     setShowNotification,
//     clickable,
//     setClickable,

//     formData,
//     setFormData,
//     handleCreateBlog
//   } = useCreateBlogPage(locale);

//   if (!isMounted) {
//     return (
//       <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500 dark:text-gray-400">
//         Loading editor...
//       </div>
//     );
//   }

//   return (
//     <div className="dark:bg-gray-800 relative">
//       <Notification
//         message={notificationMessage}
//         isVisible={showNotification}
//         onClose={() => setShowNotification(false)}
//       />

//       <EditorPreviewTabs formData={formData} setFormData={setFormData} />

//       <div className="max-[1300px]:hidden">
//         <BlogFormSection
//           formData={formData}
//           setFormData={setFormData}
          
//           clickable={clickable}
//           setClickable={setClickable}
//         />
//       </div>

//       <div className="absolute top-0 right-3 flex gap-4 z-10">
//         <Button
//           variant="outline"
//           size="lg"
//           className={`bg-yellow-400/80 text-gray-900  ${
//             clickable ? 'cursor-pointer' : ''
//           } dark:text-white hover:bg-yellow-500/90 border-yellow-500 dark:border-yellow-400 transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
//           onClick={() => {}}
//         >
//           <Save className="w-5 h-5" />
//           <span>Save Draft</span>
//         </Button>

//         {loading ? (
//           <Button
//             variant="default"
//             size="lg"
//             disabled
//             className={`bg-green-400/90 text-white ${
//               clickable ? 'cursor-crosshair' : ''
//             }  rounded-lg min-w-[120px] flex items-center gap-2`}
//           >
//             <Loader2 className="w-5 h-5 animate-spin" />
//             <span>Publishing...</span>
//           </Button>
//         ) : (
//           <Button
//             variant="default"
//             size="lg"
//             onClick={handleCreateBlog}
//             className={`bg-green-500 hover:bg-green-600 ${
//               clickable ? 'cursor-pointer' : ''
//             } cursor-pointer dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
//           >
//             <span>Publish</span>
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }




'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/themebtn';
import { useState } from 'react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useGameTranslations } from '@/components/traslatorclient';
import { useParams, useRouter } from 'next/navigation';

export default function Navbar() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale;
  const [sheetOpen, setSheetOpen] = useState(false);

  const { translations } = useGameTranslations({ lang: locale });
  const t = translations?.Navbar;

  const navigate = (path) => {
    setSheetOpen(false); 
    router.push(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b justify-center backdrop-blur-sm border-indigo-100 shadow-sm bg-background/50">
      <div className="w-[88%] mx-auto flex items-center justify-between h-16">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between space-x-8 gap-[10px] w-full">
          <button
            onClick={() => navigate(`/${locale}`)}
            className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight"
          >
            {t?.ourblogs || 'Our Blogs'}
          </button>

          <div className="flex items-center gap-8 ml-6">
            {[
              { label: t?.home || 'Home', path: `/${locale}` },
              { label: t?.about || 'About', path: `/${locale}/about` },
              { label: t?.blog || 'Blog', path: `/${locale}/blogpost` },
              { label: t?.contact || 'Contact', path: `/${locale}/contact` },
              { label: 'My Blogs', path: `/${locale}/my-profile` },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <LanguageSwitcher />
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                >
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </svg>
                <span className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight">
                  {t?.ourblogs || 'Our Blogs'}
                </span>
              </div>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex flex-col h-screen w-64 p-6 bg-background"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold">
                  {t?.ourblogs || 'Our Blogs'}
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                {[
                  { label: t?.home || 'Home', path: `/${locale}` },
                  { label: t?.about || 'About', path: `/${locale}/about` },
                  { label: t?.blog || 'Blogs', path: `/${locale}/blogpost` },
                  { label: t?.contact || 'Contact', path: `/${locale}/contact` },
                  { label: 'My Blogs', path: `/${locale}/my-profile` },
                ].map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Right: Mode Toggle + Language */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
