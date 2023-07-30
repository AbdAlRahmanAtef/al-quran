/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import AudioPlayer from "@/components/AudioPlayer";
import Basmala from "@/components/Basmala";
import Loader from "@/components/Loader";
import Page from "@/components/Page";
import { AudioPlayerContext } from "@/context/AudioContext";
import { convertNumbers } from "@/utils/convertNumbers";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsInfoCircleFill, BsFillPlayFill, BsBook } from "react-icons/bs";
import { IoIosPause } from "react-icons/io";
import { BiLoader } from "react-icons/bi";
import { useSearchParams } from "next/navigation";

const Surah = ({ params }) => {
  const [pages, setPages] = useState([]);
  const [surahInfo, setSurahInfo] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const searchParams = useSearchParams();
  const startingVerse = searchParams.get("startingVerse");
  const verseRef = useRef(null);

  const { isPlaying, setIsPlaying, setShowAudioPlayer } =
    useContext(AudioPlayerContext);

  const handlePlay = () => {
    setShowAudioPlayer(true);
    setIsPlaying(true);
  };

  const getSurahInfo = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `https://api.quran.com/api/v4/chapters/${params.id}?language=en`
      )
        .then((res) => res.json())
        .then((data) => {
          setSurahInfo(data.chapter);
          setCurrentPage(data.chapter.pages[0]);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPage = async () => {
    try {
      await fetch(
        `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${params.id}&page_number=${currentPage}`
      )
        .then((res) => res.json())
        .then((data) => setPages((prev) => [...prev, data]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight - 200
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getSurahInfo();
  }, [params.id]);

  useEffect(() => {
    const isMore = currentPage <= surahInfo?.pages[1] ? true : false;

    if (surahInfo && isMore) {
      getPage();
    }
  }, [currentPage]);

  useEffect(() => {
    const element = document.getElementById(`startingVerse-${startingVerse}`);

    if (!element) {
      return;
    }
    console.log({ element });
    element.scrollIntoView({ behavior: "smooth" });
  }, [startingVerse]);

  return (
    <div className="max-w-[450px] mx-auto text-center mt-[140px]">
      <p className="text-[#ccd0d3] text-4xl font-black">
        {`سورة ${surahInfo?.name_arabic} `}
      </p>
      {surahInfo?.bismillah_pre && <Basmala />}
      <div className="flex justify-between items-center text-[#ccd0d3] mb-5">
        {isPlaying ? (
          <span
            className="flex px-4 py-2 items-center gap-1 rounded-full text-[#2ca4ab] hover:bg-[#2ca5ab81] transition-colors cursor-pointer"
            onClick={() => setIsPlaying(false)}
          >
            {isLoading ? (
              <BiLoader size={18} className="animate-spin" />
            ) : (
              <IoIosPause size={22} />
            )}
            إيقاف الصوت
          </span>
        ) : (
          <span
            className="flex px-4 py-2 items-center gap-1 rounded-full text-[#cdd1d4] hover:bg-[#cdd1d44c]  cursor-pointer transition-colors"
            onClick={handlePlay}
          >
            <BsFillPlayFill size={22} />
            تشغيل الصوت
          </span>
        )}
        <span
          className="flex px-4 py-2 items-center gap-1 rounded-full hover:bg-[#2ca5ab81] transition-colors cursor-pointer"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          <BsInfoCircleFill size={18} title={""} /> {` `} معلومات السورة
        </span>
      </div>
      <div
        className={`${
          showDetails ? "block" : "hidden"
        } p-6 border  border-[#e7e9ea] rounded-md text-right transition-all`}
      >
        <p className="text-[#ccd0d3] text-xl font-semibold mb-4">
          أسم السورة:{" "}
          <span className="text-[#777]">{surahInfo?.name_arabic}</span>
        </p>
        <p className="text-[#ccd0d3] text-xl font-semibold mb-4">
          عدد الأيات:{" "}
          <span className="text-[#777]">
            {convertNumbers(surahInfo?.verses_count)} آيات
          </span>
        </p>
        <p className="text-[#ccd0d3] text-xl font-semibold mb-4">
          رقم السورة:{" "}
          <span className="text-[#777]">{convertNumbers(surahInfo?.id)}</span>
        </p>
        <p className="text-[#ccd0d3] text-xl font-semibold mb-4">
          المنزل:{" "}
          <span className="text-[#777]">
            {surahInfo?.revelation_place === "medinan" ? "مدنية" : "مكية"}
          </span>
        </p>
      </div>
      {isLoading ? (
        <div className="mb-10">
          <Loader count={16} type={"surahInfo"} />
        </div>
      ) : (
        pages.map((page, idx) => (
          <>
            <Page
              key={idx}
              page={page}
              setCurrentTrack={setCurrentTrack}
              currentTrack={currentTrack}
            />
          </>
        ))
      )}

      <AudioPlayer
        name={surahInfo?.name}
        ayahsNumber={surahInfo?.numberOfAyahs}
        fileName={surahInfo?.number}
        surahId={params.id}
      />
    </div>
  );
};

export default Surah;
