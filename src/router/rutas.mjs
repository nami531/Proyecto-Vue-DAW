import express from 'express'; 
import { Articulo } from 'src/modelos/modelos.mjs'

const rutas = express.Router(); 


// Establecer una ruta
rutas.get('/articulos', async (req, res) => {
    try {
        const articulos = await Articulo.find({}); 
        res.json(articulos)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});
