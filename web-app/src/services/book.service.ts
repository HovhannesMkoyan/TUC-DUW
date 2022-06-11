import axios from "axios";
import download from "downloadjs";
import { TUserBookActivityStatus } from "../types";

export const fetchBook = async (book_id: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}`
  );
  return res?.data;
};

export const fetchBookSuggestions = async (book_id: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}/suggestions`
  );
  return res?.data;
};

export const fetchAllBooks = async (adjusted: boolean = false) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books?adjusted=${adjusted}`
  );
  return res?.data;
};

export const fetchAllDownloadsNumber = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/downloads`
  );
  return res?.data;
};

export const fetchCategoriesInfo = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/categories`
  );
  return res?.data;
};

export const fetchBooksBySearch = async (query: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/search?query=${query}`
  );
  return res?.data;
};

export const fetchBooksWithTag = async (category: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books?category=${category}`
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

export const updateUserBookStatus = async (
  book_id: string,
  status: TUserBookActivityStatus,
  goal_id?: string
) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}/activity`,
    { status, goal_id },
    { withCredentials: true }
  );
  return res?.data;
};

export const deleteUserBookStatus = async (book_id: string) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}/activity`,
    { withCredentials: true }
  );
  return res?.data;
};

// export const addComment = async (book_id: string, comment: string) => {
//   const res = await axios.post(
//     `${process.env.REACT_APP_API_ENDPOINT}/api/books/${book_id}/finished`,
//     {},
//     { withCredentials: true }
//   );
//   return res?.data;
// };
