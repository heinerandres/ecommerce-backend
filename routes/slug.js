/*
    /api/slug

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';
import upload from '../storage/imagenes.js';

const router = Router();

import { crearSlug, slugBySlug, obtenerSlug, editarSlug, eliminarSlug } from '../routes/controllers/slug.js';

router.post( 
    '/insertar', 
    upload.fields([
        { name: "img1", maxCount: 1 },
        { name: "img2", maxCount: 1 },
        { name: "img3", maxCount: 1 },
        { name: "img4", maxCount: 1 }
    ]),
    [
        check('slug', 'El valor de la slug es obligatorio').not().isEmpty(),
        check('categoria', 'El valor de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    crearSlug 
);

router.put(
    '/editar',
    upload.fields([
        { name: "img1", maxCount: 1 },
        { name: "img2", maxCount: 1 },
        { name: "img3", maxCount: 1 },
        { name: "img4", maxCount: 1 }
    ]),
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        check('slug', 'El slug es obligatorio').not().isEmpty(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        validarCampos
    ],
    editarSlug
);

router.post(
    '/slugBySlug',
    [
        check('slug', 'El valor del slug es obligatorio').not().isEmpty(),
        validarCampos
    ],
    slugBySlug
);

router.get(
    '/',
    obtenerSlug
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id del slug es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarSlug
);


export default router;