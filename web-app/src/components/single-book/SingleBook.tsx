import React from "react";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faClock,
  faGlobeAmericas,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import Image from "../HelperComponents/Image/Image";
import PdfViewer from "../PdfViewer/PdfViewer";
import InPageLoader from "../in-page-loader/InPageLoader";
import { fetchBook } from "../../services/book.service";
import { fetchBookKey } from "../../utils/queryKeys";
import Modal from "../HelperComponents/Modal/Modal";
import Tooltip from "../HelperComponents/Tooltip/Tooltip";
import i18n from "../../i18n";
import formatReadingTime from "../../helpers/format-reading-time";
import Recommendations from "./Recommendations/Recommendations";
import ActionsContainer from "./ActionsContainer/ActionsContainer";

import "./SingleBook.css";

export default function SingleBook(props: any): JSX.Element {
  const [isViewerMode, setIsViewerMode] = React.useState<boolean>(false);
  const closeViewerMode = () => setIsViewerMode(false);
  const openViewerMode = () => setIsViewerMode(true);

  const bookId = props.match.params.uuid;
  const {
    isLoading,
    isError,
    isSuccess,
    data: book,
  } = useQuery([fetchBookKey, bookId], () => fetchBook(bookId), {
    staleTime: 1000 * 60 * 30,
  });

  return (
    <section
      className="eb-main_container"
      style={{
        position: "relative",
        padding: isViewerMode ? "0" : "",
        marginTop: isViewerMode ? "0" : "",
        minHeight: isViewerMode ? "auto" : "120vh",
      }}
    >
      {isLoading && <InPageLoader />}
      {isError && (
        <Modal isOpen={true} showClosetBtn={false}>
          <p>{i18n.am.SINGLE_BOOK_PAGE.MODAL_CONNECTION_ERROR_TEXT}</p>
          <div className="eb-modal-link_container">
            <button onClick={() => window.location.reload()}>
              {i18n.am.SINGLE_BOOK_PAGE.MODAL_CONNECTION_ERROR_TEXT_BTN}
            </button>
          </div>
        </Modal>
      )}
      {isSuccess && (
        <>
          {!isViewerMode ? (
            <>
              <div className="eb-single-book_container">
                <div className="eb-single-book-rs-top-ss">
                  <h2>{book.title}</h2>
                  <h3 className="pale">{book.author}</h3>
                  <div className="eb-single-book-stats_container">
                    <Tooltip text="Գրքի ներբեռնումների քանակը">
                      <FontAwesomeIcon
                        icon={faArrowAltCircleDown}
                        style={{ marginRight: "3px" }}
                      />
                      <span>{book.dn} </span>
                    </Tooltip>
                    <Tooltip text="Գրքի էջերի քանակը">
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        style={{ marginRight: "4px" }}
                      />
                      {book.pn}
                    </Tooltip>
                    <Tooltip text="Գիրքը կարդալու մոտավոր ժամանակը">
                      <FontAwesomeIcon icon={faClock} />{" "}
                      {formatReadingTime(book.rt)}
                    </Tooltip>
                    <Tooltip text="Գրքի լեզուն">
                      <FontAwesomeIcon
                        icon={faGlobeAmericas}
                        style={{ marginRight: "1px" }}
                      />{" "}
                      {book.language}
                    </Tooltip>
                  </div>
                </div>
                <div className="eb-single-book-ls">
                  <Image src={book.cover} />
                  <ActionsContainer
                    book={book}
                    openViewerMode={openViewerMode}
                  />
                </div>
                <div className="eb-single-book-rs">
                  <div className="eb-single-book-rs-top">
                    <h2>{book.title}</h2>
                    <h3 className="pale">{book.author}</h3>
                    <div className="eb-single-book-stats_container">
                      <Tooltip text="Գրքի ներբեռնումների քանակը">
                        <FontAwesomeIcon
                          icon={faArrowAltCircleDown}
                          style={{ marginRight: "3px" }}
                        />
                        <span>{book.dn} </span>
                      </Tooltip>
                      <Tooltip text="Գրքի էջերի քանակը">
                        <FontAwesomeIcon
                          icon={faFileAlt}
                          style={{ marginRight: "4px" }}
                        />
                        {book.pn}
                      </Tooltip>
                      <Tooltip text="Գիրքը կարդալու մոտավոր ժամանակը">
                        <FontAwesomeIcon icon={faClock} />{" "}
                        {formatReadingTime(book.rt)}
                      </Tooltip>
                      <Tooltip text="Գրքի լեզուն">
                        <FontAwesomeIcon
                          icon={faGlobeAmericas}
                          style={{ marginRight: "1px" }}
                        />{" "}
                        {book.language}
                      </Tooltip>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <div className="eb-single-book-rs-bottom">
                    <p>{book.description}</p>
                  </div>
                </div>{" "}
              </div>
              <Recommendations bookId={bookId} />
            </>
          ) : (
            <PdfViewer uuid={book.uuid} closeViewerMode={closeViewerMode} />
          )}
        </>
      )}
    </section>
  );
}
