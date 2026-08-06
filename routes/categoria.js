/*
    /api/categoria

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearCategoria, obtenerCategorias, obtenerCategoriaByNombre, editarCategoria, eliminarCategoria} from '../routes/controllers/categoria.js'; 

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
    '/categoriaByNombre',
    [
        check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    categoriaByNombre
);

router.put(
    '/editar',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarCategoria
);

router.delete(
    '/eliminar',
    [
        check('_id', 'El id de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarCategoria
);



router.put(
    '/editar',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    editarCategoria
);


router.delete(
    '/eliminarCategoria',
    [
        check('_id', 'El ID de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarCategoria
);


export default router;