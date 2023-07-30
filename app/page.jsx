"use client";

import Landing from "@/components/Landing";
import axios from "axios";
import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import Surah from "@/components/Surah";

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

  console.log(surahs);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {" "}
      <Landing />
      {isLoading ? (
        <Loader count={10} height="100px" display="grid" />
      ) : (
        surahs?.length > 0 && (
          <div className="display-grid">
            {surahs?.map((item) => (
              <Surah key={item.id} surah={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Home;
