import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "react-query";
import copy from "copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../Helpers/Modal/Modal";
import Tooltip from "../../Helpers/Tooltip/Tooltip";
import getAdjustedFilename from "../../../helpers/get-adjusted-filename";
import getFileExtensionIcon from "../../../helpers/get-file-extension-icon";
import { add } from "../../../services/file.service";
import "./Dropzone.css";

export default function Dropzone(): JSX.Element {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [description, setDescription] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [descripitonModal, setDescripitonModal] = useState<boolean>(false);
  const [successfullyAddedModal, setSuccessfullyAddedModal] =
    useState<boolean>(false);
  const [newFileUrl, setNewFileUrl] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
      setDisabled(true);
    },
    [selectedFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    disabled,
  });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(add, {
    onSuccess: (data) => {
      setSuccessfullyAddedModal(true);
      setDisabled(false);
      setSelectedFiles([]);
      setNewFileUrl(`file/${data.uuid}`);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const upload = async () => {
    const data = new FormData();
    data.append("file", selectedFiles[0]);
    data.append("description", description);

    return mutate(data);
  };

  return (
    <>
      <div className="dropzone-container">
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            pointerEvents: disabled ? "none" : "auto",
            opacity: disabled ? "0.3" : "1",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <input {...getInputProps()} />
          <div>
            <div>
              <img
                src="/images/dropzone-image-shadowed.png"
                alt=""
                className="dropzone-img dropzone-img-effect dropzone-img-effect-left"
              />
              <img
                src="/images/dropzone-image.png"
                alt=""
                className="dropzone-img"
              />
              <img
                src="/images/dropzone-image-shadowed.png"
                alt=""
                className="dropzone-img dropzone-img-effect dropzone-img-effect-right"
              />
            </div>
            <p>Drop your files here, or browse</p>
          </div>
        </div>
        <div className="selected-files-container">
          {selectedFiles.map((file: any, index: number) => (
            <div key={index} className="selected-file df df-ac">
              <div className="df df-ac">
                <img
                  src={`/images/${getFileExtensionIcon(file.path)}`}
                  alt="selected file type icon"
                  style={{ marginRight: "5px" }}
                />
                <p>
                  {getAdjustedFilename(file.path)} /{" "}
                  <span>{Math.round((file.size / 1000) * 2) / 2} KB</span>
                </p>
              </div>
              <img
                src="/images/remove.png"
                alt="remove selected file icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDisabled(false);
                  setSelectedFiles([]);
                }}
              />
            </div>
          ))}
        </div>

        {selectedFiles.length > 0 && (
          <>
            {+(selectedFiles[0].size / 1000000).toPrecision(2) > 10 ? (
              <p className="selected-files-size-exceed">
                File size exceeds 10 MB. Please choose another file.
              </p>
            ) : (
              <>
                <p
                  className="add-description bold"
                  onClick={() => setDescripitonModal(true)}
                >
                  {description.length === 0
                    ? "Would you like to add a description?"
                    : "Description attached"}{" "}
                </p>
                <button className="upload-btn" onClick={upload}>
                  Upload & Get URL
                </button>
              </>
            )}
          </>
        )}
      </div>
      <Modal
        onclose={() => setDescripitonModal(false)}
        isOpen={descripitonModal}
        size="md"
        classnames="file-description-modal"
      >
        <h2>File description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="file-description"
          placeholder="Type here..."
          autoFocus
        ></textarea>
      </Modal>
      <Modal
        onclose={() => setSuccessfullyAddedModal(false)}
        isOpen={successfullyAddedModal}
        size="500px"
        classnames="file-description-modal"
      >
        <h2>File's Ready to be Shared!</h2>
        <div className="link-container">
          <Link
            to={newFileUrl}
            className="file-link"
          >{`${process.env.REACT_APP_WEBAPP_ENDPOINT}/${newFileUrl}`}</Link>
          <Tooltip text="Click to Copy">
            <FontAwesomeIcon
              icon={faClone}
              style={{ color: "var(--main-grey-color)" }}
              onClick={() =>
                copy(`${process.env.REACT_APP_WEBAPP_ENDPOINT}/${newFileUrl}`)
              }
            />
          </Tooltip>
        </div>
      </Modal>
    </>
  );
}
