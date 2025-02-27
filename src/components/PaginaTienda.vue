<template>
    <div class="container">
        <nav class="navbar bg-body-tertiary">
            <form class="container-fluid justify-content-start">
                <button class="btn btnCategoria " @click.prevent="seleccionarCategoria(null)" >Mostrar todos los artículos</button>
                <button class="btn btnCategoria" v-for="categoria in categorias" :key="categoria.id" @click.prevent="seleccionarCategoria(categoria.nombre)">{{ categoria.nombre }}</button>
            </form>
        </nav>
        <table class="table custom-table mt-2">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="w-10 text-center align-middle">Id</th>
                        <th scope="col" class="w-20 text-start  align-middle">Nombre</th>
                        <th scope="col" class="w-45 text-center align-middle">Descripción</th>
                        <th scope="col" class="w-10 text-center align-middle">Precio</th>
                        <th scope="col" class="w-10 text-center align-middle">Stock</th>
                        <th scope="col" class="w-10 text-center align-middle">Foto</th>
                        <th scope="col" class="table-info text-center align-middle" v-if="this.isLogueado">Comprar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="articulo in articulosPorPagina" :key="articulo.id">
                        <td class="text-center align-middle">{{ articulo._id.substring(0, 8) }}</td>

                        
                        <td class="text-center align-middle">{{ articulo.nombre }}</td>
                        <td class="text-center align-middle">{{ articulo.descripcion }}</td>
                        <td class="text-center align-middle">{{ articulo.precio_unitario }} &euro;</td>
                        <td class="text-center align-middle">{{ articulo.stock_disponible }}</td>
                        <td>
                            <img :src="`http://localhost:5000/uploads/img/${articulo.imagen}`" alt="Foto de producto" width="64" height="64" class="img-thumbnail" 
                            @click="openModal()"/>
                        </td>          
                         <!-- El modal (ventana emergente) que muestra la imagen expandida -->
                        <div v-if="isModalOpen" class="modal" @click="closeModal">
                            <img :src="`http://localhost:5000/uploads/img/${articulo.imagen}`" alt="Foto expandida" class="modal-content" />
                        </div>
                        <td class="text-center align-middle table-info" v-if="this.isLogueado">
                            <button class="btn btn-warning" @click="agregarArticulo(articulo)">
                                <i class="fas fa-shopping-cart"></i>
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
import { useCartStore } from '@/store/carts.js';
import Swal from 'sweetalert2';


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
            isModalOpen : false, 
            cartStore : useCartStore(), 
            isAdmin : false, 
            isLogueado : false,

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
        this.isAdmin = localStorage.getItem("isAdmin") === "true"
        this.isLogueado = localStorage.getItem("isLogueado") === "true"
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
        }, 

        openModal() {
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
        },

        agregarArticulo(producto){
            // Cambiamos el id y a mayores añadimos la cantidad
            const productoPinia = {
                id : producto._id ,
                nombre : producto.nombre , 
                categoria : producto.categoria , 
                descripcion : producto.descripcion , 
                precio_unitario : producto.precio_unitario ,
                stock_disponible : producto.stock_disponible , 
                personalizacion : producto.personalizacion, 
                imagen : producto.imagen,
                fecha_alta : producto.fecha_alta, 
            }

            try {
                this.cartStore.addToCart(productoPinia); 

            } catch (error){
                this.mostrarAlerta('Error', error.message, 'error');
            }

        },

        mostrarAlerta(titulo, mensaje, icono) {
            Swal.fire({
                title: titulo,
                text: mensaje,
                icon: icono,
                customClass: {
                    container: 'custom-alert-container',
                    popup: 'custom-alert-popup',
                    modal: 'custom-alert-modal'
                }
            });
        },

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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
}

    /* Estilo para la imagen expandida dentro del modal */
.modal-content {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
}

/* Para el estilo del cursor sobre la imagen del modal */
.modal-content:hover {
    cursor: zoom-out;
}

.custom-table {
    border-collapse: separate;
    border-spacing: 0 10px; /* Espaciado entre filas */
}

.custom-table tbody tr {
    border-radius: 10px;
    overflow: hidden;
    background: #f8f9fa;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Sombra ligera */
}

.custom-table th, 
.custom-table td {
    padding: 12px;
    border: none;
    vertical-align: middle;
}

.custom-table thead {
    background: #007bff;
    color: white;
    border-radius: 10px;
}

.custom-table tbody tr:hover {
    background-color: #e9ecef; /* Color al pasar el mouse */
}
    
</style>