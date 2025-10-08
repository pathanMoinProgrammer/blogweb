'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher({ posts }) {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || 'en';
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
  ];

  const handleLocaleChange = (newLocale) => {
    setSelectedLocale(newLocale);

    pathSegments[1] = newLocale; // change locale in path

    // If blogpost page, change slug dynamically
    if (pathSegments[2] === 'blogpost' && pathSegments[3]) {
      const currentSlug = pathSegments[3];

      // Find post object where current slug matches enurl or hiurl
      const post = posts.find(p => p.enurl === currentSlug || p.hiurl === currentSlug);
      if (post) {
        pathSegments[3] = post[newLocale + 'url']; // use enurl or hiurl
      }
    }

    router.push(pathSegments.join('/'));
  };

  return (
    <Select value={selectedLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[120px] h-10">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map(lang => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
