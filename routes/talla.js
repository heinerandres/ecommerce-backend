/*
    /api/talla

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearTalla, obtenerTallas, tallaByValor, editarTalla, eliminarTalla } from '../routes/controllers/talla.js';

router.post( 
    '/insertar', 
    [
        check('valor', 'El valor de la talla es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearTalla 
);

router.get(
    '/',
    obtenerTallas
);

router.post(
    '/tallaByValor',
    [
        check('valor', 'El valor de la talla es obligatorio').not().isEmpty(),
        validarCampos
    ],
    tallaByValor
);

router.put(
    '/editar',
    [
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarTalla
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id de la talla es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarTalla
);


export default router;