<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <v-main class="mt-16">
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="6" class="m-0 mb-8">
          <v-row>
            <v-col cols="12" sm="12" class="text-center">
              <h1 id="message">Post not found</h1>
            </v-col>
            <v-col cols="12" sm="12" class="text-center">
              <v-btn id="returnButton" variant="outlined" @click="router.push('/')">Go to home page</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped lang="scss"></style>
