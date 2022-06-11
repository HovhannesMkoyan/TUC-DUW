import axios from "axios";
import download from "downloadjs";

export const fetchBook = async (book_id: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}`
  );
  return res?.data;
};

export const downloadBook = async (book_id: string) => {
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

export const readBook = async (book_id: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}/read`,
      {
        withCredentials: true,
        headers: {
          Accept: "application/pdf",
        },
        responseType: "blob",
      }
    );

    return data;
  } catch (error) {
    console.error("=======", error);
    //notify("error", error.response.data.error);
  }
};

export const getUserBookStatus = async (book_id: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}/activity`,
    { withCredentials: true }
  );
  return res?.data;
};