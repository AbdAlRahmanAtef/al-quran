"use client";

import Landing from "@/components/Landing";
import Surah from "@/components/Surah";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [surahs, setSurahs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "http://api.quran.com/api/v3/chapters?language=ar"
      );

      setSurahs(data.chapters);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {" "}
      <Landing />
      <div>
        {surahs?.length > 0 && (
          <div className="surahs-list">
            {surahs?.map((item) => (
              <Surah key={item.id} surah={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
