// 'use client';

// import { items } from '@/components/jotai';
// import { useAtom } from 'jotai';
// import { ScopeProvider } from 'jotai-scope';
// import React from 'react';

// const Page = () => {
//   return (
//     <div className="p-6 grid gap-[20px] mx-auto container grid-cols-3 items-center w-full  ">
//       {Array(15)
//         .fill('data')
//         .map((itemed, index) => (
//           <ScopeProvider atoms={[items]} key={index}>
//             <div key={index}>
//               <Card />
//             </div>
//           </ScopeProvider>
//         ))}
//     </div>
//   );
// };

// export default Page;

// const Card = () => {
//   const [item, setItem] = useAtom(items);

//   return (
//     <>
//       <h2 className="text-xl mb-3">Count: {item}</h2>
//       <button
//         onClick={() => setItem((prev) => prev + 1)}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Increase
//       </button>
//     </>
//   );
// };

// 'use client';

// import { isClear } from '@/components/jotai';
// import { useAtom } from 'jotai';
// import { ScopeProvider } from 'jotai-scope';
// import React, { useState } from 'react';

// const Page = () => {
//   const [useScope, setUseScope] = useState(false);

//   return (
//     <div className="p-6 container mx-auto">
//       {/* Toggle Switch */}
//       <div className="mb-6 flex items-center gap-4">
//         <span>Use Scoped Atoms:</span>
//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={useScope}
//             onChange={(e) => setUseScope(e.target.checked)}
//           />
//           <span className="slider round"></span>
//         </label>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid gap-[20px] grid-cols-3">
//         {Array(15)
//           .fill('data')
//           .map((_, index) => {
//             const cardContent = <Card key={index} />;

//             return useScope ? (
//               <ScopeProvider atoms={[isClear]} key={index}>
//                 {cardContent}
//               </ScopeProvider>
//             ) : (
//               cardContent
//             );
//           })}
//       </div>

//       {/* Toggle Switch CSS */}
//       <style jsx>{`
//         .switch {
//           position: relative;
//           display: inline-block;
//           width: 60px;
//           height: 34px;
//         }

//         .switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//         }

//         .slider {
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: #ccc;
//           transition: 0.4s;
//         }

//         .slider:before {
//           position: absolute;
//           content: '';
//           height: 26px;
//           width: 26px;
//           left: 4px;
//           bottom: 4px;
//           background-color: white;
//           transition: 0.4s;
//         }

//         input:checked + .slider {
//           background-color: #2196f3;
//         }

//         input:focus + .slider {
//           box-shadow: 0 0 1px #2196f3;
//         }

//         input:checked + .slider:before {
//           transform: translateX(26px);
//         }

//         .slider.round {
//           border-radius: 34px;
//         }

//         .slider.round:before {
//           border-radius: 50%;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Page;

// const Card = () => {
//   const [item, setItem] = useAtom(isClear);

//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-xl mb-3">Count: {item}</h2>
//       <button
//         onClick={() => setItem((prev) => prev + 1)}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Increase
//       </button>
//     </div>
//   );
// };


// 'use client';
// import { Button } from '@/components/ui/button';
// import React from 'react';

// const page = () => {
//   const requestHandle = async () => {
//     try {
//       const res = await fetch('http://localhost:3001/healtht');
//       if (!res.ok) throw new Error('Network response was not ok');

//       const data = await res.json(); 
//       console.log(data);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   return (
//     <div>
//       About page
//       <Button type="button" onClick={requestHandle}>
//         Click
//       </Button>
//     </div>
//   );
// };

// export default page;




import React from 'react'

const page = () => {
  return (
    <div>
      Its about page
    </div>
  )
}

export default page
