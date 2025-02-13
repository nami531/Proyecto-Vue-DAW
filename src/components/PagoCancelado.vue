<template>
     <div class="text-center p-4 bg-white shadow rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <h1 class="mt-3">Pago Cancelado</h1>
        <p class="text-muted">El pago no se ha completado. Por favor, inténtalo de nuevo.</p>
        <a href="/" class="btn btn-danger mt-3">Volver al inicio</a>
    </div>
</template>

<script>
export default {
    name : "PagoCancelado"
}
</script>

<style scoped>

</style>