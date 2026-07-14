import { Schema, model } from 'mongoose';

const DireccionSchema = Schema ({
    carrito: {
        type: Schema.ObjectId,
        ref: 'Carrito',
        required: true
    },
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    direccion2: {
        type: String,
    },
    codigoPostal: {
        type: Number,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    }
});

export default model( 'Direccion', DireccionSchema );