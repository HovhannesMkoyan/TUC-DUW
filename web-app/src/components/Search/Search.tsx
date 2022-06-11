import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../HelperComponents/Tooltip/Tooltip";
import { fetchBooksBySearch } from "../../services/book.service";
import { fetchBooksBySearchKey } from "../../utils/queryKeys";
import Skeleton from "../HelperComponents/Skeleton/Skeleton";
import Image from "../HelperComponents/Image/Image";
import "./Search.css";

function Search(props: any) {
  const [lastShowingBookIndex, setLastShowingBookIndex] =
    React.useState<number>(6);

  const { isLoading, data: books } = useQuery(
    [
      fetchBooksBySearchKey,
      new URLSearchParams(props.location.search).get("query"),
    ],
    () =>
      fetchBooksBySearch(
        new URLSearchParams(props.location.search).get("query")!
      ),
    {
      staleTime: 1000 * 60 * 30,
    }
  );

  return (
    <section className="eb-main_container">
      <p className="eb-search-page-heading">
        Արդյունքներն ըստ{" "}
        <span className="bold">
          {new URLSearchParams(props.location.search).get("query")}
        </span>
        -ի
      </p>
      {isLoading ? (
        <Skeleton type="single-book" />
      ) : (
        <>
          {books.length === 0 ? (
            <p>Այս հարցումով արդյունքներ չկան</p>
          ) : (
            <div className="eb-grid_container">
              {books
                .slice(0, lastShowingBookIndex)
                .map((book: any, index: any) => (
                  <Link
                    to={`/book/${book.uuid}`}
                    key={index}
                    className="eb-searchPage-single-book_container"
                  >
                    <Image
                      src={
                        book.cover?.substring(0, book.cover.length - 3) + "webp"
                      }
                    />
                    <p className="book-author">{book.author}</p>
                    <p className="book-title bold">
                      {book.title.length > 33
                        ? book.title.substr(0, 33) + "..."
                        : book.title}
                    </p>
                  </Link>
                ))}
            </div>
          )}
          {books.length > 6 && (
            <div className="eb-user-books-see-more-icon_container">
              <Tooltip text="Տեսնել ավելին">
                <FontAwesomeIcon
                  icon={faCircleChevronDown}
                  onClick={() =>
                    setLastShowingBookIndex(lastShowingBookIndex + 6)
                  }
                />
              </Tooltip>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default trackWindowScroll(Search);
