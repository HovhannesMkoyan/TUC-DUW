import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { StateContext } from "../../Context";
import Modal from "../HelperComponents/Modal/Modal";
import i18n from "../../i18n";
import SEO from "../SEO/SEO";
import { Mixpanel } from "../../libs/mixpanel";
import "./Auth.css";

type AuthProvider = "google" | "facebook" | "linkedin";

export default function Auth(): JSX.Element {
  const { state, setState } = React.useContext(StateContext);
  const langObj: "am" | "en" = state.ui.lang || "am";

  const [changesInfoModalOpen, setChangesInfoModalOpen] =
    React.useState<boolean>(false);
  const [loginInfoModalOpen, setLoginInfoModalOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (!localStorage.getItem("ap_ci")) {
      setChangesInfoModalOpen(true);
    }
  }, []);

  const authenticate = (strategy: AuthProvider): any => {
    setState({
      ...state,
      ui: {
        ...state.ui,
        hiddenHeader: true,
        showOverPageLoader: true,
      },
    });
    window.location.href = `${process.env.REACT_APP_API_ENDPOINT}/api/auth/${strategy}`;
  };

  if (state.auth.isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  Mixpanel.track("Auth Page");
  return (
    <section className="eb-main_container">
      <SEO title="Մուտք" description="Մուտք լինել Ebooks.am կայք։ Կա գրանցման 3 եղանակ, որոնք են Facebook-ի, Google-ի կամ Linkedin-ի միջոցով։"/>
      <div className="eb-auth_container df df-column">
        <div
          className="eb-oauth_container"
          onClick={() => authenticate("google")}
        >
          <div>
            <img src="/images/google.svg" alt="google icon" />
            <span>{i18n[langObj].LOGIN_PAGE.GOOGLE_AUTH}</span>
          </div>
        </div>

        <div
          className="eb-oauth_container"
          onClick={() => authenticate("facebook")}
        >
          <div>
            <img src="/images/facebook.svg" alt="facebook icon" />
            <span>{i18n[langObj].LOGIN_PAGE.FACEBOOK_AUTH}</span>
          </div>
        </div>

        <div
          className="eb-oauth_container"
          onClick={() => authenticate("linkedin")}
        >
          <div>
            <img src="/images/linkedin.svg" alt="linkedin icon" />
            <span>{i18n[langObj].LOGIN_PAGE.LINKEDIN_AUTH}</span>
          </div>
        </div>

        <span
          className="auth-terms-notice"
          onClick={() => setLoginInfoModalOpen(true)}
        >
          {langObj === "am" && (
            <>
              Մուտք գործելով կայք Դուք հաստատում եք, որ կարդացել և ծանոթացել եք{" "}
              <Link to="/terms" style={{ textDecoration: "underline" }}>
                ընդհանուր պայմաններին և դրույթներին
              </Link>
            </>
          )}
          {langObj === "en" && (
            <>
              By signing in you confirm that you have read and <br />
              accepted our{" "}
              <Link to="/terms" style={{ textDecoration: "underline" }}>
                terms and conditions (AM only)
              </Link>
            </>
          )}
        </span>

        <span
          className="how-to-auth"
          onClick={() => setLoginInfoModalOpen(true)}
        >
          {i18n[langObj].LOGIN_PAGE.HOW_TO_LOGIN}
        </span>
      </div>

      <Modal
        onclose={() => {
          localStorage.setItem("ap_ci", "true");
          setChangesInfoModalOpen(false);
        }}
        isOpen={changesInfoModalOpen}
      >
        <h3>{i18n[langObj].LOGIN_PAGE.MODAL_CHANGES_INFO_HEADING}</h3>
        <p style={{ textAlign: "left" }}>
          {i18n[langObj].LOGIN_PAGE.MODAL_CHANGES_INFO_TEXT}
        </p>
        <div className="eb-modal-link_container">
          <Link to="/faq">
            {i18n[langObj].LOGIN_PAGE.MODAL_CHANGES_INFO_BTN}
          </Link>
        </div>
      </Modal>

      <Modal
        onclose={() => setLoginInfoModalOpen(false)}
        isOpen={loginInfoModalOpen}
      >
        <p>{i18n[langObj].LOGIN_PAGE.MODAL_LOGIN_INFO_TEXT}</p>
      </Modal>
    </section>
  );
}
