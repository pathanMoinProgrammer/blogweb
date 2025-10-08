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

    // current path me /en/ ya /hi/ ko replace karke naya locale dal do
    const pathSegments = pathname.split('/');
    pathSegments[1] = newLocale; // replace locale segment
    const newPath = pathSegments.join('/');

    router.push(newPath);
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
