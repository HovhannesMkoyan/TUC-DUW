import axios from "axios";
import { IRequest } from "../types";

export const getAll = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/requests`
  );
  return res?.data;
};

export const add = async (requestData: Partial<IRequest>) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/api/requests/`,
    {
      uuid: requestData.uuid,
      reason: requestData.reason,
      action: requestData.action,
    }
  );
  return res?.data;
};
