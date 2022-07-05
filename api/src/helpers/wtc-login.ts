import axios, { Axios, AxiosError } from "axios";
import { parse } from "node-html-parser";
import FormData from "form-data";

axios.defaults.withCredentials = true;
const LOGIN_PAGE_URL = "https://www.tu-chemnitz.de/informatik/DVS/blocklist/";

export const wtcLogin = async (cb: () => void) => {
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

  const loginElement = parse(request.data).querySelector("#KrbIdP");
  const uri = loginElement?.rawAttributes.action.replace("amp;", "");

  let formData = new FormData();
  formData.append("session", "true");
  formData.append("user_idp", "https://wtc.tu-chemnitz.de/shibboleth");

  // Request 3
  let loginUrl;
  try {
    await axios.post(`https://wtc.tu-chemnitz.de${uri}`, formData);
  } catch (error: any) {
    const anchorElementAttr = parse(error.response.data).querySelector(
      "a"
    )?.rawAttrs;

    loginUrl = anchorElementAttr!.substring(20, anchorElementAttr!.length - 1);
  }
  console.log("----1----", loginUrl);
  const res = await axios.get(loginUrl as string);
  // const retryUrl = res.request.res.responseUrl.slice(
  //   res.request.res.responseUrl.indexOf("retryURL=") + "retryURL=".length
  // );

  // const res1 = await axios.get(decodeURIComponent(retryUrl));
  // console.log(res1);

  const AuthState = loginUrl?.slice(
    loginUrl.indexOf("AuthState=") + "AuthState=".length
  );
  console.log("----2----", AuthState);

  // Username form submit
  formData = new FormData();
  formData.append("username", "hmk");
  formData.append("AuthState", AuthState);
  await axios.post(
    `https://wtc.tu-chemnitz.de/krb/module.php/TUC/username.php?AuthState=${AuthState}`,
    formData
  )
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

  return;
  // Password form submit
  formData = new FormData();
  formData.append("username", "hmk");
  formData.append("password", "122334joh_N");
  formData.append("AuthState", AuthState);
  await axios
    .post(
      `https://wtc.tu-chemnitz.de/krb/module.php/core/loginuserpass.php`,
      formData
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  // Final request
  // formData = new FormData();
  // formData.append("SAMLResponse", "");
  // formData.append("RelayState", "");
  // await axios
  //   .post(
  //     "https://www.tu-chemnitz.de/Shibboleth.sso/SAML2/POST", formData
  //   )
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  // await axios
  //   .get(
  //     "https://www.tu-chemnitz.de/informatik/DVS/blocklist/e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  //   )
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return cb();
};
