import React from 'react';

const Finance = () => {
  const courses = [
    "Financial Analyst",
    "Financial Market Management",
    "Treasury & Forex Management",
    "Portfolio Management",
    "Total Quality Management",
    "Performance Management",
    "Insurance Management",
    "Economics (Principal & Practices)",
    "Financial Management",
    "Management & Finance",
    "Financial Management",
    "Business Accounting",
    "Islamic Banking & Finance",
    "Banking Management",
    "Commercial Banking & Stock Exchanges",
    "General Banking",
    "Money & Banking",
    "Advanced Accounting",
    "Business Accounting & Finance",
    "Business & Finance Management",
    "Financial Management & Investment",
    "Multinational Financial Management",
    "Corporate Finance",
    "Finance Planning In Business Planning",
    "Managerial Finance",
    "Audit & Account Management",
    "Accounting Management",
    "Working Capital Management",
    "Entrepreneurship",
    "The WTO & the Multilateral Trading System",
    "Financial Reporting & Analysis",
    "Systematic Investment Management",
    "Quantitative Methods",
    "Strategic Management",
    "Strategic Financial Management"
  ];

  return (
    <div className="max-w-[776px] mx-auto px-4 py-12">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-gray-200 border">
          <thead>
            <tr className="bg-[#1C4A7E] text-white text-left">
              <th className="px-4 py-3 font-semibold w-[50px]"></th>
              <th className="px-4 py-3 font-semibold">ACCOUNTS AND FINANCE</th>
            </tr>
          </thead>
          <tbody className="text-[#333]">
            {courses.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-3">{String(index + 1).padStart(2, '0')}</td>
                <td className="px-4 py-3 border-l border-gray-200">{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
