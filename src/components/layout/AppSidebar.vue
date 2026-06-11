<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { HomeIcon, BriefcaseIcon, ClipboardDocumentListIcon, ChartPieIcon } from '@heroicons/vue/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Projects', href: '/projects', icon: BriefcaseIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon }, // Placeholder
];

const isOpen = ref(true);
</script>

<template>
  <div
    :class="[
      isOpen ? 'w-64' : 'w-20',
      'relative flex flex-col bg-gray-800 text-white transition-all duration-300 ease-in-out'
    ]"
  >
    <div class="flex h-16 items-center px-4">
      <RouterLink to="/" class="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
        <span v-if="isOpen" class="text-2xl font-semibold text-white">PM Dashboard</span>
      </RouterLink>
    </div>

    <nav class="flex-1 space-y-2 px-2 py-4">
      <RouterLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
        active-class="bg-gray-700 text-white"
        inactive-class="text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <component :is="item.icon" class="h-6 w-6 flex-shrink-0" />
        <span v-if="isOpen" class="ml-3">{{ item.name }}</span>
      </RouterLink>
    </nav>

    <div class="absolute -right-3 top-8">
      <button
        @click="isOpen = !isOpen"
        class="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 bg-gray-800 text-gray-400 shadow-md transition-colors duration-200 hover:bg-gray-700 focus:outline-none"
      >
        <svg
          v-if="isOpen"
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <svg
          v-else
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
