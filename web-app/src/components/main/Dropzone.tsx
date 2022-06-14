import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import getAdjustedFilename from "../../helpers/get-adjusted-filename";
import getFileExtensionIcon from "../../helpers/get-file-extension-icon";

export default function Dropzone() {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
    [selectedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

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
              onClick={() => setSelectedFiles([])}
            />
          </div>
        ))}
      </div>

      {selectedFiles.length > 0 && (
        <>
          {+(selectedFiles[0].size / 1000000).toPrecision(2) > 10 && (
            <p className="selected-files-size-exceed">
              File size exceeds 10 MB. Please choose another file.
            </p>
          )}

          {+(selectedFiles[0].size / 1000000).toPrecision(2) <= 10 && (
            <button style={{ marginTop: "20px", padding: "10px 15px" }}>
              Upload & Get URL
            </button>
          )}
        </>
      )}
    </div>
  );
}
