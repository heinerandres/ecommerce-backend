/*
    /api/producto_variantes

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';


const router = Router();

import { crearVariante, obtenerVariantes, editarVariante, eliminarVariante, getVariantesByProducto } from '../routes/controllers/producto_variantes.js';

router.post( 
    '/insertar', 
    [
        check('producto', 'El producto es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('cantidad', 'La categoria es obligatoria').not().isEmpty(),
        validarCampos
    ] , 
    crearVariante );

router.get(
    '/',
    obtenerVariantes
);

router.post( 
    '/getVariantesByProducto', 
    [
        check('producto', 'El producto es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    getVariantesByProducto );

router.put(
    '/editar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    editarVariante
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    eliminarVariante
);



export default router;