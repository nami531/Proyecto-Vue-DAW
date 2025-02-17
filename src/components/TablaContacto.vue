<template>
    <div class="container mt-3 w-50">
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
                <button type="submit" class="btn btn-primary w-50 mt-4">Enviar</button>
            </div>
        </form>
    </div>
</template>

<script>
import emailjs from 'emailjs-com'; 
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
                }
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
                    const templateParams = {
                        from_name : this.contacto.nombre, 
                        telefono : this.contacto.tlf, 
                        reply_to : this.contacto.email, 
                        message : this.contacto.mensaje
                    }

                    emailjs.send(process.env.VUE_APP_SERVICE_ID, process.env.VUE_APP_TEMPLATE_ID, templateParams, process.env.VUE_APP_PUBLIC_EMAIL_ID)
                        .then((response) => {
                            console.log('Correo enviado exitosamente', response); 
                            this.mostrarAlerta('Enviado', 'Tu mensaje ha sido enviado con éxito', 'success'); 
                        })
                        .catch((error) => {
                            console.error('Error al enviar al correo', error)
                            this.mostrarAlerta('Error', 'Ha habido un problema', 'error'); 
                        }); 
                    this.contacto =  {
                        nombre : "", 
                        tlf : "", 
                        email : "", 
                        mensaje : ""
                    }
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