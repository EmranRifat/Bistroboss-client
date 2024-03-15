import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../index.css";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
  const location=useLocation();
  
  const noHeaderFooter=location.pathname.includes('login')||location.pathname.includes('signup')||location.pathname.includes('formikform');

// console.log(location);
  return (
    <div>
    { noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
     {noHeaderFooter ||<Footer></Footer>}
    </div>
  );
};

export default Main;
