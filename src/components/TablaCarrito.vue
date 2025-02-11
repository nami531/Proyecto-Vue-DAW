<template>
    <div class="container">
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
                    <tr v-for="articulo in this.data.items" :key="articulo.id">
                        <td class="d-flex justify-content-center align-items-center align-middle">
                            <img :src="`http://localhost:5000/uploads/img/${articulo.imagen}`" :alt="articulo.nombre" width="100px" height="100px">
                        </td>
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
                        <td class="text-center align-middle table-info">
                            <button class="btn btn-success" @click="agregarArticulo(articulo)">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<script>
import { useCartStore } from '@/store/carts';
import { mapState } from 'pinia';

export default ({
    name : "TablaCarrito", 
    components : {

    }, 
    computed: {
    // Usamos mapState para acceder de forma reactiva al estado del store
        ...mapState(useCartStore, ['items']),  // Mapea 'items' del store como propiedad computada
    },
    data (){
        return {
            data : useCartStore()
        }
    },

    mounted(){
        console.log("Items del carrito", this.data.items)
    }
})
</script>
