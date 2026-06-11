import { defineStore } from 'pinia';
import type { Project, ProjectStatus, User } from '../types';
import { ref, computed } from 'vue';

const mockUsers: User[] = [
  { id: 'usr1', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'usr2', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'usr3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'usr4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=4' },
];

const generateRandomDate = (start: Date, end: Date) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website to improve user experience and modern aesthetics.',
    startDate: '2023-01-15',
    endDate: '2023-06-30',
    status: 'In Progress',
    progress: 65,
    manager: mockUsers[0],
    teamMembers: [mockUsers[0], mockUsers[1], mockUsers[2]],
  },
  {
    id: 'proj2',
    name: 'Mobile App Development',
    description: 'Develop a new cross-platform mobile application for service booking.',
    startDate: '2023-03-01',
    endDate: '2023-12-15',
    status: 'Not Started',
    progress: 10,
    manager: mockUsers[1],
    teamMembers: [mockUsers[1], mockUsers[3]],
  },
  {
    id: 'proj3',
    name: 'Database Migration',
    description: 'Migrate existing legacy database to a modern cloud-based solution.',
    startDate: '2022-11-01',
    endDate: '2023-02-28',
    status: 'Completed',
    progress: 100,
    manager: mockUsers[2],
    teamMembers: [mockUsers[0], mockUsers[2]],
  },
  {
    id: 'proj4',
    name: 'Marketing Campaign Launch',
    description: 'Plan and execute a new digital marketing campaign for product X.',
    startDate: '2023-05-01',
    endDate: '2023-08-31',
    status: 'On Hold',
    progress: 20,
    manager: mockUsers[3],
    teamMembers: [mockUsers[0], mockUsers[1], mockUsers[3]],
  },
  {
    id: 'proj5',
    name: 'Internal Tool Development',
    description: 'Build a new internal tool to streamline HR processes.',
    startDate: '2023-04-10',
    endDate: '2023-10-31',
    status: 'In Progress',
    progress: 45,
    manager: mockUsers[0],
    teamMembers: [mockUsers[0], mockUsers[2]],
  }
];

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>(mockProjects);

  const getProjectById = (id: string) => projects.value.find(p => p.id === id);

  const activeProjects = computed(() => projects.value.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled'));

  const completedProjects = computed(() => projects.value.filter(p => p.status === 'Completed'));

  const totalProjects = computed(() => projects.value.length);

  const projectsByStatus = computed(() => {
    return projects.value.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<ProjectStatus, number>);
  });

  function addProject(project: Omit<Project, 'id'>) {
    const newProject: Project = { ...project, id: `proj${projects.value.length + 1}` };
    projects.value.push(newProject);
  }

  function updateProject(updatedProject: Project) {
    const index = projects.value.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      projects.value[index] = updatedProject;
    }
  }

  function deleteProject(id: string) {
    projects.value = projects.value.filter(p => p.id !== id);
  }

  return {
    projects,
    getProjectById,
    activeProjects,
    completedProjects,
    totalProjects,
    projectsByStatus,
    addProject,
    updateProject,
    deleteProject,
  };
});
