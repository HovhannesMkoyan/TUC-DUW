import React from "react";

import Dropzone from "./Dropzone";
import "./Main.css";

export default function Main(): JSX.Element {
  // const { isLoading, data: downloadsNumber } = useQuery(
  //   fetchAllDownloadsNumberKey,
  //   () => fetchAllDownloadsNumber()
  // );

  return (
    <section className="main_container">
      <h1>Secure & Easy File Sharing</h1>
      <h3>Share anything under 10MG</h3>
      <Dropzone />
    </section>
  );
}
