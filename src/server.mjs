// Zona de importaciones
import express from 'express'; 
import http from 'http';
import morgan from 'morgan';
import rutas from "../src/router/rutas.mjs";
import mongoose from 'mongoose';
import cors from 'cors'; 
// Creación del servidor
const app = express();
const server = http.createServer(app); 


app.use(cors()); 
app.use(express.json())

app.use(rutas)

app.use(morgan('dev'))


app.set("port", process.env.PORT || 5000); 
app.get("/", (req, res) => {
    res.send("Servidor en Funcionamiento");

});
server.listen(app.get("port"), () => {
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`)
});

// En clase: 
mongoose.connect('mongodb://localhost:27017/BBDD')
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.log("Error Conexion", err))


// No debería de hacer falta, pero para que funcione en el docker tiene que estar así
// mongoose.connect('mongodb://root:root@localhost:27017/bbdd', {
//     authSource: "admin", // Autentica contra la base de datos admin
//   })
//     .then(() => console.log("Conectado a MongoDB"))
//     .catch(err => console.log("Error Conexion", err))