import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/components/PaginaInicio.vue'
import TablaClientes from '@/components/TablaClientes.vue'
import TablaContacto from '@/components/TablaContacto.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: PaginaInicio
  },
  {
    path: "/clientes",
    name: "clientes",
    component: TablaClientes
  },
  {
    path: "/contacto",
    name: "contacto",
    component: TablaContacto
  },
  {
    path : "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
