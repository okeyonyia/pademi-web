"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import Link from "next/link";
import LazyImg from "../../lazyImage/page";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebaseConfig";
import { BiParty } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-[250px]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full overflow-y bg-[#6c68b0] text-white w-64 p-5 z-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:fixed`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-start gap-x-3 items-center mb-6">
          <Link
            href="/dashboard/home"
            className="text-2xl font-bold text-indigo-600"
          >
            <LazyImg
              src="assets/LOGO.webp"
              alt="LOGO"
              title="LOGO"
              placeholder={"/"}
              width={40}
              height={40}
              className="rounded-3xl object-contain"
            />
          </Link>
          <h1 className="text-2xl text-gray-100 font-semibold">Pademi</h1>

          <button className="lg:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Items */}
        <nav className="flex flex-col gap-4 h-[calc(100vh-80px)] overflow-y-auto">
          {[
            {
              href: "/dashboard/users",
              label: "Users",
              icon: <User size={20} />,
            },
            {
              href: "/dashboard/events",
              label: "Events",
              icon: <BiParty size={20} />,
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                pathname === item.href ? "bg-[#1863cc]" : "hover:bg-[#1863cc]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 mt-auto text-left w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          className="fixed top-5 left-5 z-50 lg:hidden bg-[#6c68b0] text-white p-2 rounded-full shadow-md"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
