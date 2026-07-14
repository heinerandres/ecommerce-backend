import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb';
import Producto from '../models/Producto.js';

const CarritoSchema = Schema ({
  
    usuario_id: {
        type: String,
        required: true
    },
    productos: [ {
        id: {
            type: Schema.ObjectId, 
            ref: 'Producto'
        },
        variante: {
            type: Schema.Types.ObjectId,
            ref: "Producto_variantes",
            default: null
        },
        cantidad: {
            type: Number,
            req: true
        },
    } ]
});

export default model( 'Carrito', CarritoSchema );