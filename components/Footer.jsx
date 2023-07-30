import { convertNumbers } from "@/utils/convertNumbers";
import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="w-full text-center flex items-center gap-1 justify-center p-4">
      كل الحقوق محفوظة
      {convertNumbers(new Date().getFullYear())}
      <BiCopyright />{" "}
    </div>
  );
};

export default Footer;
