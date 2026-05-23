import { Schema, model } from 'mongoose';

const CategoriaSchema = Schema ({
    nombre:{
        type: String,
        required: true
    },
});

export default model( 'Categoria', CategoriaSchema );