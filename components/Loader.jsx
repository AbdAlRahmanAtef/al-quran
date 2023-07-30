import React from "react";

const Loader = ({ count, height, display }) => {
  console.log(height);
  return (
    <div
      className={`${
        display === "grid" ? "display-grid" : "flex flex-col gap-1"
      }`}
    >
      {Array(count).map((i, index) => (
        <div
          key={index}
          className={`animate-pulse h-[${height}] w-full bg-[#343a40]`}
        />
      ))}
    </div>
  );
};

export default Loader;
