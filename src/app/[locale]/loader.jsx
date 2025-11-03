
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg font-medium">
        Loading blogs...
      </p>
    </div>
  );
}
