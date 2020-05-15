import React from "react";
import { AppProps } from "next/app";
import Layout from "@components/Layout/Layout";
import "../styles/index.css";

import { LayoutProvider } from "state/LayoutContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  );
}

export default App;
