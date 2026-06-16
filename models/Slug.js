
import { Schema, model } from 'mongoose';

const SlugSchema = Schema ({
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    img1: {
        type: String,
        require: true
    },
    img2: {
        type: String,
        require: true
    },
    img3: {
        type: String,
        require: true
    },
    img4: {
        type: String,
        require: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'Categoria'
    },
});

export default model( 'Slug', SlugSchema );