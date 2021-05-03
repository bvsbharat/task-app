import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  React.useEffect(() => {
    Router.push("/task/weather");
  });

  return <div />;
}
