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
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ params }) {
  // const params = useParams();
  const locale = params?.locale || 'en'; // default locale
  // const router = useRouter();
  // const pathname = usePathname();

  // const [sheetOpen, setSheetOpen] = useState(false);

  // useEffect(() => {
  //   setSheetOpen(false);
  // }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b justify-center backdrop-blur border-indigo-100 shadow-sm bg-background/50">
      <div className="w-[88%] mx-auto flex items-center justify-between h-20">

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between space-x-8 gap-[10px] w-full">
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight"
          >
            Our Blogs
          </Link>

          <div className="flex items-center gap-8 ml-6">
            <Link href={`/${locale}`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">Home</Link>
            <Link href={`/${locale}/about`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">About</Link>
            <Link href={`/${locale}/blogpost`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">Blogs</Link>
            <Link href={`/${locale}/contact`} className="hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-purple-500 font-medium">Contact</Link>

            <LanguageSwitcher />

            <div className="flex gap-[20px]">
              <Button className="w-[70px] hover:scale-130 dark:text-white cursor-pointer" variant="outline">Sign In</Button>
              <Button className="w-[70px] hover:scale-130 dark:text-white cursor-pointer" variant="outline">Logout</Button>
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center justify-between w-full">

          {/* Left: Burger Icon */}
          <Sheet>
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
                  Our Blogs
                </Link>
              </div>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col h-screen w-64 p-6 bg-background">
              {/* Header */}
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold">Our Blogs</SheetTitle>
              </SheetHeader>

              {/* Links */}
              <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                <Link href={`/${locale}`} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  Home
                </Link>
                <Link href={`/${locale}/about`} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  About
                </Link>
                <Link href={`/${locale}/blogpost`} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  Blogs
                </Link>
                <Link href={`/${locale}/contact`} className="block py-2 px-2 text-indigo-700 font-medium hover:text-indigo-900 transition rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700">
                  Contact
                </Link>
              </div>

              {/* Buttons at Bottom */}
              <div className="flex gap-4 mt-6">
                <Button className="flex-1 bg-gradient-to-r from-purple-700/70 to-blue-600/80 text-white font-bold text-xl" variant="outline">
                  Sign In
                </Button>
                <Button className="flex-1 bg-gradient-to-l from-purple-700/70 to-blue-600/80 text-white font-bold text-xl" variant="outline">
                  Logout
                </Button>
              </div>
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
