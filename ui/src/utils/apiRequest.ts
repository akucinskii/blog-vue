import axios from "axios";

const BASE_API_URL = process.env.API_URL;

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

axios.defaults.baseURL = process.env.API_URL;

const apiRequest = async (method: HTTP_METHODS, url: string, data = {}, headers = {}) => {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const response = await axios({
    method,
    url: `${BASE_API_URL}${url}`,
    data,
    headers,
  });

  return response;
};

export default apiRequest;
