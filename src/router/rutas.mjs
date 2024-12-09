import express from 'express';
import Articulo from '../modelos/modelos.js';

const rutas = express.Router();

// como establecer una ruta

rutas.get('/articulos', async (req, res) => {
    try{
        const articulos = await  Articulo.find({});
        res.json(articulos);

    } catch(error){
        res.status(500).json({message: error.message});
    }
});

export default rutas;

