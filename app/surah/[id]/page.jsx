"use client";

import AudioPlayer from "@/components/AudioPlayer";
import Basmala from "@/components/Basmala";
import Loader from "@/components/Loader";
import Page from "@/components/Page";
import Test from "@/components/Test";
import { AudioPlayerContext } from "@/context/AudioContext";
import { convertNumbers } from "@/utils/convertNumbers";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BsInfoCircleFill, BsFillPlayFill, BsBook } from "react-icons/bs";
import { IoIosPause } from "react-icons/io";

const Surah = ({ params }) => {
  const [surah, setSurah] = useState();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [surahNumber, setSurahNumber] = useState();

  const { currentAyah, setCurrentAyah, isPlaying, setIsPlaying } =
    useContext(AudioPlayerContext);

  const getSurah = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://api.alquran.cloud/v1/surah/${params.id}`
      );

      setSurah(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSurah();
  }, []);

  const pages = surah
    ? Object.entries(
        surah?.ayahs.reduce((acc, obj) => {
          const { page } = obj;
          if (!acc[page]) {
            acc[page] = [];
          }
          acc[page].push(obj);
          return acc;
        }, {})
      ).map(([pageNumber, ayahs]) => ({
        page: parseInt(pageNumber, 10),
        ayahs,
      }))
    : [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="max-w-[450px] mx-auto text-center mt-10">
      <p className="text-[#ccd0d3] text-4xl font-black">{surah?.name}</p>
      <Basmala />
      <div className="flex justify-between items-center text-[#ccd0d3] mb-5">
        {isPlaying ? (
          <span
            className="flex px-4 py-2 items-center gap-1 rounded-full text-[#2ca4ab] hover:bg-[#2ca5ab81] transition-colors cursor-pointer"
            onClick={() => setIsPlaying(false)}
          >
            {isLoading ? <Loader /> : <IoIosPause size={22} />}
            إيقاف الصوت
          </span>
        ) : (
          <span
            className="flex px-4 py-2 items-center gap-1 rounded-full text-[#cdd1d4] hover:bg-[#cdd1d44c]  cursor-pointer transition-colors"
            onClick={() => {
              setShow(true);
              setIsPlaying(true);
            }}
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
          أسم السورة: <span className="text-[#777]">{surah?.name}</span>
        </p>
        <p className="text-[#ccd0d3] text-xl font-semibold mb-4">
          عدد الأيات:{" "}
          <span className="text-[#777]">
            {convertNumbers(surah?.numberOfAyahs)} آيات
          </span>
        </p>
        <p className="text-[#ccd0d3] text-xl font-semibold mb-4">
          رقم السورة:{" "}
          <span className="text-[#777]">{convertNumbers(surah?.number)}</span>
        </p>
        <p className="text-[#ccd0d3] text-xl font-semibold mb-4">
          المنزل:{" "}
          <span className="text-[#777]">
            {surah?.revelationType === "Medinan" ? "مدنية" : "مكية"}
          </span>
        </p>
      </div>
      {pages.map((page) => (
        <Page
          key={page.page}
          page={page}
          setCurrentTrack={setCurrentTrack}
          currentTrack={currentTrack}
        />
      ))}

      <AudioPlayer
        name={surah?.name}
        ayahsNumber={surah?.numberOfAyahs}
        show={show}
        setShow={setShow}
        fileName={surah?.number}
        surahId={params.id}
      />
    </div>
  );
};

export default Surah;
