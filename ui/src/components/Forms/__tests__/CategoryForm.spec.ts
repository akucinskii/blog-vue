import { createTestingPinia } from "@pinia/testing";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { mocked } from "ts-jest/utils";
import apiRequest from "../../../utils/apiRequest";
import CategoryForm from "../CategoryForm.vue";
import { isPassingValidation } from "../../../utils/IsPassingValidation";

jest.mock("../../../utils/apiRequest");
const mockedApiRequest = mocked(apiRequest);

let wrapper: VueWrapper<InstanceType<typeof CategoryForm>>;

describe("CategoryForm", () => {
  beforeEach(() => {
    wrapper = shallowMount(CategoryForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  test("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("Form is empty when mounted", () => {
    expect(wrapper.vm.categoryId).toEqual("");
    expect(wrapper.vm.categoryName).toEqual("");
  });

  test("category cannot be empty", () => {
    const emptyCategoryName = "";

    expect(isPassingValidation(emptyCategoryName, wrapper.vm.categoryRules)).toBe(false);
  });

  test("Correctly adds categories", async () => {
    const testName = "test";

    wrapper.vm.categoryName = testName;

    await wrapper.find("#addCategory").trigger("submit.prevent");

    expect(mockedApiRequest).toHaveBeenCalledWith("POST", "/categories", { name: testName });
  });

  test("Correctly removes categories", async () => {
    const testId = "test";

    wrapper.vm.categoryId = testId;

    await wrapper.find("#deleteCategory").trigger("submit.prevent");

    expect(mockedApiRequest).toHaveBeenCalledWith("DELETE", `/categories?category_id=${testId}`);
  });

  test("AddCategory on submit displays success message", async () => {
    await wrapper.find("#addCategory").trigger("submit.prevent");

    expect(wrapper.findComponent("#addCategoryMessage").html()).toContain("Category added successfully");
  });

  test("AddCategory on submit displays error message", async () => {
    mockedApiRequest.mockRejectedValueOnce({
      response: {
        data: {
          detail: "Cannot add category",
        },
      },
    });

    await wrapper.find("#addCategory").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent("#addCategoryMessage").html()).toContain("Cannot add category");
  });

  test("AddCategory on submit displays default error message", async () => {
    mockedApiRequest.mockRejectedValueOnce({});

    await wrapper.find("#addCategory").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent("#addCategoryMessage").html()).toContain("Something went wrong");
  });

  test("DeleteCategory on submit displays success message", async () => {
    await wrapper.find("#deleteCategory").trigger("submit.prevent");

    expect(wrapper.findComponent("#deleteCategoryMessage").html()).toContain("Category deleted successfully");
  });

  test("DeleteCategory on submit displays error message taken from response", async () => {
    mockedApiRequest.mockRejectedValueOnce({
      response: {
        data: {
          detail: "Cannot delete category",
        },
      },
    });

    await wrapper.find("#deleteCategory").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent("#deleteCategoryMessage").html()).toContain("Cannot delete category");
  });

  test("DeleteCategory on submit displays default error message", async () => {
    mockedApiRequest.mockRejectedValueOnce({});

    await wrapper.find("#deleteCategory").trigger("submit.prevent");
    await nextTick();

    expect(wrapper.findComponent("#deleteCategoryMessage").html()).toContain("Something went wrong");
  });
});
