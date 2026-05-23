import { Schema, model } from 'mongoose';

const ProductoSchema = Schema ({
    //nombre, img1, img2, img3, img4, img5, descripcion, precio, cantidad
    
        nombre: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
        },
        categoria: {
            type: Schema.ObjectId,
            ref: 'Categoria'
        },
        img1: {
            type: String,
            require: true
        },
        img2: {
            type: String,
            require: true
        },
        img3: {
            type: String,
            require: true
        },
        img4: {
            type: String,
            require: true
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