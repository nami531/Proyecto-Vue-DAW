<template>
    <h5 class="p-5 text-primary"><i class="bi bi-tools me-2"></i>Panel de gestión</h5>
    <div class="container">
        <div class="row mb-4">
        
            <router-link to="/usuarios"  class="col bg-primary me-4 rounded containerAltura d-flex justify-content-center align-items-center text-decoration-none">
                <div class="text-white link-underline link-underline-opacity-0  d-flex justify-content-center align-items-center" >Gestión de usuarios</div>
            </router-link>
        
            <router-link to="/empleo"  class="col bg-primary me-4 rounded containerAltura d-flex justify-content-center align-items-center text-decoration-none">
                <div class="text-white link-underline link-underline-opacity-0  d-flex justify-content-center align-items-center" >Gestión de empleo</div>
            </router-link>
            
        </div>

        <div class="row mb-4">
            <router-link to="/comentarios"  class="col bg-primary me-4 rounded containerAltura d-flex justify-content-center align-items-center text-decoration-none" >
                <div class="text-white d-flex justify-content-center align-items-center text-decoration-none" >Gestión de comentarios</div>
            </router-link>
        </div>
        
    </div>

</template>

<script>

    export default {
        name : "PaginaInicio",
        components : {
            
        }
    }
</script>

<style scoped>
 .containerAltura{
    height: 50px;
 }
 .construccion{
    text-decoration: none !important;
 }
</style>