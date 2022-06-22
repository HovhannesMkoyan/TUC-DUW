import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faImage,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileExcel,
  faFileAudio,
  faFileVideo,
  faFileZipper,
} from "@fortawesome/free-solid-svg-icons";
import "./FileIcon.css";

export default function FileIcon(props: any): JSX.Element {
  const fileExtension = props.filename
    .slice(props.filename.lastIndexOf(".") + 1)
    .toLowerCase();

  if (
    fileExtension === "png" ||
    fileExtension === "jpeg" ||
    fileExtension === "jpg" ||
    fileExtension === "gif" ||
    fileExtension === "tiff" ||
    fileExtension === "svg"
  ) {
    return (
      <FontAwesomeIcon icon={faImage} className="file-icon file-image-icon" />
    );
  }

  if (fileExtension === "pdf") {
    return (
      <FontAwesomeIcon icon={faFilePdf} className="file-icon file-pdf-icon" />
    );
  }

  if (
    fileExtension === "doc" ||
    fileExtension === "dot" ||
    fileExtension === "wbk" ||
    fileExtension === "docx" ||
    fileExtension === "docm" ||
    fileExtension === "dotx" ||
    fileExtension === "dotm" ||
    fileExtension === "docb"
  ) {
    return (
      <FontAwesomeIcon icon={faFileWord} className="file-icon file-doc-icon" />
    );
  }

  if (
    fileExtension === "xls" ||
    fileExtension === "xlt" ||
    fileExtension === "xlm" ||
    fileExtension === "xlsx" ||
    fileExtension === "xlsm" ||
    fileExtension === "xltx" ||
    fileExtension === "xltm"
  ) {
    return (
      <FontAwesomeIcon
        icon={faFileExcel}
        className="file-icon file-excel-icon"
      />
    );
  }

  if (
    fileExtension === "ppt" ||
    fileExtension === "pot" ||
    fileExtension === "pps" ||
    fileExtension === "ppa" ||
    fileExtension === "pptx" ||
    fileExtension === "pptm" ||
    fileExtension === "potx" ||
    fileExtension === "potm" ||
    fileExtension === "ppam" ||
    fileExtension === "ppsx" ||
    fileExtension === "xltm"
  ) {
    return (
      <FontAwesomeIcon
        icon={faFilePowerpoint}
        className="file-icon file-ppt-icon"
      />
    );
  }

  if (fileExtension === "mp3") {
    return (
      <FontAwesomeIcon icon={faFileAudio} className="file-icon file-mp3-icon" />
    );
  }

  if (fileExtension === "mp4") {
    return (
      <FontAwesomeIcon icon={faFileVideo} className="file-icon file-mp4-icon" />
    );
  }

  if (fileExtension === "zip") {
    return (
      <FontAwesomeIcon
        icon={faFileZipper}
        className="file-icon file-archive-icon"
      />
    );
  }

  return <FontAwesomeIcon icon={faFile} className="file-icon" />;
}
