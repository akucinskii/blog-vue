<script setup lang="ts">
import RegisterForm from "../components/Forms/RegisterForm.vue";
</script>

<template>
  <v-main>
    <v-container class="h-100">
      <v-row align="center" class="h-100" no-gutters>
        <v-spacer />

        <v-col cols="12" sm="9" md="6" lg="4">
          <RegisterForm />
        </v-col>

        <v-spacer />
      </v-row>
    </v-container>
  </v-main>
</template>
