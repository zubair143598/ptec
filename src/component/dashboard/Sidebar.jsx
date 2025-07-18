"use client";

import Link from "next/link";
import { PiStudent } from "react-icons/pi";
import { IoMdContacts } from "react-icons/io";
import { usePathname } from "next/navigation";


const Sidebar = () => {
    
  const pathName = usePathname();
  return (
    <div>
      <h2 className="md:text-2xl text-[14px] font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
            href="/admin/diploma-certificates"
            className={`hover:text-yellow-400 px-2 py-1 rounded flex gap-3 ${
              pathName === "/admin/diploma-certificates" ? "bg-[#0A7FC3]" : ""
            }`}
          >
            <PiStudent size={18} className="mt-[2px]" />
            <span className="md:block hidden">Diploma Certificate</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/dmcs"
            className={`hover:text-yellow-400 px-2 py-1 rounded flex gap-3 ${
              pathName === "/admin/dmcs" ? "bg-[#0A7FC3]" : ""
            }`}
          >
            <IoMdContacts size={18} className="mt-[2px]" />
            <span className="md:block hidden"> Contact</span>
          </Link>
        </li>
      </ul>

    </div>
  )
}

export default Sidebar
