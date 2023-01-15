import apiRequest from "../apiRequest";
import { HTTP_METHODS } from "../apiRequest";
import axios from "axios";
import { mocked } from "ts-jest/utils";
import mockAxiosResponse from "../../../mocks/axiosMock";

jest.mock("axios");

const mockedAxios = mocked(axios);

describe("fetchUsers", () => {
  test("It should return users list", async () => {
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Andrew" },
    ];
    const mockedAxiosResponse = mockAxiosResponse(users);

    mockedAxios.mockResolvedValueOnce(mockedAxiosResponse);

    const result = await apiRequest(HTTP_METHODS.GET, "/users");

    expect(result.data).toEqual(users);
  });
});
