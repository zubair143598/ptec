import React from "react";

const ModeOF = () => {
  return (
    <div className="max-w-[1140px] mx-auto my-12 px-7">
      <h3 className=" text-[34px] font-[500] mb-4">Mode of Studies</h3>
      <p className="text-[18px] mb-4 text-[#666666]">
        We develop diverse, student- and workplace-oriented learning
        environments that promote personal and professional growth, communal
        responsibility and active citizenship.
      </p>
      <div className="flex md:flex-row flex-col mt-12 gap-5">
        <div className="w-[90%] md:w-1/3 mx-auto">
          <h4 className="text-[22px] font-[500]">Regular Education</h4>
          <p className="text-[18px] mb-4 text-[#666666]">
            "Regular education" is the term often used to describe the
            educational experience of typically developing students.
          </p>
        </div>
        <div className="w-[90%] md:w-1/3 mx-auto">
          <h4 className="text-[22px] font-[500]">Fast Track/RPL Education</h4>
          <p className="text-[18px] mb-4 text-[#666666]">
            Fast Track/RPL Education Recognition of Prior Learning RPL and Skills Recognition is a simple process of formal recognition through which you turn your experience or overseas qualification into an country recognized qualification.
          </p>
        </div>
        <div className="w-[90%] md:w-1/3 mx-auto">
          <h4 className="text-[22px] font-[500]">Distance Education</h4>
          <p className="text-[18px] mb-4 text-[#666666]">
            Distance education, also called distance learning, is the education of students who may not always be physically present at a institutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModeOF;
