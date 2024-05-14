<template>
  <div v-if="movie.loader" class="icon-loader-block">
    <div class="icon-loader"></div>
  </div>
</template>

<script setup>
import { useMoviesStore } from '@/stores/movies'

const movie = useMoviesStore()
</script>

<style scoped>
.icon-loader-block {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.icon-loader {
  width: 100px;
  height: 100px;
  border: 15px solid #fff;
  border-bottom-color: transparent;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 50%;
  animation: loader-animation 1s linear infinite;
}

@keyframes loader-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
