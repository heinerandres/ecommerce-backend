import { Schema, model } from 'mongoose';

const ProductoVariantesSchema = Schema ({
    producto: {
        type: Schema.ObjectId,
        ref: 'Producto',
        required: true
    },
    color: {
        type: Schema.ObjectId,
        ref: 'Color',
    },
    talla: {
        type: Schema.ObjectId,
        ref: 'Talla',
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

export default model( 'Producto_variantes', ProductoVariantesSchema );