import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import { testUser } from "../../../utils/testData";
import apiRequest from "../../../utils/apiRequest";
import { mocked } from "ts-jest/utils";
import UpdateUserForm from "../UpdateUserForm.vue";

import MessageComponent from "../MessageComponent.vue";
import { nextTick } from "vue";

jest.mock("../../../utils/apiRequest");
const mockedApiRequest = mocked(apiRequest);

describe("UpdateUser", () => {
  test("updates user profile", async () => {
    const wrapper = shallowMount(UpdateUserForm, {
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

    await wrapper.find("v-form").trigger("submit.prevent");

    //makes an axios request
    expect(mockedApiRequest).toHaveBeenCalled();
  });

  test("updates user profile with default error", async () => {
    const wrapper = mount(UpdateUserForm, {
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

    // there is no response from the server
    mockedApiRequest.mockRejectedValueOnce({});
    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("Something went wrong");
  });

  test("updates user profile with error is being taken from response", async () => {
    const wrapper = mount(UpdateUserForm, {
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

    mockedApiRequest.mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          detail: "Other error",
        },
      },
    });

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("Other error");
  });

  test("Displays a message when user is not logged in", async () => {
    const wrapper = mount(UpdateUserForm, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: {
                user: null,
              },
            },
          }),
        ],
      },
    });

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("You are not logged in");
  });
});
