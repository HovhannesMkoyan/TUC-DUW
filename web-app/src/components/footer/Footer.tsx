import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScroll,
  faLock,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { StateContext } from "../../Context";
import Modal from "../HelperComponents/Modal/Modal";
import i18n from "../../i18n";
import "./Footer.css";

export default function Footer(): JSX.Element {
  const { state, setState } = React.useContext(StateContext);
  const langObj: "am" | "en" = state.ui.lang || "am";

  const [appsInfoModalOpen, setAppsInfoModalOpen] =
    React.useState<boolean>(false);

  const setLanguage = (language: "am" | "en") => {
    localStorage.setItem("lang", language);
    setState({
      ...state,
      ui: {
        ...state.ui,
        lang: language,
      },
    });
  };

  return (
    <>
      {!state.ui.hiddenHeader && (
        <footer>
          <div className="eb-footer-wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="eb-footer-content_container">
            <div className="eb-logo_container">
              <Link to="/">
                <span>ebooks.am</span>
              </Link>
              <div className="eb-footer-socials_container">
                <a
                  href="https://www.facebook.com/armenian.ebooks.am"
                  target="_blank"
                  rel="noreferrer"
                  className="eb-socials"
                >
                  <img src="/images/facebook.svg" alt="facebook icon" />
                </a>
                <a
                  href="https://www.linkedin.com/company/ebooks-am/"
                  target="_blank"
                  rel="noreferrer"
                  className="eb-socials"
                >
                  <img src="/images/linkedin.svg" alt="facebook icon" />
                </a>
                {localStorage.getItem("lang") === "am" ? (
                  <Link
                    to="#"
                    className="eb-socials"
                    onClick={() => setLanguage("en")}
                  >
                    <img src="/images/en.png" alt="EN language" />
                  </Link>
                ) : (
                  <Link
                    to="#"
                    className="eb-socials"
                    onClick={() => setLanguage("am")}
                  >
                    <img src="/images/am.png" alt="AM language" />
                  </Link>
                )}
              </div>
            </div>

            <div className="eb-footer-section">
              <Link to="/faq">
                <FontAwesomeIcon icon={faCircleQuestion} />
                {i18n[langObj].FOOTER.FAQ}
              </Link>
              <Link to="/terms">
                <FontAwesomeIcon icon={faScroll} />
                {i18n[langObj].FOOTER.TERMS}
              </Link>
              <Link to="/privacy-policy">
                <FontAwesomeIcon icon={faLock} />
                {i18n[langObj].FOOTER.PRIVACY_POLICY}
              </Link>
              {/* <div className="eb-footer-lang_container">
                {localStorage.getItem("lang") === "am" ? (
                  <Link to="#" className="df" onClick={() => setLanguage("en")}>
                    <img src="/images/en.png" alt="EN language" />
                    English
                  </Link>
                ) : (
                  <Link to="#" className="df" onClick={() => setLanguage("am")}>
                    <img src="/images/am.png" alt="AM language" />
                    Հայերեն
                  </Link>
                )}
              </div> */}
            </div>

            <div className="eb-footer-socials_container-ss">
              <a
                href="https://www.facebook.com/armenian.ebooks.am"
                target="_blank"
                rel="noreferrer"
                className="eb-socials"
              >
                <img src="/images/facebook.svg" alt="facebook icon" />
              </a>
              <a
                href="https://www.linkedin.com/company/ebooks-am/"
                target="_blank"
                rel="noreferrer"
                className="eb-socials"
              >
                <img src="/images/linkedin.svg" alt="facebook icon" />
              </a>
              {localStorage.getItem("lang") === "am" ? (
                <Link
                  to="#"
                  className="eb-socials"
                  onClick={() => setLanguage("en")}
                >
                  <img src="/images/en.png" alt="EN language" />
                </Link>
              ) : (
                <Link
                  to="#"
                  className="eb-socials"
                  onClick={() => setLanguage("am")}
                >
                  <img src="/images/am.png" alt="AM language" />
                </Link>
              )}
            </div>

            <div className="eb-footer-section">
              <div style={{ textAlign: "center" }}>
                <a href="mailto:webmaster@example.com">info@ebooks.am</a>
                <p>© 2018 - 2022 Ebooks.am</p>
              </div>
            </div>
          </div>
        </footer>
      )}

      <Modal
        onclose={() => setAppsInfoModalOpen(false)}
        isOpen={appsInfoModalOpen}
        size="md"
      >
        <p>Հավելվածները ընթացքի մեջ են և պատրաստ կլինեն տարեվերջին</p>
      </Modal>
    </>
  );
}
