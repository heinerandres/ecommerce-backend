/*
    /api/producto

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearProducto, obtenerProductos, obtenerProductoBySlug } from '../routes/controllers/producto.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre del usuario es obligatorio').not().isEmpty(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        check('img2', 'La imagen2 es obligatoria').not().isEmpty(),
        check('img3', 'La imagen3 es obligatoria').not().isEmpty(),
        check('img4', 'La imagen4 es obligatoria').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('talla', 'La talla es obligatoria').not().isEmpty(),
        check('color', 'El color es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ] , 
    crearProducto );

router.get(
    '/',
    obtenerProductos
);

router.post(
    '/obtenerProductoBySlug',
    [
        check('slug', 'El slug del producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerProductoBySlug
)

export default router;