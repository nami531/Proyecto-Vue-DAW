<!-- Aclaraciones previas: 
Se ha modificado un dato en el json a propósito con la finalidad de enseñar la funcionalidad del ordenado por fecha descendente en la tabla 
-->


<template>
    <div>
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold p-3 text-primary">
                <i class="bi bi-chat-left-text"></i> 
                ZONA DE COMENTARIOS 
                <router-link to="/"><i class="bi bi-arrow-return-left me-2 black"></i></router-link> 
            </h5>
        </div>
    </div>

    <div class="container">
            <div class="d-flex flex-row justify-content-between mb-3 border-3 border-start border-primary px-3 pt-3 bg-body-secondary shadow">
                <p>Solo los usuarios registrados pueden comentar</p>
                <router-link to="/registro"><strong>Regístrate</strong></router-link>
            </div>
            <div class="container border p-4 mx-auto">
                <form @submit.prevent="grabarComentario" class="form-in-line">
                    <div class="input-group-text mb-3">
                        <span class="input-group-text custom-span ms-2 me-2">Email</span>
                        <input type="text" class="form-control sm w-75" placeholder="Correo electrónico"
                            v-model="comentario.clienteEmail" @blur="validarEmail(comentario.clienteEmail)">
                        <span class="input-group-text custom-span ms-2">Móvil</span>
                        <input type="text" class="form-control sm w-25 ms-2" placeholder="Móvil" v-model="comentario.clienteMovil"
                            @blur="validarMovil(this.comentario.clienteMovil)">
                    </div>
                    
                    <div class="input-group-text mb-3">
                        <span class="input-group-text custom-span me-2 h-100 p-3">Mensaje: </span>
                        <textarea class="form-control w-100" v-model="comentario.clienteMensaje"
                            placeholder="Comentarios (máximo 256 caracteres)"
                            @blur="validarComentario(this.comentario.clienteMensaje)"></textarea>
                    </div>

                    <div class="input-group-text mb-3 justify-content-evenly">
                        <div class="input-group">
                            <span class="input-group-text custom-span me-2 h-100 p-3 rounded-2">Valoración: </span>
                            <div class="star-valor">
                                <span v-for="n in 5" :key="n" :class="n <= comentario.clienteValor? 'bi bi-star-fill' : 'bi bi-star'" 
                                @click="setValor(n)"
                                class="star-icon"
                                ></span>
                            </div>
                        </div>
                        

                        <button class="btn btn-secondary">
                            <i class="bi bi-eraser-fill fs-5" @click.prevent="limpiarFormCli"></i>
                        </button>
                    </div>

                    <div class="container text-center">
                        <input type="checkbox" v-model="comentario.lopd"> He leído y acepto la
                        <router-link to="/privacidad">Política de privacidad</router-link>
                    </div>

                    <input class="btn btn-primary m-2 col-2 p-2 text-align-center" type="submit" @click.prevent="grabarComentario" value="Enviar Comentario">
                </form>
            </div>
            <div v-if="isLogueado" >
                <h5 class="text-primary p-5"><i class="bi bi-file-earmark-bar-graph"></i> TABLA DE COMENTARIOS</h5>
            <table class="table table-striped mt-2">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="w-15 text-center align-middle">ID</th>
                        <th scope="col" class="w-25 text-start  align-middle">Fecha</th>
                        <th scope="col" class="w-25 text-start  align-middle">Email</th>
                        <th scope="col" class="w-20 text-center align-middle">Mensaje</th>
                        <th scope="col" class="w-10 text-center align-middle">Valoración</th>
                        <th scope="col" class="w-10 text-center align-middle">Gestión</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comentario in comentariosPorPagina" :key="comentario.id">
                        <td class="text-start align-middle">{{ comentario.id }}</td>
                        <td class="text-start align-middle">{{ comentario.fechaComentario }}</td>
                        <td class="text-start align-middle">{{ comentario.clienteEmail }}</td>
                        <td class="text-center align-middle">{{ comentario.clienteMensaje }}</td>
                        <td class="text-start align-middle">{{ comentario.clienteValor }}</td>
                        <td class="text-center align-middle table-info d-flex flex-row justify-content-evenly">
                            <div>
                                <button class="btn btn-warning m-2" @click="seleccionaComentario(comentario)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                            </div>

                            <div>
                                <button class="btn btn-danger m-2" @click="borrarComentario(comentario)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center my-3">
                <button class="btn btn-primary" :disabled="currentPage === 1" @click="paginaAnterior">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <span class="mx-3 align-self-center"> Página {{ currentPage }}</span>
                <button class="btn btn-primary" :disabled="currentPage * pageSize >= this.comentarios.length"
                    @click="siguientePagina">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
            </div>
            
        </div>

</template>

<script>
import Swal from 'sweetalert2';


export default {
    name : "TablaComentarios", 
    components : {
    }, 

    data (){
        return {
            comentario : {
                id : "",
                clienteEmail : "", 
                clienteMensaje : "",
                fechaComentario : "", 
                clienteMovil : "", 
                clienteValor : "", 
                lopd : "", 

            }, 

            comentarios : [], 

            pageSize: 5, //Registros por página
            currentPage: 1,
            isAdmin: false,
            isLogueado : false,
        }
    },


    mounted() {
        this.getComentarios(); 
        this.isAdmin = localStorage.getItem("isAdmin") === "true"
        this.isLogueado = localStorage.getItem("isLogueado") === "true"

    },

    computed : {
        comentariosPorPagina() {
            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            return this.comentarios.slice(indiceInicial, indiceInicial + this.pageSize);
        },
    },

    methods : {

        // Métodos principales
        // Método para grabar el comentario
        async grabarComentario() {
            

            // Verificar si los campos requeridos están llenos
            if (this.comentario.clienteEmail && this.comentario.clienteMovil && this.comentario.clienteValor) {
                if (this.comentario.lopd){  
                    if (!this.isLogueado) {
                        this.mostrarAlerta("Permiso denegado", "Debes tener una cuenta para comentar", "error")
                        return; 
                    }                   
                    if (this.comentario.clienteValor > 5 || this.comentario.clienteValor < 1){
                        this.mostrarAlerta("Error", "Se ha producido un error en la valoración", "error")
                    } else {

                        // Obtener los usuarios existentes
                        const response = await fetch('http://localhost:3000/usuarios');
                        if (!response.ok) {
                            throw new Error('Error al obtener los usuarios: ' + response.statusText);
                        }

                        const usuariosExistentes = await response.json();

                        // Verificar si el usuario ya está registrado para poder comentar 
                        const usuarioExistente = usuariosExistentes.find(usuario => usuario.email === this.comentario.clienteEmail);
                        if (!usuarioExistente){ 
                            this.mostrarAlerta("Permiso denegado", "Debe registrarse para continuar", "error")
                            return; 
                        }
                        
                        // Si el comentario ya existe y el usuario es admin se permite editarlo 
                        if (this.comentario.id && this.isAdmin){
                            const crearResponse = await fetch(`http://localhost:3000/comentarios/${this.comentario.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(this.comentario)
                            });

                            if (!crearResponse.ok) {
                                throw new Error('Error al editar el comentario: ' + crearResponse.statusText);
                            }
                            this.mostrarAlerta('Aviso', 'Comentario editado', 'success');
                            this.getComentarios();
                            this.limpiarFormCli()
                            return; 
                        }

                        // Si el usuario no existe se crea el comentario en la bbdd
                        // El email introducido en el comentario debe ser el mismo que el del usuario logueado 
                        let emailUsuarioLogueado = localStorage.getItem('email')
                        if (emailUsuarioLogueado === this.comentario.clienteEmail){
                            try {                                
                                this.comentario.fechaComentario = this.obtenerFechaHoy(); 
                                delete this.comentario.id; 

                                const crearResponse = await fetch('http://localhost:3000/comentarios', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(this.comentario)
                                });

                                if (!crearResponse.ok) {
                                    throw new Error('Error al guardar el comentario: ' + crearResponse.statusText);
                                }

                                const nuevoComentario = await crearResponse.json();
                                this.comentarios.push(nuevoComentario); // Agregar usuario al array local
                                this.mostrarAlerta('Aviso', 'Comentario grabado', 'success');
                                this.getComentarios();
                                this.limpiarFormCli()
                            } catch (error) {
                                console.error(error);
                                this.mostrarAlerta('Error', 'No se pudo grabar el comentario.', 'error');
                            }
                        
                        } else {
                            this.mostrarAlerta('Error', 'No puedes editar con el email de otra persona', 'error');
                        }    
                    }
                    
                     
                } else {
                    this.mostrarAlerta('Aviso', 'Por favor, acepta la política de privacidad.', 'warning');
                }
                
            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        },

        async seleccionaComentario(comentario) {
            if (!this.isAdmin){ 
                this.mostrarAlerta("Permiso denegado", "Un usuario no puede editar comentarios de otros usuarios", "error")
                return; 
            }
            
            // Buscar el usuario por DNI en el archivo JSON
            try {
                this.limpiarFormCli()
                const response = await fetch('http://localhost:3000/comentarios');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                const comentariosExistentes = await response.json();

                // Encontrar el usuario por su DNI
                const comentarioEncontrado = comentariosExistentes.find(c => c.id === comentario.id);


                if (comentarioEncontrado) {
                    this.comentario = { ...comentarioEncontrado };
                } else {
                    this.mostrarAlerta('Error', 'Comentario no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                this.mostrarAlerta('Error', 'No se pudo cargar el comentario desde el servidor.', 'error');
            }
        },

        async borrarComentario(comentario) {
            if (!this.isAdmin){ 
                this.mostrarAlerta("Permiso denegado", "Un usuario no puede eliminar comentarios de otros usuarios", "error")
                return; 
            }
            {const resp = await Swal.fire({
                title: "¿Estás seguro?",
                html: `Desea Eliminar el comentario de <strong>${comentario.clienteEmail}</strong> <br><br>Esta acción no se puede deshacer`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar"
            })
            
            if (resp.isConfirmed) {
                try {
                    const response = await fetch('http://localhost:3000/comentarios');
                    if (!response.ok) {
                        throw new Error('Error al obtener los comentarios: ' + response.statusText);
                    }

                    const comentariosExistentes = await response.json();
                    const comentarioExistente = comentariosExistentes.find(c => c.id === comentario.id);
                    if (!this.isAdmin) return; 
                    if (comentarioExistente) {
                        if (comentarioExistente.clienteEmail === this.comentario.clienteEmail){
                            await fetch(`http://localhost:3000/comentarios/${comentarioExistente.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(comentarioExistente)
                            });

                            this.mostrarAlerta("Aviso", "Comentario dado de baja correctamente", "success")
                            this.getComentarios();
                        } else {
                            this.mostrarAlerta("Error", "El email no coincide con el guardado en el servidor, no se va a borrar el comentario", "error")
                        }
                        
                    } else {
                        this.mostrarAlerta("Error", "Comentario no encontrado", "error")
                    }
                    this.limpiarFormCli()
                } catch (error) {
                    console.error(error);
                    this.mostrarAlerta('Error', 'No se pudo dar de baja el comentario.', 'error');
                }
            }
        }
        },


        async getComentarios() {
            try {
                const response = await fetch("http://localhost:3000/comentarios")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.comentarios = (await response.json()).sort((a, b) =>  new Date(a.fechaComentario) - new Date(b.fechaComentario) );
            } catch (error) {
                console.error(error);
            }
        },


        // Métodos auxiliares 
        setValor(n) {
            this.comentario.clienteValor = n;
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

        validarMovil(movil) {
            if (movil === '') {
                // Si el campo está vacío, no hace nada
                return true;
            }
            this.comentario.clienteMovil = movil;
            // Comprobar el formato del DNI/NIE
            const movilRegex = /^[67]\d{8}$/; // Formato empieza por 6 o 7 seguido de 8 dígitos 

            if (!movilRegex.test(movil)) {
                this.mostrarAlerta('Error', 'Móvil con formato no válido.', 'error');
                return false;
            }

        },

        validarComentario(comentario) {
            if (this.comentario.clienteMensaje.length > 256) {
                this.mostrarAlerta('Error', 'Has sobrepasado el número máximo de caracteres', 'error');
                return false;
            } else {
                this.comentario.clienteMensaje = comentario
                return false;
            }
        },


        obtenerFechaHoy() {
            const fecha = new Date();
            const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
            //return fecha.toLocaleDateString('es-ES');  // Formato dd/mm/yyyy
            return fechaFormateada;
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

        siguientePagina() {
            if (this.currentPage * this.pageSize < this.comentarios.length) {
                this.currentPage++;
            }
        },

        paginaAnterior() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        limpiarFormCli() {
            this.comentario = {
                id : "",
                clienteEmail : "", 
                clienteMensaje : "",
                fechaComentario : "", 
                clienteMovil : "", 
                clienteValor : "", 
                lopd : "", 
            }
        },
    },
}
</script>

<style scoped>
.star-valor {
    font-size: 2rem;
    /* TamaÃ±o de las estrellas */
    color: #ffc107;
    /* Color dorado */
    cursor: pointer;
}

.star-icon {
    margin-right: 5px;
}
</style>
