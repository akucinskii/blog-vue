<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: false,
    default: "No text provided",
  },
});
</script>

<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card-text id="postText">
        <p class="text-body-1">{{ props.text }}</p>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped></style>
