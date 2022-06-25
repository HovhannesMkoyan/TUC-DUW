import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faCalendarDays,
  faLock,
  faLockOpen,
  faBan,
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
import { IFile, IRequest } from "../../types";
import "./SingleFile.css";
import OvalLoader from "../Helpers/OvalLoader/OvalLoader";

export default function SingleFile(): JSX.Element {
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const [requestReason, setRequestReason] = useState<string>("");
  const [requestReasonError, setRequestReasonError] = useState<string>("");
  const [fileStatus, setFileStatus] = useState<"blocked" | "open">("open");
  const { uuid } = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    isSuccess,
    data: file,
  } = useQuery<IFile>([fetchFileKey, uuid], () => get(uuid!), {
    onSuccess: (data: IFile) => {
      if (data.reported || data.blocked) {
        setFileStatus("blocked");
      }
    },
  });

  const mutation = useMutation(
    (newRequest: Partial<IRequest>) => add(newRequest),
    {
      onError: (error, variables, context) => {
        // An error happened!
        console.log(`rolling back optimistic update with id`);
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([fetchFileKey, uuid]);
        setRequestModalOpen(false);
        setRequestReason("");
        setRequestReasonError("");
      },
    }
  );

  const sendRequest = async () => {
    if (requestReason.length < 7) {
      return setRequestReasonError(
        "Reason should be minimum 7 characters long"
      );
    } else {
      setRequestReasonError("");
      const requestObj: Partial<IRequest> = {
        uuid: file!.uuid,
        reason: requestReason,
        action: file?.blocked || file?.reported ? "UNBLOCK" : "BLOCK",
      };

      return mutation.mutate(requestObj);
    }
  };

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
                  icon={
                    file?.blocked || file?.reported ? (
                      <FontAwesomeIcon icon={faLockOpen} />
                    ) : (
                      <FontAwesomeIcon icon={faLock} />
                    )
                  }
                  onClick={() => setRequestModalOpen(true)}
                >
                  {file?.blocked || file?.reported
                    ? "Request for Unblocking"
                    : "Request for Blocking"}
                </Menu.Item>
              </Menu>
            </div>

            <FileIcon filename={file.name} />
            <p className="file-title">{file.name}</p>
            {file.description && <p>{file.description}</p>}
            <div className="df df-ac filesize-download-container">
              <div className="filesize">
                <p>Filesize: {Math.round(+file.size / 1000)} KB</p>
              </div>
              {file.reported || file.blocked ? (
                <Tooltip text="Request for Blocking in process">
                  {/* <FontAwesomeIcon
                    icon={faBan}
                    className="not-allowed-file-btn"
                  /> */}
                  <OvalLoader size="sm" />
                </Tooltip>
              ) : (
                <Tooltip text="Download file">
                  <FontAwesomeIcon
                    icon={faCloudArrowDown}
                    className="download-file-btn"
                    onClick={() => downloadFile(file.uuid)}
                  />
                </Tooltip>
              )}
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
              <button onClick={() => sendRequest()}>Send request</button>
            </div>
            <span className="notice">{requestReasonError}</span>
          </Modal>
        </>
      )}
    </section>
  );
}
