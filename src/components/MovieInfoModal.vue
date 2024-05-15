<template>
  <div class="movie-info-wrap">
    <header class="movie-info-header">
      <h6 class="movie-header-title">Movie view</h6>
      <v-btn icon="mdi-close" @click="closeModal"></v-btn>
    </header>
    <div class="movie-info-content">
      <v-row>
        <v-col cols="4">
          <div class="movie-poster-wrap">
            <div class="movie-poster" :style="posterStyle"></div>
          </div>
        </v-col>
        <v-col cols="8">
          <h3 class="movie-title">{{ props.movie.Title }}</h3>
          <div class="d-flex align-center my-3">
            <v-rating
              :model-value="props.movie.imdbRating"
              readonly
              half-increments
              density="comfortable"
              length="10"
              class="mr-2"
            ></v-rating>
            {{ props.movie.imdbRating }} / 10
          </div>
          <p class="movie-description pb-4">{{ props.movie.Plot }}</p>
          <div class="d-flex align-center ga-2 pb-4">
            <p class="badges">{{ props.movie.Year }}</p>
            <p class="badges">{{ props.movie.Runtime }}</p>
            <p class="badges">{{ props.movie.Genre }}</p>
            <p class="badges">{{ props.movie.Language }}</p>
          </div>
          <v-table>
            <tbody>
              <tr>
                <th class="table-info-head">Production</th>
                <td>{{ props.movie.Production }}</td>
              </tr>
              <tr>
                <th class="table-info-head">Country</th>
                <td>{{ props.movie.Country }}</td>
              </tr>
              <tr>
                <th class="table-info-head">Director</th>
                <td>{{ props.movie.Director }}</td>
              </tr>
              <tr>
                <th class="table-info-head">Writer</th>
                <td>{{ props.movie.Writer }}</td>
              </tr>
              <tr>
                <th class="table-info-head">Actors</th>
                <td>{{ props.movie.Actors }}</td>
              </tr>
              <tr>
                <th class="table-info-head">Awards</th>
                <td>{{ props.movie.Awards }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})
import { ref, computed } from 'vue'

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

const defaultPosterBg = ref('linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)')

const posterStyle = computed(() => {
  return {
    'background-image': posterBG.value
  }
})

const posterBG = computed(() => {
  return props.movie.Poster ? `url(${props.movie.Poster})` : defaultPosterBg.value
})
</script>

<style scoped>
.movie-info-wrap {
  width: 100%;
}

.movie-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(45deg, rgb(78, 78, 82) 0%, rgb(82, 15, 117) 100%);
  color: #fff;
  padding: 0.5rem 1rem;
}

.movie-header-title {
  line-height: 1.5;
  font-size: 1.25rem;
}

.movie-poster-wrap {
  position: relative;
  padding-bottom: 150%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.movie-info-content {
  padding: 1rem;
}

.movie-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: 200;
  line-height: 1.2;
}

.movie-description {
  font-size: 1.1rem;
  font-weight: 300;
}

.badges {
  font-size: 11px;
  background-color: #4caf50;
  border-radius: 6px;
  padding: 1px 6px;
  color: #fff;
}

.table-info-head {
  font-weight: 700 !important;
}
</style>
