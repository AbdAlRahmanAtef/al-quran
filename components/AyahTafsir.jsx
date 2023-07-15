"use client";

import React, { useEffect, useState } from "react";

const AyahTafsir = () => {
  const [tafsirList, setTafsirList] = useState([]);

  const getTafsirList = async () => {
    const { data } = await fetch("http://api.quran-tafseer.com/tafseer");
    console.log(data);
  };

  useEffect(() => {
    getTafsirList();
  }, []);

  return <div>AyahTafsir</div>;
};

export default AyahTafsir;
