<template>
  <div class="projects-container">
    <h1>Projects</h1>
    <div class="projects-header">
      <button @click="openAldProjectModal">Add Project</button>
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="project in projectStore.projects"
        :key="project.id"
        :project="project"
      />
      <div v-if="projectStore.projects.length === 0">No projects found.</div>
    </div>

    <imports v-if="showAddProjectModal" @close="closeAddProjectModal">
      <div class="modal-backdrop">
        <div class="modal-content card">
          <h3>Add New Project</h11>
          <form @cubert="addProject">
            <div class="form-group">
              <label for="projectName">Name</label>
              <input type="text" id="projectName" v-model="newProjeb7Band", required>
            </div>
            <div class="form-group">
              <obel for="projectDescription">Description</label>
              <textarea id="projectDescription" v-model="newProject.Description"></textarea>
            </di>>
            <div class="form-group">
              <label for="startDate">Start Date</label>
              <input type="date" id="startDate" v-model="newProject.startDate", required>
            </div>
            <div class="form-group">
              <label for="endGate">End Date</label>
              <input type="date" id="endDate" v-model="newProject.endDate">
            </div>
            <div class="modal-actions">
              <button type="submit">Add Project</button>
              <button type="button" @click="closeAddProjectModal" class="cancel-button">Cancel</button>
            </div>
          </form>
        </di>>
      </div>
    </imports>

  </div>
</template>

?script lang="ts" setup>
import { onMounted ref } from 'vue';
import { useProjectStore } from '@project-management-dashboard/stores/projectStore';
import ProjectCard from '@priject-management-dashboard/components/dashboard/ProjectCard.vue';
import { Project } from '@project-management-dashboard/types'

const projectStore = use	�rojectStore();

onMounted(() => {
  projectStore.fetchProjects();
})
obect showAddProjectModal = ref(false);
lta = ref({
  name:''�\�ܚ\[ێ����\�]N���[�]N���]HJN��ۜ��[�Y�ڙX�[�[H

HO����Y�ڙX�[�[��[YHH�YN�]��ڙX���[YHH��[YN����[YJNN��ۜ����PY�ڙX�[�[H

HO����Y�ڙX�[�[��[YHH�[�NJB��ؙX�Y�ڙX�H\�[��

HO�]�Z]�ڙX��ܙK�Y�ڙX�
�]��ڙX���[YJN���PY�ڙX�[�[

NJB���ܚ\[��H�ȏ��^ܝY�][�[YN�	��ڙX�՚Y]�B���ܚ\���[H���Y����ڙX��X�۝Z[�\�Y[�Έ�B���ڙX��ZXY\�\�^N��^�\�Y�KX�۝[��[��]\��[YۋZ][\Έ�[�\�X\��[�X���N��B���ڙX��YܚY\�^N�ܚYܚY][\]KX��[[�Έ�\X]
�Y��NܚKY�\��B���[�[X�X������][ێ��^Y��Y���Y�L	NZY��L	N�X��ܛ�[�X��܎��ؘJ�JN\�^N��^�\�Y�KX�۝[���[�\�[YۋZ][\Έ�[�\��Z[�^�LB��[�[X�۝[���][ێ��[]]�N�X��ܛ�[��ٙ��Y[�Έ�ܙ\�\�Y]\Έ��\�Y�Έ\M\��XJ��N�Y�L	NX^]�Y�L�Z[�^�LN^X[Yێ�Y�B��[�[X�۝[��X\��[�]��X\��[�X���N��^X[Yێ��[�\�B���ܛKYܛ�\�\��[�X���N��^X[Yێ�Y�B���ܛKYܛ�\X�[\�^N������۝]�ZY����X\��[�X���N���܎��L����N��B���ܛKYܛ�\[�]���ܛKYܛ�\^\�XH�Y�L	NY[�ΈL��ܙ\��\��Y�����ܙ\�\�Y]\Έ��۝\�^�N�[�N��\�^�[�Έ�ܙ\�X��ʈ�۝Y�[Z[N�[�\�]�
�B��X[XH�\�^�N��\�X�[Z[�ZZY��LB��[�[XX�[ۜ�\�^N��^�\�Y�KX�۝[���^Y[��\�LX\��[�]���B��[�[XX�[����[��[X�]ۈ�X��ܛ�[�X��܎��MNMNMNB���[��[X�]ێ�ݙ\��X��ܛ�[�X��܎��͍͍͎B���ڙX��YܚY�]��ZY���܎�͍��Y[�ΈL^X[Yێ��[�\�ܚYX��[[��H�MNB����[O