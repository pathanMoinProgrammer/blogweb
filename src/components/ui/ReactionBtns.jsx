'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Heart, ThumbsUp, Flame, Laugh, Angry } from 'lucide-react';
import { postDocRef } from '@/firebase/firebaseRefs';
import { getFirestore, runTransaction } from 'firebase/firestore';
import { refreshBlogsCache } from '../blog/blogpost';

const EMOJIS = ['love', 'like', 'fire', 'laugh', 'angry'];
const COOLDOWN_DURATION_MS = 2500;

function normalizeReactionData(rawData = {}) {
  const data = typeof rawData === 'object' && rawData !== null ? { ...rawData } : {};
  const sanitizedLists = {};
  const slugIndex = {};
  let hadDuplicates = false;

  EMOJIS.forEach((emoji) => {
    sanitizedLists[emoji] = [];
    const entries = Array.isArray(data[emoji]) ? data[emoji] : [];
    entries.forEach((slugValue) => {
      if (!slugValue) return;
      if (slugIndex[slugValue]) {
        hadDuplicates = true;
        return;
      }
      slugIndex[slugValue] = emoji;
      sanitizedLists[emoji].push(slugValue);
    });
  });

  const storedIndex =
    typeof data.slugIndex === 'object' && data.slugIndex !== null ? data.slugIndex : {};

  Object.entries(storedIndex).forEach(([slugValue, emoji]) => {
    if (!slugValue || !emoji) return;
    if (!EMOJIS.includes(emoji)) return;
    if (slugIndex[slugValue] && slugIndex[slugValue] !== emoji) {
      hadDuplicates = true;
      return;
    }
    if (!slugIndex[slugValue]) {
      slugIndex[slugValue] = emoji;
      sanitizedLists[emoji].push(slugValue);
    }
  });

  const normalized = {
    ...data,
    slugIndex,
  };

  EMOJIS.forEach((emoji) => {
    normalized[emoji] = sanitizedLists[emoji];
  });

  return { data: normalized, hadDuplicates };
}

function loadReactionDataWithMeta() {
  if (typeof window === 'undefined') {
    return {
      data: {
        laugh: [],
        angry: [],
        fire: [],
        like: [],
        love: [],
        slugIndex: {},
        anonId: null,
      },
      hadDuplicates: false,
    };
  }

  let raw = {};
  let stored = localStorage.getItem('reactionsData');
  let anonId = localStorage.getItem('anonId');

  if (!anonId) {
    anonId = crypto.randomUUID();
    localStorage.setItem('anonId', anonId);
  }

  if (stored) {
    try {
      raw = JSON.parse(stored);
    } catch {
      raw = {};
    }
  }

  EMOJIS.forEach((emoji) => {
    if (!Array.isArray(raw[emoji])) raw[emoji] = [];
  });

  const { data, hadDuplicates } = normalizeReactionData(raw);
  data.anonId = anonId;

  return { data, hadDuplicates };
}

export default function Reactions({ slug, postid, locale, reactionsArray = {} }) {

  const [reactionCount, setReactionCount] = useState({
    laugh: reactionsArray.laugh || 0,
    angry: reactionsArray.angry || 0,
    fire: reactionsArray.fire || 0,
    like: reactionsArray.like || 0,
    love: reactionsArray.love || 0,
  });

  const [selected, setSelected] = useState(null);
  const [anonData, setAnonData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const inFlightRef = useRef(false); 
  const cooldownTimerRef = useRef(null);

  const { childRef } = postDocRef(postid, locale); 
  const db = getFirestore();

  const emojis = [
    { icon: <Heart className="w-3 h-3 sm:w-4 sm:h-4" />, key: 'love', label: 'Love' },
    { icon: <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />, key: 'like', label: 'Like' },
    { icon: <Flame className="w-3 h-3 sm:w-4 sm:h-4" />, key: 'fire', label: 'Fire' },
    { icon: <Laugh className="w-3 h-3 sm:w-4 sm:h-4" />, key: 'laugh', label: 'Laugh' },
    { icon: <Angry className="w-3 h-3 sm:w-4 sm:h-4" />, key: 'angry', label: 'Angry' },
  ];


  function getOrCreateReactionData() {
    const { data } = loadReactionDataWithMeta();
    return data;
  }

  function saveReactionData(data) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('reactionsData', JSON.stringify(data));
    } catch (e) {

    }
  }


  const startCooldown = (duration = COOLDOWN_DURATION_MS) => {
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
    }
    setIsCooldown(true);
    cooldownTimerRef.current = setTimeout(() => {
      setIsCooldown(false);
      cooldownTimerRef.current = null;
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const { data, hadDuplicates } = loadReactionDataWithMeta();
    setAnonData(data);

    const storedSelection =
      (data.slugIndex && data.slugIndex[slug]) ||
      EMOJIS.find((key) => Array.isArray(data[key]) && data[key].includes(slug)) ||
      null;
    setSelected(storedSelection);

    if (hadDuplicates) {
      saveReactionData(data);
      startCooldown(3000);
    }

    setReactionCount({
      laugh: reactionsArray.laugh || 0,
      angry: reactionsArray.angry || 0,
      fire: reactionsArray.fire || 0,
      like: reactionsArray.like || 0,
      love: reactionsArray.love || 0,
    });
  }, [slug]);

  function computeOptimisticCounts(currentCounts, prevSelected, nextSelected) {
    const counts = { ...currentCounts };

    if (prevSelected) {
      counts[prevSelected] = Math.max(0, (counts[prevSelected] || 0) - 1);
    }

    if (nextSelected) {
      counts[nextSelected] = (counts[nextSelected] || 0) + 1;
    }

    return counts;
  }

  async function handleReaction(emoji) {
    if (isUpdating || inFlightRef.current || isCooldown) return;
    setIsUpdating(true);
    inFlightRef.current = true;

    try {
      const data = getOrCreateReactionData();
      const prevSelected = (data.slugIndex && data.slugIndex[slug]) || null;
      let nextSelected = prevSelected;

      if (prevSelected === emoji) {
        nextSelected = null;
        if (data.slugIndex) delete data.slugIndex[slug];
        data[emoji] = data[emoji].filter((s) => s !== slug);
      } else {
        if (prevSelected) {
          data[prevSelected] = data[prevSelected].filter((s) => s !== slug);
        }
        data.slugIndex = data.slugIndex || {};
        data.slugIndex[slug] = emoji;
        if (!data[emoji].includes(slug)) data[emoji].push(slug);
        nextSelected = emoji;
      }

      const optimistic = computeOptimisticCounts(reactionCount, prevSelected, nextSelected);
      setReactionCount(optimistic);
      setSelected(nextSelected);
      saveReactionData(data);
      setAnonData(data);

      await runTransaction(db, async (tx) => {
        const docSnap = await tx.get(childRef);

        const serverReactions = (docSnap.exists() && docSnap.data()?.reactions) || {};

        const serverCounts = {
          laugh: Number(serverReactions.laugh || 0),
          angry: Number(serverReactions.angry || 0),
          fire: Number(serverReactions.fire || 0),
          like: Number(serverReactions.like || 0),
          love: Number(serverReactions.love || 0),
        };

        const newServerCounts = { ...serverCounts };

        if (prevSelected && prevSelected === nextSelected) {
        }

        if (prevSelected && prevSelected === emoji && nextSelected === null) {
          newServerCounts[emoji] = Math.max(0, newServerCounts[emoji] - 1);
        } else if (prevSelected && nextSelected && prevSelected !== nextSelected) {
          newServerCounts[prevSelected] = Math.max(0, newServerCounts[prevSelected] - 1);
          newServerCounts[nextSelected] = (newServerCounts[nextSelected] || 0) + 1;
        } else if (!prevSelected && nextSelected) {
          newServerCounts[nextSelected] = (newServerCounts[nextSelected] || 0) + 1;
        } else if (prevSelected && !nextSelected) {
        }

        const writePayload = {
          reactions: {
            laugh: newServerCounts.laugh,
            angry: newServerCounts.angry,
            fire: newServerCounts.fire,
            like: newServerCounts.like,
            love: newServerCounts.love,
          },
        };

        tx.update(childRef, writePayload);

        return newServerCounts;
      });

      const freshSnap = await (await childRef.get?.()) || null;
      let finalCounts = null;
      try {
        if (typeof childRef.get === 'function') {
          const snap = await childRef.get();
          finalCounts = (snap.exists() && snap.data()?.reactions) || null;
        }
      } catch (e) {
        try {
          const { getDoc } = await import('firebase/firestore');
          const snap = await getDoc(childRef);
          finalCounts = (snap.exists() && snap.data()?.reactions) || null;
        } catch (ee) {

        }
      }

      if (finalCounts) {
        const normalized = {
          laugh: Number(finalCounts.laugh || 0),
          angry: Number(finalCounts.angry || 0),
          fire: Number(finalCounts.fire || 0),
          like: Number(finalCounts.like || 0),
          love: Number(finalCounts.love || 0),
        };
        setReactionCount(normalized);

        const local = getOrCreateReactionData();
        for (const k of EMOJIS) {
          if (Array.isArray(local[k]) && local[k].includes(slug)) {
            setSelected(k);
            break;
          }
        }
      }

      try {
        if (typeof refreshBlogsCache === 'function') {
          refreshBlogsCache('blogs').catch(() => {});
        }
      } catch (e) {
      }
    } catch (err) {
      console.error('Reaction transaction failed', err);

      try {
        const { getDoc } = await import('firebase/firestore');
        const snap = await getDoc(childRef);
        const srv = (snap.exists() && snap.data()?.reactions) || {};
        const normalized = {
          laugh: Number(srv.laugh || 0),
          angry: Number(srv.angry || 0),
          fire: Number(srv.fire || 0),
          like: Number(srv.like || 0),
          love: Number(srv.love || 0),
        };
        setReactionCount(normalized);

        const local = getOrCreateReactionData();
        for (const k of EMOJIS) {
          if (Array.isArray(local[k]) && local[k].includes(slug)) {
            setSelected(k);
            break;
          }
        }
      } catch (_) {
        setReactionCount((prev) => ({
          laugh: Math.max(0, prev.laugh || 0),
          angry: Math.max(0, prev.angry || 0),
          fire: Math.max(0, prev.fire || 0),
          like: Math.max(0, prev.like || 0),
          love: Math.max(0, prev.love || 0),
        }));
      }
    } finally {
      setIsUpdating(false);
      inFlightRef.current = false;
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 px-2 py-2 select-none">
      {emojis.map(({ icon, label, key }) => (
        <Tooltip key={key}>
          <TooltipTrigger asChild>
            <button
              disabled={isUpdating || isCooldown}
              onClick={() => handleReaction(key)}
              className={`
                relative flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2
                rounded-lg transition-all duration-200 cursor-pointer
                text-xs sm:text-sm font-medium min-w-[2.5rem] sm:min-w-[3rem]
                ${selected === key
                  ? 'bg-blue-500 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
                ${isUpdating || isCooldown ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                border border-transparent hover:border-gray-300 dark:hover:border-gray-500
              `}
            >
              {/* Loading overlay */}
              {(isUpdating || isCooldown) && (
                <div className="absolute inset-0 rounded-lg bg-black/10 flex items-center justify-center">
                  <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}

              {/* Icon */}
              <span className="text-sm sm:text-base">{icon}</span>

              {/* Count */}
              <span className="font-semibold text-xs sm:text-sm">
                {reactionCount[key]}
              </span>

              {/* Selection indicator */}
              {selected === key && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-blue-500"></div>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
            side="top"
          >
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
