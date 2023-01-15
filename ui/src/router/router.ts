import { createRouter, createWebHistory } from "vue-router";
import NavbarComponent from "../components/navbar/NavbarComponent.vue";
import CategoryView from "../views/CategoryView.vue";
import HomeView from "../views/HomeView.vue";
import PostView from "../views/PostView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import AdminPanelView from "../views/AdminPanelView.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: HomeView,
      Navbar: NavbarComponent,
    },
  },
  {
    path: "/post/:id",
    name: "post",
    components: {
      default: PostView,
      Navbar: NavbarComponent,
    },
  },

  {
    path: "/category/:id",
    name: "category",
    components: {
      default: CategoryView,
      Navbar: NavbarComponent,
    },
  },

  {
    path: "/login",
    name: "login",
    components: {
      default: LoginView,
      Navbar: NavbarComponent,
    },
  },
  {
    path: "/register",
    name: "register",
    components: {
      default: RegisterView,
      Navbar: NavbarComponent,
    },
  },
  {
    path: "/profile",
    name: "profile",
    components: {
      default: ProfileView,
      Navbar: NavbarComponent,
    },
  },
  {
    path: "/admin",
    name: "admin",
    components: {
      default: AdminPanelView,
      Navbar: NavbarComponent,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
