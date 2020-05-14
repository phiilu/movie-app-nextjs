import React from "react";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main className="container py-16 pt-48 mx-auto md:pt-32 sm:px-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
