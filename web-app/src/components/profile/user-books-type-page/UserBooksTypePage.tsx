import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Badge } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

import { fetchUserBooksByCategory } from "../../../services/user.service";
import { fetchUserBooksByCategoryKey } from "../../../utils/queryKeys";
import { getMonthName } from "../../../helpers/date-manipulations";

import Statistics from "./Statistics/Statistics";
import Image from "../../HelperComponents/Image/Image";
import Tooltip from "../../HelperComponents/Tooltip/Tooltip";
import Skeleton from "../../HelperComponents/Skeleton/Skeleton";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import "./UserBooksTypePage.css";

export default function UserBooksTypePage(props: any): JSX.Element {
  const booksType: "inprogress" | "bookmarks" | "completed" | "downloads" =
    props.match.params.type;
  const [lastShowingBookIndex, setLastShowingBookIndex] = useState<number>(7);

  const { isLoading, data: books } = useQuery(
    [fetchUserBooksByCategoryKey, booksType],
    () => fetchUserBooksByCategory(booksType),
    {
      onSuccess: (data) => {
        return data.sort((a: any, b: any) =>
          a.updated_at < b.updated_at ? 1 : -1
        );
      },
    }
  );

  if (
    booksType !== "inprogress" &&
    booksType !== "bookmarks" &&
    booksType !== "completed" &&
    booksType !== "downloads"
  ) {
    return <NotFoundPage />;
  }

  let title: string = "";
  let emptyBooksString: string = "";
  switch (booksType) {
    case "inprogress":
      title = "Ընթացիկ գրքեր";
      emptyBooksString = "Դուք այս պահին չեք կարդում որևէ գիրք";
      break;

    case "bookmarks":
      title = "Պահպանած գրքեր";
      emptyBooksString = "Դուք չունեք որևէ պահպանած գրքեր";
      break;

    case "completed":
      title = "Կարդացած գրքեր";
      emptyBooksString = "Դուք չունեք կարդացած գիրք";
      break;

    case "downloads":
      title = "Ներբեռնումներ";
      emptyBooksString = "Դուք դեռ չեք ներբեռնել որևէ գիրք";
      break;

    default:
      break;
  }

  return (
    <section className="eb-main_container">
      <main className="eb-profile-main">
        <h1
          style={{
            marginBottom: "50px",
            paddingBottom: "10px",
            borderBottom: "1px solid #d3d3d35c",
          }}
        >
          {title}
          <Badge
            size="xl"
            style={{ marginLeft: "10px", transform: "translateY(-2px)" }}
            color="eb-main-color"
          >
            <span style={{ color: "white" }}>{books?.length}</span>
          </Badge>
        </h1>
        {isLoading ? (
          <Skeleton type="user-books-page-single-book" />
        ) : (
          <>
            {books.length === 0 ? (
              <p>{emptyBooksString}</p>
            ) : (
              <>
                {booksType === "completed" && <Statistics />}
                {books
                  .slice(0, lastShowingBookIndex)
                  .map((book: any, index: any) => (
                    <Link
                      to={`/book/${book.uuid}`}
                      key={index}
                      className="eb-user-book_container df df-ac"
                    >
                      <div className="df df-ac">
                        <Image src={book.cover} page="user-books-page" />
                        <p>
                          {book.title.length > 33
                            ? book.title.substr(0, 33) + "..."
                            : book.title}
                        </p>
                      </div>
                      <p>
                        {`${getMonthName(
                          (
                            new Date(book.updated_at * 1000).getMonth() + 1
                          ).toString()
                        )} ${new Date(
                          book.updated_at * 1000
                        ).getDate()}, ${new Date(
                          book.updated_at * 1000
                        ).getFullYear()} `}
                      </p>
                    </Link>
                  ))}
                {lastShowingBookIndex <= books.length && (
                  <div className="eb-user-books-see-more-icon_container">
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
              </>
            )}
          </>
        )}
      </main>
    </section>
  );
}
