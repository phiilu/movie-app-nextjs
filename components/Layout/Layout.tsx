import React from "react";

import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import { useLayoutState } from "state/LayoutContext";

const Layout = ({ children }) => {
  const {
    layoutState: { site },
  } = useLayoutState();

  return (
    <>
      <Header site={site}></Header>
      <main
        className={
          site === "index"
            ? "container py-16 pt-48 mx-auto md:pt-32 sm:px-4"
            : ""
        }
      >
        {children}
      </main>
      <script
        async
        defer
        data-domain="nextjs.phiflix.com"
        src="https://p.phiilu.com/js/plausible.js"
      ></script>
      <Footer />
    </>
  );
};

export default Layout;
