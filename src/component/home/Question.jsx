"use client";
import { styled, TextField } from "@mui/material";
import React from "react";

const Question = () => {
  const InputTextField = styled(TextField)(() => ({
    marginBottom: "16px",
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid white",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "1px solid white",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid white",
    },
  }));
  return (
    <div className="relative">
      {/* Background image */}
      <div className='bg-[url("/question.jpg")] bg-cover bg-center text-white relative z-0 bg-fixed bg-no-repeat'>
        {/* Overlay with color and opacity */}
        <div className="absolute inset-0 bg-[#05696C] opacity-70 z-10"></div>
        <div className="md:w-[60%] w-[90%] mx-auto md:p-12 py-10 z-30 relative">
            <div>
              <h3 className="text-[24px] md:text-[32px] font-semibold mb-4">Question About Course Trade</h3>
              <p  className="text-[18px] mb-2.5">Fill in the form and we will answer your question.</p>
            </div>
          <form className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-6">
              <InputTextField
                id="name"
                label="Your Name"
                variant="standard"
                fullWidth
              />

              <InputTextField
                id="name"
                label="Phone"
                variant="standard"
                fullWidth
              />

              <InputTextField
                id="name"
                label="Course Name"
                variant="standard"
                fullWidth
              />

              <InputTextField
                id="name"
                label="Message"
                variant="standard"
                fullWidth
              />
            </div>
            <div  className="w-[80%] mx-auto mt-4">

            <button className="w-full p-4 bg-[#056A58] rounded-full text-[18px]" type="submit">Request a Quote</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Question;
