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
                    <router-link to ="/usuarios" class="nav-link" active-class="router-link-exact-active">Usuarios</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/empleo" class="nav-link" active-class="router-link-exact-active">Empleo</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/articulos" class="nav-link" active-class="router-link-exact-active">Artículos</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/comentarios" class="nav-link" active-class="router-link-exact-active">Comentarios</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/contacto" class="nav-link" active-class="router-link-exact-active">Contacto</router-link>
                </li>
            </ul>
            </div>
            <div class="dropdown ms-auto">
                <button class="btn btn-primary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle fs-3"></i>
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">
                        <router-link to="/login" class="dropdown-item">Acceso</router-link>
                    </li>
                    <li class="dropdown-item">
                        <router-link to="/signup" class="dropdown-item">Registro</router-link>
                    </li>
                </ul>
                
            </div>
        </div>
        </nav>
    </div>
           
</template>

<script>
export default{
    name: "NavBar"
}
</script>
<style scoped>
.router-link-exact-active {
    color: #FAD02E !important;
}

</style>