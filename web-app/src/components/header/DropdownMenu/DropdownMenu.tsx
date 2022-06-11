import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faSignInAlt,
  faSignOutAlt,
  faQuestionCircle,
  faBookmark,
  faCheckSquare,
  faFileDownload,
  faShieldHalved,
  faCog,
  faBullseye,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { StateContext } from "../../../Context";
import { logout, unsetAuthFromLS } from "../../../services/auth.service";
import i18n from "../../../i18n";
import "./DropdownMenu.css";
import { IState } from "../../../types";

export default function DropdownMenu(props: any) {
  const { state, setState }: { state: IState; setState: any } =
    React.useContext(StateContext);
  const lang = i18n[state.ui.lang || "am"];
  const [activeMenu, setActiveMenu] = React.useState("main");
  const [menuHeight, setMenuHeight] = React.useState(0);
  const dropdownRef: any = React.useRef(null);

  const toggleMenu = props.toggleMenu;
  const memoizedCallback = React.useCallback(() => toggleMenu(), [toggleMenu]);
  useOnClickOutside(dropdownRef, () => {
    memoizedCallback();
  });

  React.useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el: any) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props: any) {
    const linkClicked = () => {
      if (props.closeMenu) {
        toggleMenu();
      }

      if (props.isLogout) {
        console.log("---1");
        return logout()
          .then((result: any) => {
            if (result.success) {
              unsetAuthFromLS();
              setState({
                ...state,
                auth: {
                  ...state.auth,
                  isLoggedIn: false,
                  uid: null,
                },
              });

              window.location.href = `/`;
            }
          })
          .catch((_) => {});
      }

      return props.goToMenu && setActiveMenu(props.goToMenu);
    };

    return (
      <Link to={props.url} className="menu-item" onClick={() => linkClicked()}>
        <div className="df df-ac">
          {props.customImage ? (
            <img
              src={props.customImageUrl}
              className="icon-button"
              alt="Menu icon"
            />
          ) : (
            <FontAwesomeIcon
              icon={props.icon}
              className={`icon-button ${
                props.url === "/books/inprogress" ? "header-icon-adjusted" : ""
              }`}
            />
          )}
          {props.children}
        </div>

        {props.goToMenu === "profile" && (
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            className="icon-button icon-button-right"
          />
        )}
      </Link>
    );
  }

  return (
    <div
      className={`dropdown ${
        state.auth.isLoggedIn && "dropdown-adjustedHeight"
      }`}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem url="/" icon={faHome} closeMenu={true}>
            {lang.HEADER.HOME_LINK}
          </DropdownItem>
          {state.auth.isLoggedIn ? (
            <>
              <DropdownItem goToMenu="profile" url="#" icon={faUserCircle}>
                {lang.HEADER.PROFILE_LINK}
              </DropdownItem>
              <DropdownItem
                url="/subscription"
                icon={faShieldHalved}
                closeMenu={true}
              >
                {lang.HEADER.SUBSCRIPTION_LINK}
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem url="/join" icon={faSignInAlt} closeMenu={true}>
                {lang.HEADER.LOGIN_LINK}
              </DropdownItem>
              <div>
                <DropdownItem
                  url="/faq"
                  icon={faQuestionCircle}
                  closeMenu={true}
                >
                  {lang.HEADER.HOW_TO_USE_WEBSITE_LINK}
                </DropdownItem>
              </div>
            </>
          )}
          {state.auth.isLoggedIn && (
            <DropdownItem
              url="#"
              icon={faSignOutAlt}
              isLogout={true}
              closeMenu={true}
            >
              {lang.HEADER.LOGOUT_LINK}
            </DropdownItem>
          )}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "profile"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div>
            <DropdownItem goToMenu="main" url="#">
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                className="icon-button"
              />
            </DropdownItem>
          </div>
          <DropdownItem url="/goals" icon={faBullseye} closeMenu={true}>
            Նպատակներ
          </DropdownItem>
          <DropdownItem url="/books/inprogress" icon={faEye} closeMenu={true}>
            Ընթացիկ գրքեր
          </DropdownItem>
          <DropdownItem
            url="/books/bookmarks"
            icon={faBookmark}
            closeMenu={true}
          >
            {lang.HEADER.BOOKMARKS_LINK}
          </DropdownItem>
          <DropdownItem
            url="/books/completed"
            icon={faCheckSquare}
            closeMenu={true}
          >
            {lang.HEADER.READ_BOOKS_LINK}
          </DropdownItem>
          <DropdownItem
            url="/books/downloads"
            icon={faFileDownload}
            closeMenu={true}
          >
            {lang.HEADER.DOWNLOADS_LINK}
          </DropdownItem>
          <DropdownItem url="/settings" closeMenu={true} icon={faCog}>
            {lang.HEADER.OTHER_LINK}
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

// Hook (from the web)
function useOnClickOutside(ref: any, handler: any) {
  React.useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          event.target.classList.contains("eb-header-menuIcon") ||
          event.target.parentElement.classList.contains("eb-header-menuIcon")
        ) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
