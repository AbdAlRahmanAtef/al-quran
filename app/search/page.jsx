"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import NoResults from "@/components/NoResults";
import { AiOutlineSearch } from "react-icons/ai";
import { BiRightArrowAlt } from "react-icons/bi";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setPosts] = useState([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://api.quran.com/api/v4/search?q=${searchQuery}&size=20`
      );
      setPosts(data.search.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getData();
    }
  }, [searchQuery]);

  console.log(data);

  return (
    <div className="container mx-auto max-w-lg">
      <div className="bg-[#1f2125] mb-2 p-4 rounded-md flex justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          placeholder="ابحث..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-md bg-[#1f2125] text-[#4b4c4e] outline-none border-none w-[90%]"
        />
        <p className="flex justify-center items-center text-[#4b4c4e] cursor-pointer w-[40px] h-[40px] rounded-full hover:bg-[#000]">
          <AiOutlineSearch size={22} />
        </p>
      </div>
      {searchQuery && (
        <div className="max-w-lg mx-auto text-right p-4 rounded-md bg-[#1f2125]">
          {isLoading ? (
            <p className="text-center text-2xl font-bold py-4">Loading...</p>
          ) : data.length > 0 ? (
            data.map((post) => (
              <Link
                key={post._id}
                href={`/surah/${post.verse_key.split(":")[0]}?startingVerse=${
                  post.verse_key.split(":")[1]
                }`}
                className="text-[#4b4c4e] flex gap-2 text-right items-center p-4 rounded-md cursor-pointer transition duration-300 hover:bg-gray-700 hover:text-white"
              >
                <span className="flex items-center justify-center">
                  <BiRightArrowAlt size={22} />
                </span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.highlighted || post.text,
                  }}
                />
              </Link>
            ))
          ) : (
            <NoResults />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
