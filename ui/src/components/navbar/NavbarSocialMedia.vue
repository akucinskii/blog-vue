<script setup lang="ts"></script>
<template>
  <div class="social-media__container">
    <a href="https://facebook.com/rl9official" target="_blank">
      <button>
        <v-icon>mdi-facebook</v-icon>
      </button>
    </a>
    <a href="https://www.youtube.com/channel/UCZXD4PIYIwC48tkTsdGAKYw" target="_blank">
      <button>
        <v-icon>mdi-youtube</v-icon>
      </button>
    </a>
    <a href="https://www.instagram.com/_rl9" target="_blank">
      <button>
        <v-icon>mdi-instagram</v-icon>
      </button>
    </a>
  </div>
</template>
<style lang="scss">
.social-media__container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  gap: 0.5rem;
  color: #777;
}
</style>
