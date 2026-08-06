/*
    /api/pedido.js

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

import { colocarOrden, obtenerPedidos, colocarPedidoEnTienda, actualizarEstadoPedido, obtenerPedidosCliente } from '../routes/controllers/pedido.js';

const router = Router();

router.post( 
    '/colocarOrden', 
    [
        check('IdCarrito', 'El idCarrito es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    colocarOrden 
);


router.get(
    '/',
    obtenerPedidos
);

router.post( 
    '/colocarPedidoEnTienda', 
    [
        check('pedido', 'El pedido es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    colocarPedidoEnTienda 
);

router.post( 
    '/obtenerPedidosCliente', 
    [
        check('usuario_id', 'El usuario_id es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    obtenerPedidosCliente 
);

router.put( 
    '/actualizarEstadoPedido', 
    [
        check('idPedido', 'El idPedido es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    actualizarEstadoPedido 
);


export default router;