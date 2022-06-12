import { useDropzone } from "react-dropzone";
import getAdjustedFilename from "../../helpers/get-adjusted-filename";
import getFileExtensionIcon from "../../helpers/get-file-extension-icon";

function SelectedFiles(props: any) {
  return props.files.map((file: any, index: number) => (
    <div key={index} className="selected-file df df-ac">
      <div className="df">
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
      />
    </div>
  ));
}

export default function Dropzone() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

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
        <SelectedFiles files={acceptedFiles} />
      </div>
    </div>
  );
}
