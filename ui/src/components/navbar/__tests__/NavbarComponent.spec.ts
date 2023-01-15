import { createTestingPinia } from "@pinia/testing";
import { shallowMount, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { useUserStore } from "../../../stores/user";
import NavbarComponent from "../NavbarComponent.vue";

describe("NavbarComponent", () => {
  beforeEach(() => {
    window.innerWidth = 20;
    setActivePinia(
      createTestingPinia({
        initialState: {
          categories: {
            categories: [],
            user: {},
          },
        },
      })
    );

    jest.restoreAllMocks();
  });

  test("creates navbar", () => {
    const wrapper = shallowMount(NavbarComponent);

    expect(wrapper.find("v-app-bar").exists()).toBe(true);
  });

  test("Creates a clickable button on mobile", async () => {
    const wrapper = shallowMount(NavbarComponent);

    expect(wrapper.find("#hamburgerMenu").exists()).toBe(true);
  });

  test("There is no drawer on desktop", () => {
    window.innerWidth = 1265;
    const wrapper = shallowMount(NavbarComponent);

    expect(wrapper.find("#v-navigation-drawer").exists()).toBe(false);
  });

  test("onClick shows drawer on mobile", async () => {
    const wrapper = shallowMount(NavbarComponent);

    await wrapper.find("#hamburgerMenu").trigger("click");

    expect(wrapper.find("v-navigation-drawer").exists()).toBe(true);
  });

  test("It should match Snapshot", () => {
    const wrapper = mount(NavbarComponent);

    expect(wrapper.element).toMatchSnapshot();
  });

  test("Should create/remove event listeners", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const wrapper = shallowMount(NavbarComponent);

    expect(addEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  test("Should show correct object based on device width", async () => {
    window.innerWidth = 1;
    const wrapper = mount(NavbarComponent);

    expect(wrapper.find("#mobile").exists()).toBe(true);
    expect(wrapper.find("#desktop").exists()).toBe(false);

    window.innerWidth = 1500;
    window.dispatchEvent(new Event("resize"));
    await nextTick();

    expect(wrapper.find("#mobile").exists()).toBe(false);
    expect(wrapper.find("#desktop").exists()).toBe(true);
  });

  test("username changes correctly", async () => {
    const wrapper = mount(NavbarComponent);

    const userStore = useUserStore();

    expect(wrapper.vm.username).toEqual("");

    userStore.user = {
      username: "John",
      avatar_url: "test",
      id: "1",
      description: "test",
      surname: "test",
      is_admin: false,
      name: "John",
    };
    await nextTick();

    expect(wrapper.vm.username).toEqual("John");
    expect(wrapper.vm.username).toEqual(userStore.user.username);

    userStore.user = null;

    await nextTick();

    expect(wrapper.vm.username).toEqual("");
  });
});
