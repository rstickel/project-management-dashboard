<script setup lang="ts">
interface Props {
  padding?: string; // Tailwind padding classes, e.g., 'p-6'
}

withDefaults(defineProps<Props>(), {
  padding: 'p-6',
});
</script>

<template>
  <div
    class="rounded-lg bg-white shadow-sm"
    :class="padding"
  >
    <slot />
  </div>
</template>
