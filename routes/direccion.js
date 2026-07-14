/*
    /api/direcion

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearDireccion, obtenerDireccion } from '../routes/controllers/direccion.js';

router.post( 
    '/insertar', 
    [
        check('carrito', 'El id del carrito es obligatorio').not().isEmpty(),
        check('nombres', 'El campo nombres es obligatorio').not().isEmpty(),
        check('apellidos', 'El campo apellidos es obligatorio').not().isEmpty(),
        check('direccion', 'La direcion es obligatoria').not().isEmpty(),
        check('codigoPostal', 'El codigo postal es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
        check('pais', 'El pais es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearDireccion 
);

router.post( 
    '/obtenerDireccion', 
    [
        check('carrito', 'El id del carrito es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    obtenerDireccion 
);




export default router;