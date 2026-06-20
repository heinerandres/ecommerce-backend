import { Schema, model } from 'mongoose';

const ProductoSchema = Schema ({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        require: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio: {
        type: Number
    },
    cantidad: {
        type: Number
    },
});

export default model( 'Producto', ProductoSchema );