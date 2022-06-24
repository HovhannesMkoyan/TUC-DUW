import { agent } from "superagent";

export const wtcLogin = async (cb: () => void) => {
  const res = await agent().get(`${process.env.BLOCKLIST_ENDPOINT}`);
  const redirectUrl = res.redirects[0];
  console.log(redirectUrl);

  if (redirectUrl) {
    const res1 = await agent().get(`${redirectUrl}`);
    //console.log(res1);
  }

  return cb();
};
