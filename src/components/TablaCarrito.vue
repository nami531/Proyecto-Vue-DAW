<template>
    <div class="container" v-if="cartStore.items.length > 0">
        <table class="table table-striped mt-2" >
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="w-20 text-start  align-middle">Nombre</th>
                        <th scope="col" class="w-45 text-center align-middle">Descripción</th>
                        <th scope="col" class="w-10 text-center align-middle">Precio</th>
                        <th scope="col" class="w-10 text-center align-middle">Foto</th>
                        <th scope="col" class="w-10 text-center align-middle">Cantidad</th>
                        <th scope="col" class="w-10 text-center align-middle">Total</th>
                        <th scope="col" class="table-info text-center align-middle">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in this.cartStore.getItems" :key="item.id">
                        <td class="text-center align-middle">{{ item.nombre }}</td>
                        <td class="text-center align-middle">{{ item.descripcion }}</td>
                        <td class="text-center align-middle">{{ item.precio_unitario }} &euro;</td>
                        
                        <td>
                            <img :src="`http://localhost:5000/uploads/img/${item.imagen}`" alt="Foto de producto" width="64" height="64" class="img-thumbnail" 
                            @click="openModal()"/>
                        </td>          
                         <!-- El modal (ventana emergente) que muestra la imagen expandida -->
                        <div v-if="isModalOpen" class="modal" @click="closeModal">
                            <img :src="`http://localhost:5000/uploads/img/${item.imagen}`" alt="Foto expandida" class="modal-content" />
                        </div>
                        <td class="align-middle">
                            <div class="gap-2 d-flex align-items-center justify-content-center ">
                                <button @click="decrease(item)" class="btn btn-primary p-0 px-2">-</button>
                                <span class="border bg-white px-2">{{ item.quantity }}</span>
                                <button @click="increase(item)" class="btn btn-primary p-0 px-2  ">+</button>
                            </div>
                        </td>
                        <td>{{ (item.quantity * item.precio_unitario).toFixed(2) }} €</td>
                        <td class="text-center align-middle table-info">
                            <button class="btn btn-danger" @click="eliminarArticulo(item)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 class="text-end"> Precio total: {{ cartStore.totalPrice.toFixed(2) }} €</h2>
            <button class="btn btn-primary" @click="finalizarCompra">Finalizar compra</button>
    </div>
    <div v-else>
        <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <i class="bi bi-dropbox fs-1"></i>
            <h3>El carrito está vacío</h3>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '@/store/carts.js';
import { loadStripe } from '@stripe/stripe-js';

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
    }, 

    methods : {
        eliminarArticulo(articulo){
            this.cartStore.removeFromCart(articulo.id)
        },

        increase(articulo){
            this.cartStore.updateQuantity(articulo.id, articulo.quantity + 1)
        }, 

        decrease(articulo){
            this.cartStore.updateQuantity(articulo.id, articulo.quantity - 1)
        },

        async finalizarCompra(){
            localStorage.setItem("carrito", JSON.stringify(this.cartStore.items)); 
            const stripe = await loadStripe(process.env.VUE_APP_PUBLIC_KEY); 
            const response = await fetch("http://localhost:5000/crear-checkout-session", {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify({ items : this.cartStore.items, amount : this.cartStore.totalPrice})
            }); 

            const session = await response.json(); 

            if (!session.id){
                console.error("No se recibio sesionId de stripe")
                return; 
            }

            const { error } = await stripe.redirectToCheckout({
                sessionId : session.id, 
            }); 

            if (error){
                console.error("Error en el pago", error)
            }


        },
    }
})
</script>
