<template>
  <div class="navbar-header">
    <v-container>
      <div class="navbar-header-block">
        <p class="navbar-logo">MovieDB</p>
        <input type="text" placeholder="Search" class="input-search" v-model="searchValue" />
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import { useMoviesStore } from '@/stores/movies'

const moveStore = useMoviesStore()

const searchValue = ref('')

const onSearchValueChange = (val) => {
  if (val) {
    moveStore.searchMovue(val)
    moveStore.isSearch = true
  } else {
    moveStore.fetchMovies()
    moveStore.isSearch = false
  }
}

watch(
  () => searchValue.value,
  debounce((newValue) => {
    onSearchValueChange(newValue)
  }, 500)
)
</script>

<style scoped>
.navbar-header {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.navbar-header-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  font-size: 20px;
  font-weight: 600;
}

.input-search {
  padding: 4px 8px;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-size: 16px;
}

.input-search::placeholder {
  color: #fff;
  opacity: 0.7;
}

.input-search:focus-visible {
  outline: 0;
}
</style>
