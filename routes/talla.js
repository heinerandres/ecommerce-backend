/*
    /api/talla

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearTalla, obtenerTallas } from '../routes/controllers/talla.js';

router.post( 
    '/insertar', 
    [
        check('valor', 'El valor de la talla es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearTalla );

router.get(
    '/',
    obtenerTallas
);


export default router;