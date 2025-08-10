"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/aboutUs" },
    { name: "Trades", href: "/trades" },
    { name: "E-Services", href: "/e-services" },
    { name: "Apply Online", href: "/apply-online" },
    { name: "Verification", href: "/verification" },
    { name: "Downloads", href: "/download-pdf" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
     {/* Logo */}
        <div className="py-[24px] flex justify-center">
          <Link href="/">
            <Image
              src="/newlogo.png"
              width={300}
              height={149}
              alt="Navbar - Logo"
            />{" "}
          </Link>
        </div>
    <nav className="bg-[#056A58] shadow-md w-full z-50 ">
      
      <div className="container mx-auto md:px-4 px-2 flex justify-center items-center">
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-4">
          {navLinks.map((link) => (
              <Link
              key={link.name}
              href={link.href}
              className={`text-[14px] text-white p-5 font-normal hover:font-bold Titillium-Web transition ${pathName === link.href ?  "font-bold !important":"" } `}
              >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button className=" text-white flex gap-2 p-4" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />} <span className=" text-[16px]">MENU</span> 
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
          <div className="lg:hidden px-4 pb-4 bg-[#056A58] shadow-md">
          {navLinks.map((link) => (
              <Link
              key={link.name}
              href={link.href}
              className={`block py-2 text-white hover:font-bold transition ${pathName === link.href ?  "font-bold":"" } `}
              onClick={() => setIsOpen(false)}
              >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
      </>
  );
};

export default Navbar