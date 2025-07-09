import React from 'react'

const Hero = () => {
  return (
    <div className='bg-[url("/aboutHero.jpg")] bg-cover bg-center text-white relative z-0 bg-fixed h-[300px]'>
       <div className="absolute inset-0 bg-[#05696C] opacity-50 z-10"></div>
       <div className='relative z-30 flex justify-center items-center h-full'>
        <div>

       <h1 className='mb-3 text-[44px] font-[900]'>Trades</h1>
       <p className=' uppercase'><span>Home &gt; </span><span>Trades &gt; </span></p>
        </div>
       </div>

    </div>
  )
}

export default Hero
