import React, { ReactNode } from "react";
import Head from "next/head";

interface Props {
  title: string;
  children?: ReactNode;
}

const Meta = ({ title, children }: Props) => {
  return (
    <Head>
      <title>{title} | Phiflix</title>
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
};

export default Meta;
