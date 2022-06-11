import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { StateContext } from "../../Context";
import "./Header.css";

function shadowOnScroll() {
  const header = document.getElementsByTagName("header")[0];
  if (window.pageYOffset > 50) {
    header.classList.add("header-shadow");
  } else {
    header.classList.remove("header-shadow");
  }
}

function Header(): JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const { state } = React.useContext(StateContext);

  React.useEffect(() => {
    window.addEventListener("scroll", shadowOnScroll);
    return () => {
      window.removeEventListener("scroll", shadowOnScroll);
    };
  }, []);

  return (
    <>
      {!state.ui.hiddenHeader && (
        <header
          className={`${state.ui.noHeaderShadow ? "no-shadow" : ""} ${
            state.ui.headerWithOnlyLogo ? "header-withOnly-logo" : ""
          }`}
        >
          <div className="eb-logo_container">
            <Link to="/">
              <span>Datenbanken und Webtechniken Project</span>
            </Link>
          </div>

          {!state.ui.headerWithOnlyLogo && (
            <>
              <div className="df df-ac">
                {state?.auth.isLoggedIn ? (
                  <span
                    className="eb-header-userIcon_container"
                    onClick={() => setOpenNav(!openNav)}
                  >
                    {state.auth.user?.firstname.length !== 0
                      ? state.auth.user?.firstname.charAt(0)
                      : state.auth.user?.email.charAt(0)}
                  </span>
                ) : (
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="eb-header-menuIcon"
                    onClick={() => setOpenNav(!openNav)}
                  />
                )}
              </div>
            </>
          )}
        </header>
      )}
    </>
  );
}

export default withRouter(Header);
