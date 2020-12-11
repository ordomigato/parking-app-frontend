import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const Layout = props => (
  <div className={`flex flex-col h-screen justify-between`}>
    <Header />
    <div className="mb-auto">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
