<template>
    <div>
        <div class="row d-flex align-items-center">
            <h5 class="text-center front-weight-bold p-3 text-primary">
                <i class="bi bi-box-seam"></i>GESTIÓN ARTÍCULOS <router-link to="/"><i class="bi bi-arrow-return-left me-2 black"></i></router-link> </h5>
        </div>
    </div>

    <div class="container">
        <div class="container border p-4 mx-auto">
            <form @submit.prevent="g" class="form-in-line">
        
                <div class="input-group-text mb-3">
                    <div class="input-group">
                        <div class="input-group d-flex flex-row ">
                            <div class="input-group w-75" >
                                <span class="input-group-text custom-span me-2">Nombre</span>
                                <input type="text" class="form-control sm w-25" placeholder="Nombre del artículo" v-model="articulo.nombre">
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text custom-span ms-auto me-2">Categoría</span>
                        <select name="categoria" id="categoria" class="form-select w-50" v-model="articulo.categoria">
                            <option value="" disabled>Seleccionar categoría</option>
                            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre">{{ categoria.nombre }}</option>
                        </select>
                        <button class="input-group-text" id="basic-addon1" @click.prevent="buscarPorCategoria()">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                    
                </div>
                
                
                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2 h-100 p-3">Descripción: </span>
                    <textarea class="form-control w-75" v-model="articulo.descripcion" placeholder="Descripción del artículo"></textarea>
                    <span class="input-group-text custom-span me-2">Precio unitario: </span>
                    <input type="text" class="form-control sm w-25" placeholder="Precio unitario artículo" v-model="articulo.precio_unitario">     
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span ms-auto me-2">Stock</span>
                    <input type="number" class="form-control sm w-25" placeholder="Stock" v-model="articulo.stock_disponible">
                    <span class="input-group-text custom-span ms-2 me-2">Personalización</span>
                    <textarea class="form-control w-75" v-model="articulo.personalizacion" placeholder="Detalles de personalización del artículo"></textarea>
                </div>

                <div class="input-group-text mb-3">
                    <span class="input-group-text custom-span me-2">Imagen del artículo (.png, .jpg, .jpeg): </span>
                    <input type="file" class="form-control sm w-100" placeholder="" accept=".png, .jpg, .jpeg"
                        @change="handleFileChange" ref="fileInput">

                    <span class="input-group-text custom-span ms-auto me-2">Fecha Alta</span>
                    <input type="date" class="form-control sm w-25"  v-model="articulo.fecha_alta">

                    <button class="btn btn-secondary" type="button" @click.prevent="limpiarFormCli">
                        <i class="bi bi-eraser-fill fs-5" ></i>
                    </button>
                </div>

                <div id="botones" class="d-flex justify-content-center flex-wrap row">
                    <button class="btn btn-primary m-2 col-2 col-sm-4 col-md-2" @click.prevent="grabarArticulo">
                        <i class="bi bi-floppy"></i>
                        Guardar
                    </button>
                </div>
            </form>
        </div>

        <h5 class="text-primary p-5"><i class="bi bi-tools m-2"></i>Tabla de Artículos</h5>
        
        <table class="table table-striped mt-2" >
            <thead>
                <tr class="table-primary">
                    <th scope="col" class="w-20 text-center align-middle">ID</th>
                    <th scope="col" class="w-20 text-start  align-middle">Nombre</th>
                    <th scope="col" class="w-10 text-start  align-middle">Categoría</th>
                    <th scope="col" class="w-45 text-center align-middle">Descripción</th>
                    <th scope="col" class="w-10 text-center align-middle">Precio</th>
                    <th scope="col" class="w-10 text-center align-middle">Stock</th>
                    <th scope="col" class="w-10 text-center align-middle">Fecha Alta</th>
                    <th scope="col" class="table-info text-center align-middle">Gestión</th>
                </tr>
            </thead>
            <tbody v-if="articulosPorPagina.length !== 0">
                <tr v-for="articulo in articulosPorPagina" :key="articulo.id" :class="articulo.stock_disponible < 50 ? 'table-warning' : ''" >
                    <td class="text-start align-middle">{{ articulo._id.slice(-8) }}</td>
                    <td class="text-start align-middle">{{ articulo.nombre }}</td>
                    <td class="text-start align-middle">{{ articulo.categoria }}</td>
                    <td class="text-center align-middle">{{ articulo.descripcion }}</td>
                    <td class="text-start align-middle">{{ articulo.precio_unitario }}</td>
                    <td class="text-start align-middle">{{ articulo.stock_disponible }}</td>
                    <td class="text-start align-middle">{{ articulo.fecha_alta.split("T")[0] }}</td>
                    <td class="text-center align-middle table-info">
                        <div>
                            <button class="btn btn-warning m-2" @click="seleccionaArticulo(articulo)">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btn btn-danger m-2" @click="eliminarArticulo(articulo)">
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
            <button class="btn btn-primary" :disabled="currentPage * pageSize >= this.articulos.length"
                @click="siguientePagina">
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>

    </div>
