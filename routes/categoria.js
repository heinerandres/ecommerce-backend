/*
    /api/categoria

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearCategoria, obtenerCategorias, obtenerCategoriaByNombre} from '../routes/controllers/categoria.js'; 

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearCategoria );

router.get(
    '/',
    obtenerCategorias
);

router.post(
    '/obtenerCategoriaByNombre',
    [
        check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerCategoriaByNombre
)

export default router;