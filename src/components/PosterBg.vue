<template>
  <div class="poster-page-bg" :style="posterStyle"></div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  poster: {
    type: String,
    default: ''
  }
})

const defaultPosterBg = ref('linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)')

const posterStyle = computed(() => {
  return {
    'background-image': posterBG.value
  }
})

const posterBG = computed(() => {
  return props.poster ? `url(${props.poster})` : defaultPosterBg.value
})
</script>

<style scoped>
.poster-page-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
}

.poster-page-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
  opacity: 0.7;
}
</style>
