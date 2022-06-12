export default (filename: string): string => {
  let fileExtension = filename.slice(filename.lastIndexOf(".") + 1);

  return filename.length > 30
    ? filename.substring(0, 30 - 1) + `...${fileExtension}`
    : filename;
};
