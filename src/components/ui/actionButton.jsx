import React from 'react';
import { Button } from './button';
import { Loader2, Save, Trash } from 'lucide-react';

const ActionButton = ({ loading, handleCreateBlog, handleDelete, postid }) => {
  return (
    <div>
      <div className="absolute top-0 right-3 flex gap-4 z-10">
        <Button
          variant="outline"
          size="lg"
          className={`bg-yellow-400/80 text-gray-900  ${
            !loading ? 'cursor-pointer' : ''
          } dark:text-white hover:bg-yellow-500/90 border-yellow-500 dark:border-yellow-400 transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
          onClick={() => {}}
        >
          <Save className="w-5 h-5" />
          <span>Save Draft</span>
        </Button>
        {postid !== undefined && (
          <Button
            variant="default"
            size="lg"
            disabled={loading}
            onClick={!loading ? handleCreateBlog : undefined}
            className={`
    ${
      loading
        ? 'bg-green-400/90 cursor-not-allowed'
        : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer'
    }
    text-white transition-colors duration-300
    flex items-center gap-2 rounded-lg min-w-[120px]
  `}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <span>Publish</span>
            )}
          </Button>
        )}

        {postid !== undefined && (
          <Button
            variant="outline"
            size="lg"
            className={`bg-red-500/80 text-gray-900  ${
              !loading ? 'cursor-pointer' : ''
            } dark:text-white hover:bg-red-500/90 border-red-500 dark:border-red-400 transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
            onClick={handleDelete}
          >
            <Trash className="w-5 h-5" />
            <span>Delete</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionButton;
