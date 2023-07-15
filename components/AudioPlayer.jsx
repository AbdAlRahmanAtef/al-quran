/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useRef, useEffect, useState, useContext } from "react";
import { IoIosArrowBack, IoIosPause, IoMdClose } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { BsFillPlayFill } from "react-icons/bs";
import Loader from "./Loader";
import axios from "axios";
import ReactPlayer from "react-player";
import { AudioPlayerContext } from "@/context/AudioContext";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

const AudioPlayer = ({ surahId, name, show, setShow, ayahsNumber }) => {
  const [duration, setDuration] = useState(0);
  const [recitersList, setRecitersList] = useState([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReciterMenu, setShowReciterMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);

  const { currentAyah, setCurrentAyah, isPlaying, setIsPlaying } =
    useContext(AudioPlayerContext);

  const audioRef = useRef();
  const clickRef = useRef();
  const reciterRef = useRef();
  const moreMenuRef = useRef();
  const progressRef = useRef();
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
        `https://api.quran.com/api/v4/recitations/${
          selectedReciter?.id || 2
        }/by_chapter/${surahId}?per_page=286`,
        { cache: "no-store" }
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

  console.log({ audioFiles, currentAyah, isPlaying });
  const handleClose = () => {
    setShow(false);
    setIsPlaying(false);
    setShowMoreMenu(false);
  };

  const handleChangeReciter = (rec) => {
    setSelectedReciter(rec);
    setShowReciterMenu(false);
  };

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const time = audioRef.current.currentTime;

    setDuration(duration);
    setCurrentTime(time);
  };

  const checkClick = (e) => {
    if (progressRef && !progressRef.current.contains(e.target)) {
      const width = clickRef.current.clientWidth;
      const offset = width - e.nativeEvent.offsetX;

      const progress = (offset / width) * 100;
      audioRef.current.currentTime = (progress / 100) * duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const secondsToTime = (sec) => {
    if (sec && !isNaN(sec)) {
      const h = Math.floor(sec / 3600);

      const m = Math.floor((sec % 3600) / 60)
        .toString()
        .padStart(2, "0");

      const s = Math.floor(sec % 60)
        .toString()
        .padStart(2, "0");

      return `${h > 0 ? h + ":" : ""}${m}:${s}`;
    }
    return "00:00";
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

  const goToNextAyah = () => {
    if (currentAyah < ayahsNumber - 1) {
      setCurrentAyah((prev) => prev + 1);
    } else {
      setCurrentAyah(0);
    }
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
        show &&
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
  }, [show]);

  useEffect(() => {
    getReciters();
  }, []);

  useEffect(() => {
    getAudioFiles();
  }, [selectedReciter]);

  return (
    <>
      {" "}
      <div
        className={`fixed transition-transform left-0 right-0 px-2 items-center bottom-[-2px] w-full z-10 bg-[#343a40] overflow-hidden pt-2 rounded-tr-md rounded-tl-md ${
          show ? "translate-y-0" : "translate-y-[100%]"
        }`}
      >
        {/* Progress Bar */}
        {/* <div className="w-full flex justify-start relative transition-colors hover:bg-[#131415] rounded-full">
        <div
          className="absolute z-auto h-2 w-full top-0 right-0 cursor-pointer"
          ref={clickRef}
          onClick={checkClick}
        />
        <div
          className={`h-1 bg-[#ccc] transition-all rounded-full`}
          ref={progressRef}
          style={{ width: `${Math.ceil((currentTime / duration) * 100)}%` }}
        />
      </div> */}
        <div className="flex items-center justify-center py-2 text-[#aeb2b5]">
          {/* <div>
          <span className="text-sm">
            {secondsToTime(duration)} / {secondsToTime(currentTime)}
          </span>
        </div> */}

          {/* Controllers */}
          <div className="flex items-center justify-center gap-1 ml-[-36px]">
            <span
              className="controller-button"
              title="الاية التالية"
              onClick={goToNextAyah}
            >
              <BiSkipNext size={25} />
            </span>
            {isPlaying ? (
              <span
                className="controller-button"
                onClick={() => setIsPlaying(false)}
              >
                {isLoading ? <Loader /> : <IoIosPause size={25} />}
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
            controls
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
            onClick={() => handleChangeReciter(rec)}
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
