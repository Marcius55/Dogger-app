<template>
  <div class="edit-page">
    <h2>Edit To-Do</h2>

    <div v-if="!todo" class="not-found">
      <p>To-do not found. Redirecting...</p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="todo-form">
      <div class="form-group">
        <label for="title">Title *</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          placeholder="Enter to-do title"
          required
        />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label for="description">Description *</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Enter to-do description"
          rows="5"
          required
        ></textarea>
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>

      <div class="form-group">
        <label for="deadline">Deadline *</label>
        <input
          id="deadline"
          v-model="formData.deadline"
          type="date"
          required
        />
        <span v-if="errors.deadline" class="error">{{ errors.deadline }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Save Changes</button>
        <button type="button" class="btn btn-secondary" @click="handleCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore } from '../stores/todoStores'

const router = useRouter()
const route = useRoute()
const todoStore = useTodoStore()

const todoId = route.params.id
const todo = computed(() => todoStore.getTodoById(todoId))

const formData = ref({
  title: '',
  description: '',
  deadline: ''
})

const errors = ref({
  title: '',
  description: '',
  deadline: ''
})

onMounted(() => {
  if (todo.value) {
    formData.value = {
      title: todo.value.title,
      description: todo.value.description,
      deadline: todo.value.deadline
    }
  } else {
    // Redirect if todo not found
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
})

const validateForm = () => {
  errors.value = {
    title: '',
    description: '',
    deadline: ''
  }

  let isValid = true

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
    isValid = false
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'Description is required'
    isValid = false
  }

  if (!formData.value.deadline) {
    errors.value.deadline = 'Deadline is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    todoStore.updateTodo(todoId, {
      title: formData.value.title,
      description: formData.value.description,
      deadline: formData.value.deadline
    })

    // Navigate back to details page
    router.push(`/details/${todoId}`)
  }
}

const handleCancel = () => {
  router.push(`/details/${todoId}`)
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.edit-page {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    margin-bottom: 2rem;
    color: $text-primary;
  }
}

.not-found {
  text-align: center;
  padding: 2rem;
  color: $text-muted;
  background: $bg-card;
  border-radius: 12px;
  border: 1px dashed rgba(14, 165, 233, 0.3);
}

.todo-form {
  background: $bg-card;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: $accent-cyan;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid rgba(14, 165, 233, 0.3);
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    background-color: $bg-secondary;
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

  textarea {
    resize: vertical;
  }

  .error {
    display: block;
    margin-top: 0.25rem;
    color: $accent-red;
    font-size: 0.875rem;
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
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

.btn-secondary {
  background: $bg-secondary;
  color: $text-secondary;
  border: 1px solid rgba(203, 213, 225, 0.3);

  &:hover {
    color: $text-primary;
    border-color: $text-secondary;
  }
}
</style>
