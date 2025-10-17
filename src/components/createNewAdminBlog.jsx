'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus, Loader2 } from 'lucide-react'; // Loader2 = spinning icon
import Link from 'next/link';
import { addDoc } from 'firebase/firestore';
import { postColRef, timestamp } from '@/firebase/firebaseRefs';
import { useRouter } from 'next/navigation';

export const CreateNewAdminBlog = ({ locale }) => {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
  const router = useRouter()
  const emptyData = {
    author: 'Untitled',
    createdAt: timestamp(),
    description: 'NA',
    enslug: "",
    esslug:"" ,
    hislug: "",
    imgUrl: "NA",
    languages: [],
    // name: '',
    title: "untitled",
    updatedAt: timestamp(),
  };

  const handleCreateClick = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(postColRef, emptyData);
      setUid(docRef.id);
      setLoading(false);
      router.push(`/${locale}/blogpost/create-new-blog/${docRef.id}`)
    } catch (error) {
      console.error(error, 'error');
    }
  };

  return (
    <Button
      onClick={handleCreateClick}
      disabled={loading}
      className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-lg"
    >
      {loading ? (
        <div className=" w-33 justify-center flex items-center gap-1">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 w-33">
          {/* <Link
            href={`/${locale}/blogpost/create-new-blog/${uid}`}
            
          > */}
            <Plus className="w-5 h-5" />
            <span>Create New Blog</span>
          {/* </Link> */}
        </div>
      )}
    </Button>
  );
};