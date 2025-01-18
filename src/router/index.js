import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/components/PaginaInicio.vue'
import TablaUsuarios from '@/components/TablaUsuarios.vue'
import TablaContacto from '@/components/TablaContacto.vue'
import NotFound from '@/components/NotFound.vue'
import TablaEmpleo from '@/components/TablaEmpleo.vue'
import PoliticaPrivacidad from '@/components/PoliticaPrivacidad.vue'
import AvisoLegal from '@/components/AvisoLegal.vue'
import TablaComentarios from '@/components/TablaComentarios.vue'
import TablaArticulos from '@/components/TablaArticulos.vue'
import TablaRegistro from '@/components/TablaRegistro.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: PaginaInicio
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: TablaUsuarios
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
  {
    path : "/comentarios", 
    name : "TablaComentarios", 
    component : TablaComentarios
  },
  {
    path : "/articulos", 
    name : "TablaArticulos", 
    component : TablaArticulos
  }, 
  {
    path : "/registro", 
    name: "TablaRegistro", 
    component : TablaRegistro
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
