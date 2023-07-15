"use client";

import { convertNumbers } from "@/utils/convertNumbers";
import Link from "next/link";
import React from "react";

const Surah = ({ surah }) => {
  const { id, verses_count, name_arabic } = surah;
  return (
    <Link href={`./surah/${id}`} className="surah">
      <div>
        <span className="number">
          <small>{convertNumbers(id)}</small>
        </span>
        <span className="name">سورة {name_arabic}</span>
      </div>
      <span className="ayahs">
        {convertNumbers(verses_count)}
        {` `}
        آيات
      </span>
    </Link>
  );
};

export default Surah;
