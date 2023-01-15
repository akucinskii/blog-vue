import PostView from "../PostView.vue";
import ArticleComponent from "../../components/Posts/Article/ArticleComponent.vue";
import { mount } from "@vue/test-utils";
import { useRoute, useRouter } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import { mocked } from "ts-jest/utils";
import { AxiosResponse } from "axios";
import testData, { testUser } from "../../utils/testData";
import apiRequest from "../../utils/apiRequest";
import { usePostsStore } from "../../stores/posts";
import { nextTick } from "vue";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: () => {},
  })),
}));

jest.mock("../../utils/apiRequest");
const mockedApiRequest = mocked(apiRequest);

describe("Post page", () => {
  test("renders ArticleComponent", () => {
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: 1,
      },
    }));

    const wrapper = mount(PostView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: [],
              },
            },
          }),
        ],
      },
    });

    const axiosResponse: AxiosResponse = {
      data: testData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    mockedApiRequest.mockResolvedValueOnce(axiosResponse);

    expect(wrapper.findComponent(ArticleComponent).exists());
  });

  test("renders ArticleComponent with id as string array", () => {
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: ["1", "2"],
      },
    }));

    const wrapper = mount(PostView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: [],
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    const axiosResponse: AxiosResponse = {
      data: testData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    mockedApiRequest.mockResolvedValueOnce(axiosResponse);

    expect(wrapper.findComponent(ArticleComponent).exists());
  });

  test("renders a button if user is admin", () => {
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: 1,
      },
    }));

    const wrapper = mount(PostView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              user: {
                user: testUser,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    expect(wrapper.find("#deletePostButton").exists()).toBe(true);
  });

  test("there is no button if user is not admin", () => {
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: 1,
      },
    }));

    const wrapper = mount(PostView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              user: {
                user: { ...testUser, is_admin: false },
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    expect(wrapper.find("#deletePostButton").exists()).toBe(false);
  });

  test("button on click makes an delete api request", async () => {
    const testId = "313553ff-784f-497f-adfc-7e549bebab66";
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: testId,
      },
    }));

    const wrapper = mount(PostView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              user: {
                user: testUser,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    const store = usePostsStore();
    await wrapper.find("#deletePostButton").trigger("click");
    await nextTick();

    expect(store.removePost).toHaveBeenCalledTimes(1);
    expect(store.removePost).toHaveBeenCalledWith(testId);
  });

  test("button on click routes to home page", async () => {
    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: 1,
      },
    }));

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementationOnce(() => ({
      push,
    }));

    const wrapper = mount(PostView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              user: {
                user: testUser,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    await wrapper.find("#deletePostButton").trigger("click");
    await nextTick();

    expect(push).toHaveBeenCalledWith("/");
  });
});
