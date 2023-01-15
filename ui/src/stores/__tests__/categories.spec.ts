import { useCategoriesStore } from "../categories";
import axios from "axios";
import { createTestingPinia } from "@pinia/testing";
import { mocked } from "ts-jest/utils";
import { testCategories } from "../../utils/testData";
import mockAxiosResponse from "../../../mocks/axiosMock";

jest.mock("axios");
const mockedAxios = mocked(axios);

describe("Categories", () => {
  const pinia = createTestingPinia({
    initialState: {
      categories: {
        categories: [],
      },
    },
    stubActions: false,
  });

  const store = useCategoriesStore(pinia);

  test("Initially store.categories is an empty array", async () => {
    expect(store.categories).toEqual([]);
  });

  test("FetchCategories should fetch testData", async () => {
    const mockedAxiosResponse = mockAxiosResponse({ items: testCategories });
    mockedAxios.mockResolvedValueOnce(mockedAxiosResponse);

    expect(store.fetchCategories).toBeDefined();
    await store.fetchCategories();

    expect(store.categories).toEqual(testCategories);
  });

  test("getCategoryByUUID should return the correct category", async () => {
    const mockedAxiosResponse = mockAxiosResponse({ items: testCategories });

    mockedAxios.mockResolvedValueOnce(mockedAxiosResponse);

    await store.fetchCategories();

    const uuid = "1";
    const CategoryByUUID = store.getCategoryByUUID(uuid);

    expect(CategoryByUUID).toBeDefined();
    expect(store.getCategoryByUUID("1")).toEqual(testCategories[0]);
  });

  test("fetch categories should be empty if error is thrown", async () => {
    const mockedAxiosResponse = mockAxiosResponse(null, "error");
    mockedAxios.mockRejectedValueOnce(mockedAxiosResponse);

    await store.fetchCategories();

    expect(store.categories).toEqual([]);
  });
});
