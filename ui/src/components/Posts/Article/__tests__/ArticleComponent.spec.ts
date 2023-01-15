import ArticleComponent from "../ArticleComponent.vue";
import { mount } from "@vue/test-utils";
import ArticleFooter from "../ArticleFooter.vue";
import ArticleImage from "../ArticleImage.vue";
import ArticleText from "../ArticleText.vue";
import ArticleHeader from "../ArticleHeader.vue";

const props = {
  id: 1,
  title: "test title",
  author: {
    username: "test author",
    avatar: "test avatar",
    description: "test text",
  },
};

describe("ArticleComponent", () => {
  it("Renders Article chilren components", () => {
    const wrapper = mount(ArticleComponent, {
      propsData: props,
    });
    expect(wrapper.findComponent(ArticleHeader).exists()).toBe(true);
    expect(wrapper.find("#postTitle").text()).toBe(props.title);
    expect(wrapper.findComponent(ArticleImage).exists()).toBe(true);
    expect(wrapper.findComponent(ArticleText).exists()).toBe(true);
    expect(wrapper.find("#postText").text()).toBe("");
    expect(wrapper.findComponent(ArticleFooter).exists()).toBe(true);
    expect(wrapper.find("#postAuthor").text()).toBe("Published by:" + props.author.username);
  });
});
