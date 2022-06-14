import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import getAdjustedFilename from "../../helpers/get-adjusted-filename";
import getFileExtensionIcon from "../../helpers/get-file-extension-icon";

export default function Dropzone() {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  let totalSize = 0;
  for (let index = 0; index < selectedFiles.length; index++) {
    totalSize += selectedFiles[index].size;
  }

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
    [selectedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const removeFile = (file: any) => () => {
    const newFiles = [...selectedFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setSelectedFiles(newFiles);
  };

  const removeAll = () => setSelectedFiles([]);

  return (
    <div className="dropzone-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div>
          <div style={{ position: "relative" }}>
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
              {getAdjustedFilename(file.path)} /{" "}
              {Math.round((file.size / 1000) * 2) / 2} KB
            </div>
            <img
              src="/images/remove.png"
              alt="remove selected file icon"
              style={{ cursor: "pointer" }}
              onClick={removeFile(file)}
            />
          </div>
        ))}
      </div>
      {selectedFiles.length > 0 && (
        <>
          <div className="df selected-files-stats-container">
            <p>
              {selectedFiles.length}{" "}
              {`${selectedFiles.length > 1 ? "files" : "file"}`}
            </p>
            <p>{(totalSize / 1000000).toPrecision(2)} MB</p>
          </div>
          {+(totalSize / 1000000).toPrecision(2) > 10 && (
            <p className="selected-files-size-exceed">
              Total size exceeds 10 MB. Please remove some files.
            </p>
          )}
        </>
      )}

      {selectedFiles.length > 0 && (
        <div className="selected-files-actions-container">
          <button onClick={removeAll}>Remove All</button>
          {+(totalSize / 1000000).toPrecision(2) <= 10 && (
            <button>Upload & Get URL</button>
          )}
        </div>
      )}
    </div>
  );
}
