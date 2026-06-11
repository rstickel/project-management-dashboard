<script setup lang="ts">
import { useTaskStore } from '../stores/task';
import { useProjectStore } from '../stores/project';
import { computed, ref } from 'vue';
import TaskListItem from '../components/tasks/TaskListItem.vue';
import BaseButton from '../components/shared/BaseButton.vue';
import BaseCard from '../components/shared/BaseCard.vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import type { TaskStatus, TaskPriority } from '../types';

const taskStore = useTaskStore();
const projectStore = useProjectStore();

const searchQuery = ref('');
const selectedStatus = ref<TaskStatus | ''>('');
const selectedPriority = ref<TaskPriority | ''>('');
const selectedProject = ref<string | ''>('');
const sortBy = ref<'dueDate' | 'priority' | 'status'>('dueDate');
const sortDirection = ref<'asc' | 'desc'>('asc');

const allStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Blocked', 'Done'];
const allPriorities: TaskPriority[] = ['Low', 'Medium', 'High'];
const allProjects = computed(() => projectStore.projects);

const filteredAndSortedTasks = computed(() => {
  let tasks = [...taskStore.tasks]; // Create a shallow copy to sort

  if (searchQuery.value) {
    tasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedStatus.value) {
    tasks = tasks.filter(task => task.status === selectedStatus.value);
  }

  if (selectedPriority.value) {
    tasks = tasks.filter(task => task.priority === selectedPriority.value);
  }

  if (selectedProject.value) {
    tasks = tasks.filter(task => task.projectId === selectedProject.value);
  }

  // Sorting logic
  tasks.sort((a, b) => {
    let result = 0;
    if (sortBy.value === 'dueDate') {
      result = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy.value === 'priority') {
      const priorityOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
      result = priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy.value === 'status') {
      const statusOrder = { 'To Do': 0, 'In Progress': 1, 'Blocked': 2, 'Done': 3 };
      result = statusOrder[a.status] - statusOrder[b.status];
    }
    return sortDirection.value === 'asc' ? result : -result;
  });

  return tasks;
});

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
};
</script>

<template>
  <div>
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-grow items-center gap-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search tasks..."
          class="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 flex-grow max-w-sm"
        />

        <select
          v-model="selectedStatus"
          class="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option v-for="status in allStatuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>

        <select
          v-model="selectedPriority"
          class="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Priorities</option>
          <option v-for="priority in allPriorities" :key="priority" :value="priority">
            {{ priority }}
          </option>
        </select>

        <select
          v-model="selectedProject"
          class="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Projects</option>
          <option v-for="project in allProjects" :key="project.id" :value="project.id">
            {{ project.name }}
          </option>
        </select>

        <div class="flex items-center space-x-2">
          <label for="sort-by" class="text-gray-700">Sort by:</label>
          <select
            id="sort-by"
            v-model="sortBy"
            class="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
          <BaseButton variant="outline" size="sm" @click="toggleSortDirection">
            {{ sortDirection === 'asc' ? '▲ Asc' : '▼ Desc' }}
          </BaseButton>
        </div>
      </div>

      <BaseButton variant="primary">
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
        New Task
      </BaseButton>
    </div>

    <div v-if="filteredAndSortedTasks.length > 0" class="space-y-4">
      <TaskListItem v-for="task in filteredAndSortedTasks" :key="task.id" :task="task" />
    </div>
    <BaseCard v-else class="py-10 text-center">
      <p class="text-lg text-gray-600">No tasks found matching your criteria.</p>
    </BaseCard>
  </div>
</template>
