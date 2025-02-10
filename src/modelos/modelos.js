import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema(
    {
      nombre: { type: String, required: true },
      categoria: { type: String, required: true },
      descripcion: { type: String, maxlength: 256 },
      precio_unitario: { type: Number, required: true, min: 0 },
      stock_disponible: { type: Number, required: true, min: 0 },
      personalizacion: { type: String, maxlength: 128 },
      imagen : {type : String, maxlength : 150},
      fecha_alta: { type: Date, required: true },
    },
    { versionKey: false }
  );

const Articulo = mongoose.model('Articulo', articuloSchema);
export default Articulo;
//export.module = Articulo;