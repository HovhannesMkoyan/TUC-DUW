import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { Highlight } from "@mantine/core";
import { useDetectClickOutside } from "react-detect-click-outside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { fetchAllBooksKey } from "../../utils/queryKeys";
import { fetchAllBooks } from "../../services/book.service";
import { StateContext } from "../../Context";
import i18n from "../../i18n";

export default function Search() {
  const history = useHistory();

  const { state } = useContext(StateContext);
  const langObj: "am" | "en" = state.ui.lang || "am";

  const [keyword, setKeyword] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [showInputCleanIcon, setShowInputCleanIcon] = useState<boolean>(false);

  const { data: books } = useQuery(
    fetchAllBooksKey,
    () => fetchAllBooks(true),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const closeDropdown = () => {
    setShowSearchResult(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const filterBooks = (keyword: string) => {
    let adjustedKeyword = keyword.toLowerCase();
    setKeyword(adjustedKeyword);

    if (adjustedKeyword.length > 2) {
      setShowInputCleanIcon(true);
      setShowSearchResult(true);
      setFilteredBooks(
        books
          .slice(0)
          .reverse()
          .filter((book: any) =>
            book.title.toLowerCase().includes(adjustedKeyword.trim())
          )
      );
    } else {
      setShowInputCleanIcon(false);
      setShowSearchResult(false);
      setFilteredBooks([]);
    }
  };

  return (
    <div className="header-search_container">
      {books && (
        <>
          <input
            type="text"
            placeholder={i18n[langObj].HEADER.SEARCH}
            value={keyword}
            onChange={(e) => filterBooks(e.target.value)}
            onKeyDown={(e) => {
              if (keyword.length > 2 && e.key === "Enter") {
                history.push(`/search?query=${keyword}`);
              }
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`header-search-clean-btn ${
              !showInputCleanIcon ? "hide" : ""
            }`}
            onClick={() => history.push(`/search?query=${keyword}`)}
          />
        </>
      )}

      {showSearchResult && (
        <div ref={ref} className="header-search-results_container">
          {filteredBooks?.slice(0, 5).map((book: any, index: any) => (
            <Link
              to={`/book/${book.uuid}`}
              key={index}
              className="header-search-single-result"
            >
              <Highlight highlight={keyword} className="bold">
                {book.title}
              </Highlight>
              <span>{book.author}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
