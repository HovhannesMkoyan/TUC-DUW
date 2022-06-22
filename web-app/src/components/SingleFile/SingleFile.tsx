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
import { fetchFileKey } from "../../utils/queryKeys";
import formatDate from "../../helpers/format-date";
import FileIcon from "../Helpers/FileIcon/FileIcon";
import InPageLoader from "../Helpers/in-page-loader/InPageLoader";
import Modal from "../Helpers/Modal/Modal";
import DotsLoader from "../Helpers/DotsLoader/DotsLoader";
import Tooltip from "../Helpers/Tooltip/Tooltip";
import "./SingleFile.css";

export default function SingleFile(props: any) {
  const { uuid } = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    data: file,
  } = useQuery([fetchFileKey, uuid], () => get(uuid!));

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
              <Menu.Item icon={<FontAwesomeIcon icon={faLock} />}>
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
      )}
    </section>
  );
}
