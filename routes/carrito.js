/*
    /api/carrito

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearCarrito, agregarProductoCarrito, obtenerCarrito, obtenerProductosCarrito } from '../routes/controllers/carrito.js';

router.post( 
    '/insertar', 
    crearCarrito 
);

router.put(
    '/insertarProducto',
    agregarProductoCarrito
);

router.post(
    '/obtenerCarrito',
    obtenerCarrito
);

router.post(
    '/obtenerProductosCarrito',
    [
        check('idsProductos', 'idsProductos es obligatorio').not().isEmpty(),
        validarCampos
    ],
    obtenerProductosCarrito
);



export default router;