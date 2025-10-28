'use client';
import React from 'react';
import { Button } from './button';
import { Loader2, Save, Upload } from 'lucide-react';
import DeleteButton from './bothDeleteablePost';

const ActionButton = ({
  loading,
  postid,
  refArray,
  locale,
  formik,
  languages,
  type,
  setNotifiMessage,
  setShowNotification,
  showNotification,
}) => {
  return (
    <>
      <section className="w-full    ">
        <div className=" min-[1300px]:px-5  max-[1300px]:px-2">
          <div className="flex justify-around  z-10 min-[1300px]:gap-5  max-[1300px]:gap-2.5">
            <button
              variant="outline"
              size="lg"
              className={`bg-blue-500 text-white font-bold ${
                loading && type == 'draft'
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              } hover:bg-yellow-600/90 border-b-2 py-2 rounded-lg max-h-12  px-3 py-5.4 justify-center  border-gray-500 min-w-[70px] dark:border-yellow-400  dark:bg-yellow-400/80 transition-colors duration-300 flex items-center gap-2 `}
              type="button"
              onClick={() => {
                formik.setFieldValue('type', 'draft');
                formik.handleSubmit();
              }}
              disabled={loading && type !== 'draft'} // Disable only if loading a different action
            >
              {loading && type == 'draft' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {type === 'draft' && '✅'}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 text-white hover:text-white" />
                  {type === 'draft' && '✅'}
                </>
              )}
            </button>

            {postid !== undefined && (
              <button
                variant="default"
                size="lg"
                type="button"
                onClick={async () => {
                  formik.setFieldValue('type', 'publish');
                  const errors = await formik.validateForm();

                  if (Object.keys(errors).length > 0) {
                    const messages = Object.entries(errors).map(
                      ([key, value]) => `⚠️ ${key}: ${value}`,
                    );

                    // ✅ Set structured notification object
                    setNotifiMessage({
                      type: 'error',
                      message: messages,
                    });

                    setShowNotification(true);

                    const totalDuration = messages.length * 300 + 3000;
                    setTimeout(() => {
                      setShowNotification(false);
                      setNotifiMessage({ type: '', message: [] });
                    }, totalDuration);
                  } else {
                    await formik.handleSubmit();
                  }
                }}
                disabled={loading && type !== 'publish'} // Disable only if loading a different action
                className={`${
                  loading && type === 'publish'
                    ? 'bg-green-500/90 cursor-not-allowed '
                    : 'bg-blue-500 hover:bg-green-600   cursor-pointer '
                } py-3 max-h-12 justify-center min-w-[70px] rounded-lg  px-3 py-5.4 dark:bg-blue-500   border-b-2 border-[#5d5959] dark:hover:bg-green-700
            text-white transition-colors duration-300
            flex items-center gap-2  
          `}
              >
                {loading && type == 'publish' ? (
                  <>
                    <Loader2 className="w-5 h-10 animate-spin" />
                    {type === 'publish' && '✅'}
                  </>
                ) : (
                  <>
                    <Upload />
                    {type === 'publish' && '✅'}
                  </>
                )}
              </button>
            )}
            <DeleteButton
              mode="client"
              postid={postid}
              languages={languages}
              refArray={refArray}
              locale={locale}
            />
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default ActionButton;