</template>

<script>
import { actualizarArticulo, agregarArticulo, obtenerArticulos, eliminarArticulo } from '@/js/articuloServicios';
import Swal from 'sweetalert2';

export default {
    name : "TablaArticulos",
    components : {

    },
    
    data() {
        return {
            articulo : {
                _id : "",
                nombre : "", 
                categoria : "", 
                descripcion : "", 
                precio_unitario : "",
                stock_disponible : "", 
                personalizacion : "", 
                imagen : "",
                fecha_alta : "",
            },
            articulos : [],
            categorias : [], 
            pageSize: 5,
            currentPage: 1,
            archivo : null
        }
    },

    mounted()  {
        this.getCategorias(); 
        this.getArticulos();
    },

    computed: {
        articulosPorPagina() {
            const indiceInicial = (this.currentPage - 1) * this.pageSize;
            console.log(this.articulos.slice(indiceInicial, indiceInicial + this.pageSize)); 
            return this.articulos.slice(indiceInicial, indiceInicial + this.pageSize);
        }
    },

    methods: {
    async grabarArticulo() {

        // Verificar si los campos requeridos están llenos
        if (this.articulo.nombre && this.articulo.categoria && this.articulo.precio_unitario && this.articulo.stock_disponible) {
            
            try {
                
                // Si existe el  articulo se modifica
                let articuloAgregadoId; 
                if (this.articulo._id) {
                    actualizarArticulo(this.articulo._id, this.articulo)
                    articuloAgregadoId = this.articulo._id; 
                    this.mostrarAlerta("Aviso", "Artículo modificado correctamente", "success")
                    this.getArticulos();
                } else {
                    // Borramos el id para que no de problemas
                    delete this.articulo._id; 
                    // this.articulo.categoria = this.articulo.categoria.nombre; 
                    let articuloAgregado = await agregarArticulo(this.articulo); 
                    console.log("Este es el articulo que se ha guardado: " + articuloAgregado)
                    articuloAgregadoId = articuloAgregado._id; 
                    this.mostrarAlerta("Aviso", "Artículo dado de alta correctamente", "success")
                    this.getArticulos();
                }
                if (this.archivo) {

                    const formData = new FormData();
                    const nuevoArchivo = new File([this.archivo], `${articuloAgregadoId}.${this.archivo.name.split('.').pop()}`, { type: this.archivo.type });
                    formData.append('img', nuevoArchivo);

                    console.log(nuevoArchivo)

                    const fileResponse = await fetch('http://localhost:5000/subirimg', {
                        method: 'POST',
                        body: formData,
                        credentials: 'include'
                    });

                    if (!fileResponse.ok) {
                        throw new Error('Error al subir el archivo');
                    } else {
                        console.log('hubo respuesta:', fileResponse);
                    }


                    const fileData = await fileResponse.json();
                    console.log('Archivo subido correctamente:', fileData.archivo);

                    this.articulo.imagen = `${fileData.archivo.originalname}`
                    // Actualizamos el articulo con la url correspondiente
                    actualizarArticulo(articuloAgregadoId, this.articulo); 
                }
                this.limpiarFormCli()
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo guardar el artículo.', 'error');
            }
            
        } else {
            this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
        }
    },
        async seleccionaArticulo(articulo) {
            // Buscar el articulo por DNI en el archivo JSON
            try {
                this.limpiarFormCli()
                const articulos = await obtenerArticulos();

                // Encontrar el articulo por su DNI
                const articuloEncontrado = articulos.find(c => c._id === articulo._id);

                if (articuloEncontrado) {

                    this.articulo = { ...articuloEncontrado };                    
                    this.articulo.fecha_alta = this.articulo.fecha_alta.split('T')[0];  // Para asegurarse de que la fecha esté en formato YYYY-MM-DD
                    
                } else {
                    this.mostrarAlerta('Error', 'Artículo no encontrado en el servidor.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo cargar el artículo desde el servidor.', 'error');
            }
        },


        async eliminarArticulo(articulo) {
            const resp = await Swal.fire({
                title: "¿Estás seguro?",
                html: `Desea Eliminar a <strong>${articulo.nombre}</strong> <br><br>Esta acción no se puede deshacer`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar"
            })
            if (resp.isConfirmed) {
                try {
                    if (articulo._id) {
                        eliminarArticulo(articulo._id)

                        await fetch(`http://localhost:5000/deleteimg/${articulo.imagen}`, {
                            method : 'DELETE', 
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })

                        this.mostrarAlerta("Aviso", "Artículo dado de baja correctamente", "success")
                        this.getArticulos();
                    } else {
                        this.mostrarAlerta("Error", "Artículo no encontrado", "error")
                    }
                    this.limpiarFormCli()
                } catch (error) {
                    console.error(error);
                    this.mostrarAlerta('Error', 'No se pudo dar de baja el articulo.', 'error');
                }
            }
        },

        async buscarPorCategoria(){
            try {
                if (this.articulo.categoria === ""){
                    this.mostrarAlerta('Error', 'Debes seleccionar una categoría', 'error');
                } else {
                    const articulos = await obtenerArticulos();                     
                    let productosPorCategoria = articulos.filter(articulo => articulo.categoria === this.articulo.categoria);
                    
                   
                    this.articulos = productosPorCategoria; 
                }
                
            } catch (error) {
                console.error(error);
                this.mostrarAlerta('Error', 'No se pudo encontrar el usuario.', 'error');

            }
        }, 

        // Métodos para la paginación
        siguientePagina() {
            if (this.currentPage * this.pageSize < this.articulos.length) {
                this.currentPage++;
            }
        },

        paginaAnterior() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        handleFileChange(event) {
            this.archivo = event.target.files[0];
            console.log(this.archivo)
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

        async getCategorias() {
            try {
                console.log(1)
                const response = await fetch("http://localhost:3000/categoriasArticulo")
                if (!response.ok) {
                    throw new Error("Error en la solicitud" + response.statusText)
                }
                console.log(this.categorias)
                this.categorias = await response.json();
                console.log(this.categorias)

            } catch (error) {
                console.error(error);
            }
        },

        limpiarFormCli() {
            this.articulo =  {
                nombre : "", 
                categoria : "", 
                descripcion : "", 
                precio_unitario : "",
                stock_disponible : "", 
                personalizacion : "", 
                imagen : "",
                fecha_alta : "",
            }
            this.archivo = null;
            this.$refs.fileInput.value = null;
        },        

        async getArticulos() {
            try {
                this.articulos = await obtenerArticulos(); 

            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>


<style scoped>

</style>