<script setup lang="ts">
import { useProjectStore } from '../stores/project';
import { computed, ref } from 'vue';
import ProjectCard from '../components/projects/ProjectCard.vue';
import BaseButton from '../components/shared/BaseButton.vue';
import BaseCard from '../components/shared/BaseCard.vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import type { ProjectStatus } from '../types';

const projectStore = useProjectStore();

const searchQuery = ref('');
const selectedStatus = ref<ProjectStatus | ''>('');

const filteredProjects = computed(() => {
  let projects = projectStore.projects;

  if (searchQuery.value) {
    projects = projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedStatus.value) {
    projects = projects.filter(project => project.status === selectedStatus.value);
  }

  return projects;
});

const allStatuses: ProjectStatus[] = ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];
</script>

<template>
  <div>
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-grow items-center gap-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search projects..."
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
      </div>
      <BaseButton variant="primary">
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
        New Project
      </BaseButton>
    </div>

    <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>
    <BaseCard v-else class="text-center py-10">
      <p class="text-lg text-gray-600">No projects found matching your criteria.</p>
    </BaseCard>
  </div>
</template>
