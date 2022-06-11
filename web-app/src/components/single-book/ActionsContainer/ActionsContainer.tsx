import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faBook,
  faBookmark,
  faCheckSquare,
  faShareSquare,
  faEye,
  faCircleChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { TUserBookActivityStatus } from "../../../types";
import SocialShare from "./SocialShare";
import Tooltip from "../../HelperComponents/Tooltip/Tooltip";
import Modal from "../../HelperComponents/Modal/Modal";
import i18n from "../../../i18n";
import "./ActionsContainer.css";

import {
  getUserBookStatus,
  updateUserBookStatus,
  deleteUserBookStatus,
  downloadBook,
} from "../../../services/book.service";
import { getUserGoals } from "../../../services/user.service";
import { getAuthFromLS } from "../../../services/auth.service";
import { StateContext } from "../../../Context";
import {
  userBookActivityStatusKey,
  fetchUserGoalsKey,
} from "../../../utils/queryKeys";

export default function ActionsContainer(props: any) {
  const { state } = React.useContext(StateContext);
  const user = state.auth.user;

  const [userBookStatus, setUserBookStatus] = React.useState<
    TUserBookActivityStatus | ""
  >("");
  const [userBookStatusModalOpen, setUserBookStatusModalOpen] =
    React.useState<boolean>(false);
  const [loginRequiredModalOpen, setLoginRequiredModalOpen] =
    React.useState<boolean>(false);
  const [subscriptionRequiredModalOpen, setSubscriptionRequiredModalOpen] =
    React.useState<boolean>(false);
  const [shareBookModalOpen, setShareBookModalOpen] =
    React.useState<boolean>(false);
  const [noDownloadsLeftModalOpen, setNoDownloadsLeftModalOpen] =
    React.useState<boolean>(false);
  const [addToGoaltModalOpen, setAddToGoaltModalOpen] =
    React.useState<boolean>(false);
  const [readBookNoticeModalOpen, setReadBookNoticeModalOpen] =
    React.useState<boolean>(false);
  const [downloadModalOpen, setDownloadModalOpen] =
    React.useState<boolean>(false);
  const isLoggedIn = getAuthFromLS() !== null ? true : false;

  useQuery(
    [userBookActivityStatusKey, props.book.uuid],
    () => getUserBookStatus(props.book.uuid),
    {
      onSuccess: (data) => {
        setUserBookStatus(data.status || "");
      },
      enabled: isLoggedIn,
    }
  );

  const { data: goals } = useQuery(
    fetchUserGoalsKey,
    () => getUserGoals(true),
    {
      // staleTime: 1000 * 60 * 60 * 3,
      onSuccess: (data) => {
        return data?.sort((a: any, b: any) =>
          a.created_at < b.created_at ? 1 : -1
        );
      },
      enabled: isLoggedIn,
      refetchOnWindowFocus: true,
    }
  );

  const downloadClicked = async () => {
    if (isLoggedIn) {
      return setDownloadModalOpen(true);
    }

    return setLoginRequiredModalOpen(true);
  };

  const openViewerMode = async () => {
    if (isLoggedIn) {
      if (!user?.is_subscribed) {
        return setReadBookNoticeModalOpen(true);
      } else {
        return props.openViewerMode();
      }
    }

    return setLoginRequiredModalOpen(true);
  };

  const openActivityStatusModal = () => {
    if (isLoggedIn) {
      return user?.is_subscribed
        ? setUserBookStatusModalOpen(true)
        : setSubscriptionRequiredModalOpen(true);
    }

    return setLoginRequiredModalOpen(true);
  };

  const changeUserBookStatus = async (status: TUserBookActivityStatus) => {
    if (isLoggedIn) {
      if (user?.is_subscribed) {
        setUserBookStatus(status);
        if (
          status === "completed" &&
          goals.filter((elem: any) => elem.status === "inprogress").length !== 0
        ) {
          return setAddToGoaltModalOpen(true);
        } else {
          await updateUserBookStatus(props.book.uuid, status);
        }
        return setUserBookStatusModalOpen(false);
      } else {
        return setSubscriptionRequiredModalOpen(true);
      }
    }

    setLoginRequiredModalOpen(true);
  };

  const removeUserBookStatus = async (event: any) => {
    event.stopPropagation();
    if (isLoggedIn) {
      setUserBookStatus("");
      await deleteUserBookStatus(props.book.uuid);
      return setUserBookStatusModalOpen(false);
    }

    setLoginRequiredModalOpen(true);
  };

  return (
    <>
      <div className="eb-single-book-actions_container">
        <div className="df df-center df-ac" onClick={() => downloadClicked()}>
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
          <p
            style={{
              color: "white",
            }}
          >
            Ներբեռնել
          </p>
        </div>
        <div className="df df-fs df-ac" onClick={() => openViewerMode()}>
          <FontAwesomeIcon icon={faBook} />
          <p className="pale">Կարդալ կայքում</p>
        </div>
        <div
          className="df df-ac"
          onClick={() => {
            if (userBookStatus === "") {
              changeUserBookStatus("bookmarked");
            } else {
              openActivityStatusModal();
            }
          }}
        >
          <div className="df">
            {(() => {
              switch (userBookStatus) {
                case "":
                  return (
                    <>
                      <FontAwesomeIcon icon={faBookmark} />
                      <p className="pale">Պահպանել</p>
                    </>
                  );
                case "bookmarked":
                  return (
                    <>
                      <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ color: "var(--main-eb-color)" }}
                      />
                      <p className="pale">Պահպանված է</p>
                    </>
                  );
                case "inprogress":
                  return (
                    <>
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ color: "var(--main-eb-color)" }}
                      />
                      <p className="pale">Կարդում եմ</p>
                    </>
                  );
                case "completed":
                  return (
                    <>
                      <FontAwesomeIcon
                        icon={faCheckSquare}
                        style={{ color: "var(--main-eb-color)" }}
                      />
                      <p className="pale">Կարդացել եմ</p>
                    </>
                  );
              }
            })()}
          </div>
          <div
            className="eb-single-book-further-actions"
            onClick={(e) => {
              e.stopPropagation();
              openActivityStatusModal();
            }}
          >
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              style={{ margin: "0 20px", transform: "translateY(20px)" }}
            />
          </div>
        </div>
        <div
          className="df df-fs df-ac"
          style={{ borderBottom: "0" }}
          onClick={() => setShareBookModalOpen(true)}
        >
          <FontAwesomeIcon icon={faShareSquare} />
          <p className="pale">Կիսվել</p>
        </div>
      </div>

      <Modal
        onclose={() => setUserBookStatusModalOpen(false)}
        isOpen={userBookStatusModalOpen}
        size="md"
      >
        <div className="user-book-status_container">
          <div
            className="df df-fs df-ac"
            onClick={() => changeUserBookStatus("bookmarked")}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              style={{
                color:
                  userBookStatus === "bookmarked" ? "var(--main-eb-color)" : "",
              }}
            />
            <p>
              {userBookStatus === "bookmarked" ? "Պահպանված է" : "Պահպանել"}
            </p>
            {userBookStatus === "bookmarked" && (
              <FontAwesomeIcon
                icon={faXmark}
                className="remove-activity-status-btn"
                onClick={(e) => removeUserBookStatus(e)}
              />
            )}
          </div>
          <div
            className="df df-fs df-ac"
            onClick={() => changeUserBookStatus("inprogress")}
          >
            <FontAwesomeIcon
              icon={faEye}
              style={{
                transform: "translateX(-4px)",
                marginRight: "5px",
                color:
                  userBookStatus === "inprogress" ? "var(--main-eb-color)" : "",
              }}
            />
            <p>Կարդում եմ</p>
            {userBookStatus === "inprogress" && (
              <FontAwesomeIcon
                icon={faXmark}
                className="remove-activity-status-btn"
                onClick={(e) => removeUserBookStatus(e)}
              />
            )}
          </div>
          <div
            className="df df-fs df-ac"
            onClick={() => changeUserBookStatus("completed")}
          >
            <FontAwesomeIcon
              icon={faCheckSquare}
              style={{
                color:
                  userBookStatus === "completed" ? "var(--main-eb-color)" : "",
              }}
            />
            <p>Կարդացել եմ</p>
            {userBookStatus === "completed" && (
              <FontAwesomeIcon
                icon={faXmark}
                className="remove-activity-status-btn"
                onClick={(e) => removeUserBookStatus(e)}
              />
            )}
          </div>
        </div>
      </Modal>

      <Modal
        onclose={() => setLoginRequiredModalOpen(false)}
        isOpen={loginRequiredModalOpen}
        size="sm"
      >
        <p>{i18n.am.SINGLE_BOOK_PAGE.MODAL_LOGIN_REQUIRED_TEXT}</p>
        <div className="eb-modal-link_container">
          <Link to="/join">
            {i18n.am.SINGLE_BOOK_PAGE.MODAL_LOGIN_REQUIRED_TEXT_BTN}
          </Link>
        </div>
      </Modal>

      <Modal
        onclose={() => setSubscriptionRequiredModalOpen(false)}
        isOpen={subscriptionRequiredModalOpen}
      >
        <p>{i18n.am.SINGLE_BOOK_PAGE.MODAL_SUBSCRIPTION_REQUIRED_TEXT}</p>
        <div className="eb-modal-link_container">
          <Link to="/subscription">
            {i18n.am.SINGLE_BOOK_PAGE.MODAL_SUBSCRIPTION_REQUIRED_TEXT_BTN}
          </Link>
        </div>
      </Modal>

      <Modal
        onclose={() => setDownloadModalOpen(false)}
        isOpen={downloadModalOpen}
        classnames="download-options-modal"
        size={300}
      >
        <img
          src="/images/pdf.png"
          alt="PDF icon"
          onClick={async () => {
            await downloadBook(props.book.uuid).catch((err) =>
              setNoDownloadsLeftModalOpen(true)
            );
            setDownloadModalOpen(false);
          }}
        />
        <Tooltip text="EPUB ձևաչափով ներբեռնումները ընթացքի մեջ են">
          <img src="/images/epub.png" alt="Epub icon" />
        </Tooltip>
      </Modal>

      <Modal
        onclose={() => setReadBookNoticeModalOpen(false)}
        isOpen={readBookNoticeModalOpen}
        size="lg"
      >
        <p style={{ marginBottom: "20px" }}>
          Դուք կարող եք տեսնել գրքի միայն առաջին և երկրորդ էջերը։ Ամբողջական
          գիրքը առցանց կարդալու համար անհրաժեշտ է ունենալ բաժանորդագրություն:
        </p>
        <button onClick={() => props.openViewerMode()}>Բացել գիրքը</button>
      </Modal>

      <Modal
        onclose={() => setShareBookModalOpen(false)}
        isOpen={shareBookModalOpen}
        classnames="social-share-modal"
        size="md"
      >
        <h3>{i18n.am.SINGLE_BOOK_PAGE.MODAL_SHARE_BOOK_HEADING}</h3>
        <SocialShare book={props.book} />
      </Modal>

      <Modal
        onclose={() => setNoDownloadsLeftModalOpen(false)}
        isOpen={noDownloadsLeftModalOpen}
        size="lg"
      >
        {!user?.is_subscribed && (
          <h3>Դուք չունեք ներբեռնման հնարավորություն</h3>
        )}
        <p>
          {user?.is_subscribed
            ? "Դուք օգտագործել եք Ձեր բոլոր ներբեռնման հնարավորությունները, բայց կարող եք գիրքը կարդալ օնլայն տարբերակով"
            : "Բաժանորդագրվելու դեպքում Դուք կարող եք ստանալ նոր ներբեռնման հնարավորություններ, օնլայն կարդալու հնարավորություն և այլ առավելություններ"}
        </p>
        {!user?.is_subscribed && (
          <div className="eb-modal-link_container">
            <Link to="/subscription">Բաժանորդագրություն</Link>
          </div>
        )}
      </Modal>

      <Modal
        onclose={async () => {
          await updateUserBookStatus(props.book.uuid, "completed");
          setAddToGoaltModalOpen(false);
          return setUserBookStatusModalOpen(false);
        }}
        isOpen={addToGoaltModalOpen}
        size="md"
      >
        <p className="bold">
          Եթե կարդացված գիրքը հանդիսանում է որևէ նպատակի մաս, ապա ընտրեք այդ
          նպատակը
        </p>
        <div className="eb-modal-goals_container">
          {goals
            ?.filter((element: any) => element.status === "inprogress")
            .map((goal: any, index: any) => (
              <p
                key={index}
                onClick={async () => {
                  await updateUserBookStatus(
                    props.book.uuid,
                    "completed",
                    goal.id
                  );
                  setAddToGoaltModalOpen(false);
                  return setUserBookStatusModalOpen(false);
                }}
              >
                {index + 1}. {goal.title}
              </p>
            ))}
        </div>
      </Modal>
    </>
  );
}
