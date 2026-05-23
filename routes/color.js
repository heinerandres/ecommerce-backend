/*
    /api/color

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearColor, obtenerColor } from '../routes/controllers/color.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre del usuario es obligatorio').not().isEmpty(),
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearColor );

router.get(
    '/',
    obtenerColor
);


export default router;