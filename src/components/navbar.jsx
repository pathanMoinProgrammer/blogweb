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

export default function Navbar() {
  return (
    <nav className="sticky flex top-0 z-50 border-b justify-center backdrop-blur border-indigo-100 shadow-sm background/50">
      <div className="w-[88%] mx-auto px-2 flex items-center justify-between h-20">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 dark:text-white tracking-tight"
        >
          Our Blogs
        </Link>

        <div className="hidden md:flex items-center justify-center space-x-8 gap-[10px]">
          <Link
            href="/"
            className=" hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-md font-medium hover:text-purple-500 "
          >
            Home
          </Link>
          <Link
            href="/about"
            className=" hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-md font-medium hover:text-purple-500 "
          >
            About
          </Link>
          <Link
            href="/blogpost"
            className=" hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-md font-medium hover:text-purple-500 "
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className=" hover:scale-125 dark:text-white transition-transform hover:underline hover:font-bold hover:text-md font-medium hover:text-purple-500 "
          >
            Contact
          </Link>
          <div className="flex gap-[20px]">
            <Button className="w-[70px] hover:scale-130 dark:text-white  cursor-pointer" variant="outline">
              Button
            </Button>
            <Button className="w-[70px] hover:scale-130 dark:text-white  cursor-pointer" variant="outline">
              Button
            </Button>
              <ModeToggle />
          </div>
        </div>

    
        <div className="md:hidden gap-[10px]  flex items-center absolute right-3 ">
           <ModeToggle />

    
          <Sheet>
            <SheetTrigger>
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
            </SheetTrigger>

            <SheetContent className="flex flex-col items-center">

              <SheetHeader className="mb-6 ">
                <SheetTitle>Our Blogs</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col justify-between max-h-[85%] flex-1 py-2">
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="block py-2 text-indigo-700 font-medium hover:text-indigo-900 transition"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block py-2 text-indigo-700 font-medium hover:text-indigo-900 transition"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-2 text-indigo-700 font-medium hover:text-indigo-900 transition"
                  >
                    Contact
                  </Link>
                </div>

              </div>
                <div className="flex gap-[20px] w-full justify-around items-center  h-[100px] pt-4 border-t">
                  <Button  className="w-[40%] h-[50%]   bg-gradient-to-r from-purple-700/70 to-blue-600/80 text-white font-bold text-xl" variant="outline">
                    Sing In
                  </Button>
                  <Button className="w-[40%] h-[50%] bg-gradient-to-l from-purple-700/70 to-blue-600/80 text-white font-bold text-xl" variant="outline">
                    Logout
                  </Button>
                </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </nav>
  );
}
