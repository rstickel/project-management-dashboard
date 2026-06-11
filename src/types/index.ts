export type ProjectStatus = 'Not Started' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
export type TaskStatus = 'To Do' | 'In Progress' | 'Blocked' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: ProjectStatus;
  progress: number; // 0-100
  manager: User;
  teamMembers: User[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: User;
}
