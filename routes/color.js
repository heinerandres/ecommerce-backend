/*
    /api/color

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearColor, obtenerColor, colorByNombre, editarColor, eliminarColor } from '../routes/controllers/color.js';

router.post( 
    '/insertar', 
    [
        check('nombre', 'El nombre del color es obligatorio').not().isEmpty(),
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearColor );

router.get(
    '/',
    obtenerColor
);

router.post(
    '/colorByNombre',
    [
        check('nombre', 'El nombre del color es obligatorio').not().isEmpty(),
        validarCampos
    ],
    colorByNombre
);

router.put(
    '/editar',
    [
        check('nombre', 'El nombre del color es obligatorio').not().isEmpty(),
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarColor
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id del color es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarColor
);




export default router;