import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import copy from "copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../../HelperComponents/Tooltip/Tooltip";

export default function SocialShare(props: any) {
  const bookId = props.book.uuid;
  const bookTitle = props.book.title;
  const bookAuthor = props.book.author;
  const bookUrl = `${process.env.REACT_APP_API_ENDPOINT}/book/${bookId}`;

  return (
    <div className="eb-social-sharing-modal">
      <div className="eb-social-link-copying">
        <div className="link_container">{bookUrl}</div>
        <Tooltip text="Պատճենել">
          <FontAwesomeIcon
            icon={faCopy}
            style={{ color: "var(--main-grey-color)" }}
            onClick={() => copy(bookUrl)}
          />
        </Tooltip>
      </div>
      <div className="eb-socials_container">
        <FacebookShareButton
          url={bookUrl}
          quote={`${bookTitle} - ${bookAuthor}`}
          hashtag={"#ebooksam"}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <LinkedinShareButton
          url={bookUrl}
          title={`${bookTitle} - ${bookAuthor}`}
        >
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>

        <TwitterShareButton
          title={`${bookTitle} - ${bookAuthor}`}
          url={bookUrl}
          hashtags={["ebooksam"]}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <TelegramShareButton
          title={`${bookTitle} - ${bookAuthor}`}
          url={bookUrl}
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>

        <WhatsappShareButton
          title={`${bookTitle} - ${bookAuthor}`}
          url={bookUrl}
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
