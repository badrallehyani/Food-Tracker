import { createRouter, createWebHistory } from 'vue-router'

import Add from '@/components/Add.vue'
import Home from '@/components/Home.vue'
import Create from '@/components/Create.vue'
import Edit from '@/components/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: "/add",
      name: "add",
      component: Add
    },
    
    {
        path: "/create",
        name: "create",
        component: Create
    },

    {
      path: "/edit",
      name: "edit",
      component: Edit
    }
  ]
})

export default router
