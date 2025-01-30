// Zona de importaciones
import express from 'express'; 
import http from 'http';
import morgan from 'morgan';
import rutas from "../src/router/rutas.mjs";
import mongoose from 'mongoose';
import cors from 'cors'; 
import multer from 'multer'; 

// Creación del servidor
const app = express();
const server = http.createServer(app); 


app.use(cors({
    origin: 'http://localhost:8080', // El frontend
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'], // Cabeceras permitidas
}));
app.use(express.json())


app.use(morgan('dev'))

app.use(express.json()); 

const upload = multer({dest : 'uploads/'}); 
app.use(upload.single('archivo'))

app.use(rutas)

app.set("port", process.env.PORT || 5000); 
app.get("/", (req, res) => {
    res.send("Servidor en Funcionamiento");

});
server.listen(app.get("port"), () => {
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`)
});

// En clase: 
mongoose.connect('mongodb://admin:abc123@localhost:27017/BBDD?authSource=admin')
     .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.log("Error Conexion", err))


// No debería de hacer falta, pero para que funcione en el docker tiene que estar así
// mongoose.connect('mongodb://root:root@localhost:27017/bbdd', {
//     authSource: "admin", // Autentica contra la base de datos admin
//   })
//     .then(() => console.log("Conectado a MongoDB"))
//     .catch(err => console.log("Error Conexion", err))