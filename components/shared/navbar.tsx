/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sections } from "../home/main";
import { Button } from "../ui/button";
import { User } from "lucide-react";

interface User {
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  _id: string;
}

const NavBar = () => {
  // const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const u = localStorage.getItem("user");
  const [user, setUser] = useState<Partial<User>>({});

  useEffect(() => {
    if (u) {
      setUser(JSON.parse(u));
    }
  }, [u]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="sticky z-[100] top-0 bg-transparent backdrop-blur-md flex items-center justify-around w-full px-10 h-[100px]">
      {Object.keys(user).length === 0 ? (
        <Link href={"/login"}>
          <Button>تسجيل الدخول</Button>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center overflow-hidden rounded-md border bg-white cursor-pointer"
            >
              <p className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                الأقسام
              </p>
              <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                <span className="sr-only">Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className="absolute end-0 z-10 mt-2 w-44 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-2">
                  {sections.map((section, index) => (
                    <Link
                      key={index}
                      onClick={() => setIsOpen(false)}
                      href={section.link}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      {section.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              onClick={() => setIsOpen2(!isOpen2)}
              className="inline-flex items-center overflow-hidden cursor-pointer"
            >
              <User />
              <p className="px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                {user?.name || "User"}
              </p>
            </div>

            {isOpen2 && (
              <div
                onClick={() => setIsOpen2(false)}
                className="absolute end-0 z-10 mt-2 w-44 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-2">
                  {user?.isAdmin && (
                    <Link href="/dashboard">
                      <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        لوحة التحكم
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Link href="/">
        <Image
          width={250}
          height={250}
          src={"/logo.svg"}
          alt="Left Logo"
          className="max-h-[70px]"
        />
      </Link>

      <Link href="/">
        <Image
          width={70}
          height={70}
          src="https://firebasestorage.googleapis.com/v0/b/sec-project-368ee.appspot.com/o/2664581-1494648939.png?alt=media&token=e259f1f9-f990-4a4b-be5a-fdac69f3b7df"
          alt="Right Logo"
          className="max-h-[70px]"
        />
      </Link>
    </nav>
  );
};

export default NavBar;
