/*
    /api/imagenes

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';
import upload from '../storage/imagenes.js';

const router = Router();

import { obtenerImagenesByProducto, obtenerImagenesByVariante, obtenerImagenes, editarImagenesVariante } from './controllers/imagenes.js';

router.post(
    '/obtenerImagenesByProducto',
    [
        check('producto', 'El producto es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    obtenerImagenesByProducto
);

router.post(
    '/obtenerImagenesByVariante',
    [
        check('variante', 'La variante es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    obtenerImagenesByVariante
);

router.get(
    '/',
    obtenerImagenes
);

router.put(
    '/editarImagenesVariante',
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
    editarImagenesVariante
);


export default router;