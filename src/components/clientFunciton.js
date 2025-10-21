'use client';
import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { arrayAtom } from './jotai';

export default function useSetData(dataArray) {
  const setArray = useSetAtom(arrayAtom);

  useEffect(() => {
    if (Array.isArray(dataArray) && dataArray.length > 0) {
      setArray((prev) => [...new Set([...prev, ...dataArray])]);
    }
  }, [dataArray, setArray]);
}
