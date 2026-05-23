import { Schema, model } from 'mongoose';

const TallaSchema = Schema ({
    valor:{
        type: String,
        required: true
    }
});

export default model( 'Talla', TallaSchema );