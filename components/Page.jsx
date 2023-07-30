"use client";

import { convertNumbers } from "@/utils/convertNumbers";
import React, { useContext, useEffect, useRef } from "react";
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
      {page?.verses?.map((ayah, idx) => (
        <span
          key={idx}
          id={`startingVerse-${ayah?.verse_key.split(":")[1]}`}
          className={`${
            +ayah?.verse_key.split(":")[1] === currentAyah + 1
              ? "bg-[#343a4064]"
              : "bg-transparent"
          } transition-colors`}
        >
          {ayah.text_uthmani.split(" ").map((word, idx) => (
            <AyahWord
              key={idx}
              word={word}
              ayah={ayah}
              handlePlay={() => handleWordClick(ayah?.verse_key.split(":")[1])}
            />
          ))}
          <span className="ayah-number">
            {`${convertNumbers(ayah.verse_key.split(":")[1])}`}
          </span>
        </span>
      ))}
      <p className="text-xl text-[#777] mt-4">{` ﴿${convertNumbers(
        page.meta.filters.page_number
      )}﴾ `}</p>
    </div>
  );
};

export default Page;
