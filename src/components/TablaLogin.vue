<template>
    <div>
    <div class="text-center my-4">
      <h5 class="font-weight-bold text-uppercase text-primary position-relative d-inline-block">
        <i class="bi bi-people-fill me-2"></i> <!-- Icono decorativo -->
        Iniciar sesión
        <span class="underline-effect"></span> <!-- Línea decorativa -->
        <router-link to="/" class="btn btn-customb"> <i class="bi bi-arrow-return-left me-2"></i></router-link>
      </h5>
    </div>
  
      <form @submit.prevent="iniciarSesion">
        <!-- Campo DNI -->
        <div class="mb-3">
          <label for="dni" class="form-label">DNI:</label>
          <input
            type="text"
            id="dni"
            class="form-control"
            v-model="dni"
            required
          />
        </div>
  
        <!-- Campo Contraseña -->
        <div class="mb-3">
          <label for="pass" class="form-label">Contraseña:</label>
          <input
            type="password"
            id="pass"
            class="form-control"
            v-model="pass"
            required
          />
        </div>
  
        <!-- Botón de login -->
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </form>
  
      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  //import Swal from 'sweetalert2';
  import passport from '@/config/passport.mjs';  
  export default {
    name: "TablaLogin",
    components: {
      
    },
    data() {
      return {
        dni: "",
        pass: "",
        errorMessage: "",
        usuarios: [] // Aquí se almacenarán los usuarios cargados desde el archivo JSON
      };
    },

    mounted() {
      this.getUsuarios();
    },

    methods: {

        async getUsuarios() {
            try {
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }

                // Obtener y ordenar usuarios por apellidos y luego por nombre
                this.usuarios = (await response.json()).sort((a, b) =>
                    a.apellidos.localeCompare(b.apellidos) || a.nombre.localeCompare(b.nombre)
                );

                } catch (error) {
                    console.error(error);
                }
            },


        async iniciarSesion() {
            // Buscar el usuario con el DNI proporcionado
            const usuario = this.usuarios.find((user) => user.dni === this.dni);
    
            // Verificar si el usuario existe
            if (usuario) {
            // Verificar la contraseña usando passport para compararla con la encriptada
            const contrasenaCorrecta = await passport.verificarContrasenha(this.pass,usuario.pass);
  
          if (contrasenaCorrecta) {
            this.errorMessage = ""; // Limpiar mensaje de error si las credenciales son correctas
            alert("Inicio de sesión exitoso");
            // Redirigir o hacer algo después del inicio de sesión
          } else {
            this.errorMessage = "DNI o contraseña incorrectos. Inténtalo de nuevo.";
          }
        } else {
          this.errorMessage = "DNI o contraseña incorrectos. Inténtalo de nuevo.";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin-top: 50px;
  }
  </style>
  