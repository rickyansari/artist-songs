import defaultAPIClient from "./Client";
import { GET } from "src/helper/constants";

function isNetworkError(error) {
  return error.isAxiosError && !error.response;
}

export default function callApi(
  endpoint,
  method = GET,
  body,
  { APIClient = defaultAPIClient } = {}
) {
  return APIClient[method](endpoint, body)
    .then(response => {
      const { data } = response;
      return { success: true, data };
    })
    .catch(error => {
      if (isNetworkError(error)) {
        return {
          success: false,
          errors: {
            data: {
              message: "Unable to process your request. Please try again later."
            }
          }
        };
      }

      if (error.response) {
        /*
          This code block will be executed if the request was made and the server
          responded with a status code that falls out of the range of 2xx (i.e. 3xx and 4xx etc.)
        */
        if (error.response.status === 401) {
          return {
            success: false,
            errors: { data: { message: "UnAuthorized Access" } }
          };
        }
        if (error.response.status === 400) {
          return {
            success: false,
            errors: error.response,
            showInlineAlerts: true
          };
        }

        return { success: false, errors: error.response };
      }
      if (error.request) {
        // The request was made but no response was received
        return {
          success: false,
          errors: { data: { message: error.message } }
        };
      }
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        errors: { data: { message: error.message } }
      };
    });
}
