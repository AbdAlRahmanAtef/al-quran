"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
// import { BsBookmark } from "react-icons/bs";
// import { FaSearch } from "react-icons/fa";
import logo from "@/assets/logo.jpeg";

const Navbar = () => {
  const [width, setWidth] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        setHidden(false);
        lastScroll = currentScroll;
      }

      if (currentScroll > lastScroll) {
        setHidden(true);
        lastScroll = currentScroll;
      } else if (currentScroll < lastScroll) {
        setHidden(false);
        lastScroll = currentScroll;
      }

      if (typeof window !== "undefined") {
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        window.onscroll = () => {
          const top = document.documentElement.scrollTop;

          setWidth(`${(top / height) * 100}%`);
        };
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div
      className={`fixed w-full right-0 top-0 z-20 transition-transform ${
        !hidden ? "translate-y-0" : "translate-y-[-100%]"
      } bg-[#343a40] flex py-2 px-4 justify-between`}
    >
      {/* Progress bar */}
      {/* <div
        className={`fixed h-[2px] rounded-sm w-[10px] right-0 z-20 transition-all ${
          hidden ? "top-10" : "top-[76px]"
        } bg-[#ccc]`}
      ></div> */}
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={60}
          className="rounded-full w-[60px] h-[60px]"
        />
      </Link>
      <Link
        href="/search"
        className="bg-[#131415] px-4 hover:opacity-70 transition-opacity py-0 rounded-lg h-[54px] min-w-[200px] flex items-center justify-between "
      >
        <p className="bg-inherit outline-none border-none text-[#adb7b8] text-lg">
          أبحث عن صورة
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#adb7b8"
            d="M10 4a6 6 0 1 0 0 12a6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default Navbar;
