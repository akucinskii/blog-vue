import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import { AxiosResponse } from "axios";
import { mocked } from "ts-jest/utils";
import { nextTick } from "vue";
import apiRequest from "../../../utils/apiRequest";
import { isPassingValidation } from "../../../utils/IsPassingValidation";
import { testUser } from "../../../utils/testData";
import MessageComponent from "../MessageComponent.vue";
import RegisterForm from "../RegisterForm.vue";

jest.mock("../../../utils/apiRequest");
const mockedApiRequest = mocked(apiRequest);

describe("RegisterForm", () => {
  test("renders without crashing", () => {
    const wrapper = shallowMount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  test("Form is empty when mounted", () => {
    const wrapper = shallowMount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.vm.user).toEqual({
      avatar_url: "",
      description: "",
      is_admin: false,
      name: "",
      password: "",
      surname: "",
      username: "",
    });
  });

  test("Submit button is disabled when form is initially mounted or empty", () => {
    const wrapper = shallowMount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.find("#submitButton").attributes("disabled")).toEqual("true");
  });

  test("Checking password if it matches rules ", () => {
    const wrapper = shallowMount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    /*
      passwordRules = [
        (v: string) => !!v || "Password is required",
        (v: string) => v.length >= 8 || "Password must be at least 8 characters",
        (v: string) => v.length <= 20 || "Password must be less than 20 characters",
        (v: string) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v: string) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v: string) => /[0-9]/.test(v) || "Password must contain at least one number",
        (v: string) => /[^a-zA-Z0-9]/.test(v) || "Password must contain at least one special character",
      ];

      */

    const emptyPassword = "";
    expect(isPassingValidation(emptyPassword, wrapper.vm.passwordRules)).toBe(false);

    const badPassword = "1234567";
    expect(isPassingValidation(badPassword, wrapper.vm.passwordRules)).toBe(false);

    const noBigLetterPasswrod = "password123.";
    expect(isPassingValidation(noBigLetterPasswrod, wrapper.vm.passwordRules)).toBe(false);

    const noSmallLetterPassword = "PASSWORD123.";
    expect(isPassingValidation(noSmallLetterPassword, wrapper.vm.passwordRules)).toBe(false);

    const tooBigPassword = "password1234567890123456789012345678901";
    expect(isPassingValidation(tooBigPassword, wrapper.vm.passwordRules)).toBe(false);

    const noNumberPassword = "Password.";
    expect(isPassingValidation(noNumberPassword, wrapper.vm.passwordRules)).toBe(false);

    const noSpecialCharacterPassword = "Password123";
    expect(isPassingValidation(noSpecialCharacterPassword, wrapper.vm.passwordRules)).toBe(false);

    const goodPassword = "Password123.";
    expect(isPassingValidation(goodPassword, wrapper.vm.passwordRules)).toBe(true);
  });

  test("Username should pass rules ", () => {
    const wrapper = shallowMount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const emptyUsername = "";
    expect(isPassingValidation(emptyUsername, wrapper.vm.usernameRules)).toBe(false);

    const tooShortUsername = "aa";
    expect(isPassingValidation(tooShortUsername, wrapper.vm.usernameRules)).toBe(false);

    const tooLongUsername = "a".repeat(21);
    expect(isPassingValidation(tooLongUsername, wrapper.vm.usernameRules)).toBe(false);

    const goodUsername = "aaaaaa";
    expect(isPassingValidation(goodUsername, wrapper.vm.usernameRules)).toBe(true);
  });

  test("Checking if Password and Confirm Password match", () => {
    const wrapper = shallowMount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const emptyConfirmPassword = "";
    expect(isPassingValidation(emptyConfirmPassword, wrapper.vm.passwordConfirmationRules)).toBe(false);

    const matchingPassword = "Password123.";
    wrapper.vm.user.password = "Password123.";
    expect(isPassingValidation(matchingPassword, wrapper.vm.passwordConfirmationRules)).toBe(true);

    const notMatchingPassword = "Password1234.";
    expect(isPassingValidation(notMatchingPassword, wrapper.vm.passwordConfirmationRules)).toBe(false);
  });

  test("Creates a new user on submit", async () => {
    const wrapper = shallowMount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    mockedApiRequest.mockResolvedValueOnce({} as AxiosResponse);
    wrapper.vm.user = testUser;

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(mockedApiRequest).toHaveBeenCalledWith("POST", "/users", testUser);
  });

  test("Displays custom error message is taken", async () => {
    const wrapper = mount(RegisterForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    mockedApiRequest.mockRejectedValueOnce({
      response: {
        data: {
          detail: "Username is taken",
        },
      },
    });
    wrapper.vm.user = testUser;

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("Username is taken");
  });
});
