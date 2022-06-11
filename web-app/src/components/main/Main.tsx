import React from "react";
import { Link } from "react-router-dom";

import Dropzone from "react-dropzone";
import Modal from "../HelperComponents/Modal/Modal";
import "./Main.css";

export default function Main(): JSX.Element {
  const [mainPageInfoModalOpen, setMainPageInfoModalOpen] =
    React.useState<boolean>(false);

  // const { isLoading, data: downloadsNumber } = useQuery(
  //   fetchAllDownloadsNumberKey,
  //   () => fetchAllDownloadsNumber()
  // );

  return (
    <section className="main_container">
      <Dropzone>
        {(dropzoneProps) => {
          return (
            <div>
              <p>Drop some files here</p>
            </div>
          );
        }}
      </Dropzone>
    </section>
  );
}
