import { createRouter, createWebHistory } from 'vue-router'

import TodayTasks from '@/components/TodayTasks.vue'
import SettingsPage from '@/components/SettingsPage.vue'
import ScheduledTasks from '@/components/ScheduledTasks.vue';


const routes = [
  {
    path: '/', redirect: '/tasks'
  },
  {
    path: '/tasks', component: TodayTasks
  },
  {
    path: '/settings', component: SettingsPage
  },
  {
    path: '/schedule', component: ScheduledTasks
  },
  // {
  //   path: '/dummy', component: forTrial
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
