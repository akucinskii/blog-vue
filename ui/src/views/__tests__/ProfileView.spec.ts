import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import { testUser } from "../../utils/testData";
import ProfileViewVue from "../ProfileView.vue";
import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../../router/router";

let router: Router;

describe("ProfileView", () => {
  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    });

    router.push("/profile");
    await router.isReady();
  });

  test("Renders unauthorized if user is not logged in", () => {
    const wrapper = mount(ProfileViewVue, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: {
                user: testUser,
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.find("#unauthorized")).toBeDefined();
  });

  test("Renders user profile if user is logged in", () => {
    const wrapper = shallowMount(ProfileViewVue, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: {
                user: testUser,
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.find("#profile")).toBeDefined();
  });

  test("renders admin panel if user is admin", () => {
    const user = {
      id: "1",
      username: "test",
      avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
      name: "Test",
      surname: "User",
      description: "Test user",
      is_admin: true,
    };

    const wrapper = shallowMount(ProfileViewVue, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: {
                user,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find("#admin")).toBeDefined();
  });

  test("Logout button works", async () => {
    const wrapper = shallowMount(ProfileViewVue, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: {
                user: testUser,
              },
            },
          }),
          [router],
        ],
      },
    });

    const push = jest.spyOn(router, "push");
    const logoutButton = wrapper.find("#logoutButton");

    await logoutButton.trigger("click");

    expect(push).toHaveBeenCalledWith("/login");
  });
});
