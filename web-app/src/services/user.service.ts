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

export const fetchUserBooksByCategory = async (
  type: "inprogress" | "bookmarks" | "completed" | "downloads"
) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/books?type=${type}`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const getUserGoals = async (adjusted?: boolean) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/goals?adjusted=${adjusted || false}`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const addNewUserGoal = async (
  startDate: string,
  endDate: string,
  booksNumber: string,
  goalTitle: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/goals`,
      {
        startDate,
        endDate,
        booksNumber,
        goalTitle,
      },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const createStripeSubscription = async (
  paymentMethodId: string,
  subscriptionType: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/subscription`,
      {
        payment_method: paymentMethodId,
        subscription_type: subscriptionType,
      },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const updateSubscriptionInfo = async (
  subscriptionType: string,
  subscriptionId: string,
  customerId: string
) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/subscription`,
      {
        subscription_type: subscriptionType,
        subscription_id: subscriptionId,
        customer_id: customerId,
      },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const fetchInvoices = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/invoices`,
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

export const fetchCard = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/subscription/card`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const updateCard = async (paymentMethodId: string) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/subscription/card`,
      {
        payment_method: paymentMethodId,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const cancelSubscription = async (reason: string, comment: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/subscription/cancel`,
      {
        reason,
        comment,
      },
      { withCredentials: true }
    );

    return response.status;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};

export const reactivateSubscription = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/users/${localStorage.getItem(
        "auid"
      )}/subscription/reactivate`,
      {},
      { withCredentials: true }
    );

    return response.status;
  } catch (error: any) {
    console.error("=======", error?.response.data);
    return error?.response.data;
  }
};
