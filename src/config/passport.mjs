import bcrypt from 'bcryptjs'; 

export default {
    async encriptarContrasenha(pswd){
        try {
            const salt =await bcrypt.genSalt(10); 
            const passEncriptado = await bcrypt.hash(pswd, salt)
            return passEncriptado
        } catch (error){
            console.error("Error al encriptar la contraseña" , error)
            throw new Error("No se pudo encriptar la contraseña")
        }
    }
}