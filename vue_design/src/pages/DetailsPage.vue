<template>
  <div class="details-page">
    <div v-if="!todo" class="not-found">
      <h2>To-Do Not Found</h2>
      <p>The to-do item you're looking for doesn't exist.</p>
      <button class="btn btn-primary" @click="goToHome">Back to List</button>
    </div>

    <div v-else class="todo-details">
      <div class="details-header">
        <h1>{{ todo.title }}</h1>
        <span class="todo-status" :class="statusClass">{{ todo.status }}</span>
      </div>

      <div class="details-section">
        <h3>Deadline</h3>
        <p class="deadline">{{ formattedDeadline }}</p>
      </div>

      <div class="details-section">
        <h3>Description</h3>
        <p class="description">{{ todo.description }}</p>
      </div>

      <div class="details-actions">
        <button class="btn btn-primary" @click="goToEdit">Edit</button>
        <button class="btn btn-success" @click="toggleTodoStatus">
          {{ todo.status === 'pending' ? 'Mark as Done' : 'Mark as Pending' }}
        </button>
        <button class="btn btn-danger" @click="handleDelete">Delete</button>
        <button class="btn btn-secondary" @click="goToHome">Back to List</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore } from '../stores/todoStores'

const router = useRouter()
const route = useRoute()
const todoStore = useTodoStore()

const todoId = route.params.id

const todo = computed(() => todoStore.getTodoById(todoId))

const statusClass = computed(() => {
  if (!todo.value) return ''
  return todo.value.status === 'pending' ? 'status-pending' : 'status-finished'
})

const formattedDeadline = computed(() => {
  if (!todo.value) return ''
  const date = new Date(todo.value.deadline)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const toggleTodoStatus = () => {
  if (todo.value) {
    todoStore.toggleStatus(todoId)
  }
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this to-do? This action cannot be undone.')) {
    todoStore.deleteTodo(todoId)
    router.push('/')
  }
}

const goToHome = () => {
  router.push('/')
}

const goToEdit = () => {
  router.push(`/edit/${todoId}`)
}

// Redirect to home if todo doesn't exist (after a short delay to show the message)
if (!todo.value) {
  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.details-page {
  max-width: 800px;
  margin: 0 auto;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: $bg-card;
  border-radius: 12px;
  border: 1px dashed rgba(14, 165, 233, 0.3);

  h2 {
    color: $text-primary;
    margin-bottom: 1rem;
  }

  p {
    color: $text-muted;
    margin-bottom: 2rem;
    font-size: 1.125rem;
  }
}

.todo-details {
  background: $bg-card;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(14, 165, 233, 0.3);

  h1 {
    margin: 0;
    color: $text-primary;
    font-size: 2rem;
    flex: 1;
  }
}

.todo-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  margin-left: 1rem;
  letter-spacing: 0.5px;
}

.status-pending {
  background-color: rgba(251, 191, 36, 0.2);
  color: $status-pending;
  border: 1px solid $status-pending;
}

.status-finished {
  background-color: rgba(16, 185, 129, 0.2);
  color: $status-finished;
  border: 1px solid $status-finished;
}

.details-section {
  margin-bottom: 2rem;

  h3 {
    color: $accent-cyan;
    font-size: 1.25rem;
    margin: 0 0 0.75rem 0;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: $text-secondary;
    line-height: 1.8;
    font-size: 1.05rem;
  }
}

.deadline {
  font-size: 1.1rem;
  color: $text-primary;
  font-weight: 500;
}

.description {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.details-actions {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(14, 165, 233, 0.3);
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
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

.btn-success {
  background: $accent-green;
  color: white;
  border: 1px solid $accent-green;

  &:hover {
    background: #059669;
  }
}

.btn-danger {
  background: $accent-red;
  color: white;
  border: 1px solid $accent-red;

  &:hover {
    background: #dc2626;
  }
}

.btn-secondary {
  background: $bg-secondary;
  color: $text-secondary;
  border: 1px solid rgba(203, 213, 225, 0.3);

  &:hover {
    color: $text-primary;
    border-color: $text-secondary;
  }
}

@media (max-width: 768px) {
  .details-header {
    flex-direction: column;
    align-items: flex-start;

    h1 {
      margin-bottom: 1rem;
    }
  }

  .todo-status {
    margin-left: 0;
  }

  .details-actions {
    flex-direction: column;

    .btn {
      width: 100%;
    }
  }
}
</style>
