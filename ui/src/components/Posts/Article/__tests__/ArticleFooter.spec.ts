import ArticleFooter from "../ArticleFooter.vue";
import { shallowMount } from "@vue/test-utils";

const randomStringGenerator = (n = 160): string => {
  let word = "";
  for (let i = 0; i < n; i++) {
    //  generate a random string of length n
    // .toString(36) converts the float to a base36 string that contains 12 characters
    // .substring(11) leaves only 1 character of the string
    word += (Math.random() + 1).toString(36).substring(11);
  }
  return word;
};

const props = {
  title: "test title",
  username: "test author",
  description: "test text",
};
const longText = randomStringGenerator();

describe("ArticleFooter", () => {
  const wrapper = shallowMount(ArticleFooter, {
    props: props,
  });
  it("Renders text correctly ", () => {
    expect(wrapper.find("#postAuthor").text()).toContain(props.username);
    expect(wrapper.find("#postDescription").text()).toBe(props.description);
  });
});

describe("ArticleFooter with long description", () => {
  const wrapper = shallowMount(ArticleFooter, {
    props: {
      description: longText,
    },
  });
  it("renders long text correctly", () => {
    expect(wrapper.find("#postDescription").text()).toBe(longText.slice(0, 150).trim() + "...");
  });
});
