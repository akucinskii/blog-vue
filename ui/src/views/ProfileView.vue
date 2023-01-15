<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import UpdateForm from "../components/Forms/UpdateUserForm.vue";

const userStore = useUserStore();
const router = useRouter();

const handleLogout = async () => {
  userStore.logOut();
  router.push("/login");
};
</script>

<template>
  <v-main v-if="userStore.user" id="profile" class="mt-8">
    <v-container class="h-100">
      <v-row align="center" class="h-100" no-gutters>
        <v-spacer />

        <v-col justify="center" cols="12" sm="9" md="6" lg="4">
          <v-sheet elevation="3" rounded="lg" class="pa-8">
            <v-row>
              <v-col justify="center" class="text-center">
                <v-row justify="center" class="my-2">
                  <v-avatar color="red" size="100">
                    <v-img height="100%" :src="userStore.user.avatar_url" cover aspect-ratio="1/1" alt="Avatar image" />
                  </v-avatar>
                </v-row>
                <h1 class="text-center">{{ userStore.user.username }}</h1>
                <h5>Name: {{ userStore.user.name }}</h5>
                <h5>Surname: {{ userStore.user.surname }}</h5>
              </v-col>
            </v-row>

            <v-row v-if="userStore.user.is_admin" id="admin" justify="center" class="my-4">
              <v-btn @click="router.push('/admin')">Admin panel</v-btn>
            </v-row>

            <UpdateForm />
          </v-sheet>
          <v-row class="mt-4 pa-4" justify="center">
            <v-row justify="center">
              <v-btn id="logoutButton" class="px-8" type="submit" @click="handleLogout">Logout</v-btn>
            </v-row>
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-main>

  <v-main v-else id="unathorized">
    <v-container>
      <v-row align="center" justify="center" class="h-100" no-gutters>
        <v-col>
          <v-spacer />
          <v-row justify="center" align="center">
            <h1 class="text-center py-8">You need to be logged in to see this page</h1>
          </v-row>
          <v-row justify="center" align="center">
            <v-btn @click="router.push('/')">Return to home page</v-btn>
          </v-row>
          <v-spacer />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped lang="scss">
.text--white {
  color: white !important;
}
</style>
