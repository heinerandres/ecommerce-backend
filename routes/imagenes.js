/*
    /api/imagenes

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { obtenerImagenesByProducto, obtenerImagenes } from './controllers/imagenes.js';

router.post(
    '/obtenerImagenesByProducto',
    [
        check('producto', 'El producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerImagenesByProducto
);

router.get(
    '/',
    obtenerImagenes
);



export default router;