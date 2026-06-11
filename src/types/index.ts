export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  startDate: string;
  endDate: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string,
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: string;
}
