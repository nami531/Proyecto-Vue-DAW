import express from 'express';
import  pkg from '../modelos/modelos.js';
import  mongoose  from 'mongoose';
import multer from 'multer';
import fs from 'fs'; 
import path from 'path';
import Stripe from 'stripe'; 
import 'dotenv/config.js'; 
import nodemailer from 'nodemailer'; 
const rutas = express.Router();

const {Articulo, Factura} = pkg; 

// const upload = multer({dest: 'uploads/'})

// rutas.post('/subirCv', upload.single('archivo'), async(req, res) => {
//     try {
//         if (req.file){
//             console.log('Archivo recibido', req.file)
//         } else {
//             console.log('No se recibió ningún archivo')
//         }
        
//     } catch (error){
//         console.error('Error al guardar el cv')
//         res.status(500).json({
//             error : 'Error al guardar el archivo'
//         })
//     }
// } )
// como establecer una ruta
rutas.get('/subircv', (req,res) => {
    res.send("Paso por aquí");
    });

// Ruta para gestionar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/cv/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
  
    filename: (req, file, cb) => {
        // Usar el candidatoId enviado desde el frontend para nombrar el archivo
        //const candidatoId = req.body.candidatoId || Date.now();  // Si no se envía candidatoId, usar la fecha actual como nombre
        const fileExtension = path.extname(file.originalname);  // Obtener la extensión del archivo
        const originalName = file.originalname.split('.')[0];  // Obtener el nombre original sin la extensión
        // Concatenar candidatoId + el nombre original del archivo + la extensión
        const filename = `${originalName}${fileExtension}`;  // Ejemplo: 1234567890-nombreOriginal.pdf
        cb(null, filename) // Guardar el archivo con el nombre generado
    }
  });

  const storageImg = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/img/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
  
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);  // Obtener la extensión del archivo
        const originalName = file.originalname.split('.')[0];  // Obtener el nombre original sin la extensión
        const filename = `${originalName}${fileExtension}`;  // Ejemplo: 1234567890-nombreOriginal.pdf
        cb(null, filename) // Guardar el archivo con el nombre generado
    }
  });
  
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Tipo de archivo no permitido'), false);
        }
        cb(null, true);
    }
});

const uploadImg = multer({
    storage: storageImg,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Tipo de archivo no permitido'), false);
        }
        cb(null, true);
    }
});
  
// Ruta para gestionar la subida de archivos
rutas.post('/subircv', upload.single('archivo'), (req, res) => {
    console.log('Archivo recibido:', req.file);
    console.log('Candidato ID:', req.body.candidatoId);
    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se subió ningún archivo' });
    }
    // Responder con el archivo subido y su ubicación
    res.status(200).json({
        mensaje: 'Archivo subido con éxito',
        archivo: req.file,
    });
});

rutas.delete('/deletecv/:nombre', (req, res) => {
    const nombreArchivo = req.params.nombre; 
    const rutaArchivo = path.join('uploads/cv', nombreArchivo); 
    if (fs.existsSync(rutaArchivo)){
        fs.unlinkSync(rutaArchivo); 
        
        res.status(200).json({
            mensaje : 'Archivo eliminado con exito'
        })
    } else {
        res.status(404).json({
            mensaje : 'Archivo no encontrado'
        })
    }
    
})

rutas.post('/subirimg', uploadImg.single('img'), (req, res) => {
    console.log('Imagen recibida:', req.file);
    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se subió ninguna imagen' });
    }
    // Responder con el archivo subido y su ubicación
    res.status(200).json({
        mensaje: 'Imagen subida con éxito',
        archivo: req.file,
    });
});

rutas.delete('/deleteimg/:nombre', (req, res) => {
    const nombreArchivo = req.params.nombre; 
    const rutaArchivo = path.join('uploads/img', nombreArchivo); 
    if (fs.existsSync(rutaArchivo)){
        fs.unlinkSync(rutaArchivo); 
        
        res.status(200).json({
            mensaje : 'Archivo eliminado con exito'
        })
    } else {
        res.status(404).json({
            mensaje : 'Archivo no encontrado'
        })
    }
    
})

rutas.get('/articulos', async (req, res) => {
    try{
        const articulos = await Articulo.find({});
        res.json(articulos);

    } catch(error){
        res.status(500).json({message: error.message});
        console.log("Error al obtener artículos:", error);
    }
});

rutas.post('/articulos', async (req, res) => {
    try{
        const articulo = new Articulo(req.body);
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
        const articulo = await Articulo.findByIdAndUpdate(id, req.body, { new: true });

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
        const articulo = await Articulo.findByIdAndDelete(id);

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

// CRUD Facturas
rutas.get('/facturas', async (req, res) => {
    try{
        const facturas = await Factura.find({});
        res.json(facturas);

    } catch(error){
        res.status(500).json({message: error.message});
        console.log("Error al obtener artículos:", error);
    }
});

rutas.post('/facturas', async (req, res) => {
    try{
        const factura = new Factura(req.body);
        const facturaGuardada = await factura.save();
        res.status(201).json(facturaGuardada);
        console.log("Factura guardado correctamente");
    } 
    catch(error){
        res.status(400).json({message: error.message});
        console.log("Error al guardar artículo:", error);
        }
    });

rutas.put('/facturas/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        console.log("ID recibido:", id);


        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('No hay factura con ese ID');
        }

        // Intentar encontrar y actualizar el artículo
        const factura = await Factura.findByIdAndUpdate(id, req.body, { new: true });

        // Si no se encuentra el artículo
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrado' });
        }

        // Responder con el artículo actualizado
        res.json(factura);
        console.log("Factura actualizado correctamente");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error al actualizar factura:", error);
    }
});

rutas.delete('/facturas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID recibido:", id);

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('No hay factura con ese ID');
        }

        // Intentar encontrar y eliminar el artículo
        const factura = await Factura.findByIdAndDelete(id);

        // Si no se encuentra el artículo
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrado' });
        }

        // Responder con el artículo eliminado
        res.json(factura);
        console.log("Factura eliminado correctamente");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error al eliminar factura:", error);
    }   
});

rutas.post("/crear-checkout-session", async (req, res) => {
    try {
        console.log(process.env.VUE_APP_STRIPE_SECRET_KEY);
        const stripe = new Stripe(process.env.VUE_APP_STRIPE_SECRET_KEY); 
        
        const {items , amount} = req.body; 
        console.log(items, amount)

        if (!items || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({error : "Debe haber al menos un producto en el carrito"}); 
        }

        if (!amount || isNaN(amount) || amount <= 0 ){
            return res.status(400).json({error : "Monto inválido"}); 
        }

        const lineItems = items.map(item => ({
            price_data : {
                currency : 'eur', 
                product_data : {
                    name : item.nombre,
                }, 
                unit_amount : parseInt(item.precio_unitario * 100),
            }, 
            quantity : item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'], 
            line_items : lineItems,
            mode : 'payment', 
            success_url : 'http://localhost:8080/success', 
            cancel_url : 'http://localhost:8080/cancel', 
        })
        console.log(session)
        res.json({id : session.id}); 
    } catch (error) {
        console.error("Error al crear la sesión de pago: ", error)
        res.status(500).json({error : "Error en el servidor"}); 
    }
})

const transporter = nodemailer.createTransport({
    service : 'gmail', 
    auth : {
        user : process.env.VUE_APP_EMAIL_USER,
        pass: process.env.VUE_APP_EMAIL_PASSWORD
    },
    tls : {
        rejectUnauthorized : false, 
    }
})

rutas.post('/enviar-correo', (req, res) => {
    console.log('Datos recibidos: ', req.body.toString()); 
    const {nombre, tlf, email, mensaje} = req.body; 

    const mailOptions = {
        from: email, 
        to: 'nadiamarquez27112005@gmail.com', 
        subject: 'Mensaje de contacto', 
        text: `Nombre: ${nombre}\nTeléfono: ${tlf}\nEmail: ${email}\nMensaje: ${mensaje}`
    }; 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.error("Error al enviar el correo", error)
            return res.status(500).json({error : 'Error al enviar el mensaje, por favor inténtelo de nuevo'}); 
        } else {
            console.log("Email enviado")
            return res.status(200).json({error : 'Mensaje enviado correctamente'}); 
        }
    })
})

export default rutas;