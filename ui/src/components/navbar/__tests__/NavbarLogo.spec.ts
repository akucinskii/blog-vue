import { mount, shallowMount } from "@vue/test-utils";
import NavbarLogo from "../NavbarLogo.vue";

describe("NavbarLogo", () => {
  const text = "Dieta by Robercik";

  it("Renders text in Logo", () => {
    const wrapper = shallowMount(NavbarLogo);
    expect(wrapper.text()).toBe(text);
  });
});
