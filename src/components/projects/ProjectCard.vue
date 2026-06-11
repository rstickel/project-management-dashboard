<script setup lang="ts">
import type { Project } from '../../types';
import BaseCard from '../shared/BaseCard.vue';
import BaseButton from '../shared/BaseButton.vue';
import { useDateFormat } from '../../composables/useDateFormat';
import { RouterLink } from 'vue-router';

interface Props {
  project: Project;
}

const props = defineProps<Props>();

const startDateFormatted = useDateFormat(props.project.startDate).format();
const endDateFormatted = useDateFormat(props.project.endDate).format();

const statusColorClass = (status: Project['status']) => {
  switch (status) {
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Not Started': return 'bg-gray-100 text-gray-800';
    case 'On Hold': return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <BaseCard class="h-full">
    <div class="flex h-full flex-col justify-between">
      <div>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900">{{ project.name }}</h3>
          <span :class="['rounded-full px-3 py-1 text-xs font-medium', statusColorClass(project.status)]">
            {{ project.status }}
          </span>
        </div>
        <p class="mt-2 text-sm text-gray-600">{{ project.description }}</p>

        <div class="mt-4">
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>Progress</span>
            <span>{{ project.progress }}%</span>
          </div>
          <div class="mt-1 h-2 rounded-full bg-gray-200">
            <div
              class="h-full rounded-full bg-indigo-600"
              :style="{ width: `${project.progress}%` }"
            ></div>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>
            <span class="font-medium">Start Date:</span> {{ startDateFormatted }}
          </div>
          <div class="text-right">
            <span class="font-medium">End Date:</span> {{ endDateFormatted }}
          </div>
          <div>
            <span class="font-medium">Manager:</span> {{ project.manager.name }}
          </div>
          <div class="flex justify-end space-x-1">
            <span class="font-medium">Team:</span>
            <div class="flex -space-x-1 overflow-hidden">
              <img
                v-for="member in project.teamMembers.slice(0, 3)"
                :key="member.id"
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                :src="member.avatar"
                :alt="member.name"
                :title="member.name"
              />
              <span v-if="project.teamMembers.length > 3"
                class="inline-block h-6 w-6 rounded-full bg-gray-200 text-center ring-2 ring-white text-xs pt-1"
                >+{{ project.teamMembers.length - 3 }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <RouterLink :to="`/projects/${project.id}`">
          <BaseButton variant="outline" size="sm">View Details</BaseButton>
        </RouterLink>
      </div>
    </div>
  </BaseCard>
</template>
