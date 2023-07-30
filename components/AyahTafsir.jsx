/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AudioPlayerContext } from "@/context/AudioContext";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const AyahTafsir = ({ ayah }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tafsirList, setTafsirList] = useState([]);
  const [tafsirText, setTafsirText] = useState("");
  const { currentTafsirId, setCurrentTafsirId } =
    useContext(AudioPlayerContext);

  const pathname = usePathname();
  const surahNumber = pathname.split("/")[2];

  const getTafsirList = async () => {
    try {
      setIsLoading(true);

      await fetch("http://api.quran-tafseer.com/tafseer")
        .then((res) => res.json())
        .then((data) => {
          const filterdData = data.filter((d) => d.language === "ar");

          setTafsirList(filterdData);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log({ ayah });
  const getAyahTafsir = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `http://api.quran-tafseer.com/tafseer/${currentTafsirId}/${surahNumber}/${
          ayah.verse_key.split(":")[1]
        }`
      )
        .then((res) => res.json())
        .then((data) => setTafsirText(data.text));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTafsirList();
  }, []);

  useEffect(() => {
    getAyahTafsir();
  }, [currentTafsirId, surahNumber]);

  console.log({ currentTafsirId });

  return (
    <div className="max-w-[600px] bg-[#343a40] p-4 my-6 mt-[100px] mx-auto rounded-md">
      {/* Tafsirs Wrapper */}
      {isLoading ? (
        <p className="ltr:text-xl">Loading...</p>
      ) : (
        <>
          {" "}
          <div className="overflow-x-auto py-2">
            <div className="flex items-center gap-2">
              {tafsirList.map((tafsir) => (
                <div
                  className={`px-4 py-2 rounded-lg ${
                    tafsir.id === currentTafsirId
                      ? "bg-[#2ca4ab] text-[#0d0d0e]"
                      : "bg-[#0d0d0e] text-[#bed0d3]"
                  } bg-[#0d0d0e] whitespace-nowrap cursor-pointer hover:bg-[#bed0d3] transition-colors hover:text-[#0d0d0e]`}
                  key={tafsir.id}
                  onClick={() => setCurrentTafsirId(tafsir.id)}
                >
                  {tafsir.name}
                </div>
              ))}
            </div>
          </div>
          <div className="text-right py-5 border-b border-[#464b50]">
            {ayah.text}
          </div>
          <div className="text-right py-4">
            {tafsirText?.split("\n").map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AyahTafsir;
