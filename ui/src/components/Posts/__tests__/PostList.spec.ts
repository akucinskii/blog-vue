import PostList from "../PostList.vue";
import { shallowMount } from "@vue/test-utils";
import ArticleThumbnail from "../Article/ArticleThumbnail.vue";

describe("PostList", () => {
  it("Renders itself", () => {
    const wrapper = shallowMount(PostList);
    expect(wrapper.find("v-container").exists()).toBe(true);
  });

  it("Renders a list of posts", () => {
    const wrapper = shallowMount(PostList, {
      slots: {
        default: ArticleThumbnail,
      },
    });
    expect(wrapper.findComponent(ArticleThumbnail).exists()).toBe(true);
  });
});
