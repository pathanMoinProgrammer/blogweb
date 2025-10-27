'use client';
import React from 'react';
import { Button } from './button';
import { Loader2, Save, Upload } from 'lucide-react';
import DeleteButton from './deleteAdminPost';

const ActionButton = ({
  loading,
  postid,
  refArray,
  locale,
  formik,
  languages,
  type,
}) => {
  return (
    <div>
      <div className="absolute top-2 right-1 flex gap-4 z-10 max-[840px]:w-full justify-around ">
        <Button
          variant="outline"
          size="lg"
          className={`bg-yellow-400/80 text-gray-900 ${
            loading && type === 'publish' ? 'cursor-not-allowed' : 'cursor-pointer'
          } hover:bg-yellow-600/90 border-yellow-500 max-[840px]:w-[25%] dark:border-yellow-400 dark:bg-yellow-400/80 transition-colors duration-300 flex items-center gap-2 rounded-lg`}
          type="button"
          onClick={() => {
            formik.setFieldValue('type', 'draft');
            formik.handleSubmit();
          }}
          disabled={loading && type !== 'publish'} // Disable only if loading a different action
        >
          {loading && type === 'publish' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="dark:text-white text-black">Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span className="dark:text-white text-black">
                Save Draft {type === 'draft' && '✅'}
              </span>
            </>
          )}
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
            disabled={loading && type !== 'draft'} // Disable only if loading a different action
            className={`${
              loading && type === 'draft'
                ? 'bg-green-500/90 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 max-[840px]:w-[25%] border-green-600 dark:hover:bg-green-700 cursor-pointer '
            }
            text-white transition-colors duration-300
            flex items-center gap-2 rounded-lg min-w-[120px]
          `}
          >
            {loading && type === 'draft' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-black dark:text-white">Publishing...</span>
              </>
            ) : (
              <>
                <Upload />
                <span className="text-[#ffffff] dark:text-white">
                  Publish {type === 'publish' && '✅'}
                </span>
              </>
            )}
          </Button>
        )}

        <div className="max-[840px]:w-[25%]">
          {postid !== undefined && (
            <DeleteButton
              mode="client"
              postid={postid}
              refArray={refArray}
              locale={locale}
              languages={languages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionButton;