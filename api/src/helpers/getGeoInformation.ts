import axios from "axios";

export default async function (ip: any) {
  const options: any = {
    method: "GET",
    url: "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/",
    params: { ip },
    headers: {
      "x-rapidapi-key": "df23acc680mshe31d96500045552p19a8c4jsnb3d09ebbb916",
      "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    const {
      success,
      type,
      continent_code,
      country_code,
      country_flag,
      country_neighbours,
      asn,
      org,
      timezone_dstOffset,
      timezone_gmtOffset,
      currency_rates,
      currency_plural,
      completed_requests,
      ...detailed_geo_info
    } = data;

    return detailed_geo_info;
  } catch (error) {
    console.error(error);
  }
}
