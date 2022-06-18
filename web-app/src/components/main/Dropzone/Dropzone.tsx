import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import Modal from "../../Helpers/Modal/Modal";
import getAdjustedFilename from "../../../helpers/get-adjusted-filename";
import getFileExtensionIcon from "../../../helpers/get-file-extension-icon";
import "./Dropzone.css";

export default function Dropzone(): JSX.Element {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [description, setDescription] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [descripitonModal, setDescripitonModal] = useState<boolean>(false);

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

  const upload = () => {
    const data = new FormData();
    data.append("file", selectedFiles[0]);
    data.append("description", description);

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/files`, data, {})
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
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
    </>
  );
}
