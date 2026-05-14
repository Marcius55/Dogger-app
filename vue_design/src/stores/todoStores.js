import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-todos'

const DEFAULT_TODOS = [
  {
    id: 1,
    title: 'Feed the cat',
    description: 'Refill the food bowl and make sure fresh water is available.',
    deadline: '2026-05-05',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Vacuum the living room',
    description: 'Clean the floor, corners, and under the couch.',
    deadline: '2026-05-04',
    status: 'finished'
  },
  {
    id: 3,
    title: 'Walk the dog',
    description: 'Take the dog outside for a short walk around the block.',
    deadline: '2026-05-06',
    status: 'pending'
  },
  {
    id: 4,
    title: 'Wash the dishes',
    description: 'Clean the plates, cups, and cutlery after dinner.',
    deadline: '2026-05-07',
    status: 'finished'
  },
  {
    id: 5,
    title: 'Clean the hamster cage',
    description: 'Replace the bedding, remove old food, and refresh the habitat.',
    deadline: '2026-05-08',
    status: 'pending'
  }
]

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: DEFAULT_TODOS,
    searchQuery: '',
    statusFilter: 'all'
  }),

  getters: {
    filteredTodos: (state) => {
      let filtered = state.todos

      // Filter by search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(todo =>
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query)
        )
      }

      // Filter by status
      if (state.statusFilter !== 'all') {
        filtered = filtered.filter(todo => todo.status === state.statusFilter)
      }

      return filtered
    },

    getTodoById: (state) => (id) => {
      return state.todos.find(todo => String(todo.id) === String(id))
    },

    pendingCount: (state) => {
      return state.todos.filter(todo => todo.status === 'pending').length
    },

    finishedCount: (state) => {
      return state.todos.filter(todo => todo.status === 'finished').length
    }
  },

  actions: {
    loadFromLocalStorage() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          this.todos = JSON.parse(stored)
        }
      } catch (error) {
        console.error('Error loading todos from localStorage:', error)
        this.todos = []
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
      } catch (error) {
        console.error('Error saving todos to localStorage:', error)
      }
    },

    addTodo(todo) {
      this.todos.push({
        id: crypto.randomUUID(),
        ...todo,
        status: 'pending'
      })
      this.saveToLocalStorage()
    },

    updateTodo(id, updates) {
      const index = this.todos.findIndex(todo => String(todo.id) === String(id))
      if (index !== -1) {
        this.todos[index] = { ...this.todos[index], ...updates }
        this.saveToLocalStorage()
      }
    },

    deleteTodo(id) {
      this.todos = this.todos.filter(todo => String(todo.id) !== String(id))
      this.saveToLocalStorage()
    },

    toggleStatus(id) {
      const todo = this.todos.find(todo => String(todo.id) === String(id))
      if (todo) {
        todo.status = todo.status === 'pending' ? 'finished' : 'pending'
        this.saveToLocalStorage()
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setStatusFilter(filter) {
      this.statusFilter = filter
    }
  }
})
