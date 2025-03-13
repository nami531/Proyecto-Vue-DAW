<template>
    <div class="container">
        <h3 class="text-center p-2">Listado de facturas</h3>
        <table class="table custom-table mt-2">
            <thead>
                <tr class="table-primary">
                    <th scope="col" class="w-10 text-center align-middle">Id</th>
                    <th scope="col" class="w-20 text-start  align-middle">ClienteID</th>
                    <th scope="col" class="w-45 text-center align-middle">Fecha</th>
                    <th scope="col" class="w-10 text-center align-middle">Total factura</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="factura in facturasPorPagina" :key="factura._id">
                    <td class="text-center align-middle">{{ factura._id.substring(0, 8) }}</td>
                    <td class="text-center align-middle">{{ factura.clienteID }}</td>
                    <td class="text-center align-middle">{{ obtenerFechaHoy(factura.fecha) }}</td>
                    <td class="text-center align-middle">{{ factura.totalFactura.toFixed(2) }} &euro;</td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center my-3">
            <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior">
                <i class="bi bi-chevron-left"></i>
            </button>
            <span class="mx-3 align-self-center"> Página {{ currentPage }}</span>
            <button class="btn btn-primary" :disabled="currentPage * pageSize >= this.facturas.length"
                @click="siguientePagina">
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
    </div>
    
</template>

<script>
import { obtenerFacturas } from '@/js/facturaServicios';

export default {
    name : "TablaFacturas",
    data() {
        return {
            facturas : [],
            pageSize: 10,
            currentPage: 1,
        }
    },

    computed: {
        facturasPorPagina() {
            const indiceInicial = (this.currentPage - 1) * this.pageSize;

            return this.facturas.slice(indiceInicial, indiceInicial + this.pageSize);
        }
    },
    
    mounted() {
        this.getFacturas(); 
    },

    methods : {
        async getFacturas(){
            try {
                this.facturas = await obtenerFacturas(); 
            }
            catch (error){
                console.error(error.message)
            }
        }, 
        obtenerFechaHoy(fechaSinFormatear) {
            const fecha = new Date(fechaSinFormatear);
            const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
            //return fecha.toLocaleDateString('es-ES');  // Formato dd/mm/yyyy
            return fechaFormateada;
        }, 
        
        siguientePagina() {
            if (this.currentPage * this.pageSize < this.facturas.length) {
                this.currentPage++;
            }
        },

        paginaAnterior() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
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