module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "@vue/typescript/recommended", "plugin:vue/vue3-recommended", "prettier"],
  ignorePatterns: ["node_modules"],

  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/no-setup-props-destructure": "off",
  },
};
