import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Skeleton from "../Skeleton/Skeleton";

function Image(props: any) {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);

  return (
    <>
      {!imageLoaded && props.page !== "user-books-page" && (
        <Skeleton type="single-book" />
      )}
      <LazyLoadImage
        alt="book cover"
        effect="blur"
        src={`/covers/${props.src}`}
        scrollPosition={props.scrollPosition}
        beforeLoad={() => setImageLoaded(true)}
      />
    </>
  );
}

export default Image;
