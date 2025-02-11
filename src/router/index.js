import { createRouter, createWebHistory } from 'vue-router'
import TablaUsuarios from '@/components/TablaUsuarios.vue'
import TablaContacto from '@/components/TablaContacto.vue'
import NotFound from '@/components/NotFound.vue'
import TablaEmpleo from '@/components/TablaEmpleo.vue'
import PoliticaPrivacidad from '@/components/PoliticaPrivacidad.vue'
import AvisoLegal from '@/components/AvisoLegal.vue'
import TablaComentarios from '@/components/TablaComentarios.vue'
import TablaArticulos from '@/components/TablaArticulos.vue'
import TablaRegistro from '@/components/TablaRegistro.vue'
import TablaLogin from '@/components/TablaLogin.vue'
import PanelGestion from '@/components/PanelGestion.vue'
import PaginaInicio from '@/components/PaginaInicio.vue'
import PaginaTienda from '@/components/PaginaTienda.vue'
import TablaCarrito from '@/components/TablaCarrito.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: PaginaInicio,
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: PanelGestion,
    meta : {requiresAdmin : true},
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: TablaUsuarios,
    meta : {requiresAdmin : true},

  },
  {
    path: "/tienda",
    name: "PaginaTienda",
    component: PaginaTienda
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
  }, 
  {
    path : "/login", 
    name: "TablaLogin",
    component : TablaLogin
  }, 
  {
    path : '/logout', 
    name: 'logout'
  }, 
  {
    path: '/carrito', 
    name : 'TablaCarrito', 
    component : TablaCarrito
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin){
    const isLogueado = localStorage.getItem('isLogueado') === 'true'; 
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; 
    if (!isLogueado || !isAdmin){
      next({name : 'inicio'})
    } else {
      next()
    }
    // Si es usuario anonimo
  } else {
    next()
  }  
})

export default router
