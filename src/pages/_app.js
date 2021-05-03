import React from "react";
import Head from "next/head";
import { wrapper } from "../redux/store";
import "../../assets/scss/index.scss";

export function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>App</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
