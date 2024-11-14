<template>
    <NavBar></NavBar>    
    <p>Página no encontrada</p>
    <img src="../assets/404.png" height="auto" width="700px" alt="">
    <router-link class="btn btn-primary" :to="{name:'inicio'}">Volver</router-link>

</template>

<script>
import NavBar from './NavBar.vue';

    export default {
        name : "NotFound",
        components : {
            NavBar
        }
    }
</script>
<style></style>