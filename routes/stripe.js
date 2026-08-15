/*
    /api/talla

*/

import Router from 'express';
import {check} from 'express-validator';
import {validarCampos} from './middlewares/validarCampos.js';

const router = Router();

import { crearCheckout } from '../routes/controllers/stripe.js';

router.post( 
    '/crearCheckout', 
    [
        check('pedidoId', 'El pedidoId de la talla es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearCheckout 
);



export default router;