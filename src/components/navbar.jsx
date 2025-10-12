
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from './themebtn';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useGameTranslations } from './traslatorclient';
import { useParams } from 'next/navigation';
// import { useAtomValue } from 'jotai';
// import { items } from './jotai';

export default function Navbar() {
  const params = useParams()
  // const item = useAtomValue(items)

  const locale = params?.locale; 
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const {translations} = useGameTranslations({ lang: locale })

  const t = translations?.Navbar

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b justify-center backdrop-blur-sm border-indigo-100 shadow-sm bg-background/50">
      <div className="w-[88%] mx-auto flex items-center justify-between h-20">


        <div className="hidden md:flex items-center justify-between space-x-8 gap-[10px] w-full">
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight"
          >
            {t?.ourblogs || "Our Blogs"}
          </Link>
          {/* {item} */}

          <div className="flex items-center gap-8 ml-6">
            <Link href={`/${locale}`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">{t?.home  || "Home"}</Link>
            <Link href={`/${locale}/about`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">{t?.about  || "About"}</Link>
            <Link href={`/${locale}/blogpost`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">{t?.blog  || "Blog"}</Link>
            <Link href={`/${locale}/contact`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">{t?.contact  || "Contact"}</Link>

            <LanguageSwitcher />

            <div className="flex gap-[20px]">
              <Button className="w-[70px] hover:scale-130 dark:text-white cursor-pointer" variant="outline">{t?.signIn  || "Sign In"}</Button>
              <Button className="w-[70px] hover:scale-130 dark:text-white cursor-pointer" variant="outline">{t?.logout || "LogOut"}</Button>
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Left: Burger Icon */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <div className='flex items-center gap-3 cursor-pointer'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                <Link href={`/${locale}`} className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight">
                  {t?.ourblogs || "Our Blogs"}
                </Link>
              </div>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col h-screen w-64 p-6 bg-background">
              {/* Header */}
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold">{t?.ourblogs || "Our Blogs"}</SheetTitle>
              </SheetHeader>

              {/* Links */}
              <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                <Link href={`/${locale}`} onClick={handleLinkClick} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  {t?.home  || "Home"}
                </Link>
                <Link href={`/${locale}/about`} onClick={handleLinkClick} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  {t?.about  || "About"}
                </Link>
                <Link href={`/${locale}/blogpost`} onClick={handleLinkClick} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  {t?.blog  || "Blogs"}
                </Link>
                <Link href={`/${locale}/contact`} onClick={handleLinkClick} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  {t?.contact  || "Contact"}
                </Link>
              </div>

              {/* Buttons at Bottom */}
              {/* <div className="flex gap-4 mt-6">
                <Button className="flex-1 bg-gradient-to-r from-purple-700/70 to-blue-600/80 text-white font-bold text-xl" variant="outline">
                  {t?.signIn  || "Sign In"}
                </Button>
                <Button className="flex-1 bg-gradient-to-l from-purple-700/70 to-blue-600/80 text-white font-bold text-xl" variant="outline">
                  {t?.logout || "Sign Out"}
                </Button>
              </div> */}
            </SheetContent>
          </Sheet>

          {/* Right: Mode Toggle */}
          <div className='flex items-center gap-2'>
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}