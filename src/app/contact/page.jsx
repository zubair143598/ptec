import React from "react";

const page = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className='bg-[url("/aboutHero.jpg")] bg-cover bg-center text-white relative z-0 bg-fixed h-[300px]'>
        <div className="absolute inset-0 bg-[#1C4A7C] opacity-50 z-10"></div>
        <div className="relative z-30 flex justify-center items-center h-full">
          <div>
            <h1 className="mb-3 text-[44px] font-[900]">Apply Online</h1>
            <p className="uppercase flex justify-center gap-2">
              <span>Home &gt; </span>
              <span>Apply &gt; </span>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-[1140px] mx-auto py-8 md:py-14 bg-[#fbf9f9]">
      <div className="max-w-[776px] mx-auto px-4 ">
        <form className="gap-y-5 flex flex-col">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none placeholder:text-[18px]"
          />
          <input
            type="text"
            placeholder="Your Contact No."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none placeholder:text-[18px]"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none placeholder:text-[18px]"
          />
          <textarea
            rows="6"
            placeholder="Message"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none resize-none placeholder:text-[18px]"
          ></textarea>
          <button
            type="submit"
            className="bg-[#05696C] text-white font-medium px-8 py-3 rounded-full hover:bg-[#044f50] duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default page;
