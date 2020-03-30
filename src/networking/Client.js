import axios from "axios";
import { SINGLE_SPACE, BEARER } from "src/";
/* Axios allows us to define a base instance in which we can define a URL
  and any other configuration elements
*/
const baseURL = process.env.REACT_APP_SERVER_URL;
const accessToken = process.env.REACT_CLIENT_ACCESS_TOKEN;

const defaultConfig = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Autherization: `${BEARER}${SINGLE_SPACE}${accessToken}`,
    common: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json"
    }
  },
  responseType: "json"
};

export function getAPIClient(customConfig) {
  return axios.create({
    ...defaultConfig,
    ...customConfig
  });
}
const defaultAPIClient = getAPIClient();

export default defaultAPIClient;
