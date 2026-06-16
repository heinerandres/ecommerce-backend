import { Schema, model } from 'mongoose';

const TallaSchema = Schema ({
    valor:{
        type: String,
        required: true,
        unique: true
    }
});

export default model( 'Talla', TallaSchema );