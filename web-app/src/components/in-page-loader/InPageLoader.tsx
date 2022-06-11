import DotsLoader from "../HelperComponents/DotsLoader/DotsLoader";
import "./InPageLoader.css";

export default function InPageLoader(props: any) {
  return (
    <>
      <div
        className={`inpage-loader ${props.classnames ? props.classnames : ""}`}
      >
        <DotsLoader size={props.size || 80} />
      </div>
    </>
  );
}
