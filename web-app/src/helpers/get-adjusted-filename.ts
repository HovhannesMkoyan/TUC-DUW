export default (filename: string): string => {
  let fileExtension = filename.slice(filename.lastIndexOf(".") + 1);

  return filename.length > 35
    ? filename.substring(0, 35 - 1) + `...${fileExtension}`
    : filename;
};
