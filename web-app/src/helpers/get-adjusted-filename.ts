const getAdjustedFilename = (filename: string, length: number): string => {
  let fileExtension = filename.slice(filename.lastIndexOf(".") + 1);

  return filename.length > length
    ? filename.substring(0, length - 1) + `...${fileExtension}`
    : filename;
};

export default getAdjustedFilename;
