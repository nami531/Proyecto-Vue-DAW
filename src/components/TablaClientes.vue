<template>
    <div>
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold ">GESTIÓN CLIENTES</h5>
        </div>
    </div>

    <div class="container-fluid border p-4">
        <div class="col-10 col-m-6 col-lg-8 mx-auto">
            <form @submit.prevent="grabarCliente" class="form-in-line">
            
                <div class="input-group-text mb-3">
                    <div class="input-group">
                        <div class="input-group d-flex flex-row ">
                            <div class="input-group w-50" >
                                <span class="input-group-text custom-span me-2">DNI/NIE</span>
                                <input type="text" class="form-control sm w-25" placeholder="DNI/NIE" v-model="cliente.dni"
                                @blur="validarDNI(this.cliente.dni)" :disabled="editDNI">
                                <button class="input-group-text" id="basic-addon1" @click.prevent="buscarCliente()">
                                    <i class="bi bi-search"></i>
                                </button>
                            </div>
                            <p class="me-2" :hidden="this.cliente.baja===''">El cliente está dado de baja</p>
                        </div>
                    </div>
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
                    <span class="input-group-text custom-span ms-2 me-2">Email</span>
                    <input type="text" class="form-control sm w-25" placeholder="Correo electrónico"
                        v-model="cliente.email" @blur="validarEmail">
                    <span class="input-group-text custom-span ms-2">Móvil</span>
                    <input type="text" class="form-control sm w-25 ms-2" placeholder="Móvil" v-model="cliente.movil"
                        @blur="validarMovil(this.cliente.movil)">
                </div>
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span ms-auto me-2">Provincia</span>
                    <select name="provincia" id="provincia" class="form-select w-50" v-model="cliente.provincia">
                        <option value="" disabled>Provincia</option>
                        <option v-for="provincia in provincias" :key="provincia.id" :value="provincia">{{ provincia.nm
                            }}
                        </option>
                    </select>
                    <span class="input-group-text custom-span ms-2 me-2">Municipio</span>
                    <select name="municipio" id="municipio" class="form-select  " v-model="cliente.municipio">
                        <option value="" disabled>Municipio</option>
                        <option v-for="municipio in filtroMunicipios" :key="municipio.id" :value="municipio">{{
                            municipio.nm }}</option>
                    </select>
                    <input class="ms-3" type="checkbox" name="historico" id="historico" v-model="isChecked">
                    <label class="input-group-text custom-span mx-2" for="historico">Historico</label>
                    <button class="btn btn-secondary">
                        <i class="bi bi-eraser-fill fs-5" @click="limpiarFormCli"></i>
                    </button>
                </div>

                <div class="d-flex justify-content-center flex-sm-wrap row">
                    <input class="btn btn-primary m-2 col-1" type="submit" @click.prevent="grabarcliente" value="Alta">
                    <input class="btn btn-primary m-2 col-1" type="submit" @click.prevent="modificarCliente"
                        value="Modificar">
                    <input class="btn btn-primary m-2 col-1" type="submit" @click.prevent="eliminarCliente"
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
                        <th scope="col" class="w-10 text-center align-middle">Fecha Baja</th>
                        <th scope="col" class="table-info text-center align-middle">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientesPorPagina" :key="cliente.id">
                        <td class="text-start align-middle">{{ cliente.dni }}</td>
                        <td class="text-start align-middle">{{ cliente.apellidos }}</td>
                        <td class="text-start align-middle">{{ cliente.nombre }}</td>
                        <td class="text-center align-middle">{{ cliente.email }}</td>
                        <td class="text-start align-middle">{{ cliente.movil }}</td>
                        <td class="text-start align-middle">{{ cliente.baja }}</td>
                        <td class="text-center align-middle table-info">
                            <div>
                                <button class="btn btn-warning m-2" @click="seleccionaCliente(cliente)">
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
                <button class="btn btn-primary" :disabled="currentPage * pageSize >= filtroClientes.length"
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
    name: "TablaClientes",
    components: {
        
    },

    data() {
        return {
            cliente: {
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
            },
            clientes: [],
            provincias: [],
            municipios: [],
            erros: [],
            isChecked: false,
            editDNI: false,
            pageSize: 5, //Registros por página
            currentPage: 1,
        }
    },

    mounted() {
        this.getProvincias();
        this.getClientes();
        this.getMunicipios();
    },

    computed: {
        clientesPorPagina() {
            console.log(this.filtroClientes); 
            const clientesFiltrados = this.filtroClientes;
            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            return clientesFiltrados.slice(indiceInicial, indiceInicial + this.pageSize);
        },

        filtroClientes() {
            return this.isChecked ? this.clientes : this.clientes.filter(cliente => !cliente.baja);
        },

        filtroMunicipios() {
            return this.municipios.filter(municipio => municipio.id.startsWith(this.cliente.provincia.id));
        }

    },

    methods: {
        // Método para grabar el cliente
        async grabarcliente() {

            // Verificar si los campos requeridos están llenos
            if (this.cliente.dni && this.cliente.apellidos) {
                // Obtener los clientes existentes
                const response = await fetch('http://localhost:3000/clientes');
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes: ' + response.statusText);
                }

                const clientesExistentes = await response.json();

                // Verificar si el DNI ya está registrado
                const clienteExistente = clientesExistentes.find(cliente => cliente.dni === this.cliente.dni);
                if (this.cliente.baja) {
                    try {
                        if (clienteExistente) {
                            clienteExistente.baja = "";

                            await fetch(`http://localhost:3000/clientes/${clienteExistente.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(clienteExistente)
                            });

                            this.mostrarAlerta("Aviso", "Cliente dado de alta correctamente", "success")
                            this.getClientes();
                        } else {
                            this.mostrarAlerta("Error", "Cliente no encontrado", "error")
                        }
                        this.limpiarFormCli()
                    } catch (error) {
                        console.error(error);
                        this.mostrarAlerta('Error', 'No se pudo dar de alta el cliente.', 'error');
                    }
                } else {
                    try {
                        this.cliente.baja = ''

                        if (clienteExistente) {
                            // Si el DNI ya existe, mostrar un mensaje de error
                            this.mostrarAlerta('Error', 'El DNI ya está registrado.', 'error');
                        } else {
                            // Si el DNI no existe, agregar el cliente a la base de datos
                            const crearResponse = await fetch('http://localhost:3000/clientes', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(this.cliente)
                            });

                            if (!crearResponse.ok) {
                                throw new Error('Error al guardar el cliente: ' + crearResponse.statusText);
                            }

                            const nuevoCliente = await crearResponse.json();
                            this.clientes.push(nuevoCliente); // Agregar cliente al array local
                            this.mostrarAlerta('Aviso', 'Cliente Grabado', 'success');
                            this.getClientes();
                        }
                        this.limpiarFormCli()
                    } catch (error) {
                        console.error(error);
                        this.mostrarAlerta('Error', 'No se pudo grabar el cliente.', 'error');
                    }
                }
            } else {
                this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
            }
        },

        async seleccionaCliente(cliente) {
            // Buscar el cliente por DNI en el archivo JSON
            try {
                this.limpiarFormCli()
                const response = await fetch('http://localhost:3000/clientes');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                const clientes = await response.json();

                // Encontrar el cliente por su DNI
                const clienteEncontrado = clientes.find(c => c.dni === cliente.dni);


                if (clienteEncontrado) {
                    // Convertir la fecha de alta al formato dd/mm/yyyy
                    // Asignar el objeto completo de provincia y municipio
                    if (this.cliente.provincia) {
                        this.cliente.provincia = this.provincias.find(p => p.nm === this.cliente.provincia).nm;
                        if (this.cliente.provincia) {
                            console.log("Provincia encontrada", this.cliente.provincia);

                        }
                    }

                    this.cliente = { ...clienteEncontrado };
                    this.editDNI = true;
                    console.log("Cliente encontrado", this.cliente.municipio);
                    if (this.cliente.alta) {
                        this.cliente.alta = this.cliente.alta.split('T')[0];  // Para asegurarse de que la fecha esté en formato YYYY-MM-DD
                    }
                } else {
                    this.mostrarAlerta('Error', 'Cliente no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo cargar el cliente desde el servidor.', 'error');
            }
        },

        async eliminarCliente() {
            try {
                const response = await fetch('http://localhost:3000/clientes');
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes: ' + response.statusText);
                }

                const clientesExistentes = await response.json();

                // Verificar si el DNI ya está registrado
                const clienteExistente = clientesExistentes.find(cliente => cliente.dni === this.cliente.dni);

                if (clienteExistente) {
                    const hoy = this.obtenerFechaHoy();
                    clienteExistente.baja = hoy;

                    await fetch(`http://localhost:3000/clientes/${clienteExistente.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(clienteExistente)
                    });

                    this.mostrarAlerta("Aviso", "Cliente dado de baja correctamente", "success")
                    this.getClientes();
                } else {
                    this.mostrarAlerta("Error", "Cliente no encontrado", "error")
                }
                this.limpiarFormCli()
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo dar de baja el cliente.', 'error');
            }
        },

        async modificarCliente() {
            try {
                const response = await fetch('http://localhost:3000/clientes');
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes: ' + response.statusText);
                }

                const clientesExistentes = await response.json();

                // Verificar si el DNI ya está registrado
                let clienteExistente = clientesExistentes.find(cliente => cliente.dni === this.cliente.dni);

                if (clienteExistente) {
                    clienteExistente = this.cliente;

                    await fetch(`http://localhost:3000/clientes/${clienteExistente.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(clienteExistente)
                    });

                    this.mostrarAlerta("Aviso", "Cliente modificado correctamente", "success")
                    this.getClientes();
                } else {
                    this.mostrarAlerta("Error", "Cliente no encontrado", "error")
                }
                this.limpiarFormCli()
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo modificar el cliente.', 'error');
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

        validarMovil(movil) {
            if (movil === '') {
                // Si el campo está vacío, no hace nada
                return true;
            }
            this.cliente.movil = movil;
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
            if (this.currentPage * this.pageSize < this.clientes.length) {
                this.currentPage++;
            }
        },

        paginaAnterior() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        async getClientes() {
            try {
                const response = await fetch("http://localhost:3000/clientes")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                this.clientes = (await response.json()).sort((a, b) => a.apellidos.localeCompare(b.apellidos) || a.nombre.localeCompare(b.nombre));
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
            this.cliente = {
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

        async buscarCliente(){
            try {
                if (this.cliente.dni === ""){
                    this.mostrarAlerta('Error', 'Debes introducir un DNI', 'error');
                } else {
                    // Primero, conseguimos el array de clientes para encontrar al cliente por su dni                 
                    let response = await fetch("http://localhost:3000/clientes/"); 
                    if (!response.ok){
                        throw new Error("Error en la solicitud" + response.statusText); 
                    }
                    
                    let clientes = await response.json();
                    let clienteExistente = clientes.filter(cliente => cliente.dni === this.cliente.dni)[0];
                    
                    if (!clienteExistente){
                        this.mostrarAlerta('Error', `El cliente con dni ${this.cliente.dni} no existe`, 'error');
                    } else {
                        response = await fetch(`http://localhost:3000/clientes/${clienteExistente.id}`)
                        if (!response.ok) {
                            throw new Error("Error en la solicitud" + response.statusText)
                        }
                        this.cliente = await response.json()
                    }
                }
                
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo encontrar el cliente.', 'error');

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