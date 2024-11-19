<template>  
    <p>Página no encontrada</p>
    <img src="../assets/404.png" height="auto" width="700px" alt="">
    <router-link class="btn btn-primary" :to="{name:'inicio'}">Volver</router-link>

</template>

<script>

    export default {
        name : "NotFound",
        components : {
            
        }
    }
</script>
<style></style>