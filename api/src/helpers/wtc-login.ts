import superagent from "superagent";
import axios from "axios";
import { parse } from "node-html-parser";
var FormData = require('form-data');

const agent = superagent.agent();
axios.defaults.withCredentials = true;

const LOGIN_PAGE_URL = "https://www.tu-chemnitz.de/informatik/DVS/blocklist/";
export const wtcLogin = async (cb: () => void) => {
  try {
    //let request = await agent.get(LOGIN_PAGE_URL);
    // let request = await agent.get(LOGIN_PAGE_URL);
    // return;
    // const htmlRoot = parse(request.text);
    // const formElement = htmlRoot.querySelector("#KrbIdP");
    // // console.log(formElement?.rawAttributes.action);
    // request = await agent.post(
    //   `https://wtc.tu-chemnitz.de/${formElement?.rawAttributes.action}`
    // );
    // console.log(request.text);
    // return;
    // const decodedRedirectURI = decodeURIComponent(request.redirects[0]);
    // let stringAfterLogin = decodedRedirectURI.slice(decodedRedirectURI.indexOf("Login?") + "Login?".length);
    // console.log(`https://www.tu-chemnitz.de/Shibboleth.sso/Login?${encodeURIComponent(stringAfterLogin)}`);
    // request = await agent.get(`https://www.tu-chemnitz.de/Shibboleth.sso/Login?${encodeURIComponent(stringAfterLogin)}`);
    //console.log(request);

    const request1 = await axios.get(LOGIN_PAGE_URL, { withCredentials: true });
    const redirectUrl = request1.request.res.responseUrl;

    const decodedRedirectURI = decodeURIComponent(redirectUrl);
    const stringAfterLogin = decodedRedirectURI.slice(
      decodedRedirectURI.indexOf("Login?") + "Login?".length
    );

    const newUrl = `https://www.tu-chemnitz.de/Shibboleth.sso/Login?${encodeURIComponent(
      stringAfterLogin
    )}`;
    const request2 = await axios.get(newUrl,
      { withCredentials: true }
    );
    const htmlRoot = parse(request2.data);
    const formElement = htmlRoot.querySelector("#KrbIdP");
    console.log(formElement?.rawAttributes.action)
    const uri = formElement?.rawAttributes.action.replace('amp;', '');
    console.log(uri);
    const formData = new FormData()
    formData.append('session', 'true');
    formData.append('user_idp', 'https://wtc.tu-chemnitz.de/shibboleth');

    const request3 = await axios.post(
      `https://wtc.tu-chemnitz.de${uri}`, formData, { withCredentials: true }
    ) .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    return cb();
  } catch (error) {}
};