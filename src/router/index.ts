import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import TasksView from '../views/TasksView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { title: 'Dashboard' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: { title: 'Projects' }
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: ProjectDetailView,
      props: true,
      meta: { title: 'Project Detail' }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: { title: 'Tasks' }
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | PM Dashboard` : 'PM Dashboard';
  next();
});

export default router;
