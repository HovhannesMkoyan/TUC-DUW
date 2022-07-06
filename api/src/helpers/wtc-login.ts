import axios, { Axios, AxiosError } from "axios";
import { parse } from "node-html-parser";
import FormData from "form-data";
import superagent from "superagent"

const agent = superagent.agent();

axios.defaults.withCredentials = true;
const LOGIN_PAGE_URL = "https://www.tu-chemnitz.de/informatik/DVS/blocklist/";

export const wtcLogin = async (cb: () => void) => {
  // Request 1
  console.log("----------1. GET----------", LOGIN_PAGE_URL);
  let request = await axios.get(LOGIN_PAGE_URL, {withCredentials: true});
  const redirectUrl = request.request.res.responseUrl;
  const decodedRedirectURI = decodeURIComponent(redirectUrl);
  const stringAfterLogin = decodedRedirectURI.slice(
    decodedRedirectURI.indexOf("Login?") + "Login?".length
  );

  // Request 2
  console.log("----------2. GET----------", redirectUrl);
  request = await axios.get(redirectUrl, {withCredentials: true});

  // Request 3
  let formData = new FormData();
  formData.append("session", "true");
  formData.append("user_idp", "https://wtc.tu-chemnitz.de/shibboleth");

  try {
    console.log("----------3. POST----------", redirectUrl);
    await axios.post(redirectUrl, formData, {withCredentials: true});
  } catch (error: any) {}

  // Request 4
  let url1;
  try {
    console.log(
      "----------4. GET----------",
      `https://www.tu-chemnitz.de/Shibboleth.sso/Login?${
        stringAfterLogin +
        "&entityID=https%3A%2F%2Fwtc.tu-chemnitz.de%2Fshibboleth"
      }`
    );
    await axios.get(
      `https://www.tu-chemnitz.de/Shibboleth.sso/Login?${
        stringAfterLogin +
        "&entityID=https%3A%2F%2Fwtc.tu-chemnitz.de%2Fshibboleth"
      }`, {withCredentials: true}
    );
  } catch (error: any) {
    url1 = error.request.res.responseUrl;
  }

  // Request 5
  let loginUrl;
  try {
    console.log("----------5. GET----------", url1);
    await axios.get(url1, {withCredentials: true});
  } catch (error: any) {
    const anchorElementAttr = parse(error.response.data).querySelector(
      "a"
    )?.rawAttrs;

    loginUrl = anchorElementAttr!.substring(20, anchorElementAttr!.length - 1);
  }

  // Request 6
  try {
    console.log("----------6. GET----------", loginUrl);
    await axios.get(loginUrl as string, {withCredentials: true});
  } catch (error) {
    console.log(error);
  }

  const AuthState = loginUrl?.slice(
    loginUrl.indexOf("AuthState=") + "AuthState=".length
  );

  // Request 7
  try {
    console.log(
      "----------7. GET----------",
      `https://wtc.tu-chemnitz.de/krb/module.php/TUC/username.php?AuthState=${AuthState}`
    );
    await axios.get(
      `https://wtc.tu-chemnitz.de/krb/module.php/TUC/username.php?AuthState=${AuthState}`, {withCredentials: true}
    );
  } catch (error) {
    console.log(error);
  }

  // Request 8
  formData = new FormData();
  formData.append("username", "hmk");
  formData.append("AuthState", AuthState);

  try {
    console.log(
      "----------8. POST----------",
      `https://wtc.tu-chemnitz.de/krb/module.php/TUC/username.php?AuthState=${AuthState}`
    );
    await axios.post(
      `https://wtc.tu-chemnitz.de/krb/module.php/TUC/username.php?AuthState=${AuthState}`,
      formData, {withCredentials: true}
    );
  } catch (error) {
    console.log(error);
  }

  // Request 9
  try {
    console.log(
      "----------9. GET----------",
      `https://wtc.tu-chemnitz.de/krb/module.php/TUC/captcha.php?AuthState=${AuthState}`
    );
    await axios.get(
      `https://wtc.tu-chemnitz.de/krb/module.php/TUC/captcha.php?AuthState=${AuthState}`, {withCredentials: true}
    );
  } catch (error) {
    console.log(error);
  }

  // Request 10
  try {
    console.log(
      "----------10. GET----------",
      `https://wtc.tu-chemnitz.de/krb/module.php/core/loginuserpass.php?AuthState=${AuthState}`
    );
    await axios.get(
      `https://wtc.tu-chemnitz.de/krb/module.php/core/loginuserpass.php?AuthState=${AuthState}`, {withCredentials: true}
    );
  } catch (error) {
    console.log(error);
  }

  // Request 11
  formData = new FormData();
  formData.append("password", "122334joh_N");
  formData.append("AuthState", AuthState);

  setTimeout(async () => {
    try {
      console.log(
        "----------11. POST----------",
        `https://wtc.tu-chemnitz.de/krb/module.php/core/loginuserpass.php?AuthState=${AuthState}`
      );
      const res = await axios.post(
        `https://wtc.tu-chemnitz.de/krb/module.php/core/loginuserpass.php?AuthState=${AuthState}`,
        formData, {withCredentials: true}
      );
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }, 9000);

  setTimeout(async () => {
    await axios
    .get(
      "https://www.tu-chemnitz.de/informatik/DVS/blocklist/e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    )
    .then(function (response) {
      console.log(response)
      console.log("-----------------TEST--------------", response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, 15000);
  return;

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
