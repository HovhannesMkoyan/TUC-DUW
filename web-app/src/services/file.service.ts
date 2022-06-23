import axios from "axios";
import download from "downloadjs";

export const get = async (fileId: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/files/${fileId}`
  );
  return res?.data;
};

export const add = async (data: FormData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/api/files`,
    data,
    {}
  );

  return res?.data;
};

export const downloadFile = async (fileId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/files/${fileId}/download`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );

    const fileURL = URL.createObjectURL(data) || null;
    if (fileURL) {
      download(fileURL);
    }

    return data;
  } catch (error) {
    throw new Error("error");
  }
};
