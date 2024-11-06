<template>
    <div>
        <NavBar></NavBar>
    </div>
    <div>
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold ">GESTIÓN CLIENTES</h5>
        </div>
    </div>

    <div class="container-fluid border p-4">
        <div class="col-10 col-m-6 col-lg-8 mx-auto">
            <form @submit.prevent="grabarCliente" class="form-in-line">

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">DNI/NIE</span>
                    <input type="text" class="form-control sm w-25" placeholder="DNI/NIE" v-model="cliente.dni"
                        @blur="validarDNI(this.cliente.dni)">
                    <span class="input-group-text custom-span ms-auto me-2">Fecha alta</span>
                    <input type="date" class="form-control sm w-25" v-model="cliente.alta">
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Apellidos</span>
                    <input type="text" class="form-control sm w-50" placeholder="Apellidos" v-model="cliente.apellidos">
                    <span class="input-group-text custom-span me-2 ms-2">Nombre</span>
                    <input type="text" class="form-control sm w-50 ms-2" placeholder="Nombre" v-model="cliente.nombre">
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span ms-auto me-2">Dirección</span>
                    <input type="text" class="form-control sm w-75" placeholder="Dirección" v-model="cliente.direccion">
                    <span class="input-group-text custom-span ms-auto me-2">Email</span>
                    <input type="text" class="form-control sm w-25" placeholder="Correo electrónico"
                        v-model="cliente.email">
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span ms-auto me-2">Provincia</span>
                    <select name="provincia" id="provincia" class="form-select w-50">
                        <option value="">Selecciona una opción</option>
                    </select>
                    <span class="input-group-text custom-span ms-2 me-2">Municipio</span>
                    <select name="municipio" id="municipio" class="form-select  ">
                        <option value="">Selecciona una opción</option>
                    </select>
                    <input class="ms-3" type="checkbox" name="historico" id="historico" v-model="isChecked">
                    <label class="input-group-text custom-span mx-2" for="historico" >Historico</label>

                </div>

                <div class="d-flex justify-content-center flex-sm-wrap">
                    <input class="btn btn-primary m-2" type="submit" @click.prevent="grabarCliente" value="Guardar">
                    <input class="btn btn-primary m-2" type="submit" @click.prevent="grabarCliente" value="Modificar">
                    <input class="btn btn-primary m-2" type="submit" @click.prevent="grabarCliente" value="Eliminar">
                </div>

                <table class="table table-striped mt-2 ">
                    <thead>
                        <tr class="table-primary">
                            <th scope="col" class="w-15 text-center">DNI</th>
                            <th scope="col" class="w-25">Apellidos</th>
                            <th scope="col" class="w-25">Nombre</th>
                            <th scope="col" class="w-20 text-center">Email</th>
                            <th scope="col" class= "w-10 text-center">Fecha Baja</th>
                            <th scope="col" class="table-info">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in filtroClientes" :key="cliente.id">
                            <td class="align-middle">{{ cliente.dni }}</td>
                            <td class="align-middle">{{ cliente.apellidos }}</td>
                            <td class="align-middle">{{ cliente.nombre }}</td>
                            <td class="align-middle">{{ cliente.email }}</td>
                            <td class="align-middle">{{ cliente.baja }}</td>
                            <td class="text-center align-middle table-info">
                                <div>
                  <button class="btn btn-warning m-2" @click="seleccionaCliente(cliente)">
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button class="btn btn-danger m-2" @click="deleteCliente(cliente.dni)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Swal from 'sweetalert2';
export default {
    name: "TablaClientes",
    components: {
        NavBar
    },

    data() {
        return {
            clientes: [
            {
                dni: "12345678A",
                alta: "2024-11-01",
                apellidos: "González Pérez",
                nombre: "Juan",
                direccion: "Calle Ficticia, 123", 
                email: "sdfhksdjfh@mgs.com"
            },
            {
                dni: "87654321B",
                alta: "2024-11-02",
                apellidos: "Martínez Rodríguez",
                nombre: "Ana",
                direccion: "Avenida Libertad, 456"
            },
            {
                dni: "11223344C",
                alta: "2024-11-03",
                apellidos: "López Sánchez",
                nombre: "Carlos",
                direccion: "Calle del Sol, 789",
                baja:"24-10-2024",
            }
            ],
            cliente: {
                dni: "",
                alta: "",
                apellidos: "",
                nombre: "",
                direccion: "",
                email:"", 
                provincia: "", 
                municipio: "", 
                baja:"",
            },
            erros: [],
            isChecked: false, 
        }
    },

    computed: {
        filtroClientes(){
            return this.isChecked ? this.clientes : this.clientes.filter(cliente => !cliente.baja); 
        }
    },

    methods: {
        // Método para grabar el cliente
        grabarCliente() {
            let dni = this.cliente.dni;
            if (this.cliente.dni && this.cliente.apellidos && this.cliente.email && this.cliente.alta) {
                console.log("DNI válido: ", dni);
                this.clientes.push({...this.clientes})
            } else {
                console.log("Error: Por favor completa todos los campos requeridos")
            }
            console.log("Prueba grabar dni");
        },

        // Métodos auxiliares
        // Método para validar el dni
        validarDNI(dni) {
            if (dni === '') {
                // Si el campo está vacío, no hace nada
                return true;
            }
            dni = dni.toUpperCase(); // Convertir a mayúsculas
            this.cliente.dni = dni;
            // Comprobar el formato del DNI/NIE
            const dniRegex = /^[XYZ0-9][0-9]{7}[A-Z]$/; // Formato 8 dígitos seguido de 1 letra

            if (!dniRegex.test(dni)) {
                this.mostrarAlerta('Error', 'El NIE/DNI con formato no válido.', 'error');
                return false;
            }

            // Inicializar variables para el cálculo
            let dniNum = dni.substring(0, 8); // Extraer los números
            const letra = dni.charAt(8); // Obtener la letra en la posición 8
            // Identificación del NIE y sustitución
            if (dniNum.charAt(0) === 'X') {
                dniNum = dniNum.substring(1, 8)
                dniNum = '0' + dniNum; // Sustituir X por 0
            } else if (dniNum.charAt(0) === 'Y') {
                dniNum = dniNum.substring(1, 8)
                dniNum = '1' + dniNum; // Sustituir Y por 1
            } else if (dni.charAt(0) === 'Z') {
                dniNum = dniNum.substring(1, 8)
                dniNum = '2' + dniNum; // Sustituir Z por 2
            }

            // Comprobar la letra esperada
            const letras = 'TRWAGMYFPDXBNJZSQVHLCKE'; // Letras válidas para el DNI
            const letraCalculada = letras[dniNum % 23]; // Calcular la letra esperada
            if (letra !== letraCalculada) {
                this.mostrarAlerta('Error', 'DNI/NIE Incorrecto.', 'error');
                return false;
            }

            return true; // DNI/NIE válido
        },
        //validar email
        validarEmail(email) {
            const emailPattern = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
            if (!emailPattern.test(email)) {
                this.mostrarAlerta('Error', 'Formato correo electrónico no válido', 'error');
                this.emailError = "";
            } else {
                return true;
            }
        },
        // Método para mostrar alertas
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
        }
    }
}

</script>

<style scoped></style>