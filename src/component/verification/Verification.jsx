import { TextField } from '@mui/material'
import React from 'react'

const Verification = () => {
  return (
    <div className=' max-w-[1140px] mx-auto  px-4 py-12 '>
      <h4 className='text-[20px] font-bold'>Verification Code / Roll No:</h4>
      <form action="">
        <TextField
              label="Verification Code / Roll No:"
              fullWidth
              margin="normal"
            />
      </form>
    </div>
  )
}

export default Verification
