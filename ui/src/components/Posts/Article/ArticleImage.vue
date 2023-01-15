<script setup lang="ts">
const { imageUrl } = defineProps({
  imageUrl: {
    type: String,
    required: false,
    default: "./robert.jpg",
  },
});
</script>

<template>
  <v-row
    ><v-col cols="12" sm="12" class="text-center">
      <v-img :src="imageUrl" contain alt="Image"></v-img>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped></style>
