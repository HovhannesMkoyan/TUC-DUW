const getFileExtensionIcon = (filename: string): string => {
  let fileExtension = filename
    .slice(filename.lastIndexOf(".") + 1)
    .toLowerCase();

  switch (fileExtension) {
    case "png":
    case "jpeg":
    case "jpeg":
    case "jpg":
    case "gif":
    case "tiff":
    case "svg":
      return "image.png";
    case "pdf":
      return "pdf.png";
    case "doc":
    case "dot":
    case "wbk":
    case "docx":
    case "docm":
    case "dotx":
    case "dotm":
    case "docb":
      return "doc.png";
    case "xls":
    case "xlt":
    case "xlm":
    case "xlsx":
    case "xlsm":
    case "xltx":
    case "xltm":
      return "xls.png";
    case "ppt":
    case "pot":
    case "pps":
    case "ppa":
    case "pptx":
    case "pptm":
    case "potx":
    case "potm":
    case "ppam":
    case "ppsx":
      return "xls.png";

    case "mp3":
      return "mp3.png";
    case "mp4":
      return "mp4.png";
    default:
      return "file.png";
  }
};

export default getFileExtensionIcon;