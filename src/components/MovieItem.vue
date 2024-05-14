<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBG"></div>
    <div class="movie-info-wrap d-flex flex-column justify-space-between">
      <div class="movie-item-info">
        <h3 class="movie-title">{{ props.movie.Title }}</h3>
        <span class="movie-year">{{ props.movie.Year }}</span>
      </div>
      <v-row class="movie-item-controls align-end">
        <v-col>
          <v-btn variant="outlined" block color="white" @click="showInfoModalEvent">Info</v-btn>
        </v-col>
        <v-col>
          <v-btn variant="outlined" block color="white" @click="emitRemoveEvent">Remove</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const posterBG = computed(() => {
  return { 'background-image': `url(${props.movie.Poster})` }
})

const emitRemoveEvent = () => {
  emit('removeItem', { id: props.movie.imdbID, title: props.movie.Title })
}

const showInfoModalEvent = () => {
  emit('showModal', props.movie.imdbID)
}

const emit = defineEmits(['showModal', 'removeItem'])
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 400px;
}

.movie-item:hover {
  box-shadow: 0 5px 15px 3px #242121;
  transform: scale(1.02);
}

.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.movie-info-wrap {
  padding: 20px 10px 10px 10px;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
}

.movie-item:hover .movie-info-wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.6);
}

.movie-title {
  font-size: 20px;
  color: #fff;
}

.movie-year {
  font-size: 14px;
  color: #fff;
}

.movie-item-controls:deep(.v-btn:hover) {
  background-color: #fff;
}

.movie-item-controls:deep(.v-btn:hover .v-btn__content) {
  color: #000;
}
</style>
