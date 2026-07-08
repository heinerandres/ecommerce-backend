
import Carrito from '../../models/Carrito.js';
import Producto from '../../models/Producto.js';
import Producto_variantes from '../../models/Producto_variantes.js';
import ObjectId from 'mongodb';
import mongoose from "mongoose";

export const obtenerCarrito = async (req, res) => {
    try {
        console.log("obtenerCarrito");
        const carrito = await Carrito.findOne({usuario_id: req.body.usuario_id});
        if( carrito == null){
            res.status(201).json({
                ok: true,
                carrito,
                productos: [],
            });
        }
        else {
            let productos = []
            if(carrito.productos.length > 0 ){
                const productos_ids = carrito.productos;
                const idProductosCarrito = productos_ids.map(item =>  item._id );
                productos = await Producto.find({ _id: { $in: idProductosCarrito} });
            }
            
            res.status(201).json({
                ok: true,
                carrito,
                productos
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const crearCarrito = async (req, res) => {
    try {
        let productos = [];
        const carrito = new Carrito( req.body );
        await carrito.save();
        if(carrito.productos.length > 0){
            const productos_ids = carrito.productos;
            const idProductosCarrito = productos_ids.map(item =>  item.id );
            const productos = await Producto.find({ _id: { $in: idProductosCarrito} });
        }

        res.status(201).json({
            ok: true,
            carrito,
            productos
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const agregarProductoCarrito = async(req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        //agregar producto al carrito
        //existe carrito?
        //consulta si el producto ya esta en el carro
        //     si está, suma la cantidad del carrito con la cantidad nueva
        //     si no está, agrega el producto a la lista
        //guarda el carro

        console.log("agregar producto");
        const _id = req.body._id;
        const productoId = req.body.productoId;
        const varianteId = req.body.varianteId;
        const cantidad = req.body.cantidad;

        //existe carrito?
        const carrito = await Carrito.findOne({ _id }).session(session);
        if(!carrito){
            await session.abortTransaction();
            return res.status(404).json({
                ok: false,
                msg: "Carrito no encontrado"
            });
        }
        //producto en carrito?
        if(varianteId == null){
            const productoExistente = carrito.productos.find(
            p =>
                p.id.toString() === productoId 
            );
            //restar stock de tabla producto antes de sumarlo al carrito o agregarlo
            const producto = await Producto.findById(productoId).session(session);
            if(!producto){
                await session.abortTransaction();
                return res.status(404).json({
                    ok:false,
                    msg:"Producto no encontrado"
                });
            }
            if(cantidad > producto.cantidad) {
                await session.abortTransaction();
                return res.status(409).json({
                    ok: false,
                    msg: "La cantidad solicitada es mayor que las existencias"
                });
            }
            producto.cantidad -= cantidad;
            await producto.save({ session });

            if (productoExistente) productoExistente.cantidad += cantidad;
            else{
                carrito.productos.push({
                    id: productoId,
                    cantidad
                });
            };
        }
        //variante en carrito?
        else{
            const productoExistente = carrito.productos.find(
            p =>
                p.id.toString() === productoId &&
                String(p.variante) === String(varianteId)
            );
            //restar stock de tabla producto antes de sumarlo al carrito o agregarlo
            const variante = await Producto_variantes.findById(varianteId).session(session);
            if(!variante){
                await session.abortTransaction();
                return res.status(404).json({
                    ok:false,
                    msg:"Variante no encontrada"
                });
            }
            if(cantidad > variante.cantidad) {
                await session.abortTransaction();
                return res.status(409).json({
                    ok: false,
                    msg: "La cantidad solicitada es mayor que las existencias"
                });
            }
            variante.cantidad -= cantidad;
            await variante.save({ session });

            if (productoExistente) productoExistente.cantidad += cantidad;
            else{
                carrito.productos.push({
                    id: productoId,
                    variante: varianteId ?? null,
                    cantidad
                });
            };
        }
        
        await carrito.save({ session });
        // Confirmar cambios
        await session.commitTransaction();

        res.status(200).json({
            ok: true,
            carrito
        });
    } catch(error){
        await session.abortTransaction();
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    finally{
        session.endSession();
    }
}


//consulta por productos no deberia incluir variantes, hacer consulta por variantes serparada
export const obtenerProductosCarrito = async(req, res) => {
    try{
        const idsProductos = req.body.idsProductos;
        const productos = await Producto.find({
            _id: { $in: idsProductos }
        })
        .populate("categoria")
        .populate({
            path: "variantes",
            populate: [
                { path: "talla" },
                { path: "color" },
            ]
        });
        res.status(201).json({
                ok: true,
                productos
            });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

