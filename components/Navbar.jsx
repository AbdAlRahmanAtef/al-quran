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
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [isTransfering, setIsTransfering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showSaveSign, setShowSaveSign] = useState(false);

  const searchInputRef = useRef();
  const searchIconRef = useRef();
  const searchFormRef = useRef();

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
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // useEffect(() => {
  //   if (router.pathname.slice(1, 7) === "detail") {
  //     setCurrentNumber(router.query.id);
  //     setShowSaveSign(true);
  //   } else {
  //     setShowSaveSign(false);
  //   }
  // }, [router]);

  useEffect(() => {
    if (isTransfering) {
      router.push(`/detail/${currentSurah}`);
    }
  }, [isTransfering]);

  // useEffect(() => {
  //   const handler = (e) => {
  //     if (show && searchFormRef && !searchFormRef.current.contains(e.target)) {
  //       setShow(false);
  //     } else if (searchIconRef && searchIconRef.current.contains(e.target)) {
  //       setShow((prev) => !prev);
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // }, [show]);

  if (typeof window !== "undefined") {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    window.onscroll = () => {
      const top = document.documentElement.scrollTop;

      setWidth(`${(top / height) * 100}%`);
    };
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue) {
      const searchTerm = surahsNames.filter((surah) =>
        surah.name.trim().includes(inputValue.trim())
      );
      router.push(`/detail/${searchTerm[0].number}`);
      setInputValue("");
      setShow(false);
    }
  };

  return (
    <div className="bg-[#343a40] flex py-2 px-4 justify-between">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={60}
          className="rounded-full w-[60px] h-[60px]"
        />
      </Link>
      <form className="bg-[#131415] px-4 py-2 rounded-full flex items-center ">
        <input
          type="text"
          placeholder="أبحث عن صورة"
          className="bg-inherit outline-none border-none text-[#adb7b8] text-lg hidden md:block"
        />
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
      </form>
    </div>
  );
};

export default Navbar;
