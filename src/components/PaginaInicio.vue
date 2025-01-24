<template>
    <main class="container d-flex flex-column">
        <section class="d-flex flex-column justify-content-center align-items-center my-3 border p-5 rounded">
            <h1>¡Te damos la bienvenida a nuestra tienda!</h1>
            <img src="https://picsum.photos/1020/720" width="700px" height="auto" class="rounded mt-3">
        </section>
        <section class="d-flex flex-row justify-content-between">
            <article class="d-flex flex-column w-50">
                <h2>¿Quiénes somos?</h2>
                <p class="text-custom">Somos un equipo <strong>apasionado</strong> que trabaja para combinar innovación, diseño y accesibilidad en cada uno de nuestros artículos. 
                    Nuestra misión es superar tus expectativas, creando una experiencia de compra <strong>única</strong> y cercana. 
                    <br>
                    <span class="text-primary">¡Gracias por ser parte de nuestra historia!</span></p>
            </article>
            <article class="d-flex flex-column">
                <h2>Servicios</h2>
                <ul class="text-custom ms-4">
                    <li>
                        <h6 class="weight-bold">Venta y entrega de productos</h6>
                        Recibe tus pedidos en casa con envíos rápidos y opciones de recogida en tienda.
                    </li>
                    <li>
                        <h6 class="font-weight-bold">Diseño o personalización</h6>
                        Creamos diseños únicos y adaptados a tus necesidades, reflejando tu estilo o el de tu negocio.
                    </li>
                </ul>
            </article>
        </section>

    </main>
</template>

<script>
export default{
    name : "PaginaInicio"
}
</script>

<style scoped>
.text-custom{
    text-align: justify;
}
</style>