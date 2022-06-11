export default (responseBlob: Blob, filename: string): any => {
  const blob = new Blob([responseBlob], { type: "application/pdf" });
  const url = window.URL || window.webkitURL;
  const link = url.createObjectURL(blob);

  const a = document.createElement("a");
  a.setAttribute("download", filename);
  a.setAttribute("href", link);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(link);
};
