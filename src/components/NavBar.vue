<template>
    <div id="navbar" class = 'container'>
        <nav class = "navbar navbar-expand-lg navbar-dark bg-primary">
        <div class = "container-fluid d-flex justify-content-evenly">
          <button class = "navbar-toggler" 
          type = "button" 
          data-bs-toggle = "collapse" 
          data-bs-target = "#navbarNav" 
          aria-controls = "navbarNav" 
          aria-expanded = "false" 
          aria-label = "Toggle navigation">
            <span class = "navbar-toggler-icon"></span>
        </button>
            <div class = "collapse navbar-collapse" id = "navbarNav">
            <ul class = "navbar-nav">
                <li class = "nav-item">
                    <router-link to ="/" class="nav-link" active-class="router-link-exact-active">Inicio</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/gestion" class="nav-link" active-class="router-link-exact-active" v-if="isAdmin">Gestión</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/tienda" class="nav-link" active-class="router-link-exact-active">Tienda</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/usuarios" class="nav-link" active-class="router-link-exact-active" v-if="isAdmin">Usuarios</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/empleo" class="nav-link" active-class="router-link-exact-active">Empleo</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/articulos" class="nav-link" active-class="router-link-exact-active" v-if="isAdmin">Artículos</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/comentarios" class="nav-link" active-class="router-link-exact-active">Comentarios</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/contacto" class="nav-link" active-class="router-link-exact-active">Contacto</router-link>
                </li>
            </ul>
            </div>
            <div class="d-flex">
                <div >
                    <router-link to="/carrito" class="btn btn-ligth"> <i class="fas fa-shopping-cart"></i></router-link>
                </div>

                <div class="dropdown ms-auto">
                    <div class="d-flex flex-row align-items-center justify-content-center"  style="height: 35px;">
                        <button class="btn btn-primary align-middle" type="button">
                            <i class="bi bi-person-circle fs-3 text-white"></i>
                         </button>
                    </div>
                    
                    <ul class="dropdown-menu">
                        <li class="dropdown-item" v-if="!isLogueado">
                            <router-link to="/login" class="dropdown-item">Acceso</router-link>
                        </li>
                        <li class="dropdown-item" v-if="!isLogueado">
                            <router-link to="/registro" class="dropdown-item">Registro</router-link>
                        </li>
                        <li class="dropdown-item" v-if="isLogueado">
                            <router-link to="/logout" class="dropdown-item" @click="logout">Cerrar sesión</router-link>
                        </li>
                    </ul>
                    
                </div>
            </div>
            
        </div>
        </nav>
    </div>
           
</template>

<script>

export default{
    name: "NavBar", 
    data(){
        return {
            isDropdownVisible: false, 
            isAdmin : false, 
            isLogueado : false,
        }; 
    }, 
    
    mounted() {
        this.isAdmin = localStorage.getItem('isAdmin') === 'true'; 
        this.isLogueado = localStorage.getItem('isLogueado') === 'true'; 

    }, 

    methods:{
        toggleDropdown(){
            console.log('Botón pulsado')
            this.isDropdownVisible = !this.isDropdownVisible; 
        }, 
        
        logout(){
            localStorage.removeItem('isLogueado');
            localStorage.removeItem('isAdmin'); 
            localStorage.removeItem('email');
            console.log("localStorage")

            this.$router.push({name : 'TablaLogin'}).then(() => {
                window.location.reload()
            })
        }
    }


}
</script>
<style scoped>
.router-link-exact-active {
    color: #FAD02E !important;
}
.dropdown-menu{
    background-color: transparent !important;
    border: none;
    margin: 1px 0px; 
}
</style>