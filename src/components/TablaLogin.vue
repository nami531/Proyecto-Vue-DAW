<template>
  <div class="container ">
    <div class="my-4 d-flex justify-content-center ">
      <i class="bi bi-people-fill me-2 text-primary"></i> <!-- Icono decorativo -->

      <h5 class="font-weight-bold text-uppercase text-primary  ">
        Iniciar sesión
      </h5>
      <router-link to="/" class="btn"> <i class="bi bi-arrow-return-left me-2"></i></router-link>

    </div>

    <form @submit.prevent="iniciarSesion" class="border rounded shadow p-4 ">
      <!-- Campo DNI -->
      <label for="dni" class="form-label">DNI:</label>

      <div class=" input-group mb-3">
        <span class="input-group-text"><i class="bi bi-person"></i></span>
        <input type="text" id="dni" class="form-control" v-model="dni" required />
      </div>


      <!-- Campo Contraseña -->
      <label for="pass" class="form-label">Contraseña:</label>
      <div class="input-group mb-3">
        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
        <input type="password" id="pass" class="form-control" v-model="pass" required />
      </div>

      <!-- Botón de login -->
      <button type="submit" class="btn btn-primary w-100 mt-4">Iniciar sesión</button>
    </form>

    <!-- Mensaje de error -->
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
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
        const contrasenaCorrecta = await passport.verificarContrasenha(this.pass, usuario.pass);

        if (contrasenaCorrecta) {
          if (usuario.tipo === "admin") {
            this.errorMessage = ""; // Limpiar mensaje de error si las credenciales son correctas
            this.mostrarAlerta("Bienvenido", "Sesión Iniciada", "success")
            localStorage.setItem('isLogueado', 'true');
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('email', usuario.email)
            this.$router.push({ name: 'inicio' }).then(() => {
              window.location.reload()
            })
          } else if (usuario.tipo === "usuario"){
            this.errorMessage = ""; // Limpiar mensaje de error si las credenciales son correctas
            this.mostrarAlerta("Bienvenido", "Sesión Iniciada", "success")
            localStorage.setItem('isLogueado', 'true');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('email', usuario.email)
            this.$router.push({ name: 'inicio' }).then(() => {
              window.location.reload()
            })
          }
        } else {
          this.errorMessage = "DNI o contraseña incorrectos. Inténtalo de nuevo.";
        }
      } else {
        this.errorMessage = "DNI o contraseña incorrectos. Inténtalo de nuevo.";
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