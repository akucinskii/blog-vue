import { AxiosResponse } from "axios";

const mockAxiosResponse = (expectedResponse: any, headers: any = {}): AxiosResponse => {
  return {
    data: expectedResponse,
    status: 200,
    statusText: "OK",
    config: {},
    headers,
  };
};

export default mockAxiosResponse;
