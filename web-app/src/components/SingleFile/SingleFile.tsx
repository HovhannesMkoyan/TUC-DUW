import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faCalendarDays,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "@mantine/core";

import { get, downloadFile } from "../../services/file.service";
import { add } from "../../services/request.service";
import { fetchFileKey } from "../../utils/queryKeys";
import formatDate from "../../helpers/format-date";
import FileIcon from "../Helpers/FileIcon/FileIcon";
import InPageLoader from "../Helpers/in-page-loader/InPageLoader";
import Modal from "../Helpers/Modal/Modal";
import Tooltip from "../Helpers/Tooltip/Tooltip";
import "./SingleFile.css";

export default function SingleFile(): JSX.Element {
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const [requestReason, setRequestReason] = useState<string>("");
  const [fileStatus, setFileStatus] = useState<"blocked" | "open">("open");
  const { uuid } = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    data: file,
  } = useQuery([fetchFileKey, uuid], () => get(uuid!));

  const sendRequest = async () => {
    const action = fileStatus === "blocked" ? "unblock" : "block"
    return add(file.uuid, requestReason, action);
  }

  return (
    <section className="main-container">
      {isLoading && <InPageLoader />}
      {isError && (
        <Modal isOpen={true} showClosetBtn={false} size="md">
          <p>There is no such file</p>
          <div className="modal-link_container">
            <button onClick={() => (document.location.href = "/")}>
              Home page
            </button>
          </div>
        </Modal>
      )}
      {isSuccess && (
        <>
          <div className="file-container">
            <div className="file-menu">
              <Menu
                trigger="click"
                delay={500}
                size={250}
                placement="center"
                gutter={-5}
                withArrow
              >
                <Tooltip text="Upload date & time">
                  <Menu.Item
                    disabled
                    icon={<FontAwesomeIcon icon={faCalendarDays} />}
                  >
                    {formatDate(new Date(file.createdAt))}
                  </Menu.Item>
                </Tooltip>
                <Menu.Item
                  icon={<FontAwesomeIcon icon={faLock} />}
                  onClick={() => setRequestModalOpen(true)}
                >
                  Request for Blocking
                </Menu.Item>
              </Menu>
            </div>

            <FileIcon filename={file.name} />
            <p className="file-title">{file.name}</p>
            {file.description && <p>{file.description}</p>}
            <div className="df df-ac filesize-download-container">
              <div className="filesize">
                <p>Filesize: {Math.round(file.size / 1000)} KB</p>
              </div>
              <Tooltip text="Download file">
                <FontAwesomeIcon
                  icon={faCloudArrowDown}
                  className="download-file-btn"
                  onClick={() => downloadFile(file.uuid)}
                />
              </Tooltip>
            </div>
          </div>

          <Modal
            onclose={() => setRequestModalOpen(false)}
            isOpen={requestModalOpen}
            size="lg"
            classnames="file-description-modal"
          >
            <h2>Why you request to block this file?</h2>
            <textarea
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              name="request-reason"
              placeholder="Type the reason here..."
              autoFocus
            ></textarea>
            <div className="modal-link_container">
              <button onClick={() => sendRequest()}>
                Send request
              </button>
            </div>
          </Modal>
        </>
      )}
    </section>
  );
}
