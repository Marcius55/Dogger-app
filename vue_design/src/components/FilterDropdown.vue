<template>
  <div class="filter-dropdown">
    <label for="status-filter">Filter by Status:</label>
    <select id="status-filter" v-model="selectedFilter" @change="handleChange" class="filter-select">
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="finished">Finished</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTodoStore } from '../stores/todoStores'

const todoStore = useTodoStore()
const selectedFilter = ref(todoStore.statusFilter)

const handleChange = () => {
  todoStore.setStatusFilter(selectedFilter.value)
}

// Sync with store if changed elsewhere
watch(() => todoStore.statusFilter, (newValue) => {
  selectedFilter.value = newValue
})
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.filter-dropdown {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  label {
    font-weight: 600;
    color: $accent-cyan;
    white-space: nowrap;
  }
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid rgba(14, 165, 233, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background-color: $bg-card;
  color: $text-primary;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;

  option {
    color: $text-primary;
    background-color: $bg-card;
  }

  &:focus {
    outline: none;
    border-color: $accent-cyan;
  }

  &:hover {
    border-color: $blue-primary;
  }
}
</style>
