<script setup lang="ts"></script>

<template>
  <v-main>
    <v-container class="container">
      <v-responsive>
        <v-row>
          <v-spacer></v-spacer>
          <slot></slot>
          <v-spacer></v-spacer>
        </v-row>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1264px;
  margin: 0 auto;
}
</style>
