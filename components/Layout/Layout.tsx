import React from "react";

import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main className="container py-16 pt-48 mx-auto md:pt-32 sm:px-4">
        {children}
      </main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
