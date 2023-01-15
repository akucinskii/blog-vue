import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { mocked } from "ts-jest/utils";
import apiRequest from "../../../utils/apiRequest";
import CreatePostForm from "../CreatePostForm.vue";
import MessageComponent from "../MessageComponent.vue";

let wrapper: VueWrapper<InstanceType<typeof CreatePostForm>>;

jest.mock("../../../utils/apiRequest");
const mockedApiRequest = mocked(apiRequest);

describe("createPostForm", () => {
  beforeEach(() => {
    wrapper = shallowMount(CreatePostForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  test("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("matches snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("form on submit adds a post", async () => {
    const testPostForm = {
      title: "test",
      text: "test",
      category_id: "test",
      image_url: "test",
      big_image_url: "test",
      disabled: false,
    };

    wrapper.vm.postForm = testPostForm;

    await wrapper.find("v-form").trigger("submit.prevent");

    expect(mockedApiRequest).toHaveBeenCalledWith("POST", "/posts", testPostForm);
  });

  test("form on submit displays success message", async () => {
    wrapper = mount(CreatePostForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("Post created successfully");
  });

  test("form on submit displays error message", async () => {
    wrapper = mount(CreatePostForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    mockedApiRequest.mockRejectedValueOnce({
      response: {
        data: {
          status: 400,
          detail: "test",
        },
      },
    });

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("test");
  });

  test("form on submit displays error message when there is no response", async () => {
    wrapper = mount(CreatePostForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    mockedApiRequest.mockRejectedValueOnce({});

    await wrapper.find("v-form").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent(MessageComponent).text()).toContain("Something went wrong");
  });
});
