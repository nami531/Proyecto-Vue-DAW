<template>
    <NavBar />
    <div>
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold ">Trabaja con nosotros</h5>
        </div>
    </div>
    <div class="container-fluid border p-4">
        <div class="col-10 col-m-6 col-lg-5 mx-auto">
            <form @submit.prevent="enviar" class="form-in-line">

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Apellidos: </span>
                    <input type="text" class="form-control sm w-50" placeholder="Apellidos"
                        v-model="empleado.apellidos">
                    <span class="input-group-text custom-span mx-2">Nombre: </span>
                    <input type="text" placeholder="Nombre" class="form-control sm w-50" v-model="empleado.nombre">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Email: </span>
                    <input type="text" class="form-control sm w-75" placeholder="Email" v-model="empleado.email" @blur="validarEmail(this.empleado.email)">

                    <span class="input-group-text custom-span mx-2 ms-2">Móvil: </span>
                    <input type="text" class="form-control sm w-25 " placeholder="Móvil" v-model="empleado.movil" @blur="validarMovil(this.empleado.movil)">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">CV (.pdf): </span>
                    <input type="file" class="form-control sm w-100" placeholder="">

                </div>
                <input class="btn btn-primary m-2 col-2 p-2 text-align-center" type="submit" @click.prevent="" value="Enviar">
            </form>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Swal from 'sweetalert2';

export default {
    name: "TablaEmpleo",
    components: {
        NavBar
    },

    data() {
        return {
            empleado: {
                apellidos: "",
                nombre: "",
                email: "",
                movil: "",
                cv: "",
            }
        }
    },

    methods: {
        //Métodos auxiliares: 
        
        //Valida el email
        validarEmail(email) {
            const emailPattern = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
            if (!emailPattern.test(email)) {
                this.mostrarAlerta('Error', 'Formato correo electrónico no válido', 'error');
                this.emailError = "";
            } else {
                return true;
            }
        },

        //Valida el móvil
        validarMovil(movil) {
            if (movil === '') {
                // Si el campo está vacío, no hace nada
                return true;
            }
            // Comprobar el formato del móvil -> Empieza por 6 o 7 seguido de 8 dígitos
            const movilRegex = /^[67]\d{8}$/;  

            if (!movilRegex.test(movil)) {
                this.mostrarAlerta('Error', 'Móvil con formato no válido.', 'error');
                return false;
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
        },
    }
}
</script>
