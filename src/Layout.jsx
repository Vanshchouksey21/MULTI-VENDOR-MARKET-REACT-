import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/Header"
import Footer from "./component/Footer";

const Layout = () => {
  return (
    <div>
      <Header/>
     
      
      <br />
      <Outlet /> 
      <Footer/>
    </div>
  );
};

export default Layout;
