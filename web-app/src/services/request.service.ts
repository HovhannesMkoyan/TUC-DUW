import axios from "axios";
import { IRequest } from "../types";

export const get = async (requestId: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/requests/${requestId}`
  );
  return res?.data;
};

export const add = async (requestData: Partial<IRequest>) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/api/requests/`,
    { FileId: requestData.FileId, reason: requestData.reason, action: requestData.action }
  );
  return res?.data;
};
