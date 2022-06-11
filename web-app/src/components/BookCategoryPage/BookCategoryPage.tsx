import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faClock,
  faGlobeAmericas,
  faArrowAltCircleDown,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import Image from "../HelperComponents/Image/Image";
import { fetchBooksWithTag } from "../../services/book.service";
import Tooltip from "../HelperComponents/Tooltip/Tooltip";
import Skeleton from "../HelperComponents/Skeleton/Skeleton";
import { fetchCategoryPageBooksKey } from "../../utils/queryKeys";
import formatReadingTime from "../../helpers/format-reading-time";
import { StateContext } from "../../Context";
import i18n from "../../i18n";
import { Mixpanel } from "../../libs/mixpanel";
import "./BookCategoryPage.css";

function BookCategoryPage({
  match,
  scrollPosition,
}: {
  match: any;
  scrollPosition: any;
}) {
  const { state, setState } = useContext(StateContext);
  const langObj: "am" | "en" = state.ui.lang || "am";

  const [lastShowingBookIndex, setLastShowingBookIndex] = useState<number>(7);

  const category = match.params.category;
  const categoryTitle = getCategoryTitle(category);

  // Fetch category books
  const { isLoading: booksLoading, data: books } = useQuery(
    [fetchCategoryPageBooksKey, category],
    () => fetchBooksWithTag(category),
    {
      staleTime: 1000 * 60 * 30,
    }
  );

  function getCategoryTitle(category: string): string {
    let title: string = "";

    switch (category) {
      case "literature":
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_LITERATURE;
        break;
      case "history":
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_HISTORY;
        break;
      case "nzhdeh":
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_NZDEHIDOLOGY;
        break;
      case "textbooks":
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_TEXTBOOK;
        break;
      case "programming":
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_PROGRAMMING;
        break;
      case "personal-development":
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_SELF_DEV;
        break;
      case "most-downloaded":
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_MOST_DOWNLOADED;
        break;
      default:
        title = i18n[langObj].MAIN_PAGE.BOOK_CATEGORY_LATEST;
        break;
    }

    return title;
  }

  Mixpanel.track(`Category page - ${categoryTitle}`);
  return (
    <section className="eb-main_container">
      <div className="eb-categoryPage-title">
        <h1>{categoryTitle}</h1>
      </div>
      {booksLoading || books.length === 0 ? (
        <Skeleton type="category-page-single-book-wrapper" />
      ) : (
        <div className="eb-categoryPage-books_container">
          {books.slice(0, lastShowingBookIndex).map((book: any, index: any) => (
            <Link
              to={`/book/${book.uuid}`}
              key={index}
              className="eb-categoryPage-single-book_container"
            >
              <Image
                src={book.cover.substring(0, book.cover.length - 3) + "webp"}
                scrollPosition={scrollPosition}
              />
              <div>
                <h3 style={{ margin: "0" }}>{book.title}</h3>
                <h4 className="pale">{book.author}</h4>
                <div className="eb-single-book-stats_container">
                  <div>
                    <FontAwesomeIcon
                      icon={faArrowAltCircleDown}
                      style={{ marginRight: "3px" }}
                    />
                    <span>{book.dn}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faFileAlt} /> {book.pn} էջ
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faClock}
                      data-tip="Գիրքը կարդալու մոտավոր ժամանակը"
                    />{" "}
                    {formatReadingTime(book.rt)}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faGlobeAmericas} /> {book.language}
                  </div>
                </div>

                <div className="separator"></div>
                <div>
                  <p>
                    {book.description.length > 150
                      ? book.description.slice(0, 150) + "..."
                      : book.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {lastShowingBookIndex <= books.length && (
            <div className="eb-books-see-more-icon_container">
              <Tooltip text="Տեսնել ավելին">
                <FontAwesomeIcon
                  icon={faCircleChevronDown}
                  onClick={() =>
                    setLastShowingBookIndex(lastShowingBookIndex + 5)
                  }
                />
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default trackWindowScroll(BookCategoryPage);
