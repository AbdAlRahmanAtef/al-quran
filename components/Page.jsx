"use client";

import { convertNumbers } from "@/utils/convertNumbers";
import React, { useContext } from "react";
import AyahWord from "./AyahWord";
import { AudioPlayerContext } from "@/context/AudioContext";

const Page = ({ page }) => {
  const { currentAyah, setCurrentAyah, setIsPlaying } =
    useContext(AudioPlayerContext);
  const handleWordClick = (ayahNumber) => {
    setCurrentAyah(ayahNumber - 1);
    setIsPlaying(true);
  };

  return (
    <div className="border-b border-[#343a40] py-6 max-w-[450px] mx-auto">
      {page.ayahs?.map((ayah, idx) => (
        <span
          key={idx}
          className={`${
            currentAyah === idx ? "bg-[#343a4064]" : "bg-transparent"
          } transition-colors`}
        >
          {ayah.text
            .split(" ")
            // .filter((word) => word !== "بِسۡمِ")
            // .filter((word) => word !== "ٱللَّهِ")
            // .filter((word) => word !== "ٱلرَّحۡمَـٰنِ")
            // .filter((word) => word !== "ٱلرَّحِیمِ")
            .map((word, idx) => (
              <AyahWord
                key={idx}
                word={word}
                handlePlay={() => handleWordClick(ayah?.numberInSurah)}
              />
            ))}
          <span className="ayah-number">
            {`${convertNumbers(ayah.numberInSurah)}`}
          </span>
        </span>
      ))}
      <p className="text-xl text-[#777]">{` ﴿${convertNumbers(
        page.page
      )}﴾ `}</p>
    </div>
  );
};

export default Page;
