<template>
  <div>
    <div class="text-center my-4">
      <h5 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block">
        <i class="bi bi-people-fill me-2"></i> <!-- Icono decorativo -->
        Registro de Usuarios
        <span class="underline-effect"></span> <!-- Línea decorativa -->
        <router-link to="/" class="btn btn-customb"> <i class="bi bi-arrow-return-left me-2"></i></router-link>
      </h5>
    </div>
    <div class="container-fluid border p-2 .custom-width w-100">
      <div class="col-10 col-m-6 col-lg-8 mx-auto w-100 .custom-width" >
        <form class="d-inline" >
          <div class="input-group-text mb-3 d-flex align-items-center">
            <label class="form-label ms-3 me-2">DNI/NIE:</label>
            <input type="text" class="form-control sm-3 w-25 text-center"  :class="{ 'error-border': dniError }"  v-model="usuario.dni" @blur="validarDNI(this.usuario.dni)" placeholder="DNI-NIE usuario">
            <div class="ms-auto"></div>
          </div>
          <div class="input-group-text mb-3">
            <label class="form-label ms-3 me-2">Apellidos:</label>
            <input type="text" class="form-control sm w-50" placeholder="Apellidos" v-model="usuario.apellidos">
            <label class="form-label ms-3 me-2">Nombre:</label>
            <input type="text" class="form-control sm w-50" placeholder="Nombre" v-model="usuario.nombre">
          </div>
          <div class="input-group-text mb-3">
            <label class="form-label ms-3 me-2">Email:</label>
            <input type="text" class="form-control sm  w-50" :class="{ 'error-border': emailMismatch }"  v-model= usuario.email @blur="validarEmail(this.usuario.email)" placeholder="Correo electrónico">
            <label class="form-label ms-3 me-2">Repita Email:</label>
            <input type="text" class="form-control sm  w-50" :class="{ 'error-border': emailMismatch }"  v-model= usuario.email2 @blur="validarEmail(this.usuario.email2)" placeholder="Repita Correo electrónico">
            <label class="form-label ms-3 me-2">Movil:</label>
            <input type="text" class="form-control sm  w-25 text-center" :class="{ 'error-border': movilError }" v-model= usuario.movil @blur="validarMovil(this.usuario.movil)" placeholder="Movil usuario">
          </div>   
          <div class="input-group-text mb-3">       
            <label type="text" class="form-label ms-3 me-2">Contraseña:</label>
            <input type="password" class="form-control sm  w-50" :class="{ 'error-border': passMismatch }" v-model = usuario.pass placeholder="Contraseña">
            <label type="text" class="form-label ms-3 me-2">Repita Contraseña:</label>
            <input type="password" class="form-control sm  w-50" :class=" { 'error-border': passMismatch }" v-model= usuario.pass2 placeholder="Repita Contraseña">         
          </div>
          <div class="input-group-text mb-3">
          <label class="form-label ms-3 me-2">Dirección:</label>
            <input type="text" class="form-control sm  w-75" placeholder="Dirección" v-model="usuario.direccion">
          </div>
          <div class="input-group-text mb-3">
            <label class="form-label ms-3 me-2">Provincia:</label>
            <select class="form-select sm w-50" v-model="usuario.provincia">
              <option value="">Provincia</option>
              <option v-for="provincia in provincias" :key="provincia.id" :value="provincia">
                {{ provincia.nm }}
              </option>
            </select>
            <label class="form-label ms-3 me-2">Municipio:</label>
            <select class="form-select sm w-75" v-model="usuario.municipio">
              <option value="">Municipio</option>
              <option v-for="municipio in municipiosFiltrados" :key="municipio.id" :value="municipio">
                {{ municipio.nm }}
              </option>
            </select>           
          </div>
          <br/>
          <div class="d-flex align-items-center justify-content-md-center">
            <input type="checkbox" class="form-check-input " v-model="isChecked">
          <label class="ms-3">He leído y acepto la <a href="/avisolegal">Política de Privacidad</a>.</label>
          </div>
          <br/>
          <div class="text-center mt-3 d-grid gap-2 d-md-flex justify-content-md-center">
            <button class="btn btn-primary btn-custom" style="width: 6em; height: 3em" @click.prevent="grabarUsuario">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import passport from  '../config/passport.mjs';

