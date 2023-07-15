"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const Test = () => {
  const audioFiles = [
    {
      verse_key: "1:1",
      url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001001.mp3",
    },
    {
      verse_key: "1:2",
      url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001002.mp3",
    },
    {
      verse_key: "1:3",
      url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001003.mp3",
    },
    {
      verse_key: "1:4",
      url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001004.mp3",
    },
    {
      verse_key: "1:5",
      url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001005.mp3",
    },
    {
      verse_key: "1:6",
      url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001006.mp3",
    },
    {
      verse_key: "1:7",
      url: "https://verses.quran.com/AbdulBaset/Murattal/mp3/001007.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    calculateTotalDuration();
  }, []);

  useEffect(() => {
    setCurrentTime(0);
  }, [currentTrack]);

  const calculateTotalDuration = () => {
    let sum = 0;
    for (let i = 0; i < audioFiles.length; i++) {
      const audio = new Audio(audioFiles[i].url);
      audio.onloadedmetadata = () => {
        sum += audio.duration;
        if (i === audioFiles.length - 1) {
          setTotalDuration(sum.toFixed(2));
        }
      };
    }
  };

  const playNextTrack = () => {
    if (currentTrack < audioFiles.length - 1) {
      setCurrentTrack(currentTrack + 1);
      setIsPlaying(true);
    } else {
      setCurrentTrack(0);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleSeek = (event) => {
    const seekTime = parseFloat(event.target.value);
    setCurrentTime(seekTime);
    playerRef.current.seekTo(seekTime, "seconds");
  };

  return (
    <div className="bg-white">
      {audioFiles.map((file, index) => (
        <div key={file.verse_key}>
          {/* ...other code... */}
          <ReactPlayer
            controls
            ref={playerRef}
            url={file.url}
            playing={isPlaying && currentTrack === index}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%" }}
            onEnded={playNextTrack}
            onPlay={handlePlay}
            onPause={handlePause}
            onProgress={(progress) => handleTimeUpdate(progress.playedSeconds)}
          />
        </div>
      ))}
      <div>Current Track: {audioFiles[currentTrack].verse_key}</div>
      <div>Current Time: {currentTime.toFixed(2)} seconds</div>
      <div>Total Duration: {totalDuration} seconds</div>
      <input
        type="range"
        min={0}
        max={parseFloat(totalDuration)}
        step={0.01}
        value={currentTime}
        onChange={handleSeek}
      />
      <p onClick={() => setIsPlaying(!isPlaying)}>Play/Pause</p>
    </div>
  );
};

export default Test;
