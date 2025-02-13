<template>
    <div class="text-center p-4 bg-white shadow rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM6.354 11.354a.5.5 0 0 0 .707 0l4.5-4.5a.5.5 0 1 0-.707-.707L6.5 10.293 4.146 7.94a.5.5 0 1 0-.707.707l2.915 2.707z"/>
        </svg>
        <h1 class="mt-3">¡Pago realizado con éxito!</h1>
        <p class="text-muted">Gracias por tu compra. Hemos recibido tu pago correctamente.</p>
        <a href="/" class="btn btn-success mt-3">Volver al inicio</a>
    </div>
</template>

<script>
export default {
    name : "PagoAprobado"
}
</script>

<style scoped>

</style>