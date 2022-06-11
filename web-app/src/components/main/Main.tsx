import React from "react";
import { Link } from "react-router-dom";

import MainPageIntro from "./MainPageIntro/MainPageIntro";
import CardCategories from "./CardCategories/CardCategories";
import Modal from "../HelperComponents/Modal/Modal";
import i18n from "../../i18n";
import { Mixpanel } from "../../libs/mixpanel";
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

  Mixpanel.track("Main Page");
  return (
    <section className="eb-main_container eb-mainPage_container">
      <MainPageIntro />
      <CardCategories />
      {/* <div className="eb-main-downloads_container">
        {!isLoading && (
          <p>
            Մինչ այժմ տեղի է ունեցել{" "}
            <span style={{ fontWeight: "bold", color: "grey" }}>
              {parseInt(downloadsNumber).toLocaleString("en-US") || 0}
            </span>{" "}
            ներբեռնում
          </p>
        )}
      </div> */}
      <Modal
        onclose={() => {
          localStorage.setItem("mp_i", "true");
          setMainPageInfoModalOpen(false);
        }}
        isOpen={mainPageInfoModalOpen}
      >
        <h3>{i18n.am.MAIN_PAGE.MODAL_INFO_HEADING}</h3>
        <p style={{ textAlign: "left" }}>{i18n.am.MAIN_PAGE.MODAL_INFO_TEXT}</p>
        <div className="eb-modal-link_container">
          <Link to="/faq">{i18n.am.MAIN_PAGE.MODAL_INFO_BTN}</Link>
        </div>
      </Modal>
    </section>
  );
}
