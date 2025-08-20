import React from "react";

const Hero = () => {
  return (
    <div className='bg-[url("/aboutHero.jpg")] bg-cover bg-center text-white relative z-0 bg-fixed h-[300px]'>
      <div className="absolute inset-0 bg-[#1C4A7C] opacity-50 z-10"></div>
      <div className="relative z-30 flex justify-center items-center h-full">
        <div>
          <h1 className="mb-3 text-[44px] font-[900]">Apply Online</h1>
          <p className=" uppercase flex justify-center gap-2">
            <span>Home &gt; </span>
            <span>Apply &gt; </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
