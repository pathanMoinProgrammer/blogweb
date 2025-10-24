'use client';
import React from 'react';
import { Button } from './button';
import { Loader2, Save } from 'lucide-react';
import DeleteButton from './deleteAdminPost';

const ActionButton = ({ loading, postid, refArray, locale, formik }) => {
  return (
    <div>
      <div className="absolute top-0 right-3 flex gap-4 z-10">
        <Button
          variant="outline"
          size="lg"
          className={`bg-yellow-400/80 text-gray-900 ${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          } dark:text-white hover:bg-yellow-500/90 border-yellow-500 dark:border-yellow-400 transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
          type="button"
          onClick={() => {
            formik.setFieldValue('type', 'draft');
            formik.handleSubmit();
          }}
          disabled={loading}
        >
          <Save className="w-5 h-5" />
          <span>Save Draft</span>
        </Button>

        {postid !== undefined && (
          <Button
            variant="default"
            size="lg"
            type="button"
            onClick={() => {
              formik.setFieldValue('type', 'publish');
              formik.handleSubmit();
            }}
            disabled={loading}
            className={`${
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
          <DeleteButton
            mode="client"
            postid={postid}
            refArray={refArray}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
};

export default ActionButton;
