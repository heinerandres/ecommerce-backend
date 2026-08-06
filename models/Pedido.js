import { Schema, model } from 'mongoose';

const PedidoSchema = Schema ({
    usuario_id: {
        type: String,
        required: true
    },
    direccion_id: {
        type: Schema.ObjectId,
        ref: 'Direccion',
    },
    tipoPedido:{
        type: String,
        required: true,
    },
    estaPago:{
        type: Boolean,
        required: true,
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        default: "Pendiente",
    },
    total: {
        type: Number,
        required:true,
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
            required: true
        },
        precioUnitario: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        }
    } ]
});

export default model( 'Pedido', PedidoSchema );