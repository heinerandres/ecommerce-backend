import { Schema, model } from 'mongoose';

const ColorSchema = Schema ({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    valor:{
        type: String,
        required: true
    }
});

export default model( 'Color', ColorSchema );