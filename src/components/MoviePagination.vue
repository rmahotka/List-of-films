<template>
  <div class="movie-pagination">
    <v-pagination
      v-model="currentPageModel"
      :length="totalPages"
      :total-visible="4"
      rounded="circle"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 1
  }
})

const totalPages = computed(() => {
  return Math.ceil(props.total / props.perPage)
})

const currentPageModel = computed({
  get() {
    return props.currentPage
  },
  set(value) {
    emit('pageChanged', value)
  }
})

const emit = defineEmits(['pageChanged'])
</script>

<style scoped>
.movie-pagination:deep(.v-pagination__item .v-btn),
.movie-pagination:deep(.v-pagination__prev .v-btn),
.movie-pagination:deep(.v-pagination__next .v-btn) {
  background-color: #ebebeb;
  font-size: 18px;
}

.movie-pagination:deep(.v-pagination__item--is-active .v-btn) {
  background-color: rgb(144, 57, 190);
  color: #fff;
}
</style>
