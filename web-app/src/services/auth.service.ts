import axios from "axios";

export const fetchAuthUser = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/auth`,
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const logout = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/auth/logout`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    const errorMessage: string = error.response
      ? error.response.data.error
      : "Ինչ-որ խնդիր կա կապի կամ կայքի սերվերի հետ";
    throw new Error(errorMessage);
  }
};

export const setAuthInLS = async (id: string) => {
  localStorage.setItem("auid", id);
};

export const getAuthFromLS = () => {
  return localStorage.getItem("auid") || null;
};

export const unsetAuthFromLS = async () => {
  return localStorage.removeItem("auid");
};
