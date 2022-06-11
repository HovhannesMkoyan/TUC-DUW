import React from "react";
import { Link } from "react-router-dom";

import Modal from "../HelperComponents/Modal/Modal";
import "./Main.css";

export default function Main(): JSX.Element {
  const [mainPageInfoModalOpen, setMainPageInfoModalOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (!localStorage.getItem("mp_i")) {
      setMainPageInfoModalOpen(true);
    }
  }, []);

  // const { isLoading, data: downloadsNumber } = useQuery(
  //   fetchAllDownloadsNumberKey,
  //   () => fetchAllDownloadsNumber()
  // );

  return (
    <section className="eb-main_container eb-mainPage_container">
      <Modal
        onclose={() => {
          localStorage.setItem("mp_i", "true");
          setMainPageInfoModalOpen(false);
        }}
        isOpen={mainPageInfoModalOpen}
      >
      </Modal>
    </section>
  );
}
