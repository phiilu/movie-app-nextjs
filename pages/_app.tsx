import React from "react";
import { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import "../styles/index.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
