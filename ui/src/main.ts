import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { loadFonts } from "./plugins/webfontloader";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/router";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);

loadFonts();

app.use(createPinia());
app.use(vuetify);
app.use(router);

app.mount("#app");
