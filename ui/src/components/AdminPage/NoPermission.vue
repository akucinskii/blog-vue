<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <v-main>
    <v-container>
      <v-row align="center" justify="center" class="h-100" no-gutters>
        <v-col>
          <v-spacer />
          <v-row justify="center" align="center">
            <h1 class="text-center py-8">You need to be admin to see this page</h1>
          </v-row>
          <v-row justify="center" align="center">
            <v-btn id="returnButton" @click="router.push('/')">Return to home page</v-btn>
          </v-row>
          <v-spacer />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
