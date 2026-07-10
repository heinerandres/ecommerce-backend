import { Schema, model } from 'mongoose';

const ProductoSchema = Schema ({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio: {
        type: Number
    },
    cantidad: {
        type: Number
    },
});

ProductoSchema.virtual('variantes', {
    ref: 'Producto_variantes',      // Nombre del modelo de las variantes
    localField: '_id',            // Campo del Producto
    foreignField: 'producto'      // Campo de ProductoVariante que apunta al producto
});

ProductoSchema.virtual('imagenes', {
    ref: 'Imagenes',      // Nombre del modelo de las variantes
    localField: '_id',            // Campo del Producto
    foreignField: 'producto'      // Campo de ProductoVariante que apunta al producto
});

ProductoSchema.set('toJSON', { virtuals: true });
ProductoSchema.set('toObject', { virtuals: true });

export default model( 'Producto', ProductoSchema );