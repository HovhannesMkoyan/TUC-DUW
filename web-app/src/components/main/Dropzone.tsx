import { useDropzone } from "react-dropzone";

export default function Dropzone(props: any) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}
