import React, { useState } from 'react';
import { FiPhone, FiMail, FiSun, FiMoon } from 'react-icons/fi';

import useDarkSide from "../configs/useDarkSide";

const Contact = () => {
	  const [theme, toggleTheme] = useDarkSide();
	
  return (
    <div className='text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800'>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 w-[87%] md:w-[96%] mx-auto">
        Home /{" "}
        <span className={theme ? "text-gray-200" : "text-black"}>
          Contact
        </span>
      </div>

      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6`}
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500 rounded text-white">
                <FiPhone size={20} />
              </div>
              <h3 className="font-semibold text-black dark:text-gray-200">
                Call To Us
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              We are available 24/7, 7 days a week.
            </p>
            <p className="font-medium dark:text-gray-300">
              Phone: +880161112222
            </p>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500 rounded text-white">
                <FiMail size={20} />
              </div>
              <h3 className="font-semibold text-black dark:text-gray-200">
                Write To US
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="dark:text-gray-300">Emails: customer@exclusive.com</p>
            <p className="dark:text-gray-300">Emails: support@exclusive.com</p>
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-black dark:text-gray-200"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-black dark:text-gray-200"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-black dark:text-gray-200"
          />
          <textarea
            placeholder="Your Massage"
            rows={5}
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-black dark:text-gray-200"
          />

          <button
            type="submit"
            className="self-end bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors"
          >
            Send Massage
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
