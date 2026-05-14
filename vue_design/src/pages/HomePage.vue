<template>
  <div class="home-page">
    <div class="page-header">
      <h2>My To-Do List</h2>
      <div class="stats">
        <span class="stat">
          <strong>Pending:</strong> {{ todoStore.pendingCount }}
        </span>
        <span class="stat">
          <strong>Finished:</strong> {{ todoStore.finishedCount }}
        </span>
      </div>
    </div>

    <div class="controls">
      <search-bar />
      <div class="controls-right">
        <filter-dropdown />
        <button class="btn btn-primary" @click="goToCreate">
          + Add New To-Do
        </button>
      </div>
    </div>

    <div v-if="todoStore.filteredTodos.length === 0" class="empty-state">
      <p v-if="todoStore.todos.length === 0">
        No to-dos yet. Click "Add New To-Do" to create your first one!
      </p>
      <p v-else>
        No to-dos match your search or filter criteria.
      </p>
    </div>

    <div v-else class="todo-list">
      <todo-item
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        :todo="todo"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStores'
import SearchBar from '../components/SearchBar.vue'
import FilterDropdown from '../components/FilterDropdown.vue'
import TodoItem from '../components/TodoItem.vue'

const router = useRouter()
const todoStore = useTodoStore()

const goToCreate = () => {
  router.push('/create')
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.home-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
    color: $text-primary;
  }
}

.stats {
  display: flex;
  gap: 1.5rem;

  .stat {
    font-size: 1rem;
    color: $text-secondary;
    padding: 0.5rem 1rem;
    background: rgba(14, 165, 233, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(14, 165, 233, 0.3);

    strong {
      color: $accent-cyan;
    }
  }
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;

  > :first-child {
    flex: 1;
    min-width: 250px;
  }
}

.controls-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-weight: 600;

  &:hover {
    transform: translateY(-1px);
  }
}

.btn-primary {
  background: $blue-primary;
  color: white;
  border: 1px solid $blue-primary;

  &:hover {
    background: $accent-cyan;
    border-color: $accent-cyan;
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: $text-muted;
  font-size: 1.125rem;
  background: $bg-card;
  border-radius: 12px;
  border: 1px dashed rgba(14, 165, 233, 0.3);

  p {
    margin: 0;
    color: $text-secondary;
  }
}

.todo-list {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;

    > :first-child {
      width: 100%;
    }
  }

  .controls-right {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
    }
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .stats {
    flex-direction: column;
    width: 100%;

    .stat {
      width: 100%;
    }
  }
}
</style>
