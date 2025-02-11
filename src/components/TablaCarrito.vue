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
                    <tr v-for="item in this.cartStore.getItems" :key="item.id">
                        <td class="d-flex justify-content-center align-items-center align-middle">
                            <img :src="`http://localhost:5000/uploads/img/${item.imagen}`" :alt="item.nombre" width="100px" height="100px">
                        </td>
                        <td class="text-center align-middle">{{ item.nombre }}</td>
                        <td class="text-center align-middle">{{ item.descripcion }}</td>
                        <td class="text-center align-middle">{{ item.precio_unitario }} &euro;</td>
                        <td class="text-center align-middle">{{ item.stock_disponible }}</td>
                        <td>
                            <img :src="`http://localhost:5000/uploads/img/${item.imagen}`" alt="Foto de producto" width="64" height="64" class="img-thumbnail" 
                            @click="openModal()"/>
                        </td>          
                         <!-- El modal (ventana emergente) que muestra la imagen expandida -->
                        <div v-if="isModalOpen" class="modal" @click="closeModal">
                            <img :src="`http://localhost:5000/uploads/img/${item.imagen}`" alt="Foto expandida" class="modal-content" />
                        </div>
                        <td class="text-center align-middle table-info">
                            <button class="btn btn-success" @click="agregarArticulo(item)">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<script>
import { useCartStore } from '@/store/carts.js';

export default ({
    name : "TablaCarrito", 
    components : {

    }, 

    data (){
        return {
            cartStore : useCartStore()
        }
    },

    mounted(){
        console.log("Items del carrito", this.cartStore.getItems)
    }
})
</script>
