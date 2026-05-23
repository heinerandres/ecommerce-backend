/*
    /api/carrito

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearCarrito, editarCarrito, obtenerCarrito } from '../routes/controllers/carrito.js';

router.post( 
    '/insertar', 
    crearCarrito );

router.put(
    '/actualizarCarrito',
    editarCarrito
);

router.post(
    '/obtenerCarrito',
    obtenerCarrito
)



export default router;