<template>
    <div id="navbar" class = 'container'>
        <nav class = "navbar navbar-expand-lg navbar-dark bg-primary">
        <div class = "container-fluid">
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
                    <router-link to ="/" class="nav-link active">Inicio</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/clientes" class="nav-link active">Clientes</router-link>
                </li>
                <li class = "nav-item">
                    <router-link to ="/contacto" class="nav-link active">Contacto</router-link>
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
.nav-link.active {
    color : #FAD02E !important
}
</style>