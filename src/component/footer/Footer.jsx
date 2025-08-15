import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-[#232323] p-3 md:px-10 pt-16 md:pb-10 ">
      <div className="max-w-[1200px] md:w-[100%] w-[80%] justify-center mx-auto flex md:flex-row flex-col gap-6">
        <div className="md:w-[25%] px-3 text-white font-nunito">
          <h6 className="mb-5 md:mb-10 text-[24px]">Get in touch</h6>
          <ul className=" space-y-2">
            <li className="text-[16px]  mb-7">
              <Link className="flex gap-2" href="mailto:info@ptec.edu.pk"><MdEmail className="" size={22} />info@psdec.edu.pk</Link>
            </li>
            <li className="text-[16px] ">
              <h6 className="mb-3 md:mb-6 text-[24px]">Connect With Us</h6>
            </li>
           <li className="text-[16px]  flex gap-x-5">
              <FaFacebook className="" size={26} />
              <FaInstagram size={26} /> <FaXTwitter size={26} />
            </li>
          </ul>
        </div>
        <div className="md:w-[17%] px-3 text-white font-nunito">
          <h6 className="mb-5 md:mb-10 text-[24px]">Quick Links</h6>
          <ul className=" space-y-1 text-[#ffffffb3]">
            <li className="text-[16px] ">
              <Link href="/">Home</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/qualifications">About</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/aboutUs">About Us</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/contact">Apply Online</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/contact">Verification</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="md:w-[33%] px-3 text-white font-nunito">
          <h6 className="mb-5 md:mb-10 text-[24px]">Downloads</h6>
          <ul className=" space-y-1 text-[#ffffffb3]">
            <li className="text-[16px] ">
              <Link href="/">AFFILIATION FORM</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/qualifications">APPLICATION FORM FOR CORRECTION IN NAME</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/aboutUs">BEFORE TIME CERTIFICATE DIPLOMA FORM</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/contact">EXAMINATION ADMISSION FORM</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/contact">RETOTALING FORM</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/contact">VERIFICATION FORM</Link>
            </li>
            <li className="text-[16px] ">
              <Link href="/contact">EXAM RESULT SHEET</Link>
            </li>
          </ul>
        </div>
        <div className="md:w-[25%] px-3 text-white font-nunito">
          <h6 className="mb-5 md:mb-10 text-[24px]">Subscribe Us!</h6>
          <ul className=" space-y-2">
            <li className="">
               <input type="text" className="bg-[#393939] h-[50px] rounded w-full px-3 py-2 placeholder:items-center placeholder:text-[18px]" placeholder="Enter Email address" />
            </li>
            <li className="text-[16px] ">
             <button className="bg-[#5D50C6] h-[50px] rounded w-full px-3 py-2 placeholder:items-center text-[14px] md:text-[20px]">Subscribe</button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className=" text-center text-[#ffffffb3] mt-5 md:mt-10">Copyright © by <b>Pakistan Skill Development & Educational Council</b></p>
      </div>
    </div>
  );
};

export default Footer;
