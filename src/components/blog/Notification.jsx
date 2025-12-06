'use client';
import { useEffect, useState } from 'react';

export default function Notification({
  messages = [],
  isVisible,
  onClose,
  handleFocusField,
}) {
  const [visiblemessage, setVisiblemessage] = useState([]);
  const { type, message } = messages;

  useEffect(() => {
    if (isVisible && message.length > 0) {
      setVisiblemessage([]);

      const messageArray = Array.isArray(message)
        ? message.map((msg) => ({ type: type && type, message: [msg] }))
        : [messages];

      messageArray.forEach((msgObj, objIndex) => {
        const messageList = Array.isArray(msgObj.message)
          ? msgObj.message
          : [msgObj.message];

        messageList.forEach((msg, msgIndex) => {
          const totalIndex = objIndex * messageList.length + msgIndex;
          setTimeout(() => {
            setVisiblemessage((prev) => [
              ...prev,
              {
                id: Date.now() + totalIndex,
                text: msg,
                type: msgObj.type || 'success',
                isLeaving: false,
              },
            ]);
          }, totalIndex * 150);
        });
      });
    }
  }, [isVisible, message]);

  useEffect(() => {
    if (visiblemessage.length === 0) return;

    const timers = visiblemessage.map((msg, index) => {
      return setTimeout(() => {
        setVisiblemessage((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isLeaving: true } : m)),
        );

        setTimeout(() => {
          setVisiblemessage((prev) => prev.filter((m) => m.id !== msg.id));
        }, 400);
      }, 3000 + index * 150);
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [visiblemessage.length]);

  useEffect(() => {
    if (isVisible && visiblemessage.length === 0 && message.length > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visiblemessage.length, isVisible, message.length, onClose]);

  if (!isVisible || visiblemessage.length === 0) return null;

  const getIcon = (type) => {
    if (type === 'error' || type === 'warning') {
      return (
        <>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/30">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping"></div>
        </>
      );
    }

    return (
      <>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
      </>
    );
  };

  const getProgressBarColor = (type) => {
    if (type === 'error' || type === 'warning') {
      return 'from-red-500 via-rose-500 to-pink-500';
    }
    return 'from-blue-500 via-purple-500 to-pink-500';
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-3 items-center ">
      {visiblemessage.map((msg, index) => (
        <div
          key={msg.id}
          onClick={async () => {
            if (msg.text) {
              // Extract field name (before ":")
              const match = msg.text.match(/⚠️\s*(\w+):/);
              const fieldName = match ? match[1] : null;
              if (fieldName) {

                const dataCame = await handleFocusField(fieldName);

              }
            }
          }}
          className={`group relative cursor-pointer overflow-hidden
    bg-gradient-to-r from-slate-900 to-slate-800
    backdrop-blur-xl border border-slate-700/50
    rounded-2xl shadow-2xl px-5 py-3.5 flex items-center gap-3
    min-w-[320px] max-w-[500px] transition-all duration-400 ease-out
    ${
      msg.isLeaving
        ? 'opacity-0 scale-95 -translate-y-5'
        : 'opacity-100 scale-100 translate-y-0'
    }
  `}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="relative shrink-0">{getIcon(msg.type)}</div>

          <span className="relative text-sm font-medium text-white/95 tracking-wide ">
            {msg.text}
          </span>

          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getProgressBarColor(
              msg.type,
            )} origin-left`}
            style={{
              animation: 'shrink 3s linear forwards',
              animationDelay: `${index * 150}ms`,
            }}
          ></div>
        </div>
      ))}

      <style jsx>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
}
