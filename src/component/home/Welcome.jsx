import React from "react";

const Welcome = () => {
  return (
    <div className="relative">
      {/* Background image */}
      <div className='bg-[url("/welcombg.jpg")] bg-cover bg-center text-white relative z-0 bg-fixed'>
        {/* Overlay with color and opacity */}
        <div className="absolute inset-0 bg-[#05696C] opacity-90 z-10"></div>

        {/* Content on top of overlay */}
        <div className="relative z-20 max-w-[1140px] px-4 py-28 mx-auto">
          <div className="px-3 md:px-8">
            <h2 className="text-[26px] md:text-[32px] lg:text-[38px] font-semibold max-w-[1077px] mb-6">
              Welcome to Pakistan Technical & Educational Council Islamabad
            </h2>
            <p className="mb-4 text-[14px] md:text-[18px]">
              The Pakistan Technical & Educational Council (PTEC) has been
              constituted as statutory body under society registration Act (XXi
              of 1860), by the Government of Pakistan under National Training
              Ordinance – 1980 amended Ordinance – 2002 on the initiative of
              World Bank, ILO and Employers’ Federation of Pakistan, to make the
              Technical & Vocational Training Programs flexible, demand driven
              and cost effective with the maximum participation of employers.
            </p>
            <p className="mb-4 text-[14px] md:text-[18px]">
              The main social target of our Organization, Governments and of WHO
              should be the attainment by all the people of the world by the
              year 2050 of a level of health which would permit them to lead a
              socially and economically productive life. The basic aims of Trade
              Testing Council are to promote Technical / Health Education and to
              provide well-trained and highly Skilled Professionals to Society
              and to decrease unemployment graph level. It is basically an
              employer led autonomous organization functioning under National
              Training Board on the methodology of public & private partnership.
            </p>
            <h3 className="md:text-[30px] text-[22px] mt-8 mb-2">Working Mechanism</h3>
            <p className="mb-4 text-[14px] md:text-[18px]">
              PTEC design and develop training courses in accordance with
              emerging needs with the involvement of experts from relevant
              industry. PTEC does not have its own training institutes but
              collaborates and works in partnership with industry, training
              institutes / colleges and other organizations to arrange training
              which is:
              <br />
              1. Relevant to the Needs of Local Industry / Employment Market.
              <br />
              2. Flexible to Respond to Change.
              <br />
              3. Recognized for Employment Nationally and Internationally
            </p>
            <div className="flex md:flex-row flex-col ">
              <div className="w-full md:w-[70%] px-4 ">
                <h4 className="mt-12 mb-4 md:text-[26px] text-[18px] font-medium">
                  Major Responsibilities
                </h4>
                <ul className=" list-disc pl-4">
                  <li className="mb-4 text-[14px]  md:text-[18px]">
                    Prescribe courses of study for its examinations.
                  </li>
                  <li className="mb-4 text-[14px]  md:text-[18px]">
                    Lay down conditions for recognition of institutions to
                    ensure provision of requisite facilities in the affiliated
                    institutions.
                  </li>
                  <li className="mb-4 text-[14px]  md:text-[18px]">
                    Grant certificates and diplomas to persons who have passed
                    its examinations.
                  </li>
                  <li className="mb-4 text-[14px]  md:text-[18px]">
                    Institute and award scholarships, medals and prizes in
                    accordance with the Regulations and Rules.
                  </li>
                </ul>
              </div>
              <div className="px-4">
                <h4 className="mt-12 mb-4 md:text-[26px] text-[18px] font-medium">
                  Jurisdiction of PTEC
                </h4>
                <p className="mb-4 text-[14px] md:text-[18px]">
                  1. Khyber Pakhtunkhwa <br />
                  2. Islamabad <br />
                  3. Azad Jammu Kashmir <br />
                  4. Gilgit Baltistan <br />
                  5. Chitral <br />
                  6. Lahore <br />
                  7. Karachi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
