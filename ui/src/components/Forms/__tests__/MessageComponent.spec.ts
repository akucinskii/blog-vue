import MessageComponent from "../MessageComponent.vue";
import { mount } from "@vue/test-utils";

describe("message component", () => {
  test("should match snapshot", () => {
    const wrapper = mount(MessageComponent);

    expect(wrapper.element).toMatchSnapshot();
  });

  test("should render the correct message", () => {
    const props = {
      text: "test message",
      type: "success",
    };

    const wrapper = mount(MessageComponent, {
      props,
    });
    expect(wrapper.find("#message").text()).toBe(props.text);
  });

  test("should render the success as default", () => {
    const props = {
      message: "test message",
      type: "SOMETHING",
    };

    const wrapper = mount(MessageComponent, {
      props,
    });

    expect(wrapper.vm.type).toBe("success");
  });

  test("should render the error type", () => {
    const props = {
      message: "test message",
      type: "error",
    };

    const wrapper = mount(MessageComponent, {
      props,
    });

    expect(wrapper.vm.type).toBe("error");
  });
});
