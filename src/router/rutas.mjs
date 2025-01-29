import express from 'express';
import  Articulo from '../modelos/modelos.js';
import  mongoose  from 'mongoose';
import multer  from 'multer';

const rutas = express.Router();

const upload = multer({dest: 'uploads/'})

rutas.post('/subirCv', upload.single('archivo'), async(req, res) => {
    try {
        if (req.file){
            console.log('Archivo recibido', req.file)
        } else {
            console.log('No se recibió ningún archivo')
        }
        
    } catch (error){
        console.error('Error al guardar el cv')
        res.status(500).json({
            error : 'Error al guardar el archivo'
        })
    }
} )
// como establecer una ruta

rutas.get('/articulos', async (req, res) => {
    try{
        const articulos = await Articulo.default.find({});
        res.json(articulos);

    } catch(error){
        res.status(500).json({message: error.message});
        console.log("Error al obtener artículos:", error);
    }
});

rutas.post('/articulos', async (req, res) => {
    try{
        const articulo = new Articulo.default(req.body);
        await articulo.save();
        res.status(201).json(articulo);
        console.log("Artículo guardado correctamente");
    } 
    catch(error){
        res.status(400).json({message: error.message});
        console.log("Error al guardar artículo:", error);
        }
    });

rutas.put('/articulos/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        console.log("ID recibido:", id);


        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('No hay artículo con ese ID');
        }

        // Intentar encontrar y actualizar el artículo
        const articulo = await Articulo.default.findByIdAndUpdate(id, req.body, { new: true });

        // Si no se encuentra el artículo
        if (!articulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        // Responder con el artículo actualizado
        res.json(articulo);
        console.log("Artículo actualizado correctamente");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error al actualizar artículo:", error);
    }
});

rutas.delete('/articulos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID recibido:", id);

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('No hay artículo con ese ID');
        }

        // Intentar encontrar y eliminar el artículo
        const articulo = await Articulo.default.findByIdAndDelete(id);

        // Si no se encuentra el artículo
        if (!articulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        // Responder con el artículo eliminado
        res.json(articulo);
        console.log("Artículo eliminado correctamente");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error al eliminar artículo:", error);
    }   
});

export default rutas;