import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb';
import Producto from '../models/Producto.js';

const CarritoSchema = Schema ({
//conUsuario, conArticulosCarrito, estaPago
  
    usuario_id: {
        type: String,
        required: true
    },
    productos: [ {
        id: {
            type: Schema.ObjectId, 
            ref: 'Producto'
        },
        cantidad: {
            type: Number,
            req: true
        },
    } ]
});

export default model( 'Carrito', CarritoSchema );