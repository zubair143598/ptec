import Image from 'next/image'
import React from 'react'

const Register = () => {
  return (
    <div className=' px-4 md:px-auto py-5 flex justify-center flex-col items-center bg-[#EEEEEE]'>
      <h3 className='md:text-[22px] text-[18px] font-bold uppercase text-[#666666]'>Register Government Of Punjab</h3>
      <div className='w-[260px] md:w-[550px] mx-auto my-3'>
      <Image src="/newlogo.png" alt="" layout='responsive' width={250} height={214} /> 
      </div>
      <h3 className='text-[18px] md:text-[22px] font-bold uppercase text-[#666666]'>Project</h3>
      <h3 className='text-[18px] md:text-[22px] font-bold uppercase text-[#666666] text-center'>Pakistan Health Sciences Council & Skill Organization</h3>
    </div>
  )
}

export default Register
