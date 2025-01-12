import React from "react";
import Sider from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
