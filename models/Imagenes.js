
import { Schema, model } from 'mongoose';

const ImagenesSchema = Schema ({
    producto: {
        type: Schema.ObjectId,
        ref: 'Producto',
        required: true
    },
    producto_variante: {
        type: Schema.ObjectId,
        ref: 'Producto_variante'
    },
    url: {
        type: String,
        require: true
    },
});

export default model( 'Imagenes', ImagenesSchema );