export default {
  name: "TablaAcceso",
  components: {
  },

  data() {
    return {
      usuario: {
        dni: '',
        alta: '',
        apellidos: '',
        nombre: '',
        direccion: '',
        email: '',
        //email2: '',
        pass: '',
        //pass2: '',
        provincia: '',
        municipio: '',
        movil: '',
        baja: '',
        tipo: 'usuario'
      },
      dniError: false,
      movilError: false,
      usuarios: [],
      isChecked: false, 
      provincias: [],
      municipios: [],
      errores: [],
      tipos: [],
      editDni: false
    };
  },

  mounted() {
    this.getProvincias();
    this.getMunicipios();    
  },

  computed: {
      emailMismatch() {
          return this.usuario.email && this.usuario.email2 && this.usuario.email !== this.usuario.email2;
       
      },  

      passMismatch() {
        return this.usuario.pass && this.usuario.pass2 && this.usuario.pass !== this.usuario.pass2;
      }, 
     
    municipiosFiltrados() {
      if (!this.usuario.provincia || !this.usuario.provincia.id)
      { 
        return [];
      }
        // Filtra los municipios cuyo ID comienza con el ID de la provincia seleccionada
        return this.municipios.filter(municipio =>
            municipio.id.startsWith(this.usuario.provincia.id)
        );
        
    }
  },


  methods: {
      // METODOS PRINCIPALES
      // Método para grabar usuario

      async grabarUsuario() {
        if (this.usuario.dni && this.usuario.apellidos && this.usuario.nombre && this.usuario.email && this.usuario.email2) {
          // Validar que los dos correos electrónicos sean iguales
          if (!this.isChecked) {
            this.mostrarAlerta('Error', 'Debes aceptar la Política de Privacidad para continuar.', 'error');
            return; // No continuar si el checkbox no está marcado
          }
          if (this.usuario.email !== this.usuario.email2) {
            this.mostrarAlerta('Error', 'Los correos electrónicos no coinciden.', 'error');
            return; // No continuar con el proceso si los correos no coinciden
          }
          if (this.usuario.pass !== this.usuario.pass2) {
            this.mostrarAlerta('Error', 'Las contraseñas no coinciden.', 'error');
            return; // No continuar con el proceso si las contraseñas no coinciden
          }

          try {
            // Obtener los usuarios existentes
            const response = await fetch('http://localhost:3000/usuarios');
            if (!response.ok) {
              throw new Error('Error al obtener los usuarios: ' + response.statusText);
            }

            const usuariosExistentes = await response.json();

            // Verificar si el DNI ya está registrado
            const usuarioExistente = usuariosExistentes.find(usuario => usuario.dni === this.usuario.dni);

            if (usuarioExistente) {
              // Si el DNI ya existe, mostrar un mensaje de error
              this.mostrarAlerta('Error', 'El DNI ya está registrado. Póngase en contacto con el administrador', 'error');
              return;
            } else {
              // Si el DNI no existe, agregar el usuario a la base de datos
              
              // Encriptar la contraseña antes de enviarla
              const hashedPassword = await passport.encriptarContrasena(this.usuario.pass);
              this.usuario.pass = hashedPassword;  // Asignar la contraseña encriptada al objeto usuario

              // Añadir la fecha de registro en formato dd/mm/yyyy
              const fechaActual = new Date();
              const dia = String(fechaActual.getDate()).padStart(2, '0');
              const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Enero es 0, por eso sumamos 1
              const año = fechaActual.getFullYear();
              const fechaFormateada = `${año}-${mes}-${dia}`;

              // Agregar la fecha de registro al objeto usuario
              this.usuario.alta = fechaFormateada;

              // Enviar el nuevo usuario al servidor
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

              const nuevoUsuario = await crearResponse.json();
              this.usuarios.push(nuevoUsuario); // Agregar el usuario al array local
              this.mostrarAlerta('Aviso', 'Usuario grabado correctamente', 'success');
              this.limpiarFomCli(); // Limpiar el formulario
            }
          } catch (error) {
            console.error(error);
            this.mostrarAlerta('Error', 'No se pudo grabar el usuario.', 'error');
          }
        } else {
          this.mostrarAlerta('Error', 'Por favor, completa todos los campos requeridos.', 'error');
        }

      },

      
    // Método para validar el DNI

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
            this.dniError = true;
            this.mostrarAlerta('Error', 'El NIE/DNI con formato no válido.', 'error');
            return false;
        }

        // Inicializar variables para el cálculo
        let dniNum = dni.substring(0, 8); // Extraer los números
        const letra = dni.charAt(8); // Obtener la letra en la posición 8
        // Identificación del NIE y sustitución
        if (dniNum.charAt(0) === 'X') {
            dniNum = dniNum.substring(1,8)
            dniNum = '0' + dniNum; // Sustituir X por 0
        } else if (dniNum.charAt(0) === 'Y') {
            dniNum = dniNum.substring(1,8)
            dniNum = '1' + dniNum; // Sustituir Y por 1
        } else if (dni.charAt(0) === 'Z') {
            dniNum = dniNum.substring(1,8)
            dniNum = '2' + dniNum; // Sustituir Z por 2
        }

        // Comprobar la letra esperada
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE'; // Letras válidas para el DNI
        const letraCalculada = letras[dniNum % 23]; // Calcular la letra esperada
        if (letra !== letraCalculada) {
            this.mostrarAlerta('Error', 'DNI/NIE Incorrecto.', 'error');
            this.dniError = true;
            return false;
        }
        else{
          this.dniError = false;
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
    
    //validar movil
    validarMovil(movil) {
        const movilPattern = /^[67]\d{8}$/;
        if (!movilPattern.test(movil)) {
          this.mostrarAlerta('Error', 'Formato móvil no válido', 'error');
          this.movilError = true;
        } else {
          this.movilError = false;
          return true;
        }
      },

    async getProvincias() {
        try {
          const response = await fetch('http://localhost:3000/provincias');
          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
          this.provincias = await response.json();
        } catch (error) {
          console.error(error);
        }
      }, 

    async getMunicipios() {
        try {
          const response = await fetch('http://localhost:3000/municipios');
          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
          this.municipios = await response.json();
        } catch (error) {
          console.error(error);
        }
      },


    limpiarFomCli() {
      this.usuario = {
            dni: '',
            alta: '',
            apellidos: '',
            nombre: '',
            direccion: '',
            email: '',
            provincia: '',
            municipio: '',
            baja: '',
            tipo: ''
          }
          this.editDni = false;
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


  };
</script>

<style scoped>
.custom-date-input {
  width: 12em;
  text-align: center; /* Ajusta el tamaño aquí */
  /* Otras propiedades de estilo si es necesario */
}
.btn-customb {
    border: none; /* Quitar el borde */
    box-shadow: none; /* Quitar el biselado (sombra) */
    background-color: transparent; /* Opcional: Eliminar el fondo */
}

.btn-custom:focus {
    outline: none; /* Quitar el contorno al hacer foco */
    box-shadow: none; /* Asegurar que no se muestre sombra al hacer clic */
}
.btn-custom {
  width: 8em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table th.pale-yellow {
  text-align: center;
  background-color: #fff9db !important; /* Un tono amarillo muy pálido */
}
.pale-yellow {
  text-align: center;
  background-color: #fff9db !important; /* Asegúrate de que esto también se aplique a las celdas */
}
.centrar-texto {
  text-align: center;
}
.azul-palido {
    background-color: #d0e7ff; /* Azul pálido */
    border: 1px solid #a4c5e6; /* Borde ligeramente más oscuro */
    color: #003366; /* Texto en azul más oscuro */
}
.padding-left-custom {
  padding-left: 50px; /* Ajusta el valor según tus necesidades */
}
.custom-width {
  max-width: 80%; /* o un valor específico como 80%, 1200px, etc. */
  margin: 0 auto; /* para centrar si es necesario */
}

.error-border {
  border: 2px solid rgba(255, 0, 0, 0.5); /* Rojo suave */
  background-color: rgba(255, 0, 0, 0.1); /* Fondo ligeramente rojo */
}
</style>
