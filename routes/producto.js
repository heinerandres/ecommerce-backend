/*
    /api/producto

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';
import upload from '../storage/imagenes.js';


const router = Router();

import { crearProducto, editarProducto, editarProductoConImagenes, obtenerProductos, obtenerProductoBySlug, eliminarProducto, obtenerProductosConImagenes } from '../routes/controllers/producto.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('slug', 'El slug es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        validarCampos
    ] , 
    crearProducto );

router.get(
    '/',
    obtenerProductos
);

router.get(
    '/productosConImagenes',
    obtenerProductosConImagenes
);

router.post(
    '/obtenerProductoBySlug',
    [
        check('slug', 'El slug del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerProductoBySlug
);

router.put(
    '/editar',
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('slug', 'El slug es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        validarCampos
    ],
    editarProducto
);

router.put(
    '/editarProductoConImagenes',
    upload.fields([
        { name: 'img1', maxCount: 1 },
        { name: 'img2', maxCount: 1 },
        { name: 'img3', maxCount: 1 },
        { name: 'img4', maxCount: 1 },
    ]),
    [
        check('_id', 'El _id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarProductoConImagenes
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id del color es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarProducto
);

export default router;