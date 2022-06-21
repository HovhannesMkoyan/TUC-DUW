import axios from "axios";
import download from "downloadjs";

export const add = async (data: FormData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/api/files`,
    data,
    {}
  );

  return res?.data;
};

export const get = async (fileId: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/files/${fileId}`
  );
  return res?.data;
};

export const downloadFile = async (book_id: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}/download`,
      {
        withCredentials: true,
        headers: {
          Accept: "application/pdf",
        },
        responseType: "blob",
      }
    );

    const file = new Blob([data], { type: "application/pdf" });

    const fileURL = URL.createObjectURL(file) || null;
    if (fileURL) {
      download(fileURL);
    }

    return data;
  } catch (error) {
    throw new Error("error");
    //notify("error", error.response.data.error);
  }
};
