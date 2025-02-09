// Zona de importaciones
import express from 'express'; 
import http from 'http';
import morgan from 'morgan';
import rutas from "../src/router/rutas.mjs";
import mongoose from 'mongoose';
import cors from 'cors'; 
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname manualmente en ES Modules 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Creación del servidor
const app = express();
const server = http.createServer(app); 


app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:5000'],  // Permitir el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Permitir cookies y autenticación
  }));

app.options('*', cors());  // Habilita CORS para preflight
app.use(express.urlencoded({ extended: true })); // ¡IMPORTANTE!
app.use(express.json());
app.use(morgan('dev'));
app.use(rutas);



app.use('/uploads/img/', express.static(path.join(__dirname, '../uploads/img')));
app.use('/uploads/cv/', express.static(path.join(__dirname, '../uploads/cv')));

app.set('port', process.env.PORT  || 5000);

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