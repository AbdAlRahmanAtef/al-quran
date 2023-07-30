/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useRef, useEffect, useState, useContext } from "react";
import { IoIosArrowBack, IoIosPause, IoMdClose } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import { RxPerson } from "react-icons/rx";
import { BsFillPlayFill } from "react-icons/bs";
import Loader from "./Loader";
import axios from "axios";
import ReactPlayer from "react-player";
import { AudioPlayerContext } from "@/context/AudioContext";
import { BiLoader, BiSkipNext, BiSkipPrevious } from "react-icons/bi";

const AudioPlayer = ({ surahId, name, ayahsNumber }) => {
  const [recitersList, setRecitersList] = useState([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReciterMenu, setShowReciterMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioFiles, setAudioFiles] = useState([]);

  const {
    currentAyah,
    currentReciter,
    setCurrentReciter,
    showAudioPlayer,
    setShowAudioPlayer,
    setCurrentAyah,
    isPlaying,
    setIsPlaying,
  } = useContext(AudioPlayerContext);

  const audioRef = useRef();
  const reciterRef = useRef();
  const moreMenuRef = useRef();
  const showMoreMenuIconRef = useRef();

  const getReciters = async () => {
    try {
      const { data } = await axios.get(
        "https://api.quran.com/api/v4/resources/recitations?language=ar"
      );
      setRecitersList(data.recitations.slice(1));
      setSelectedReciter(data.recitations[1]);
    } catch (error) {
      console.error(error);
    }
  };
  const getAudioFiles = async () => {
    try {
      const { data } = await axios.get(
        `https://api.quran.com/api/v4/recitations/${currentReciter}/by_chapter/${surahId}?per_page=286`
      );
      setAudioFiles(data.audio_files);
    } catch (error) {
      console.error(error);
    }
  };

  const playNextTrack = () => {
    if (currentAyah < audioFiles.length - 1) {
      setCurrentAyah((prev) => prev + 1);
    } else {
      setCurrentAyah(0);
      setIsPlaying(false);
    }
  };

  const handleClose = () => {
    setShowAudioPlayer(false);
    setIsPlaying(false);
    setShowMoreMenu(false);
  };

  const handleChangeReciter = (rec) => {
    setCurrentReciter(rec);
    setShowReciterMenu(false);
  };

  const handleDownload = () => {
    fetch(audioFiles)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${name}.mp4`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };

  const goToPrevAyah = () => {
    if (currentAyah > 0) {
      setCurrentAyah((prev) => prev - 1);
    } else {
      setCurrentAyah(0);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        showAudioPlayer &&
        moreMenuRef &&
        !moreMenuRef.current.contains(e.target) &&
        showMoreMenuIconRef &&
        !showMoreMenuIconRef.current.contains(e.target) &&
        reciterRef &&
        !reciterRef.current.contains(e.target)
      ) {
        setShowMoreMenu(false);
        setShowReciterMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showAudioPlayer]);

  useEffect(() => {
    getReciters();
  }, []);

  useEffect(() => {
    getAudioFiles();
  }, [currentReciter]);

  return (
    <>
      <div
        className={`fixed transition-transform left-0 right-0 px-2 items-center bottom-[-2px] w-full z-10 bg-[#343a40] overflow-hidden pt-2 rounded-tr-md rounded-tl-md ${
          showAudioPlayer ? "translate-y-0" : "translate-y-[100%]"
        }`}
      >
        <div className="flex items-center justify-center py-2 text-[#aeb2b5]">
          {/* Controllers */}
          <div className="flex items-center justify-center gap-1 ml-[-36px]">
            <span
              className="controller-button"
              title="الاية التالية"
              onClick={playNextTrack}
            >
              <BiSkipNext size={25} />
            </span>
            {isPlaying ? (
              <span
                className="controller-button"
                onClick={() => setIsPlaying(false)}
              >
                {isLoading ? (
                  <BiLoader className="animate-spin" />
                ) : (
                  <IoIosPause size={25} />
                )}
              </span>
            ) : (
              <span
                className="controller-button"
                onClick={() => setIsPlaying(true)}
              >
                <BsFillPlayFill size={25} />
              </span>
            )}
            <span
              className="controller-button"
              onClick={goToPrevAyah}
              title="الاية السابقة"
            >
              <BiSkipPrevious size={25} />
            </span>
            <span
              className="controller-button"
              onClick={() => setShowMoreMenu((prev) => !prev)}
              ref={showMoreMenuIconRef}
            >
              <FiMoreHorizontal size={25} />
            </span>
          </div>
        </div>

        <div className="hidden">
          <ReactPlayer
            ref={audioRef}
            url={`https://verses.quran.com/${audioFiles[currentAyah]?.url}`}
            playing={isPlaying}
            onEnded={playNextTrack}
            onReady={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Download || Change Reciter || Close Audio Menu */}
      <div
        className={`${
          showMoreMenu ? "visible" : "invisible"
        } transition-all fixed bottom-[60px] left-[50%] translate-x-[-50%] z-20 bg-[#343a40] p-2 rounded-md text-[#aeb2b5] flex flex-col`}
        ref={moreMenuRef}
      >
        <p className="menu-link" onClick={handleDownload}>
          <HiOutlineDownload size={20} /> تحميل
        </p>
        <p
          className="flex justify-between items-center hover:bg-[#131415] pl-2 cursor-pointer rounded-lg transition-colors"
          onClick={() => {
            setShowMoreMenu(false);
            setShowReciterMenu(true);
          }}
        >
          <span className="menu-link">
            <RxPerson size={20} /> تغيير القارئ{" "}
          </span>{" "}
          <IoIosArrowBack />
        </p>
        <p onClick={handleClose} className="menu-link">
          <IoMdClose size={20} />
          أغلق مشغل الصوت
        </p>
      </div>
      {/* Reciters List */}
      <div
        className={`${
          showReciterMenu ? "visible" : "invisible"
        } transition-all fixed bottom-[60px] left-[50%] translate-x-[-50%] z-50 bg-[#343a40] p-2 rounded-md text-[#aeb2b5] flex flex-col`}
        ref={reciterRef}
      >
        {recitersList?.map((rec) => (
          <p
            key={rec.id}
            className="menu-link"
            onClick={() => handleChangeReciter(rec.id)}
          >
            {rec.translated_name.name}
          </p>
        ))}
        <p
          className="flex justify-between items-center hover:bg-[#131415] p-2 cursor-pointer rounded-lg transition-colors"
          onClick={() => {
            setShowReciterMenu(false);
            setShowMoreMenu(true);
          }}
        >
          <span>رجوع</span> <IoIosArrowBack />
        </p>
      </div>
    </>
  );
};

export default AudioPlayer;
