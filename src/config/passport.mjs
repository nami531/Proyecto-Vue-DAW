import bcrypt from 'bcryptjs';

export default {
  async encriptarContrasenha(password) {
    try {
      // Genera un salt (valor aleatorio) para la encriptación
      const salt = await bcrypt.genSalt(10);
      // Encripta la contraseña
      const passEncriptado = await bcrypt.hash(password, salt);
      return passEncriptado;
    } catch (error) {
      console.error("Error al encriptar la contraseña", error);
      throw new Error('No se pudo encriptar la contraseña');
    }
  },

  // Para verificar la contraseña en un inicio de sesión
  async verificarContrasenha(pass, passEncriptada) {
    try {
      return await bcrypt.compare(pass, passEncriptada);
    } catch (error) {
      console.error("Error al verificar la contraseña", error);
      throw new Error('No se pudo verificar la contraseña');
    }
  }
};
