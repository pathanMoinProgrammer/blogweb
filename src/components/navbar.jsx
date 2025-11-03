'use client';

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
import LanguageSwitcher from './ui/LanguageSwitcher';
import { useGameTranslations } from './traslatorclient';
import { useParams, useRouter } from 'next/navigation';

export default function Navbar() {
  const params = useParams();
  const router = useRouter();

  const locale = params?.locale;
  const [sheetOpen, setSheetOpen] = useState(false);

  const { translations } = useGameTranslations({ lang: locale });

  const t = translations?.Navbar;

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <nav className="sticky top-0 z-50 border-b justify-center backdrop-blur-sm border-indigo-100 dark:bg-[rgb(21,29,44)] shadow-sm bg-background/50">
      <div className="w-[88%] mx-auto flex items-center justify-between h-16">
        <div className="hidden md:flex items-center justify-between space-x-8 gap-[10px] w-full ">
          <Button
            variant="ghost"
            onClick={() => handleNavigation(`/${locale}`)}
            className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight p-0 h-auto hover:bg-transparent cursor-pointer"
          >
            {t?.ourblogs || 'Our Blogs'}
          </Button>

          <div className="flex items-center gap-8 ml-6  [&>*]:cursor-pointer">
            <Button
              variant="ghost"
              onClick={() => handleNavigation(`/${locale}`)}
              className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium p-0 h-auto hover:bg-transparent"
            >
              {t?.home || 'Home'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation(`/${locale}/about`)}
              className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium p-0 h-auto hover:bg-transparent"
            >
              {t?.about || 'About'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation(`/${locale}/blogpost`)}
              className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium p-0 h-auto hover:bg-transparent"
            >
              {t?.blog || 'Blog'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation(`/${locale}/contact`)}
              className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium p-0 h-auto hover:bg-transparent"
            >
              {t?.contact || 'Contact'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation(`/${locale}/my-profile`)}
              className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium p-0 h-auto hover:bg-transparent"
            >
               {t?.myBlogs || 'My Blogs'}
            </Button>

            <LanguageSwitcher />

            <div className="cursor-pointer hover:scale-125 transition-all duration-300 absolute right-5">
              <ModeToggle />
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
          <div className="flex items-center  ">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild className="">
                <button className=" hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors absolute left-3 ">
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
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="flex flex-col h-screen w-64 p-6 bg-background"
              >
                <SheetHeader className="mb-6 ">
                  <SheetTitle className="text-2xl font-bold ">
                    {t?.ourblogs || 'Our Blogs'}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto [&>*]:cursor-pointer ">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleNavigation(`/${locale}`);
                      handleLinkClick();
                    }}
                    className="justify-start py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 h-auto"
                  >
                    {t?.home || 'Home'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleNavigation(`/${locale}/about`);
                      handleLinkClick();
                    }}
                    className="justify-start py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 h-auto"
                  >
                    {t?.about || 'About'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleNavigation(`/${locale}/blogpost`);
                      handleLinkClick();
                    }}
                    className="justify-start py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 h-auto"
                  >
                    {t?.blog || 'Blogs'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleNavigation(`/${locale}/contact`);
                      handleLinkClick();
                    }}
                    className="justify-start py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 h-auto"
                  >
                    {t?.contact || 'Contact'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleNavigation(`/${locale}/my-profile`);
                      handleLinkClick();
                    }}
                    className="justify-start py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 h-auto"
                  >
                    {t?.myBlogs || 'My Blogs'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              onClick={() => handleNavigation(`/${locale}`)}
              className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight p-0 h-auto hover:bg-transparent mx-5"
            >
              {t?.ourblogs || 'Our Blogs'}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
