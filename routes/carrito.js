/*
    /api/carrito

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearCarrito, agregarProductoCarrito, obtenerCarrito, obtenerProductosCarrito, aumentarCantidad, eliminarProductoCarrito } from '../routes/controllers/carrito.js';

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
        check('usuarioId', 'usuarioId es obligatorio').not().isEmpty(),
        validarCampos
    ],
    obtenerProductosCarrito
);
router.post(
    '/aumentarCantidad',
    [
        check('usuarioId', 'usuarioId es obligatorio').not().isEmpty(),
        check('productoId', 'productoId es obligatorio').not().isEmpty(),
        check('cantidad', 'cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    aumentarCantidad
);

router.post(
    '/removerProductoCarrito',
    [
        check('usuarioId', 'usuarioId es obligatorio').not().isEmpty(),
        check('productoId', 'productoId es obligatorio').not().isEmpty(),
        validarCampos
    ],
    eliminarProductoCarrito
);

export default router;