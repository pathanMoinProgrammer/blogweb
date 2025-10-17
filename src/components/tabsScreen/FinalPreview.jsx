'use client';

export default function FinalReviewSection({ title, isCreating, handleCreateBlog }) {
  return (
   <section className="w-full flex flex-col justify-end px-4 sm:px-6 py-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto w-full">
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-24 sm:mb-10 border border-gray-200 dark:border-gray-700 transition-all">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white text-center sm:text-left">
            ✅ Final Review
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Title</p>
              <p className="font-semibold text-gray-900 dark:text-white break-words">
                {title || 'Untitled'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Status</p>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm whitespace-nowrap">
                Ready to Publish
              </span>
            </div>
          </div>
        </div>

        {/* Floating Publish Button */}
        {/* <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] sm:w-auto">
          <button
            onClick={handleCreateBlog}
            disabled={isCreating}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold sm:font-bold text-base sm:text-lg rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg sm:shadow-xl border border-green-600 dark:border-green-500"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Publishing...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
        </div> */}
      </div>
    </section>
  );
}