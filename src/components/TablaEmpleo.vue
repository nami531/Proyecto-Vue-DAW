<template>
    <div>
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold text-primary p-3" >Trabaja con nosotros</h5>
        </div>
    </div>
    <div class="container">
        <div class="col-10 col-m-10 col-lg-10 border p-4 mx-auto">
            <form @submit.prevent="grabarCandidato" class="d-inline">

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Apellidos: </span>
                    <input type="text" class="form-control sm w-50" placeholder="Apellidos"
                        v-model="empleado.apellidos">
                    <span class="input-group-text custom-span mx-2">Nombre: </span>
                    <input type="text" placeholder="Nombre" class="form-control sm w-50" v-model="empleado.nombre">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Email: </span>
                    <input type="text" class="form-control sm w-75" placeholder="Email" v-model="empleado.email"
                        @blur="validarEmail(this.empleado.email)">

                    <span class="input-group-text custom-span mx-2 ms-2">Móvil: </span>
                    <input type="text" class="form-control sm w-25 " placeholder="Móvil" v-model="empleado.movil"
                        @blur="validarMovil(this.empleado.movil)">
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Departamento: </span>
                    <select name="provincia" id="provincia" class="form-select w-50" v-model="empleado.categoria">
                        <option value="" disabled>Departamento</option>
                        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre">{{ categoria.nombre }}</option>
                    </select>
                    
                    <span class="input-group-text custom-span mx-2">Modalidad: </span>
                    <div class="d-flex justify-content-evenly align-items-center w-50 flex-wrap">
                        <div>
                            <input id="remoto" class="form-check-input ms-2 " type="radio" name="modalidad" v-model="empleado.modalidad" value="Remoto">
                            <label for="remoto" class="custom-span me-2 ms-1">Remoto</label>
                        </div>

                        <div>
                            <input id="hibrido" class="form-check-input ms-2 " type="radio" name="modalidad" v-model="empleado.modalidad" value="Híbrido">
                            <label for="hibrido" class="custom-span me-2  ms-1">Híbrido</label>
                        </div>

                        <div>
                            <input id="presencial" class="form-check-input ms-2 " type="radio" name="modalidad" v-model="empleado.modalidad" value="Presencial">
                            <label for="presencial" class="custom-span me-2  ms-1">Presencial</label>
                        </div>
                    </div>
                    
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2 h-100 p-3">Comentarios: </span>
                    <textarea class="form-control w-100" v-model="empleado.comentarios" placeholder="Comentarios (máximo 256 caracteres)" @blur="validarComentario(this.empleado.comentarios)"></textarea>
                </div>

                <div class="input-group-text mb-3 ">
                    <span class="input-group-text custom-span me-2">CV (.pdf): </span>
                    <input type="file" class="form-control sm w-100" placeholder="">

                </div>
                <div class="container text-center">
                        <input type="checkbox" v-model="empleado.avisolegal"> He leído y acepto la <router-link to="/privacidad">Política de privacidad</router-link>
                    </div>
                <input class="btn btn-primary m-2 col-2 p-2 text-align-center" type="submit"
                    @click.prevent="grabarCandidato" value="Enviar">
            </form>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: "TablaEmpleo",
    components: {
        
    },

    data() {
        return {
            empleado: {
                apellidos: "",
                nombre: "",
                email: "",
                movil: "",
                cv: "",
                categoria: "",
                modalidad : "",
                avisolegal : "",
                comentarios: "",
            },
            candidatos: [],
            categorias: [],
        }
    },

    mounted(){
        this.getDepartamentos(); 
    },

    methods: {
        // Métodos principales
        // Método para grabar el candidato
        async grabarCandidato() {

            // Verificar si los campos requeridos están llenos
            if (this.empleado.apellidos && this.empleado.email && this.empleado.nombre && this.empleado.categoria && this.empleado.movil && this.empleado.modalidad) {
                if (this.empleado.avisolegal){
                    if (this.empleado.comentarios.length > 256) this.empleado.comentarios = ""; 
                    try {
                    const response = await fetch('http://localhost:3000/candidatos');
                    if (!response.ok) {
                        throw new Error('Error al obtener los candidatos: ' + response.statusText);
                    }

                    const candidatosExistentes = await response.json();

                    // Verificar si el email ya está registrado
                    const candidatoExistente = candidatosExistentes.find(c => c.email === this.empleado.email);

                    if (candidatoExistente) {
                        // Si el email ya existe, mostrar un mensaje de error
                        this.mostrarAlerta('Error', 'El email ya está registrado.', 'error');                    
                    } else {
                    // Si el DNI no existe, agregar el usuario a la base de datos
                    const crearResponse = await fetch('http://localhost:3000/candidatos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.empleado)
                    });

                    if (!crearResponse.ok) {
                        throw new Error('Error al guardar el usuario: ' + crearResponse.statusText);
                    }

                    const nuevoCandidato = await crearResponse.json();
                    this.candidatos.push(nuevoCandidato); // Agregar usuario al array local
                    this.mostrarAlerta('Aviso', 'Candidatura Enviada', 'success');
                    this.limpiarFormCli();
                }

                } catch (error) {
                    console.error(error);
                    this.mostrarAlerta('Error', 'No se pudo grabar el empleado.', 'error');
                }
                } else {
                    this.mostrarAlerta('Error', 'Debe aceptar la política de privacidad para continuar', 'error');
                }

                
            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        },


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

        validarComentario(comentario){
            if (this.empleado.comentarios.length > 256) {
                this.mostrarAlerta('Error', 'Has sobrepasado el número máximo de caracteres', 'error'); 
                return false; 
            } else {
                this.empleado.comentarios = comentario
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

        limpiarFormCli() {
            this.empleado = {
                apellidos: "",
                nombre: "",
                email: "",
                movil: "",
                cv: "",
                avisolegal : false,
            }
        },

    
        async getDepartamentos(){
            try {
                const response = await fetch("http://localhost:3000/categorias")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.categorias = await response.json();
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
