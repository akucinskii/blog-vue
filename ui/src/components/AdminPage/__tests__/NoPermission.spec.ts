import { shallowMount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "../../../router/router";
import NoPermission from "../NoPermission.vue";

let wrapper: VueWrapper<InstanceType<typeof NoPermission>>;
let router: Router;

describe("NoPermission", () => {
  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes,
    });

    router.push("/");
    await router.isReady();

    wrapper = shallowMount(NoPermission, {
      global: {
        plugins: [router],
      },
    });
  });

  test("matches snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("On click redirects to login", async () => {
    const push = jest.spyOn(router, "push");
    const returnButton = wrapper.find("#returnButton");

    await returnButton.trigger("click");
    await nextTick();

    expect(push).toHaveBeenCalledWith("/");
  });
});
