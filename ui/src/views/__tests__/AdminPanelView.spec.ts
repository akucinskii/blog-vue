import { createTestingPinia } from "@pinia/testing";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import NoPermission from "../../components/AdminPage/NoPermission.vue";
import { testUser } from "../../utils/testData";
import AdminPanelView from "../AdminPanelView.vue";

let wrapper: VueWrapper<InstanceType<typeof AdminPanelView>>;

describe("AdminPanelView", () => {
  beforeEach(() => {
    wrapper = shallowMount(AdminPanelView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  test("if user is authorized and is admin renders admin panel", () => {
    wrapper = shallowMount(AdminPanelView, {
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

    expect(wrapper.find("#adminPanel").exists()).toBe(true);
  });

  test("if user is not authorized renders correct page", () => {
    expect(wrapper.find("#adminPanel").exists()).toBe(false);

    expect(wrapper.findComponent(NoPermission).exists()).toBe(true);
  });
});
