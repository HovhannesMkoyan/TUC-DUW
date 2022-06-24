import axios from "axios";

export const get = async (requestId: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/requests/${requestId}`
  );
  return res?.data;
};

export const add = async (fileId: string, reason: string, action: "block" | "unblock") => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/api/requests/`,
    { fileId, reason, action }
  );
  return res?.data;
};
