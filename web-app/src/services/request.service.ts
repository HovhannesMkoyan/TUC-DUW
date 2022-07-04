import axios from "axios";
import { IRequest, RequestStatusType } from "../types";

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

export const update = async (requestData: Partial<IRequest>) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/api/requests/${requestData.uuid}`,
    {
      uuid: requestData.uuid,
      status: requestData.status,
    }
  );
  return res?.data;
};
