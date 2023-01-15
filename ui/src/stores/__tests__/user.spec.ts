import { useUserStore } from "../user";
import axios from "axios";
import { createTestingPinia } from "@pinia/testing";
import { mocked } from "ts-jest/utils";
import mockAxiosResponse from "../../../mocks/axiosMock";

jest.mock("axios");
const mockedAxios = mocked(axios);

const testUser = {
  username: "test",
  avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
  id: "1",
  description: "test",
  name: "Test",
  surname: "Test",
  is_admin: false,
};

describe("Posts", () => {
  const pinia = createTestingPinia({
    initialState: {
      user: {
        user: null,
      },
    },
    stubActions: false,
  });
  const store = useUserStore(pinia);

  test("Initially store.user i s null", () => {
    expect(store.user).toBeNull();
  });

  test("Fetch user", async () => {
    const mockedAxiosResponse = mockAxiosResponse(testUser);
    mockedAxios.mockResolvedValueOnce(mockedAxiosResponse);

    await store.fetchUser();

    expect(store.user).toEqual(testUser);
  });

  test("Fetch user should fetch nothing if error is thrown", async () => {
    const mockedAxiosResponse = mockAxiosResponse(null, "error");
    mockedAxios.mockRejectedValueOnce(mockedAxiosResponse);

    await store.fetchUser();

    expect(store.user).toBeNull();
  });

  test("Logout", () => {
    store.user = testUser;

    store.logOut();

    expect(store.user).toBeNull();
  });
});
