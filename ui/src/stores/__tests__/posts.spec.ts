import { usePostsStore } from "../posts";
import testData from "../../utils/testData";
import { createTestingPinia } from "@pinia/testing";
import { mocked } from "ts-jest/utils";
import mockAxiosResponse from "../../../mocks/axiosMock";
import apiRequest from "../../utils/apiRequest";

jest.mock("../../utils/apiRequest");
const mockedApiRequest = mocked(apiRequest);
describe("Posts", () => {
  const pinia = createTestingPinia({
    initialState: {
      posts: {
        posts: [],
      },
    },
    stubActions: false,
  });
  const store = usePostsStore(pinia);

  test("Initially store.posts is an empty array", async () => {
    expect(store.posts).toEqual([]);
  });

  test("FetchPosts should fetch testData", async () => {
    const mockedAxiosResponse = mockAxiosResponse({ items: testData });

    mockedApiRequest.mockResolvedValueOnce(mockedAxiosResponse);

    expect(store.fetchPosts).toBeDefined();
    await store.fetchPosts();
    expect(store.posts).toEqual(testData);
  });

  test("getPostByUUID gets post", async () => {
    const mockedAxiosResponse = mockAxiosResponse({ items: testData });

    mockedApiRequest.mockResolvedValueOnce(mockedAxiosResponse);

    await store.fetchPosts();

    const uuid = "313553ff-784f-497f-adfc-7e549bebab66";
    const postByUUID = store.getPostByUUID(uuid);

    expect(postByUUID).toBeDefined();
  });

  test("getPostByCategory gets posts", async () => {
    const mockedAxiosResponse = mockAxiosResponse({ items: testData });

    mockedApiRequest.mockResolvedValueOnce(mockedAxiosResponse);

    await store.fetchPosts();

    const category = "technology";
    const postsByCategory = store.getPostsByCategory(category);

    expect(postsByCategory).toBeDefined();
  });

  test("FetchPosts should fetch nothing", async () => {
    const mockedAxiosResponse = mockAxiosResponse({ items: [] });

    mockedApiRequest.mockResolvedValueOnce(mockedAxiosResponse);

    expect(store.fetchPosts).toBeDefined();
    await store.fetchPosts();
    expect(store.posts).toEqual([]);
  });

  test("Fetch Posts should fetch nothing if error is thrown", async () => {
    const mockedAxiosResponse = mockAxiosResponse(null, "error");

    mockedApiRequest.mockRejectedValueOnce(mockedAxiosResponse);

    await store.fetchPosts();

    expect(store.posts).toEqual([]);
  });

  test("RemovePost should remove post", async () => {
    const uuid = "313553ff-784f-497f-adfc-7e549bebab66";

    await store.removePost(uuid);

    expect(mockedApiRequest).toHaveBeenCalledWith("DELETE", `/posts?post_id=${uuid}`);
  });
});
