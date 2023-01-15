/* eslint-disable @typescript-eslint/no-empty-function */
import CategoryView from "../CategoryView.vue";
import { mount } from "@vue/test-utils";
import { useRoute } from "vue-router";
import { createTestingPinia } from "@pinia/testing";
import testData, { testCategories } from "../../utils/testData";
import { nextTick } from "vue";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));

describe("Category page", () => {
  test("renders correct error message", async () => {
    const NoPostFoundMessage = "No posts found in this category :(";

    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: "IDLikeThisDoesntExist",
      },
    }));

    const wrapper = mount(CategoryView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              categories: {
                categories: testCategories,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    await nextTick();

    expect(wrapper.find("h3").text()).toContain(NoPostFoundMessage);
  });

  test("renders correct posts when id is given as string", async () => {
    // Test category name of "technology" has id of 1
    const categoryId = "1";

    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: categoryId,
      },
    }));

    const wrapper = mount(CategoryView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              categories: {
                categories: testCategories,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    await nextTick();
    await nextTick();
    await nextTick();

    // Test data has 2 posts with category with name "Technology"
    expect(wrapper.findAll(".post").length).toBe(2);
  });

  test("Renders correct posts when CategoryId is given as array", async () => {
    const categoryIdArray = ["1", "2"];

    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: categoryIdArray,
      },
    }));

    const wrapper = mount(CategoryView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              categories: {
                categories: testCategories,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.findAll(".post").length).toBe(2);
  });

  test("Renders correct header", async () => {
    const text = "Posts in Technology";
    const categoryId = "1";

    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: categoryId,
      },
    }));

    const wrapper = mount(CategoryView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              categories: {
                categories: testCategories,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    await nextTick();
    await nextTick();

    expect(wrapper.find("h1").text()).toMatch(/Posts\sin\s\w+/g);
    expect(wrapper.find("h1").text()).toEqual(text);
  });

  test("Should match snapshot", async () => {
    const categoryId = "1";

    (useRoute as jest.Mock).mockImplementationOnce(() => ({
      params: {
        id: categoryId,
      },
    }));

    const wrapper = mount(CategoryView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
              categories: {
                categories: testCategories,
              },
            },
          }),
        ],
        stubs: ["router-link", "router-view"],
      },
    });

    await nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });
});
