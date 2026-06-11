<script setup lang="ts">
import type { Task } from '../../types';
import { useDateFormat } from '../../composables/useDateFormat';
import { CheckCircleIcon, ExclamationCircleIcon, ClockIcon, PlayCircleIcon } from '@heroicons/vue/24/outline';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const dueDateFormatted = useDateFormat(props.task.dueDate).format();
const { isPast, isToday, isTomorrow } = useDateFormat(props.task.dueDate);

const statusIcon = (status: Task['status']) => {
  switch (status) {
    case 'To Do': return ClockIcon;
    case 'In Progress': return PlayCircleIcon;
    case 'Blocked': return ExclamationCircleIcon;
    case 'Done': return CheckCircleIcon;
    default: return ClockIcon;
  }
};

const statusColorClass = (status: Task['status']) => {
  switch (status) {
    case 'To Do': return 'text-gray-500';
    case 'In Progress': return 'text-blue-500';
    case 'Blocked': return 'text-red-500';
    case 'Done': return 'text-green-500';
    default: return 'text-gray-500';
  }
};

const priorityColorClass = (priority: Task['priority']) => {
  switch (priority) {
    case 'Low': return 'bg-gray-100 text-gray-700';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'High': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const dueDateClass = computed(() => {
  if (isPast.value && !props.task.status.includes('Done')) {
    return 'text-red-600 font-medium';
  }
  if (isToday.value) {
    return 'text-orange-600 font-medium';
  }
  if (isTomorrow.value) {
    return 'text-blue-600';
  }
  return 'text-gray-500';
});
</script>

<template>
  <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
    <div class="flex min-w-0 flex-1 items-center space-x-4">
      <component :is="statusIcon(task.status)" :class="['h-6 w-6 flex-shrink-0', statusColorClass(task.status)]" />
      <div class="min-w-0 flex-1">
        <h4 class="truncate text-lg font-medium text-gray-900">{{ task.title }}</h4>
        <p class="mt-1 truncate text-sm text-gray-600">{{ task.description }}</p>
      </div>
    </div>

    <div class="ml-4 hidden flex-shrink-0 md:block">
      <span
        :class="['inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium', priorityColorClass(task.priority)]"
      >
        {{ task.priority }} Priority
      </span>
    </div>

    <div class="ml-4 flex-shrink-0 text-sm text-gray-500">
      <span :class="['font-medium', dueDateClass]">Due: {{ dueDateFormatted }}</span>
    </div>

    <div class="ml-4 flex-shrink-0">
      <img
        class="h-8 w-8 rounded-full object-cover"
        :src="task.assignedTo.avatar"
        :alt="task.assignedTo.name"
        :title="task.assignedTo.name"
      />
    </div>
  </div>
</template>
