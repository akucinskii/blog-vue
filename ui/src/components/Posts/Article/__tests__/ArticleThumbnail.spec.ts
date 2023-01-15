import { mount } from "@vue/test-utils";
import ArticleThumbnail from "../ArticleThumbnail.vue";

describe("PostThumbnail", () => {
  const title = "Test title";
  const author = {
    username: "Test author",
  };
  const text = "Test text";

  const props = {
    title,
    author,
    text,
    id: "1",
  };

  it("Renders correctly ", () => {
    const wrapper = mount(ArticleThumbnail, {
      props,
    });

    expect(wrapper.find("v-card").exists()).toBe(true);
    expect(wrapper.find("v-card-title").text()).toBe(title);
    expect(wrapper.find("v-card-subtitle").text()).toBe(`Author: ${author.username}`);
    expect(wrapper.find("v-card-content").text()).toBe(text + "...");
    expect(wrapper.find("v-btn").text()).toBe("read more...");
    expect(wrapper.find("v-card-actions").exists()).toBe(true);
    expect(wrapper.find("v-btn").text()).toBe("read more...");
  });
});
