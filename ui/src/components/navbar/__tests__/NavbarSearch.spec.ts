import { shallowMount } from "@vue/test-utils";
import NavbarSearch from "../NavbarSearch.vue";

describe("NavbarSearch", () => {
  it("renders a button", () => {
    const wrapper = shallowMount(NavbarSearch);
    expect(wrapper.find("v-btn").exists()).toBe(true);
  });
});
