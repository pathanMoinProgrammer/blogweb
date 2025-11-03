import React from 'react';

const SkeletonLoader = () => {
  // 5 placeholder rows (you can adjust)
  const rows = Array.from({ length: 5 });

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-gray-50 relative to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-semibold tracking-wider">
                {['Title', 'Image', 'Description', 'Languages', 'Updated At', 'Actions'].map(
                  (head, index) => (
                    <th key={index} className="py-4 px-6">
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map((_, i) => (
                <tr key={i}>
                  <td className="py-4 px-6">
                    <div className="h-4 w-25 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-13 w-18 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"> </div>
                  </td>
                  <td className="py-4 px-0 text-center">
                    <div className="flex justify-center gap-2">
                      <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="h-8 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SkeletonLoader;



// export default function Loading() {
//   return (
//     <div className="py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-pulse">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-10">
//           <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg" />
//           <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg" />
//         </div>
//         <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800">
//           <table className="min-w-full text-left">
//             <thead>
//               <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-semibold tracking-wider">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <th key={i} className="py-4 px-6">
//                     <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Array.from({ length: 6 }).map((_, row) => (
//                 <tr key={row} className="divide-x divide-gray-200 dark:divide-gray-700">
//                   {Array.from({ length: 6 }).map((_, cell) => (
//                     <td key={cell} className="py-4 px-6">
//                       <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
