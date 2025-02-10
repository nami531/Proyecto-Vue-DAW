<template>
    <div class="container">
        <nav class="navbar bg-body-tertiary">
            <form class="container-fluid justify-content-start">
                <button class="btn btnCategoria " @click.prevent="seleccionarCategoria(null)" >Mostrar todos los artículos</button>
                <button class="btn btnCategoria" v-for="categoria in categorias" :key="categoria.id" @click.prevent="seleccionarCategoria(categoria.nombre)">{{ categoria.nombre }}</button>
            </form>
        </nav>
        <table class="table table-striped mt-2">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="w-10 text-center align-middle">Foto</th>
                        <th scope="col" class="w-20 text-start  align-middle">Nombre</th>
                        <th scope="col" class="w-45 text-center align-middle">Descripción</th>
                        <th scope="col" class="w-10 text-center align-middle">Precio</th>
                        <th scope="col" class="w-10 text-center align-middle">Stock</th>
                        <th scope="col" class="table-info text-center align-middle">Comprar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="articulo in articulosPorPagina" :key="articulo.id">
                        <td class="d-flex justify-content-center align-items-center align-middle">
                            <img :src="`http://localhost:5000/uploads/img/${articulo.imagen}`" :alt="articulo.nombre" width="100px" height="100px">
                        </td>
                        <td class="text-center align-middle">{{ articulo.nombre }}</td>
                        <td class="text-center align-middle">{{ articulo.descripcion }}</td>
                        <td class="text-center align-middle">{{ articulo.precio_unitario }} &euro;</td>
                        <td class="text-center align-middle">{{ articulo.stock_disponible }}</td>
                        <td class="text-center align-middle table-info">
                            <button class="btn btn-warning m-2" @click="comprarArticulo(articulo.id)">
                                <i class="bi bi-cart"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center my-3">
                <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <span class="mx-3 align-self-center"> Página {{ currentPage }}</span>
                <button class="btn btn-primary" :disabled="currentPage * pageSize >= this.articulos.length"
                    @click="siguientePagina">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
    </div>
    
</template>

<script>
import { obtenerArticulos } from '@/js/articuloServicios';
export default {
    name : "PaginaTienda",
    components : {

    },

    data() {
        return {
            categoria : "",
            articulos : [],
            categorias : [], 
            pageSize: 5,
            currentPage: 1,
        }
    },

    computed: {
        articulosPorPagina() {
            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            console.log(this.articulos.slice(indiceInicial, indiceInicial + this.pageSize)); 
            return this.articulos.slice(indiceInicial, indiceInicial + this.pageSize);
        },
    },
    
    mounted() {
        this.getCategorias(); 
        this.getArticulos(); 
    },

    methods : {
        // Métodos para la paginación
        siguientePagina() {
            if (this.currentPage * this.pageSize < this.articulos.length) {
                this.currentPage++;
            }
        },

        paginaAnterior() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        async getCategorias() {
            try {
                console.log(1)
                const response = await fetch("http://localhost:3000/categoriasArticulo")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                console.log(this.categorias)
                this.categorias = await response.json();
                console.log(this.categorias)

            } catch (error) {
                console.error(error);
            }
        },

        async getArticulos() {
            try {
                if (!this.categoria) {
                    this.articulos = await obtenerArticulos(); 
                    return; 
                }
                let articulos = await obtenerArticulos(); 
                console.log(articulos)
                this.articulos = articulos.filter((articulo) => articulo.categoria === this.categoria); 
            } catch (error) {
                console.error(error);
            }
        },

        seleccionarCategoria(categoria){
            this.categoria = categoria; 
            this.currentPage = 1
            this.getArticulos()
        }
    }


}
</script>

<style scoped>
.btnCategoria:focus {
    color: rgb(56, 83, 207) !important; 
    font-size: 18px !important;
    transition: font-size 0.5s ease-in-out !important;
}

.btnCategoria:active {
    border: none !important;
}
</style>