<template>
    <div class="container mt-3 w-50">
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold text-primary p-3 underline-effect">
                <i class="bi bi-envelope-paper"></i>
                Contacta con nosotros <router-link to="/">
                <i class="bi bi-arrow-return-left me-2 black"></i></router-link> </h5>
        </div>
        <form @submit.prevent="enviarCorreo" class="border rounded shadow p-4  ">
            <div class=" d-flex flex-column justify-content-center align-items-center">
                <div class="input-group mb-3">
                    <label for="dni" class="form-label col-2 text-start">Nombre:</label>
                    <input type="text" class="form-control " v-model="contacto.nombre" required />
                </div>


                <div class="input-group mb-3 ">
                    <label class="form-label col-2 text-start">Teléfono:</label>
                    <input type="text" class="form-control" v-model="contacto.tlf" required />
                </div>

                <div class="input-group mb-3">
                    <label class="form-label col-2 text-start">Correo electrónico:</label>
                    <input type="text"  class="form-control " v-model="contacto.email" required />
                </div>

                <div class="input-group mb-3">
                    <label class="form-label col-2 text-start">Mensaje:</label>
                    <textarea class="form-control" v-model="contacto.mensaje" ></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-25 mt-4">Enviar</button>
            </div>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
    export default {
        name : "TablaContacto",
        components : {
            
        }, 
        data(){
            return {
                contacto : {
                    nombre : "", 
                    tlf : "", 
                    email : "", 
                    mensaje : ""
                },
                mensajeError : ""
            }
        }, 

        computed : {
            esNombreValido(){
                return this.contacto.nombre.trim()!= ''; 
            }, 

            esTelefonoValido(){
                const regexTelefono = /^[67]\d{8}$/; 
                return regexTelefono.test(this.contacto.tlf); 
            }, 

            esEmailValido(){
                const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return regexEmail.test(this.contacto.email)
            }
        }, 

        methods : {
            enviarCorreo(){
                if (this.esNombreValido && this.esTelefonoValido && this.esEmailValido){
                    fetch('http://localhost:5000/enviar-correo',{
                        method : 'POST', 
                        headers: {
                            'Content-Type' : 'application/json', 
                        },
                        body : JSON.stringify(this.contacto),

                    }).then(response => response.json())
                    .then(data => {
                        if (data.message){
                            this.contacto.nombre = "", 
                            this.contacto.tlf = "", 
                            this.contacto.email = "", 
                            this.contacto.mensaje = ""
                            this.mostrarAlerta("Enviado", "Mensaje enviado con éxito", "success")
                        } else {
                            this.mensajeError = "Hubo un problema al enviar el mensaje. Inténtalo de nuevo"; 
                        }
                    })
                    .catch(error => {
                        console.error(error); 
                        this.mensajeError = 'Hubo un problema en la conexión del servidor al enviar el mensaje. Intenta de nuevo'
                    })
                } else {
                    this.mostrarAlerta('Error', 'Por favor completa todos los campos correctamente', 'error')
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

<style></style>