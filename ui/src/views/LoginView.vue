<script setup lang="ts">
import LoginForm from "../components/Forms/LoginForm.vue";
</script>

<template>
  <v-main>
    <v-container class="h-100">
      <v-row align="center" class="h-100" no-gutters>
        <v-spacer />

        <v-col cols="12" sm="8" md="5">
          <LoginForm />
        </v-col>

        <v-spacer />
      </v-row>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.text--white {
  color: white !important;
}
.text--gray {
  color: gray !important;
}
</style>
