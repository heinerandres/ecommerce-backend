import { Schema, model } from 'mongoose';

const ProductoSchema = Schema ({
        nombre: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: Schema.ObjectId,
            ref: 'Slug'
        },
        descripcion: {
            type: String,
            require: true
        },
        talla: {
            type: Schema.ObjectId,
            ref: 'Talla'
        },
        color: {
            type: Schema.ObjectId,
            ref: 'Color'
        },
        precio: {
            type: Number,
            require: true
        },
        cantidad: {
            type: Number,
            require: true
        },
    });

export default model( 'Producto', ProductoSchema );