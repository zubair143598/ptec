import Image from "next/image";
import React from "react";

const WeAre = () => {
  return (
    <div className="max-w-[1140px] mx-auto md:px-8 px-4 py-12">
      <div>
        <h3 className="md:text-[34px] text-[24px] font-[500] mb-2">
          Who We Are ?
        </h3>
        <p className="text-[14px] md:text-[18px] text-[#666666] mb-4">
          PSDEC has been constituted by the Government of Pakistan under National
          Training Ordinance 1980 amended Ordinance 2002 on the initiative of
          World Bank, ILO and Employers’ Federation of Pakistan, to make the
          Technical & Vocational Training Programs flexible, demand driven and
          cost effective with the maximum participation of employers. It is
          basically an employer led autonomous organization functioning under
          National Training Board on the methodology of public & private
          partnership. The Council is comprised of 10 members with following
          composition.
        </p>
      </div>
      <div>
        <h3 className="md:text-[34px] text-[24px] font-[500] mb-2">Mission</h3>
        <p className="text-[14px] md:text-[18px] text-[#666666] mb-4">
          Develop a flexible and responsive Technical Vocational Training System
          to prepare competent and trained workforce capable to respond to the
          fast changing needs of the 21st century and to contribute in the
          Economic Development of Pakistan. <br />
          The PSDEC from its inception (1995) has been very successful in
          catering to the needs of Human Capital Development by arranging need
          based training programs and organizing workshops / seminars on
          promotion of Technical Vocational Education & Training,
          Entrepreneurship and Employment Generation, Women Training and
          Empowerment, Enterprise Development and other related issues.
        </p>
      </div>
      <div>
        <h3 className="md:text-[34px] text-[24px] font-[500] mb-2">
          Functions
        </h3>
        <ul className="text-[14px] md:text-[18px] text-[#666666] mb-4 list-disc pl-4">
          <li>Provide productive link between industry and training providers for
          enhancing efficiency, effectiveness and responsive of training.</li>
          <li>Identify, analyze and prioritize training needs of the geographical
          areas.</li>
          <li>Meet training needs by arranging training, re-training and skill
          upgrading programs for educated youth and already employed.</li>
          <li>Develop, validate and determine training standards and curriculum
          content based on employment and industry need analysis to ensure
          qualitative and relevant / need based training.</li>
          <li>Develop and implement special training programs for women, children
          of industrial workers to prepare them for gainful employment or some
          other income generating activities.</li>
          <li>Plan, develop and implement any other programs and activity to
          promote TVET for the benefit of individual and industry.</li>
          <li>Support the informal sector i.e. Ustad-Shagird System by providing
          them opportunities of specific training and trade testing.</li>
        </ul>
      </div>
      <div>
        <h3 className="md:text-[34px] text-[24px] font-[500] mb-2">
          Achievements
        </h3>
        <ul className="text-[14px] md:text-[18px] text-[#666666] mb-4 list-disc pl-4">
          <li>Identification and prioritization of training needs.</li>
          <li>Design & develop training courses with the involvement of experts from relevant industries and training institutes.</li>
          <li>Identification and selection of training providers in the public & private sector.</li>
          <li>Advertising / publicizing training programs with the support of training providers.</li>
          <li>Arrange training at reputable training institutions having requisite training infrastructure including qualified and experienced faculty.</li>
          <li>Monitor & Evaluate the training through physical visit and other means to ensure quality of training.</li>
          <li>Arrange and conduct final Trade Testing & Certification for successful trainees.</li>
           <li>Provide assistance in arranging internship and employment after training.</li>
            <li>Arrange skill upgrading, professional development and customized courses.</li>
             <li>Provide assistance to organization to develop and implement in-plant training programs to address the skill deficiencies of employees.</li>
             <li>Organize seminars, workshops and other programs to promote training and employment.</li>
        </ul>
      </div>
      <div>
        <h3 className="md:text-[34px] text-[24px] font-[500] mb-2">
          Achievements
        </h3>
        <div className="w-full">
          <Image src="/aboutChart.jpg" alt=" - About Chart" width={100} height={100} layout="responsive" />
        </div>
      </div>
    </div>
  );
};

export default WeAre;
