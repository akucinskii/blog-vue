import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import { AxiosResponse } from "axios";
import { mocked } from "ts-jest/utils";
import { nextTick } from "vue";
import apiRequest from "../../../utils/apiRequest";
import LoginForm from "../LoginForm.vue";
import MessageComponent from "../MessageComponent.vue";

jest.mock("../../../utils/apiRequest");
const mockedApiRequest = mocked(apiRequest);

describe("LoginForm", () => {
  test("renders without crashing", () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  test("Matches snapshot", () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Form is empty when mounted", () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.vm.password).toEqual("");
    expect(wrapper.vm.username).toEqual("");
  });

  test("api request is made when button is clicked", async () => {
    const wrapper = shallowMount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    wrapper.vm.username = "test";
    wrapper.vm.password = "test";

    mockedApiRequest.mockResolvedValueOnce({
      data: {
        token: "token",
      },
    } as AxiosResponse);

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(mockedApiRequest).toHaveBeenCalled();
  });

  test("displays correct error message when there is an error 422", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    wrapper.vm.username = "test";
    wrapper.vm.password = "test";

    mockedApiRequest.mockRejectedValueOnce({
      response: {
        status: 422,
        data: {
          detail: "error",
        },
      },
    });

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("Fields cannot be empty");
  });
  test("displays correct error message when there is an other error", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    wrapper.vm.username = "test";
    wrapper.vm.password = "test";

    mockedApiRequest.mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          detail: "error other than 422",
        },
      },
    });

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("error other than 422");
  });
});
