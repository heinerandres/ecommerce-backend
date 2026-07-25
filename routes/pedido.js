/*
    /api/pedido.js

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

import { colocarOrden } from '../routes/controllers/pedido.js';

const router = Router();

router.post( 
    '/colocarOrden', 
    [
        check('IdCarrito', 'El idCarrito es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    colocarOrden );

export default router;