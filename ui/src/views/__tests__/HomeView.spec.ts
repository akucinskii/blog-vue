import HomeView from "../HomeView.vue";
import PostList from "../../components/Posts/PostList.vue";
import { mount, VueWrapper } from "@vue/test-utils";
import testData from "../../utils/testData";
import { createTestingPinia } from "@pinia/testing";
import ArticleThumbnail from "../../components/Posts/Article/ArticleThumbnail.vue";

let wrapper: VueWrapper<InstanceType<typeof HomeView>>;

describe("Home", () => {
  beforeEach(() => {
    wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: testData,
              },
            },
          }),
        ],
      },
    });
  });

  test("renders PostList", async () => {
    expect(wrapper.findComponent(PostList).exists()).toBe(true);
  });

  test("Renders not disabled posts", async () => {
    const filteredPosts = testData.filter((post) => !post.disabled);
    expect(wrapper.findAllComponents(ArticleThumbnail).length).toBe(filteredPosts.length);
  });

  test("Doesnt render disabled posts", () => {
    const disabledPost = {
      id: "test3",
      title: "THIS POST SHOULDNT BE VISIBLE",
      text: "test",
      category_id: "test",
      image_url: "test",
      big_image_url: "test",
      disabled: true,
    };

    wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              posts: {
                posts: [disabledPost],
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.findAllComponents(ArticleThumbnail).length).toBe(0);
  });
});
