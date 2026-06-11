<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
});

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const disabled = props.disabled ? 'opacity-60 cursor-not-allowed' : '';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
    ghost:
      'text-gray-700 hover:bg-gray-100 focus:ring-indigo-500',
  };

  return [
    base,
    sizeClasses[props.size],
    variantClasses[props.variant],
    disabled,
  ];
});
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
