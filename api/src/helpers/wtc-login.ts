import superagent from "superagent";
const agent = superagent.agent();

const LOGIN_PAGE_URL = "https://www.tu-chemnitz.de/tu/wtc/index.html.en"
const USERNAME_INPUT_URL = "https://wtc.tu-chemnitz.de/krb/module.php/TUC/username.php?" // requires authstate param

export const wtcLogin = async (cb: () => void) => {
  const res1 = await agent.get(LOGIN_PAGE_URL);
  const res2 = await agent.get(res1.redirects[0]).cookies;
  const res3 = await agent.get(USERNAME_INPUT_URL);
  const res6 = await agent.get(USERNAME_INPUT_URL);
  console.log(res3.redirects)
  console.log(res6.redirects)

  return cb();
};

//https://wtc.tu-chemnitz.de/shibboleth/WAYF?entityID=https%3A%2F%2Fwww.tu-chemnitz.de%2Fshibboleth&return=https%3A%2F%2Fwww.tu-chemnitz.de%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dss%253Amem%253A20d3baa748af00f6cb87d68abae6e84d5ce2548b692621e75c9e565412bf4e28