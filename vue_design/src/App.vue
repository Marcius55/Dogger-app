<template>
  <div id="app">
    <header class="app-header">
      <h1>To-Do List</h1>
      <nav>
        <router-link to="/">Overview</router-link>
        <router-link to="/details/1">Detail</router-link>
        <router-link to="/create">Add Todo</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
// Main app component with router-view for navigation
</script>

<style scoped lang="scss">
@use './styles/variables' as *;

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $bg-primary;
}

.app-header {
  background: linear-gradient(135deg, $bg-secondary 0%, $blue-primary 100%);
  color: $text-primary;
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.2);
  border-bottom: 2px solid $blue-primary;

  h1 {
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
    color: $text-primary;
  }

  nav {
    display: flex;
    gap: 1.5rem;

    a {
      color: $text-secondary;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      border: 1px solid transparent;

      &:hover {
        color: $accent-cyan;
        border-color: $accent-cyan;
      }

      &.router-link-active {
        color: $accent-cyan;
        background-color: rgba(6, 182, 212, 0.1);
        border-color: $accent-cyan;
      }
    }
  }
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
