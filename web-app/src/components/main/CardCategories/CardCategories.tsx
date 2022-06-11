import { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import Skeleton from "../../HelperComponents/Skeleton/Skeleton";
import { fetchCategoriesInfo } from "../../../services/book.service";
import { fetchCategoriesInfoKey } from "../../../utils/queryKeys";
import { StateContext } from "../../../Context";
import i18n from "../../../i18n";
import "./CardCategories.css";

export default function CardCategories() {
  const { state } = useContext(StateContext);
  const langObj: "am" | "en" = state.ui.lang || "am";

  const { isLoading, data: booksNumber } = useQuery(
    fetchCategoriesInfoKey,
    () => fetchCategoriesInfo(),
    {
      staleTime: 1000 * 60 * 15,
    }
  );

  return (
    <>
      <div className="eb-cards_container">
        <Link to="/category/literature" className="eb-card_container">
          <img src="/images/literature.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_LITERATURE}</h3>
            <span>
              {isLoading ? (
                <Skeleton type="main-page-category-books-number" />
              ) : (
                <>
                  {booksNumber?.literature} {i18n[langObj].MAIN_PAGE.BOOK}
                </>
              )}
            </span>
          </div>
        </Link>

        <Link to="/category/history" className="eb-card_container">
          <img src="/images/history.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_HISTORY}</h3>
            <span>
              {isLoading ? (
                <Skeleton type="main-page-category-books-number" />
              ) : (
                <>
                  {booksNumber?.history} {i18n[langObj].MAIN_PAGE.BOOK}
                </>
              )}
            </span>
          </div>
        </Link>

        <Link to="/category/nzhdeh" className="eb-card_container">
          <img src="/images/nzdeh.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_NZDEHIDOLOGY}</h3>
            <span>
              {isLoading ? (
                <Skeleton type="main-page-category-books-number" />
              ) : (
                <>
                  {booksNumber?.nzhdeh} {i18n[langObj].MAIN_PAGE.BOOK}
                </>
              )}
            </span>
          </div>
        </Link>

        <Link to="/category/textbooks" className="eb-card_container">
          <img src="/images/textbooks.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_TEXTBOOK}</h3>
            <span>
              {isLoading ? (
                <Skeleton type="main-page-category-books-number" />
              ) : (
                <>
                  {booksNumber?.textbooks} {i18n[langObj].MAIN_PAGE.BOOK}
                </>
              )}
            </span>
          </div>
        </Link>

        <Link to="/category/programming" className="eb-card_container">
          <img src="/images/programming.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_PROGRAMMING}</h3>
            <span>
              {isLoading ? (
                <Skeleton type="main-page-category-books-number" />
              ) : (
                <>
                  {booksNumber?.programming} {i18n[langObj].MAIN_PAGE.BOOK}
                </>
              )}
            </span>
          </div>
        </Link>

        <Link to="/category/personal-development" className="eb-card_container">
          <img src="/images/personal-development.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_SELF_DEV}</h3>
            <span>
              {isLoading ? (
                <Skeleton type="main-page-category-books-number" />
              ) : (
                <>
                  {booksNumber?.personal_development}{" "}
                  {i18n[langObj].MAIN_PAGE.BOOK}
                </>
              )}
            </span>
          </div>
        </Link>
      </div>
      <div className="eb-cards-lastRow_container">
        <Link to="/category/most-downloaded" className="eb-card_container">
          <img src="/images/most-downloaded.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_MOST_DOWNLOADED}</h3>
            <span>6 {i18n[langObj].MAIN_PAGE.BOOK}</span>
          </div>
        </Link>

        <Link to="/category/latest" className="eb-card_container">
          <img src="/images/latest.png" alt="" />
          <div className="eb-card-info_container">
            <h3>{i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_LATEST}</h3>
            <span>
              {isLoading ? (
                <Skeleton type="main-page-category-books-number" />
              ) : (
                <>
                  {booksNumber?.latest} {i18n[langObj].MAIN_PAGE.BOOK}
                </>
              )}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
