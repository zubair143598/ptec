import React from 'react';

const page = () => {
  const courses = [
    { title: "Affiliation Form", formLink: "/downloadsPDF/Affilition-Form.pdf" },
    { title: "APPLICATION FORM FOR CORRECTION IN NAME", formLink: "/downloadsPDF/APPLICATION-FORM-FOR-CORRECTION-IN-NAME.pdf" },
    { title: "BEFORE TIME CERTIFICATE DIPLOMA FORM", formLink: "/downloadsPDF/before-time-certificate-diploma-form.pdf" },
    { title: "EXAMINATION ADMISSION FORM", formLink: "/downloadsPDF/EXAMINATION-ADMISSION-FORM.pdf" },
    { title: "RETOTALING FORM", formLink: "/downloadsPDF/Retotaling-Form.pdf" },
    { title: "VERIFICATION FORM", formLink: "/downloadsPDF/Verification-Form.pdf" },
    { title: "EXAM RESULT SHEET", formLink: "/downloadsPDF/EXAM-RESULT-SHEET.pdf" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className='bg-[url("/aboutHero.jpg")] bg-cover bg-center text-white relative z-0 bg-fixed h-[300px]'>
        <div className="absolute inset-0 bg-[#05696C] opacity-50 z-10"></div>
        <div className="relative z-30 flex justify-center items-center h-full">
          <div>
            <h1 className="mb-3 text-[44px] font-[900]">Downloads</h1>
            <p className="uppercase flex justify-center gap-2">
              <span>Home &gt; </span>
              <span>Downloads &gt; </span>
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-[776px] mx-auto px-4 py-12">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-gray-200 border">
            <thead>
              <tr className="bg-[#006B56] text-white text-left">
                <th className="px-4 py-3 font-semibold w-[50px]"></th>
                <th className=" py-3 text-center font-bold text-[18px]">Download PDF's</th>
              </tr>
            </thead>
            <tbody className="text-[#333]">
              {courses.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3">{String(index + 1).padStart(2, '0')}</td>
                  <td className="px-4 py-3 border-l border-gray-200">
                    <a
                      href={item.formLink}
                      download
                      className="text-[#006B56] hover:underline"
                    >
                      {item.title}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
