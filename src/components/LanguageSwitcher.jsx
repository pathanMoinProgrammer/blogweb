'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher({ posts }) {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || 'en';
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  // Update selected locale when pathname changes
  useEffect(() => {
    setSelectedLocale(currentLocale);
  }, [currentLocale]);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
  ];

  const handleLocaleChange = async (newLocale) => {
    setSelectedLocale(newLocale);

    const pathSegments = pathname.split('/');
    
    // Check if we're on a blog post page
    if (pathSegments[2] === 'blogpost' && pathSegments[3]) {
      const currentSlug = pathSegments[3];
      
      // Find the current post to get translated slug
      try {
        const response = await fetch(`/api/get-translated-slug?slug=${currentSlug}&locale=${currentLocale}&targetLocale=${newLocale}`);
        const data = await response.json();
        
        if (data.translatedSlug) {
          router.push(`/${newLocale}/blogpost/${data.translatedSlug}`);
          return;
        }
      } catch (error) {
        console.error('Error getting translated slug:', error);
      }
    }
    
    // For other pages, just change locale
    pathSegments[1] = newLocale;
    const newPath = pathSegments.join('/');
    router.push(newPath);
  };

  return (
    <Select value={selectedLocale || "English"} onValueChange={handleLocaleChange} >
      <SelectTrigger className="w-[120px] h-10">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map(lang => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label || "English"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}