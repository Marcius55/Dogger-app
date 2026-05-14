<template>
  <div class="about-page">
    <div class="about-content">
      <h1>About To-Do List</h1>

      <section class="about-section">
        <p>
          A modern to-do list application built with Vue.js to help you organize tasks,
          track deadlines, and stay productive.
        </p>
      </section>

      <section class="about-section">
        <h2>Features</h2>
        <ul class="features-list">
          <li>Create, edit, and delete tasks</li>
          <li>Search and filter functionality</li>
          <li>Track task status and deadlines</li>
          <li>Data persistence with localStorage</li>
        </ul>
      </section>

      <section class="about-section">
        <h2>Technology</h2>
        <div class="tech-stack">
          <span class="tech-badge">Vue 3</span>
          <span class="tech-badge">Vue Router</span>
          <span class="tech-badge">Pinia</span>
          <span class="tech-badge">SCSS</span>
        </div>
      </section>

      <div class="back-button-container">
        <button class="btn btn-primary" @click="goToHome">
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.about-page {
  max-width: 700px;
  margin: 0 auto;
}

.about-content {
  background: $bg-card;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(14, 165, 233, 0.3);

  h1 {
    color: $text-primary;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
}

.about-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(14, 165, 233, 0.2);

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  h2 {
    color: $accent-cyan;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: $text-secondary;
    line-height: 1.8;
    font-size: 1.05rem;
  }
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.75rem 0;
    font-size: 1.05rem;
    color: $text-secondary;
    border-bottom: 1px solid rgba(14, 165, 233, 0.1);
    position: relative;
    padding-left: 1.5rem;

    &:before {
      content: '▸';
      color: $accent-cyan;
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tech-badge {
  background: $blue-primary;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid $blue-primary;
}

.back-button-container {
  text-align: center;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
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

@media (max-width: 768px) {
  .about-content {
    padding: 2rem 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .about-section {
    h2 {
      font-size: 1.3rem;
    }
  }
}
</style>
