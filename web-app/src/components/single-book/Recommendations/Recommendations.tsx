import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchBookSuggestions } from "../../../services/book.service";
import { fetchSuggestionsKey } from "../../../utils/queryKeys";
import Image from "../../HelperComponents/Image/Image";
import Skeleton from "../../HelperComponents/Skeleton/Skeleton";
import "./Recommendations.css";

export default function Recommendations(props: any) {
  const { isLoading, data: suggestedBooks } = useQuery(
    [fetchSuggestionsKey, props.bookId],
    () => fetchBookSuggestions(props.bookId),
    {
      staleTime: 1000 * 60 * 30,
    }
  );

  return (
    <div className="recommendations_container">
      <h2>Նմանատիպ գիրքեր</h2>
      {isLoading ? (
        <Skeleton type="single-book" />
      ) : (
        <>
          {suggestedBooks.length === 0 ? (
            <p>Այս հարցումով արդյունքներ չկան</p>
          ) : (
            <div className="df">
              {suggestedBooks.map((book: any, index: any) => (
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
        </>
      )}
    </div>
  );
}
