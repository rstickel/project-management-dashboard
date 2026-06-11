<script setup lang="ts">
import AppSidebar from './components/layout/AppSidebar.vue';
import AppHeader from './components/layout/AppHeader.vue';
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <AppSidebar />

    <div class="flex flex-1 flex-col overflow-hidden">
      <AppHeader />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="container mx-auto px-6 py-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* You might add global styles here if not using Tailwind's utility classes directly */
</style>
