import axios from "axios";
import { parse } from "node-html-parser";
import FormData from "form-data";

axios.defaults.withCredentials = true;
const LOGIN_PAGE_URL = "https://www.tu-chemnitz.de/informatik/DVS/blocklist/";

export const wtcLogin = async (cb: () => void) => {
  try {
    // Request 1
    let request = await axios.get(LOGIN_PAGE_URL);
    const redirectUrl = request.request.res.responseUrl;

    const decodedRedirectURI = decodeURIComponent(redirectUrl);
    const stringAfterLogin = decodedRedirectURI.slice(
      decodedRedirectURI.indexOf("Login?") + "Login?".length
    );

    // Request 2
    request = await axios.get(
      `https://www.tu-chemnitz.de/Shibboleth.sso/Login?${encodeURIComponent(
        stringAfterLogin
      )}`
    );

    const htmlRoot = parse(request.data);
    const formElement = htmlRoot.querySelector("#KrbIdP");
    const uri = formElement?.rawAttributes.action.replace("amp;", "");
    const formData = new FormData();
    formData.append("session", "true");
    formData.append("user_idp", "https://wtc.tu-chemnitz.de/shibboleth");

    // Request 3
    const postRequest = await axios
      .post(`https://wtc.tu-chemnitz.de${uri}`, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return cb();
  } catch (error) {
    throw Error();
  }
};
