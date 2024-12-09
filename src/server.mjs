// Zona de importaciones
import express from 'express'; 
import http from 'http';
import morgan from 'morgan';
import rutas from "../src/router/rutas.mjs";


// Creación del servidor
const app = express();
const server = http.createServer(app); 


app.use(morgan('dev'))

app.use(express.json())

app.use('/api', rutas)

app.set("port", process.env.PORT || 5000); 
app.get("/", (req, res) => {
    res.send("Servidor en Funcionamiento");

});
server.listen(app.get("port"), () => {
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`)
});

