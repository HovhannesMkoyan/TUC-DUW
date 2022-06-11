import axios from "axios";
import download from "../helpers/download-file";

export const fetchUserInfo = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/auth`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const fetchUserSubscription = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/subscription`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const fetchUserReadBooksStats = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/read-books-stats`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const downloadInvoice = async (
  userId: string,
  invoiceId: string,
  filename: string
) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/invoices/${invoiceId}`,
      {
        withCredentials: true,
        headers: {
          Accept: "application/pdf",
        },
        responseType: "blob",
      }
    );

    download(data, filename);

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};
