<script setup lang="ts">
import { useProjectStore } from '../stores/project';
import { useTaskStore } from '../stores/task';
import BaseCard from '../components/shared/BaseCard.vue';
import { computed } from 'vue';

const projectStore = useProjectStore();
const taskStore = useTaskStore();

const totalProjects = computed(() => projectStore.totalProjects);
const activeProjectsCount = computed(() => projectStore.activeProjects.length);
const completedProjectsCount = computed(() => projectStore.completedProjects.length);

const totalTasks = computed(() => taskStore.totalTasks);
const tasksToDo = computed(() => taskStore.tasks.filter(t => t.status === 'To Do').length);
const tasksInProgress = computed(() => taskStore.tasks.filter(t => t.status === 'In Progress').length);

const projectStatusData = computed(() => {
  const data = projectStore.projectsByStatus;
  return Object.keys(data).map(status => ({ status, count: data[status as keyof typeof data] }));
});

const taskStatusData = computed(() => {
  const data = taskStore.tasksByStatus;
  return Object.keys(data).map(status => ({ status, count: data[status as keyof typeof data] }));
});
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <!-- Project Summary -->
    <BaseCard class="col-span-1">
      <h2 class="mb-4 text-xl font-semibold text-gray-800">Project Summary</h2>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-600">Total Projects:</span>
          <span class="font-medium text-gray-900">{{ totalProjects }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Active Projects:</span>
          <span class="font-medium text-blue-600">{{ activeProjectsCount }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Completed Projects:</span>
          <span class="font-medium text-green-600">{{ completedProjectsCount }}</span>
        </div>
      </div>
    </BaseCard>

    <!-- Task Summary -->
    <BaseCard class="col-span-1">
      <h2 class="mb-4 text-xl font-semibold text-gray-800">Task Summary</h2>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-600">Total Tasks:</span>
          <span class="font-medium text-gray-900">{{ totalTasks }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Tasks To Do:</span>
          <span class="font-medium text-orange-600">{{ tasksToDo }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Tasks In Progress:</span>
          <span class="font-medium text-blue-600">{{ tasksInProgress }}</span>
        </div>
      </div>
    </BaseCard>

    <!-- Project Status Distribution (Simple List) -->
    <BaseCard class="col-span-1">
      <h2 class="mb-4 text-xl font-semibold text-gray-800">Projects by Status</h2>
      <ul class="space-y-2">
        <li v-for="item in projectStatusData" :key="item.status" class="flex justify-between text-gray-600">
          <span>{{ item.status }}:</span>
          <span class="font-medium text-gray-900">{{ item.count }}</span>
        </li>
      </ul>
    </BaseCard>

    <!-- Task Status Distribution (Simple List) -->
    <BaseCard class="col-span-full md:col-span-2 lg:col-span-3">
      <h2 class="mb-4 text-xl font-semibold text-gray-800">Tasks by Status</h2>
      <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <li v-for="item in taskStatusData" :key="item.status" class="flex justify-between text-gray-600">
          <span>{{ item.status }}:</span>
          <span class="font-medium text-gray-900">{{ item.count }}</span>
        </li>
      </ul>
    </BaseCard>

    <!-- Quick Links / Recent Activity (Placeholders) -->
    <BaseCard class="col-span-full">
      <h2 class="mb-4 text-xl font-semibold text-gray-800">Recent Activity</h2>
      <p class="text-gray-600">No recent activity to display. Start managing your projects!</p>
    </BaseCard>
  </div>
</template>
