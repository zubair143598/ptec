import React from "react";

const ApplyForm = () => {
  return (
    <div className="max-w-[1140px] mx-auto my-12 px-7">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Name */}
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Father Name */}
        <input
          type="text"
          placeholder="Father Name"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Date of Birth */}
        <input
          type="text"
          placeholder="Date of Birth (dd/mm/yyyy)"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* CNIC */}
        <input
          type="text"
          placeholder="CNIC"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Cell No */}
        <input
          type="text"
          placeholder="Cell No"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Academic Qualification */}
        <select className="border border-gray-300 p-3 rounded-md">
          <option>---select here---</option>
          <option>Matric</option>
          <option>FA</option>
          <option>BA</option>
          <option>BS</option>
          <option>MS</option>
          <option>PHD</option>
        </select>

        {/* Years Of Experience */}
        <input
          type="text"
          placeholder="Years Of Experience"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Trade Course */}
        <input
          type="text"
          placeholder="Trade Course"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Course Session */}
        <input
          type="text"
          placeholder="Course Session"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Course Duration */}
        <select className="border border-gray-300 p-3 rounded-md">
          <option>---select here---</option>
          <option>06 Months</option>
          <option>01 Years</option>
          <option>02 Years</option>
        </select>

        {/* Mode Of Study */}
        <select className="border border-gray-300 p-3 rounded-md">
          <option>---select here---</option>
          <option>Experience Based</option>
          <option>Distance Education</option>
          <option>Regular Education</option>
        </select>

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* City */}
        <input
          type="text"
          placeholder="City"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Nationality */}
        <input
          type="text"
          placeholder="Nationality"
          className="border border-gray-300 p-3 rounded-md"
        />

        {/* Submit Button - full width */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#05696C] hover:bg-[#044f50] text-white font-semibold py-3 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
