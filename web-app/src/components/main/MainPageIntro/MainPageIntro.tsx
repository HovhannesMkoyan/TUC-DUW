import { useContext } from "react";
import { Link } from "react-router-dom";

import { StateContext } from "../../../Context";
import i18n from "../../../i18n";
import Checkbox from "./Checkbox";
import "./MainPageVisitorIntro.css";

export default function MainPageIntro() {
  const { state } = useContext(StateContext);
  const langObj: "am" | "en" = state.ui.lang || "am";

  return (
    <div className="eb-intro_container">
      <div className="eb-intro-content_container">
        <h1>{i18n[langObj].MAIN_PAGE.INTRO_H1}</h1>
        <p>{i18n[langObj].MAIN_PAGE.INTRO_TEXT}</p>
        <div className="eb-intro-features_container">
          <div className="eb-intro-feature_container">
            <Checkbox />
            <p>{i18n[langObj].MAIN_PAGE.FEATURE_DOWNLOAD}</p>
          </div>
          <div className="eb-intro-feature_container">
            <Checkbox />
            <p>{i18n[langObj].MAIN_PAGE.FEATURE_READ}</p>
          </div>
          <div className="eb-intro-feature_container">
            <Checkbox />
            <p>{i18n[langObj].MAIN_PAGE.FEATURE_GOALS}</p>
          </div>
          <div className="eb-intro-feature_container">
            <Checkbox />
            <p>{i18n[langObj].MAIN_PAGE.FEATURE_STATISTICS}</p>
          </div>
        </div>
        <div className="eb-intro-cta_container">
          {!state.auth.isLoggedIn && (
            <>
              <Link to="/join">{i18n[langObj].MAIN_PAGE.CTA_LOGIN}</Link>
              <Link to="/faq">{i18n[langObj].MAIN_PAGE.CTA_FAQ}</Link>
            </>
          )}
          {state.auth.isLoggedIn && !state.auth.user?.is_subscribed && (
            <>
              <Link to="/subscription">
                {i18n[langObj].MAIN_PAGE.CTA_SUBSCRIPTION}
              </Link>
              <div></div>
            </>
          )}
        </div>
      </div>
      <div className="eb-intro-image_container">
        <img src="/images/reading-guy.svg" alt="Reading guy" />
      </div>
    </div>
  );
}
