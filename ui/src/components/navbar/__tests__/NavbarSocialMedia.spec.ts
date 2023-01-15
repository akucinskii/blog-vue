import { mount } from "@vue/test-utils";
import NavbarSocialMedia from "../NavbarSocialMedia.vue";

describe("NavbarSocialMedia", () => {
  const wrapper = mount(NavbarSocialMedia);

  it("renders a link", () => {
    expect(wrapper.find("a").exists()).toBe(true);
  });

  it("renders a list of links", () => {
    expect(wrapper.findAll("a").length).toBeGreaterThan(1);
  });

  it("renders a button", () => {
    expect(wrapper.find("button").exists()).toBe(true);
  });
});
