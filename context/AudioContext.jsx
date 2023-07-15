"use client";

import { createContext, useState } from "react";

export const AudioPlayerContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentAyah, setCurrentAyah] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <AudioPlayerContext.Provider
      value={{ currentAyah, setCurrentAyah, isPlaying, setIsPlaying }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
