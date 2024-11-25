import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/components/PaginaInicio.vue'
import TablaClientes from '@/components/TablaClientes.vue'
import TablaContacto from '@/components/TablaContacto.vue'
import NotFound from '@/components/NotFound.vue'
import TablaEmpleo from '@/components/TablaEmpleo.vue'
import PoliticaPrivacidad from '@/components/PoliticaPrivacidad.vue'
import AvisoLegal from '@/components/AvisoLegal.vue'

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
  }, 
  {
    path : "/empleo", 
    name: "empleo",
    component: TablaEmpleo
  }, 
  {
    path : "/privacidad",
    name : "politicaPrivacidad",
    component : PoliticaPrivacidad
  },
  {
    path : "/avisos-legales", 
    name : "avisoLegal", 
    component : AvisoLegal
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
