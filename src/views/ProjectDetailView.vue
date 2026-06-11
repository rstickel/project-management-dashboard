<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useProjectStore } from '../stores/project';
import { useTaskStore } from '../stores/task';
import BaseCard from '../components/shared/BaseCard.vue';
import BaseButton from '../components/shared/BaseButton.vue';
import TaskListItem from '../components/tasks/TaskListItem.vue';
import { computed } from 'vue';
import { useDateFormat } from '../composables/useDateFormat';
import { ArrowLeftIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const taskStore = useTaskStore();

const projectId = route.params.id as string;
const project = computed(() => projectStore.getProjectById(projectId));
const tasks = computed(() => taskStore.getTasksByProjectId(projectId));

const startDateFormatted = computed(() => useDateFormat(project.value?.startDate).format());
const endDateFormatted = computed(() => useDateFormat(project.value?.endDate).format());

const deleteProject = () => {
  if (project.value && confirm(`Are you sure you want to delete project "${project.value.name}"?`)) {
    projectStore.deleteProject(project.value.id);
    router.push('/projects');
  }
};

const statusColorClass = (status: string) => {
  switch (status) {
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Not Started': return 'bg-gray-100 text-gray-800';
    case 'On Hold': return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

if (!project.value) {
  // Handle case where project is not found
  router.replace('/projects'); // Redirect to projects list
}
</script>

<template>
  <div v-if="project">
    <div class="mb-6 flex items-center justify-between">
      <BaseButton variant="ghost" @click="router.back()">
        <ArrowLeftIcon class="-ml-1 mr-2 h-5 w-5" />
        Back to Projects
      </BaseButton>
      <div class="flex space-x-2">
        <BaseButton variant="secondary">
          <PencilSquareIcon class="-ml-1 mr-2 h-5 w-5" />
          Edit Project
        </BaseButton>
        <BaseButton variant="danger" @click="deleteProject">
          <TrashIcon class="-ml-1 mr-2 h-5 w-5" />
          Delete Project
        </BaseButton>
      </div>
    </div>

    <BaseCard class="mb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ project.name }}</h1>
          <p class="mt-2 text-lg text-gray-600">{{ project.description }}</p>
        </div>
        <span :class="['ml-4 shrink-0 rounded-full px-4 py-2 text-sm font-medium', statusColorClass(project.status)]">
          {{ project.status }}
        </span>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 class="text-md font-semibold text-gray-700">Start Date</h3>
          <p class="mt-1 text-gray-900">{{ startDateFormatted }}</p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">End Date</h3>
          <p class="mt-1 text-gray-900">{{ endDateFormatted }}</p>
        </div>
        <div>
          <h3 class="text-md font-semibold text-gray-700">Manager</h3>
          <div class="mt-1 flex items-center space-x-2">
            <img
              class="h-8 w-8 rounded-full object-cover"
              :src="project.manager.avatar"
              :alt="project.manager.name"
            />
            <span class="text-gray-900">{{ project.manager.name }}</span>
          </div>
        </div>
        <div class="md:col-span-2 lg:col-span-3">
          <h3 class="text-md font-semibold text-gray-700">Team Members</h3>
          <div class="mt-2 flex flex-wrap items-center -space-x-2">
            <img
              v-for="member in project.teamMembers"
              :key="member.id"
              class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              :src="member.avatar"
              :alt="member.name"
              :title="member.name"
            />
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-md font-semibold text-gray-700">Progress</h3>
        <div class="mt-2 h-3 rounded-full bg-gray-200">
          <div
            class="h-full rounded-full bg-indigo-600"
            :style="{ width: `${project.progress}%` }"
          ></div>
        </div>
        <p class="mt-1 text-right text-sm text-gray-600">{{ project.progress }}% Complete</p>
      </div>
    </BaseCard>

    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Tasks ({{ tasks.length }})</h2>
      <BaseButton variant="primary">
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
        Add Task
      </BaseButton>
    </div>

    <div v-if="tasks.length > 0" class="space-y-4">
      <TaskListItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>
    <BaseCard v-else class="text-center py-8">
      <p class="text-lg text-gray-600">No tasks for this project yet. Add one!</p>
    </BaseCard>
  </div>
  <div v-else>
    <p class="text-center text-lg text-gray-600">Project not found.</p>
  </div>
</template>
