<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Bars3Icon, BellIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';

const route = useRoute();

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard';
});

const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
    <div class="flex items-center space-x-4">
      <!-- Mobile menu button (hidden on larger screens, adjust as needed) -->
      <button class="text-gray-500 focus:outline-none md:hidden">
        <Bars3Icon class="h-6 w-6" />
      </button>
      <h1 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
    </div>

    <div class="flex items-center space-x-4">
      <button class="relative text-gray-600 hover:text-gray-900 focus:outline-none">
        <BellIcon class="h-6 w-6" />
        <span class="absolute -right-1 -top-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white"></span>
      </button>

      <div class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <img
            class="h-8 w-8 rounded-full object-cover"
            src="https://i.pravatar.cc/150?img=6"
            alt="User avatar"
          />
          <span class="hidden md:block">John Doe</span>
          <ChevronDownIcon class="h-4 w-4" />
        </button>

        <div
          v-if="dropdownOpen"
          @click.away="dropdownOpen = false"
          class="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <hr class="my-1 border-gray-100" />
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
        </div>
      </div>
    </div>
  </header>
</template>
