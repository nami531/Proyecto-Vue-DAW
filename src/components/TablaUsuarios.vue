<template>
    <div>
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold p-3 text-primary">
                <i class="bi bi-person-circle"></i> GESTIÓN USUARIOS</h5>
        </div>
    </div>

    <div class="container-fluid border p-4">
        <div class="col-10 col-m-6 col-lg-8 mx-auto">
            <form @submit.prevent="grabarUsuario" class="form-in-line">
            
                <div class="input-group-text mb-3">
                    <div class="input-group">
                        <div class="input-group d-flex flex-row ">
                            <div class="input-group w-50" >
                                <span class="input-group-text custom-span me-2">DNI/NIE</span>
                                <input type="text" class="form-control sm w-25" placeholder="DNI/NIE" v-model="usuario.dni"
                                @blur="validarDNI(this.usuario.dni)" :disabled="editDNI">
                                <button class="input-group-text" id="basic-addon1" @click.prevent="buscarusuario()">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                            <p class="me-2" :hidden="this.usuario.baja===''">El usuario está dado de baja</p>
                        </div>
                    </div>
                    <span class="input-group-text custom-span ms-auto me-2">Fecha alta</span>
                    <input type="date" class="form-control sm w-25" v-model="usuario.alta">
                </div>
                
                
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Apellidos</span>
                    <input type="text" class="form-control sm w-50" placeholder="Apellidos" v-model="usuario.apellidos">
                    <span class="input-group-text custom-span me-2 ms-2">Nombre</span>
                    <input type="text" class="form-control sm w-50 ms-2" placeholder="Nombre" v-model="usuario.nombre">
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span ms-auto me-2">Dirección</span>
                    <input type="text" class="form-control sm w-75" placeholder="Dirección" v-model="usuario.direccion">
                    <span class="input-group-text custom-span ms-2 me-2">Email</span>
                    <input type="text" class="form-control sm w-25" placeholder="Correo electrónico"
                        v-model="usuario.email" @blur="validarEmail(usuario.email)">
                    <span class="input-group-text custom-span ms-2">Móvil</span>
                    <input type="text" class="form-control sm w-25 ms-2" placeholder="Móvil" v-model="usuario.movil"
                        @blur="validarMovil(this.usuario.movil)">
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span ms-auto me-2">Provincia</span>
                    <select name="provincia" id="provincia" class="form-select w-50" v-model="usuario.provincia">
                        <option value="" disabled>Provincia</option>
                        <option v-for="provincia in provincias" :key="provincia.id" :value="provincia">{{ provincia.nm }}</option>
                    </select>
                    <span class="input-group-text custom-span ms-2 me-2">Municipio</span>
                    <select name="municipio" id="municipio" class="form-select  " v-model="usuario.municipio">
                        <option value="" disabled>Municipio</option>
                        <option v-for="municipio in filtroMunicipios" :key="municipio.id" :value="municipio">{{ municipio.nm }}</option>
                    </select>

                    <span class="input-group-text custom-span ms-2 me-2">Tipo de usuario: </span>
                    <select name="municipio" id="municipio" class="form-select  " v-model="usuario.tipo">
                        <option value="" disabled>Tipo</option>
                        <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
                    </select>

                    <input class="ms-3" type="checkbox" name="historico" id="historico" v-model="isChecked">
                    <label class="input-group-text custom-span mx-2" for="historico">Historico</label>
                    <button class="btn btn-secondary">
                        <i class="bi bi-eraser-fill fs-5" @click="limpiarFormCli"></i>
                    </button>
                </div>

                <div class="d-flex justify-content-center flex-sm-wrap row">
                    <input class="btn btn-primary m-2 col-1" type="submit" @click.prevent="grabarUsuario" value="Alta">
                    <input class="btn btn-primary m-2 col-1" type="submit" @click.prevent="modificarUsuario"
                        value="Modificar">
                    <input class="btn btn-primary m-2 col-1" type="submit" @click.prevent="eliminarUsuario"
                        value="Eliminar">
                </div>
            </form>
            <table class="table table-striped mt-2">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="w-15 text-center align-middle">DNI</th>
                        <th scope="col" class="w-25 text-start  align-middle">Apellidos</th>
                        <th scope="col" class="w-25 text-start  align-middle">Nombre</th>
                        <th scope="col" class="w-20 text-center align-middle">Email</th>
                        <th scope="col" class="w-10 text-center align-middle">Móvil</th>
                        <th scope="col" class="w-10 text-center align-middle">Rol</th>
                        <th scope="col" class="w-10 text-center align-middle">Fecha Baja</th>
                        <th scope="col" class="table-info text-center align-middle">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in usuariosPorPagina" :key="usuario.id">
                        <td class="text-start align-middle">{{ usuario.dni }}</td>
                        <td class="text-start align-middle">{{ usuario.apellidos }}</td>
                        <td class="text-start align-middle">{{ usuario.nombre }}</td>
                        <td class="text-center align-middle">{{ usuario.email }}</td>
                        <td class="text-start align-middle">{{ usuario.movil }}</td>
                        <td class="text-start align-middle">{{ usuario.tipo }}</td>
                        <td class="text-start align-middle">{{ usuario.baja }}</td>
                        <td class="text-center align-middle table-info">
                            <div>
                                <button class="btn btn-warning m-2" @click="seleccionaUsuario(usuario)">
                                    <i class="fas fa-pencil-alt"></i>
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
                <button class="btn btn-primary" :disabled="currentPage * pageSize >= filtroUsuarios.length"
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
    name: "TablaUsuarios",
    components: {
        
    },

    data() {
        return {
            usuario: {
                dni: "",
                alta: "",
                apellidos: "",
                nombre: "",
                direccion: "",
                email: "",
                provincia: "",
                municipio: {
                    id: "",
                    nm: "",
                },
                baja: "",
                movil: "",
                tipo : "",
            },
            usuarios: [],
            provincias: [],
            municipios: [],
            erros: [],
            isChecked: false,
            editDNI: false,
            pageSize: 5, //Registros por página
            currentPage: 1,
            tipos: ["usuario", "admin"]
        }
    },

    mounted() {
        this.getProvincias();
        this.getUsuarios();
        this.getMunicipios();
    },

    computed: {
        usuariosPorPagina() {
            console.log(this.filtroUsuarios); 
            const usuariosFiltrados = this.filtroUsuarios;
            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            return usuariosFiltrados.slice(indiceInicial, indiceInicial + this.pageSize);
        },

        filtroUsuarios() {
            return this.isChecked ? this.usuarios : this.usuarios.filter(usuario => !usuario.baja);
        },

        filtroMunicipios() {
            return this.municipios.filter(municipio => municipio.id.startsWith(this.usuario.provincia.id));
        }

    },

    methods: {
        // Método para grabar el usuario
        async grabarUsuario() {

            // Verificar si los campos requeridos están llenos
            if (this.usuario.dni && this.usuario.apellidos) {
                // Obtener los usuarios existentes
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios: ' + response.statusText);
                }

                const usuariosExistentes = await response.json();

                // Verificar si el DNI ya está registrado
                const usuarioExistente = usuariosExistentes.find(usuario => usuario.dni === this.usuario.dni);
                if (this.usuario.baja) {
                    try {
                        if (usuarioExistente) {
                            usuarioExistente.baja = "";

                            await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(usuarioExistente)
                            });

                            this.mostrarAlerta("Aviso", "Usuario dado de alta correctamente", "success")
                            this.getUsuarios();
                        } else {
                            this.mostrarAlerta("Error", "Usuario no encontrado", "error")
                        }
                        this.limpiarFormCli()
                    } catch (error) {
                        console.error(error);
                        this.mostrarAlerta('Error', 'No se pudo dar de alta el usuario.', 'error');
                    }
                } else {
                    try {
                        this.usuario.baja = ''

                        if (usuarioExistente) {
                            // Si el DNI ya existe, mostrar un mensaje de error
                            this.mostrarAlerta('Error', 'El DNI ya está registrado.', 'error');
                        } else {
                            // Le añadimos el campo oculto al usuario.
                            if (this.usuario.tipo === "") this.usuario.tipo = "usuario"; 

                            // Si el DNI no existe, agregar el usuario a la base de datos
                            const crearResponse = await fetch('http://localhost:3000/usuarios', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(this.usuario)
                            });

                            if (!crearResponse.ok) {
                                throw new Error('Error al guardar el usuario: ' + crearResponse.statusText);
                            }

                            const nuevousuario = await crearResponse.json();
                            this.usuarios.push(nuevousuario); // Agregar usuario al array local
                            this.mostrarAlerta('Aviso', 'Usuario Grabado', 'success');
                            this.getUsuarios();
                        }
                        this.limpiarFormCli()
                    } catch (error) {
                        console.error(error);
                        this.mostrarAlerta('Error', 'No se pudo grabar el usuario.', 'error');
                    }
                }
            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        },

        async seleccionaUsuario(usuario) {
            // Buscar el usuario por DNI en el archivo JSON
            try {
                this.limpiarFormCli()
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                const usuarios = await response.json();

                // Encontrar el usuario por su DNI
                const usuarioEncontrado = usuarios.find(c => c.dni === usuario.dni);


                if (usuarioEncontrado) {
                    // Convertir la fecha de alta al formato dd/mm/yyyy
                    // Asignar el objeto completo de provincia y municipio
                    if (this.usuario.provincia) {
                        this.usuario.provincia = this.provincias.find(p => p.nm === this.usuario.provincia).nm;
                        if (this.usuario.provincia) {
                            console.log("Provincia encontrada", this.usuario.provincia);

                        }
                    }

                    this.usuario = { ...usuarioEncontrado };
                    this.editDNI = true;
                    console.log("usuario encontrado", this.usuario.municipio);
                    if (this.usuario.alta) {
                        this.usuario.alta = this.usuario.alta.split('T')[0];  // Para asegurarse de que la fecha esté en formato YYYY-MM-DD
                    }
                } else {
                    this.mostrarAlerta('Error', 'Usuario no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo cargar el usuario desde el servidor.', 'error');
            }
        },

        async eliminarUsuario() {
            try {
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios: ' + response.statusText);
                }

                const usuariosExistentes = await response.json();

                // Verificar si el DNI ya está registrado
                const usuarioExistente = usuariosExistentes.find(usuario => usuario.dni === this.usuario.dni);

                if (usuarioExistente) {
                    const hoy = this.obtenerFechaHoy();
                    usuarioExistente.baja = hoy;

                    await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(usuarioExistente)
                    });

                    this.mostrarAlerta("Aviso", "Usuario dado de baja correctamente", "success")
                    this.getUsuarios();
                } else {
                    this.mostrarAlerta("Error", "Usuario no encontrado", "error")
                }
                this.limpiarFormCli()
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo dar de baja el usuario.', 'error');
            }
        },

        async modificarUsuario() {
            try {
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios: ' + response.statusText);
                }

                const usuariosExistentes = await response.json();

                // Verificar si el DNI ya está registrado
                let usuarioExistente = usuariosExistentes.find(usuario => usuario.dni === this.usuario.dni);

                if (usuarioExistente) {
                    usuarioExistente = this.usuario;

                    await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(usuarioExistente)
                    });

                    this.mostrarAlerta("Aviso", "Usuario modificado correctamente", "success")
                    this.getUsuarios();
                } else {
                    this.mostrarAlerta("Error", "Usuario no encontrado", "error")
                }
                this.limpiarFormCli()
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo modificar el usuario.', 'error');
            }
        },


        // Métodos auxiliares
        // Método para validar el dni
        validarDNI(dni) {
            if (dni === '') {
                // Si el campo está vacío, no hace nada
                return true;
            }
            dni = dni.toUpperCase(); // Convertir a mayúsculas
            this.usuario.dni = dni;
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

        validarMovil(movil) {
            if (movil === '') {
                // Si el campo está vacío, no hace nada
                return true;
            }
            this.usuario.movil = movil;
            // Comprobar el formato del DNI/NIE
            const movilRegex = /^[67]\d{8}$/; // Formato empieza por 6 o 7 seguido de 8 dígitos 

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

        siguientePagina() {
            if (this.currentPage * this.pageSize < this.usuarios.length) {
                this.currentPage++;
            }
        },

        paginaAnterior() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        async getUsuarios() {
            try {
                const response = await fetch("http://localhost:3000/usuarios")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.usuarios = (await response.json()).sort((a, b) => a.apellidos.localeCompare(b.apellidos) || a.nombre.localeCompare(b.nombre));
            } catch (error) {
                console.error(error);
            }
        },

        async getProvincias() {
            try {
                const response = await fetch("http://localhost:3000/provincias")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.provincias = await response.json();
            } catch (error) {
                console.error(error);
            }
        },

        async getMunicipios() {
            try {
                const response = await fetch("http://localhost:3000/municipios")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.municipios = await response.json();
            } catch (error) {
                console.error(error);
            }
        },

        limpiarFormCli() {
            this.usuario = {
                alta: "",
                dni: "",
                apellidos: "",
                nombre: "",
                direccion: "",
                email: "",
                provincia: "",
                municipio: "",
                baja: "",
                movil: "",
            }
            this.editDNI = false;
        },

        obtenerFechaHoy() {
            const fecha = new Date();
            const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
            //return fecha.toLocaleDateString('es-ES');  // Formato dd/mm/yyyy
            return fechaFormateada;
        },

        async buscarusuario(){
            try {
                if (this.usuario.dni === ""){
                    this.mostrarAlerta('Error', 'Debes introducir un DNI', 'error');
                } else {
                    // Primero, conseguimos el array de usuarios para encontrar al usuario por su dni                 
                    let response = await fetch("http://localhost:3000/usuarios/"); 
                    if (!response.ok){
                        throw new Error("Error en la solicitud" + response.statusText); 
                    }
                    
                    let usuarios = await response.json();
                    let usuarioExistente = usuarios.filter(usuario => usuario.dni === this.usuario.dni)[0];
                    
                    if (!usuarioExistente){
                        this.mostrarAlerta('Error', `El usuario con dni ${this.usuario.dni} no existe`, 'error');
                    } else {
                        response = await fetch(`http://localhost:3000/usuarios/${usuarioExistente.id}`)
                        if (!response.ok) {
                            throw new Error("Error en la solicitud" + response.statusText)
                        }
                        this.usuario = await response.json()
                    }
                }
                
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo encontrar el usuario.', 'error');

            }
        }

    }
}

</script>

<style scoped>
.tbodyAltura {
    width: 100%;
    max-height: 450px;
    display: block;
    overflow: auto;
}

thead {
    height: 75px;
    max-height: 75px;
}

tbody {
    height: 350px !important;
}
</style>