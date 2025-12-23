"use client";

import React, { useState } from "react";
import { Send, User, MessageSquare } from "lucide-react";

function ContactUsClient({ locale, translations }) {
  const Cus = translations;

  console.log("Contact Us Translations:", Cus);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Contact Form Submission from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Hello,\n\nName: ${formData.name}\n\nMessage:\n${formData.message}\n\nThank you!`
    );

    const gmailLink = `https://mail.google.com/mail/?view=cm&to=explorethebuz@gmail.com&subject=${subject}&body=${body}`;

    if (confirm("Open Gmail in browser?")) {
      window.open(gmailLink, "_blank");
    }

    setTimeout(() => {
      setFormData({ name: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] px-4 py-16 text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
            {Cus?.meta?.title}
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8"
        >
          {/* Name */}
          <div className="mb-6">
            <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700 dark:text-gray-200">
              <User className="w-5 h-5" />
              {Cus?.meta?.label1}
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder={Cus?.meta?.placeholder1}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40"
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="flex items-center gap-2 font-semibold mb-2 text-gray-700 dark:text-gray-200">
              <MessageSquare className="w-5 h-5" />
              {Cus?.meta?.label2}
            </label>
            <textarea
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleInputChange}
              placeholder={Cus?.meta?.placeholder2}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/30 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold
                       bg-gray-900 text-white dark:bg-white dark:text-black
                       hover:opacity-90 transition"
          >
            <Send className="w-5 h-5" />
            {Cus?.meta?.button}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs sm:text-sm">
            {Cus?.meta?.footer}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ContactUsClient;
