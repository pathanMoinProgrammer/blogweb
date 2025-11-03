'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher({ posts }) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [langs, setLangs] = useState([]);
  const languages = [
    { code: 'en', label: 'English  (en)' },
    { code: 'hi', label: 'हिन्दी  (hi)' },
    { code: 'pt', label: 'Português  (pt)' },
    { code: 'zh', label: '中文  (zh)' },
    { code: 'pt-BR', label: 'Português (Brasil)  (pt-BR)' },
    { code: 'es', label: 'Español  (es)' },
  ];

  const [, locale, ...rest] = pathname.split('/');
  const restUrl = rest.join('/');

  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1];
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  useEffect(() => {
    setSelectedLocale(currentLocale);
  }, [currentLocale]);

  const handleLocaleChange = async (newLocale) => {
    if (params?.slug && params?.slug !== undefined) {
      router.push(`/${newLocale}/blogpost`);
    } else {
      router.push(`/${newLocale}/${restUrl}`);
      setSelectedLocale(newLocale);
    }
  };

  return (
    <Select
      value={selectedLocale || 'English'}
      onValueChange={handleLocaleChange}
    >
      <SelectTrigger className="w-[100px] h-10">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label || 'English'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
