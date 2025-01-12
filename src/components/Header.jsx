import React from "react";
import image from "../assets/889_v2f2zxmtmdi.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex flex-col bg-[#94DAFF] rounded-b-3xl shadow-lg h-fit">
      <div className="flex items-center justify-between px-8 py-16">
        <h1 className="font-mono text-xl font-semibold lg:text-4xl">
          Crowdsourcing data Banjir
        </h1>
        <p className="px-4 py-2 bg-[#1572A1] text-white rounded-xl tracking-widest">
          <Link to="/login">Login</Link>
        </p>
      </div>
      <img src={image} alt="" className="object-cover rounded-b-3xl" />
    </div>
  );
};

export default Header;
