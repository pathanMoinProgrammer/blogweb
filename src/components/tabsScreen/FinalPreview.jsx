'use client';

export default function FinalReviewSection({ title, isCreating, handleCreateBlog }) {
  return (
    <section className="w-full flex flex-col justify-end p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">✅ Final Review</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Title</p>
              <p className="font-semibold text-gray-900 dark:text-white">{title || 'Untitled'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</p>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm">
                Ready to Publish
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateBlog}
          disabled={isCreating}
          className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold text-lg rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-xl fixed bottom-2 left-1/2 transform -translate-x-1/2 md:w-auto md:bottom-8 z-10 border border-green-600 dark:border-green-500"
        >
          {isCreating ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Publishing...
            </>
          ) : (
            <>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              🚀 Publish Blog Post
            </>
          )}
        </button>
      </div>
    </section>
  );
}