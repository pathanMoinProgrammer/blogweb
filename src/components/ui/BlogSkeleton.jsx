export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
      {Array.from({ length: 31 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800">
          <div className="h-48 bg-gray-300 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-full" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
