<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search by title or description..."
        @input="handleInput"
      />
      <button v-if="searchQuery" class="clear-btn" @click="clearSearch" title="Clear search">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTodoStore } from '../stores/todoStores'

const todoStore = useTodoStore()
const searchQuery = ref(todoStore.searchQuery)

let debounceTimeout = null

const handleInput = () => {
  // Debounce the search input for 300ms
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    todoStore.setSearchQuery(searchQuery.value)
  }, 300)
}

const clearSearch = () => {
  searchQuery.value = ''
  todoStore.setSearchQuery('')
}

// Sync with store if changed elsewhere
watch(() => todoStore.searchQuery, (newValue) => {
  searchQuery.value = newValue
})
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.search-bar {
  margin-bottom: 1rem;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid rgba(14, 165, 233, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background-color: $bg-card;
  color: $text-primary;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: $accent-cyan;
  }

  &::placeholder {
    color: $text-muted;
  }
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: $text-muted;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: $accent-cyan;
  }
}
</style>
