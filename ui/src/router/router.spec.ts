import router from "./router";

describe("Router", () => {
  it("is defined", () => {
    expect(router).toBeDefined();
  });
  it("Has correct routes", () => {
    expect(router.options.routes[0].path).toBe("/");
    expect(router.options.routes[1].path).toBe("/post/:id");
    expect(router.options.routes[2].path).toBe("/category/:id");
    expect(router.options.routes[3].path).toBe("/login");
    expect(router.options.routes[4].path).toBe("/register");
  });
});
