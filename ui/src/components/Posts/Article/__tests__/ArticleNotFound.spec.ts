import { shallowMount } from "@vue/test-utils";
import ArticleNotFound from "../ArticleNotFound.vue";
import { useRouter, useRoute } from "vue-router";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}));

describe("Post page with a 404", () => {
  (useRoute as jest.Mock).mockImplementationOnce(() => ({
    params: {
      id: 1241124124,
    },
  }));

  const push = jest.fn();
  (useRouter as jest.Mock).mockImplementationOnce(() => ({
    push,
  }));

  const wrapper = shallowMount(ArticleNotFound, {
    global: {
      stubs: ["router-link", "router-view"],
    },
  });
  expect(wrapper.findComponent(ArticleNotFound).exists()).toBe(true);

  test("Testing button and message", async () => {
    await wrapper.find("#returnButton").trigger("click");
    expect(wrapper.find("#message").text()).toBe("Post not found");
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/");
  });
});
