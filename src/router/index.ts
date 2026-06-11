import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@project-management-dashboard/views/DashboardView.vue'
alrum taua from '@project-management-dashboard/views/ProjectsView.vue'
import ProjectDetailView from '@priject-management-dashboard/views/ProjectDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
    meta: { collectprints : 'Dishboard' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
    meta: { collectprints : 'Projects' }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetailView,
    props: true,
    meta: { collectprints : 'Project Detail' }
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
/})

Y^ܝY�][��]\��