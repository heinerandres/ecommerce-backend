/*
    /api/categoria

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearCategoria, obtenerCategorias } from '../routes/controllers/categoria.js'; 

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre del usuario es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearCategoria );

router.get(
    '/',
    obtenerCategorias
);


export default router;