import { defineStore } from 'pinia';
import type { Task, TaskStatus, TaskPriority, User } from '../types';
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

const mockTasks: Task[] = [
  {
    id: 'task1',
    projectId: 'proj1',
    title: 'Design homepage layout',
    description: 'Create responsive design for the main landing page.',
    dueDate: generateRandomDate(new Date(), new Date(new Date().setDate(new Date().getDate() + 7))),
    status: 'In Progress',
    priority: 'High',
    assignedTo: mockUsers[0],
  },
  {
    id: 'task2',
    projectId: 'proj1',
    title: 'Develop user authentication',
    description: 'Implement JWT-based authentication system.',
    dueDate: generateRandomDate(new Date(), new Date(new Date().setDate(new Date().getDate() + 14))),
    status: 'To Do',
    priority: 'High',
    assignedTo: mockUsers[1],
  },
  {
    id: 'task3',
    projectId: 'proj2',
    title: 'Market research for app features',
    description: 'Conduct surveys and competitor analysis.',
    dueDate: generateRandomDate(new Date(), new Date(new Date().setDate(new Date().getDate() + 30))),
    status: 'Done',
    priority: 'Medium',
    assignedTo: mockUsers[2],
  },
  {
    id: 'task4',
    projectId: 'proj1',
    title: 'Implement contact form',
    description: 'Create a functional and validated contact form.',
    dueDate: generateRandomDate(new Date(new Date().setDate(new Date().getDate() - 10)), new Date(new Date().setDate(new Date().getDate() - 5))),
    status: 'Done',
    priority: 'Low',
    assignedTo: mockUsers[0],
  },
  {
    id: 'task5',
    projectId: 'proj4',
    title: 'Define target audience',
    description: 'Identify primary and secondary target demographics for the new campaign.',
    dueDate: generateRandomDate(new Date(), new Date(new Date().setDate(new Date().getDate() + 21))),
    status: 'Blocked',
    priority: 'Medium',
    assignedTo: mockUsers[3],
  },
  {
    id: 'task6',
    projectId: 'proj1',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated deployment for frontend and backend.',
    dueDate: generateRandomDate(new Date(), new Date(new Date().setDate(new Date().getDate() + 28))),
    status: 'To Do',
    priority: 'High',
    assignedTo: mockUsers[1],
  },
  {
    id: 'task7',
    projectId: 'proj5',
    title: 'Gather HR requirements',
    description: 'Interview HR stakeholders for system requirements.',
    dueDate: generateRandomDate(new Date(), new Date(new Date().setDate(new Date().getDate() + 5))),
    status: 'In Progress',
    priority: 'High',
    assignedTo: mockUsers[2],
  },
];

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>(mockTasks);

  const getTaskById = (id: string) => tasks.value.find(t => t.id === id);

  const getTasksByProjectId = (projectId: string) => tasks.value.filter(t => t.projectId === projectId);

  const totalTasks = computed(() => tasks.value.length);

  const tasksByStatus = computed(() => {
    return tasks.value.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<TaskStatus, number>);
  });

  function addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = { ...task, id: `task${tasks.value.length + 1}` };
    tasks.value.push(newTask);
  }

  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter(t => t.id !== id);
  }

  return {
    tasks,
    getTaskById,
    getTasksByProjectId,
    totalTasks,
    tasksByStatus,
    addTask,
    updateTask,
    deleteTask,
  };
});
