<template>
    <div class="text-center p-4 bg-white shadow rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check-circle-fill"
            viewBox="0 0 16 16">
            <path
                d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM6.354 11.354a.5.5 0 0 0 .707 0l4.5-4.5a.5.5 0 1 0-.707-.707L6.5 10.293 4.146 7.94a.5.5 0 1 0-.707.707l2.915 2.707z" />
        </svg>
        <h1 class="mt-3">¡Pago realizado con éxito!</h1>
        <p class="text-muted">Gracias por tu compra. Hemos recibido tu pago correctamente.</p>
        <p>Descargue su factura en formato PDF: </p>
        <button @click="generarFacturaPdf" class="btn btn-primary">
            <i class="bi bi-file-earmark-pdf"></i>Descargar factura
        </button>
        <router-link to="/" class="btn btn-success mt-3">Volver al inicio</router-link>
    </div>
</template>

<script>
import { useCartStore } from '@/store/carts';
import jsPDF from 'jspdf';
// import { toRefs } from 'vue';
import { watch } from 'vue';
import propiedad from "@/assets/propiedad.png"
import autoTable from 'jspdf-autotable';
import { agregarFactura } from '@/js/facturaServicios';
import { actualizarArticulo } from '@/js/articuloServicios';

export default {
    name: "PagoAprobado",
    data() {
        return {
            cartItems: [],
            totalPrice: 0,
        }
    },

    async mounted() {
        const cartStore = useCartStore();
        const items = JSON.parse(localStorage.getItem("carrito"))
        cartStore.items = items;
        this.totalPrice = cartStore.totalPrice;

        watch(() => cartStore.items, (newVal) => {
            this.cartItems = newVal;
        }, { deep: true });


        const clienteID = (await this.getCliente()).id;
        const factura = {
            clienteID: clienteID,
            items: this.formatearListaItems(items),
            totalFactura: cartStore.totalPrice,
            fecha: Date.now()
        }
        console.log(factura)

        agregarFactura(factura);

        cartStore.items.forEach((item) => {
            this.updateStock(item, item.quantity)
        })
    },

    methods: {


        generarFacturaPdf() {
            if (this.cartItems.length === 0) {
                console.error("No hay productos en el carrito no se puede generar la factura");
                return;
            }

            const doc = new jsPDF();
            const cart = this.cartItems;
            doc.addImage(propiedad, "png", 10, 10, 20, 20);

            doc.setFontSize(18)
            doc.text("Factura de compra", 60, 20)

            doc.setFontSize(9);
            doc.text("Razon social: Regalos Teis", 110, 50);
            doc.text("Dirección: Avenida Galicia 101, Vigo - 36216", 110, 55);
            doc.text("Tlf: 986 111 333 - Email: regalos@example.com", 110, 60);

            const headers = [["ID", "Producto", "Cantidad", "Precio_unitario", "Total"]];
            const data = cart.map((item) => [
                item._id,
                item.nombre,
                item.quantity,
                `${item.precio_unitario.toFixed(2)} €`,
                `${(item.quantity * item.precio_unitario).toFixed(2)} €`
            ])

            autoTable(doc , {
                startY: 80,
                head: headers,
                body: data,
                columnStyles: {
                    0: { halign: 'center' },
                    2: { halign: 'center' },
                    3: { halign: 'right' },
                    4: { halign: 'right' },
                },
                theme: 'striped',
            });

            const finalY =  doc.lastAutoTable ? doc.lastAutoTable.finalY : 80

            const totalText = `Total: ${this.cartItems.reduce((acc, item) => acc + item.precio_unitario * item.quantity, 0).toFixed(2)} €`;
            const pageWidth = doc.internal.pageSize.width;

            const totalWidth = doc.getTextWidth(totalText);
            const positionX = pageWidth - totalWidth - 14;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(totalText, positionX - 9, finalY + 10);

            doc.save("factura.pdf");
            console.log(doc);

        },
        
        
        async getCliente() {
            const clienteEmail = localStorage.getItem("email")
            const response = await fetch(`http://localhost:3000/usuarios?email=${encodeURI(clienteEmail)}`)
            if (!response.ok) {
                console.error("Error al obtener el cliente")
            }

            const cliente = await response.json();
            return cliente[0];

        },

        updateStock(item, cantidad) {
            item.stock_disponible -= cantidad;
            delete item.quantity;
            actualizarArticulo(item.id, item)
        },

        formatearListaItems(items) {
            const listaItemsNueva = items.map((item) => {
                return {
                    productoId: item.id,
                    nombre: item.nombre,
                    precio_unitario: item.precio_unitario,
                    cantidad: item.quantity,
                    total: parseInt(item.precio_unitario) * parseInt(item.quantity)
                }
            }
            )
            return listaItemsNueva
        }
        
    },



    beforeUnmount() {
        const cartStore = useCartStore(); 
        cartStore.clearCart(); 
    },

    beforeMount(){
        
    }

    

}
</script>

<style scoped></style>