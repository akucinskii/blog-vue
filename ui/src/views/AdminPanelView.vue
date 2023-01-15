<script setup lang="ts">
import { useUserStore } from "../stores/user";
import CreatePostForm from "../components/Forms/CreatePostForm.vue";
import CategoryForm from "../components/Forms/CategoryForm.vue";
import NoPermission from "../components/AdminPage/NoPermission.vue";

const userStore = useUserStore();
</script>

<template>
  <v-main v-if="userStore.user && userStore.user.is_admin" id="adminPanel">
    <v-container class="h-100">
      <v-row class="h-100">
        <v-spacer />
        <v-col justify="center" cols="12" sm="9" md="6" lg="5" xl="4">
          <v-sheet elevation="3" class="my-4 pa-2" rounded="lg">
            <h1 class="text-center">Admin panel</h1>
          </v-sheet>
          <CreatePostForm />
          <CategoryForm />
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-main>

  <no-permission v-else />
</template>

<style lang="scss" scoped></style>
