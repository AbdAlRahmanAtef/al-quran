"use client";

import { createContext, useState } from "react";

export const AudioPlayerContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentSurah, setCurrentSurah] = useState(0);
  const [currentReciter, setCurrentReciter] = useState(2);
  const [currentTafsirId, setCurrentTafsirId] = useState(1);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <AudioPlayerContext.Provider
      value={{
        currentAyah,
        setCurrentAyah,
        showAudioPlayer,
        setShowAudioPlayer,
        currentReciter,
        setCurrentReciter,
        currentTafsirId,
        setCurrentTafsirId,
        isPlaying,
        setIsPlaying,
        currentSurah,
        setCurrentSurah,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
