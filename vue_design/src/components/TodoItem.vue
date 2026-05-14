<template>
  <div class="todo-item" role="link" tabindex="0" @click="viewDetails" @keydown.enter.prevent="viewDetails" @keydown.space.prevent="viewDetails">
    <div class="todo-content">
      <div class="todo-header">
        <h3 class="todo-title">{{ todo.title }}</h3>
        <span class="todo-status" :class="statusClass">{{ todo.status }}</span>
      </div>

      <p class="todo-description">{{ truncatedDescription }}</p>

      <div class="todo-meta">
        <span class="todo-deadline">
          <strong>Deadline:</strong> {{ formattedDeadline }}
        </span>
      </div>
    </div>

    <div class="todo-actions">
      <button class="btn btn-edit" @click.stop="editTodo">Edit</button>
      <button v-if="todo.status === 'pending'" class="btn btn-success" @click.stop="markAsDone">
        Mark as Done
      </button>
      <button class="btn btn-danger" @click.stop="handleDelete">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStores'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const todoStore = useTodoStore()

const statusClass = computed(() => {
  return props.todo.status === 'pending' ? 'status-pending' : 'status-finished'
})

const truncatedDescription = computed(() => {
  if (props.todo.description.length > 100) {
    return props.todo.description.substring(0, 100) + '...'
  }
  return props.todo.description
})

const formattedDeadline = computed(() => {
  const date = new Date(props.todo.deadline)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const viewDetails = () => {
  router.push(`/details/${props.todo.id}`)
}

const editTodo = () => {
  router.push(`/edit/${props.todo.id}`)
}

const markAsDone = () => {
  todoStore.toggleStatus(props.todo.id)
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this to-do?')) {
    todoStore.deleteTodo(props.todo.id)
  }
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.todo-item {
  background: $bg-card;
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: 2px solid $accent-cyan;
    outline-offset: 2px;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
    transform: translateY(-2px);
    border-color: $blue-primary;
  }
}

.todo-content {
  margin-bottom: 1rem;
  transition: background-color 0.2s;
  padding: 0.5rem;
  margin: -0.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;

  &:hover {
    background-color: rgba(14, 165, 233, 0.1);
  }

  &:active {
    background-color: rgba(14, 165, 233, 0.2);
  }
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.todo-title {
  margin: 0;
  font-size: 1.25rem;
  color: $text-primary;
}

.todo-status {
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
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

.todo-description {
  margin: 0 0 1rem 0;
  color: $text-secondary;
  line-height: 1.6;
}

.todo-meta {
  color: $text-muted;
  font-size: 0.9rem;
}

.todo-deadline {
  strong {
    color: $accent-cyan;
  }
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    transform: translateY(-1px);
  }
}

.btn-edit {
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
</style>
