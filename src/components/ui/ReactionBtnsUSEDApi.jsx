// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { motion } from 'framer-motion';
// import { Heart, ThumbsUp, Flame, Laugh, Angry, Loader2 } from 'lucide-react';
// import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
// import { postDocRef } from '@/firebase/firebaseRefs';
// import { increment } from 'firebase/firestore';

// export default function Reactions({ slug, postid, locale, reactionsArray }) {
//   const { laugh, angry, fire, like, love } = reactionsArray;
//   const [data, setData] = useState(null);
//   const [reactionCount, setReactionCount] = useState({
//     laugh: laugh || 0,
//     angry: angry || 0,
//     fire: fire || 0,
//     like: like || 0,
//     love: love || 0,
//   });
//   const [selected, setSelected] = useState(null);
//   const { childRef } = postDocRef(postid, locale);
//   const { setDataWithLang } = useCreateDoc();
//   const debounceTimer = useRef(null);

//   const emojis = [
//     { icon: <Heart className="text-red-500" />, key: 'love', label: 'Love' },
//     {
//       icon: <ThumbsUp className="text-blue-500" />,
//       key: 'like',
//       label: 'Like',
//     },
//     { icon: <Flame className="text-orange-500" />, key: 'fire', label: 'Fire' },
//     {
//       icon: <Laugh className="text-yellow-500" />,
//       key: 'laugh',
//       label: 'Laugh',
//     },
//     { icon: <Angry className="text-red-700" />, key: 'angry', label: 'Angry' },
//   ];

//   const bgColors = {
//     love: 'bg-red-200 text-red-600',
//     like: 'bg-blue-200 text-blue-600',
//     fire: 'bg-orange-200 text-orange-600',
//     laugh: 'bg-yellow-200 text-yellow-700',
//     angry: 'bg-red-200 text-red-700',
//   };

//   async function fetchData() {
//     const res = await fetch('/api/anonid', { cache: 'no-store' });
//     const json = await res.json();
//     setData(json);

//     for (const key of Object.keys(json)) {
//       if (Array.isArray(json[key]) && json[key].includes(slug)) {
//         setSelected(key);
//         break;
//       }
//     }
//   }

//   async function handleReaction(emoji) {
//     let newSelected = selected;
//     let newCounts = { ...reactionCount };

//     if (selected === emoji) {
//       newCounts[emoji] = Math.max(0, newCounts[emoji] - 1);
//       newSelected = null;
//     } else if (selected && selected !== emoji) {
//       newCounts[selected] = Math.max(0, newCounts[selected] - 1);
//       newCounts[emoji] = (newCounts[emoji] || 0) + 1;
//       newSelected = emoji;
//     } else {
//       newCounts[emoji] = (newCounts[emoji] || 0) + 1;
//       newSelected = emoji;
//     }

//     setReactionCount(newCounts);
//     setSelected(newSelected);

//     if (debounceTimer.current) clearTimeout(debounceTimer.current);

//     debounceTimer.current = setTimeout(async () => {
//       try {
//         const res = await fetch('/api/anonid', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ emoji, slug }),
//         });

//         const json = await res.json();
//         setData(json);

//         if (selected === emoji) {
//           await setDataWithLang(childRef, {
//             reactions: { [emoji]: increment(-1) },
//           });
//         } else if (selected && selected !== emoji) {
//           await setDataWithLang(childRef, {
//             reactions: {
//               [selected]: increment(-1),
//               [emoji]: increment(1),
//             },
//           });
//         } else {
//           await setDataWithLang(childRef, {
//             reactions: { [emoji]: increment(1) },
//           });
//         }
//       } catch (err) {
//         console.error('Reaction update failed', err);
//         setReactionCount(reactionCount);
//         setSelected(selected);
//       }
//     }, 3000);
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="flex gap-3 items-center justify-center sm:justify-start select-none">
//       {emojis.map(({ icon, label, key }) => (
//         <Tooltip key={key}>
//           <TooltipTrigger asChild>
//             <motion.div whileTap={{ scale: 1.15 }}>
//               <Button
//                 variant={selected === key ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => handleReaction(key)}
//                 className={`flex items-center gap-1 rounded-full transition-all duration-200 cursor-pointer px-3 py-1 sm:px-4 sm:py-2 sm:text-base ${
//                   selected === key ? bgColors[key] : ''
//                 }`}
//               >
//                 {icon} <span>{reactionCount[key]}</span>
//               </Button>
//             </motion.div>
//           </TooltipTrigger>
//           <TooltipContent>{label}</TooltipContent>
//         </Tooltip>
//       ))}
//     </div>
//   );
// }
