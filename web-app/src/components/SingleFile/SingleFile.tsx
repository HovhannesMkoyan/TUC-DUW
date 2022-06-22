import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faCloudArrowDown
} from "@fortawesome/free-solid-svg-icons";

import { get, downloadFile } from "../../services/file.service";
import { fetchFileKey, downloadFileKey } from "../../utils/queryKeys";
import formatDate from "../../helpers/format-date";
import FileIcon from "../Helpers/FileIcon/FileIcon";
import InPageLoader from "../Helpers/in-page-loader/InPageLoader";
import Modal from "../Helpers/Modal/Modal";
import "./SingleFile.css";

export default function SingleFile(props: any) {
  const { uuid } = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    data: file,
  } = useQuery([fetchFileKey, uuid], () => get(uuid!), {
    staleTime: 1000 * 60 * 30,
  });
  // formatDate(new Date(file.createdAt))

  return (
    <section className="main-container">
      {isLoading && <InPageLoader />}
      {isError && (
        <Modal isOpen={true} showClosetBtn={false}>
          <p>pipec</p>
          <div className="eb-modal-link_container">
            <button onClick={() => window.location.reload()}>reload</button>
          </div>
        </Modal>
      )}
      {isSuccess && (
        <div className="file-container">
          <FileIcon filename={file.name} />
          <p className="file-title">{file.name}</p>
          {file.description && <p>{file.description}</p>}
          <div className="df df-ac" style={{ marginTop: "50px" }}>
            <div className="df df-column filesize">
              <span className="bold">Filesize:</span>
              <span>{Math.round(file.size / 1000)} KB</span>
            </div>
            <div className="df df-column upload-date">
              <span className="bold">Upload date:</span>
              <span>{formatDate(new Date(file.createdAt))}</span>
            </div>
            {/* <button className="download-file-btn">Download</button> */}
            <FontAwesomeIcon icon={faCloudArrowDown} className="download-file-btn" />
          </div>
          <p className="request-msg"></p>
        </div>
      )}
    </section>
  );
}
