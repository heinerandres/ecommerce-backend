import path from 'path';
import {config} from 'dotenv';
import express from "express";
import cors from "cors";

import { dbConnection } from './database/config.js';

import productoRoutes from './routes/producto.js';
import carritoRoutes from './routes/carrito.js';
import categoriaRoutes from './routes/categoria.js';
import colorRoutes from './routes/color.js';
import tallaRoutes from './routes/talla.js'; 
import imagenesRoutes from './routes/imagenes.js'; 
import producto_variantesRoutes from './routes/producto_variantes.js';
import direccionRoutes from './routes/direccion.js';
import pedidoRoutes from './routes/pedido.js';
import stripeRoutes from './routes/stripe.js';

const app = express();



const startServer = async () => {
  try{
    await dbConnection();

    app.use(cors());
    app.use(express.json());
    /* app.use(express.urlencoded({ extended: true })); */


    app.use(express.static('public'));

    app.get("/", (req, res) => {
      console.log("/");
      res.send("API funcionando 🚀");
    });

    app.use('/api/producto', productoRoutes);

    app.use('/api/carrito', carritoRoutes);

    app.use('/api/categoria', categoriaRoutes);
    
    app.use('/api/color', colorRoutes);
    
    app.use('/api/talla', tallaRoutes);

    app.use('/api/variantes', producto_variantesRoutes);

    app.use('/api/imagenes', imagenesRoutes);

    app.use('/api/direccion', direccionRoutes);

    app.use('/api/pedidos', pedidoRoutes);

    app.use('/api/stripe', stripeRoutes);

    


    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  }
  catch(error){
      console.log( error );
      throw new Error ( 'Error a la hora de inicializar la BD' );
  }
}

startServer();
