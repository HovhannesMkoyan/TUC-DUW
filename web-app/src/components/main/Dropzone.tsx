// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// export default function Dropzone() {
//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.forEach((file: any) => {
//       const reader = new FileReader();

//       reader.onabort = () => console.log("file reading was aborted");
//       reader.onerror = () => console.log("file reading has failed");
//       reader.onload = () => {
//         // Do whatever you want with the file contents
//         const binaryStr = reader.result;
//         console.log(binaryStr);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   }, []);
//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       <p>Drag 'n' drop some files here, or click to select files</p>
//     </div>
//   );
// }

//*Dropzone.js*//

import React from "React";
import { useDropzone } from "React-dropzone";

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
