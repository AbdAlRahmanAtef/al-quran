"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsBook, BsFillPlayFill } from "react-icons/bs";

const AyahWord = ({ word, handlePlay }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handlePlayClick = () => {
    handlePlay();
    setShowOptions(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (showOptions && optionsRef && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showOptions]);

  return (
    <div className="relative text-[#e7e9ea] text-2xl inline-block mb-3 mx-0.5 cursor-pointer transition-colors hover:text-[#b5b5cc]">
      <div
        className={`${
          showOptions ? "visible" : "invisible"
        } flex items-center justify-center gap-2 p-1 rounded-md z-10 transition-all absolute top-[-100%] left-[50%] translate-x-[-50%] bg-[#343a40]`}
        ref={optionsRef}
      >
        <span
          className="controller-button"
          title="تشغيل الاية"
          onClick={handlePlayClick}
        >
          <BsFillPlayFill size={18} />
        </span>
        <span
          className="controller-button"
          title="تفسير الاية"
          onClick={handlePlayClick}
        >
          <BsBook size={18} />
        </span>
      </div>
      <span onClick={() => setShowOptions(true)}>{word}</span>
    </div>
  );
};

export default AyahWord;
