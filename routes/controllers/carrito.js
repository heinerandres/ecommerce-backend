
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

        /*
        1. consultar el carrito
        2. consultar el producto (producto siempre viene)
        3. consultar si el producto está en el carrito
        3.1 si, consultar si viene una variante
            3.1.1 no, consultar si la cantidad nueva más la cantidad anterior es mayor a la cantidad del producto
            3.1.1.1 si, error
            3.1.1.2 no, sumar la cantidad(del carrito)
            3.1.2 si, consultar si la cantidad nueva más la cantidad anterior es mayor a la cantidad de la variante(consultar si la variante existe)
            3.1.2.1 si, error
            3.1.2.1 no, sumar la cantidad(del carrito)
        3.2 no, consultar si viene una variante
            3.2.1 no, consultar si la cantidad que viene es mayor a la cantidad del producto
                3.2.1.1 si, error
                3.2.1.2 no, agregar el producto nuevo
            3.2.2 si, consultar si la cantidad que viene es mayor a la cantidad de la variante(consultar si la variante existe)
                3.2.2.1 si, error
                3.2.2.2 no, agregar el producto nuevo
        */
        const _id = req.body._id;
        const productoId = req.body.productoId;
        const varianteId = req.body.varianteId;
        const cantidad = req.body.cantidad;

        //1. consultar el carrito
        const carrito = await Carrito.findOne({ _id }).session(session);
        if(!carrito){
            await session.abortTransaction();
            return res.status(404).json({
                ok: false,
                msg: "Carrito no encontrado"
            });
        }
        //2. consultar el producto (producto siempre viene)
        const producto = await Producto.findById(productoId).populate("variantes").session(session);
        if(!producto){
            await session.abortTransaction();
            return res.status(404).json({
                ok:false,
                msg:"Producto no encontrado"
            });
        }
        //3.consultar si el producto está en el carrito
        const productoExistente = carrito.productos.find(p =>
            p.id.toString() === productoId &&
            (p.variante?.toString() ?? null) === (varianteId ?? null)
        );
        //si esta en el carrito
        if (productoExistente){
            //si no tiene variante
            if(!varianteId){
                //si la cantidad pasa la cantidad del producto
                if((productoExistente.cantidad + cantidad) > producto.cantidad) {
                    await session.abortTransaction();
                    return res.status(409).json({
                        ok: false,
                        msg: "La cantidad solicitada es mayor que las existencias"
                    });
                }
                else productoExistente.cantidad += cantidad;
            }
            //si viene la variante
            else{
                const variante = producto.variantes.find(v => v._id.toString() === varianteId);
                if(!variante){
                    await session.abortTransaction();
                    return res.status(404).json({
                        ok:false,
                        msg:"Variante no encontrada"
                    });
                }
                else{
                    if((productoExistente.cantidad + cantidad) > variante.cantidad){
                        await session.abortTransaction();
                        return res.status(409).json({
                            ok: false,
                            msg: "La cantidad solicitada es mayor que las existencias"
                        });
                    }
                    else productoExistente.cantidad += cantidad;
                }
            }
        }
        else{
            if(!varianteId){
                //si la cantidad pasa la cantidad del producto
                if(cantidad > producto.cantidad) {
                    await session.abortTransaction();
                    return res.status(409).json({
                        ok: false,
                        msg: "La cantidad solicitada es mayor que las existencias"
                    });
                }
                else carrito.productos.push({
                        id: productoId,
                        variante: varianteId ?? null,
                        cantidad
                    });
            }
            else{
                const variante = producto.variantes.find(v => v._id.toString() === varianteId);
                if(!variante){
                    await session.abortTransaction();
                    return res.status(404).json({
                        ok:false,
                        msg:"Variante no encontrada"
                    });
                }
                else{
                    if(cantidad > variante.cantidad){
                        await session.abortTransaction();
                        return res.status(409).json({
                            ok: false,
                            msg: "La cantidad solicitada es mayor que las existencias"
                        });
                    }
                    else carrito.productos.push({
                            id: productoId,
                            variante: varianteId ?? null,
                            cantidad
                         });
                }
            }
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

export const obtenerProductosCarrito = async(req, res) => {
    try{
        const usuarioId = req.body.usuarioId;
        const carrito = await Carrito.findOne({
            usuario_id: usuarioId
        });
        const idsProductos = carrito.productos
            .filter(p => p.id)
            .map(p => p.id);

        const idsVariantes = carrito.productos
            .filter(p => p.variante)
            .map(p => p.variante);

        const productos = await Producto.find({
            _id: { $in: idsProductos }
        })
        .populate("categoria")
        .populate("imagenes");
        const variantes = await Producto_variantes.find({
            _id: { $in: idsVariantes }
        })
        .populate({
            path: "producto",
            populate: [
                {path: "imagenes"},
                {path: "categoria"}
            ]
        })
        .populate("color")
        .populate("talla");
        const respuesta = [];
        for (const item of carrito.productos) {
            if (!item.variante) {
                const producto = productos.find(p =>
                    p._id.equals(item.id)
                );
                respuesta.push({
                    producto,
                    variante: null,
                    cantidadCarrito: item.cantidad,
                    stock: producto.cantidad
                });
            } else {
                const variante = variantes.find(v =>
                    v._id.equals(item.variante)
                );
                respuesta.push({
                    producto: variante.producto,
                    variante,
                    cantidadCarrito: item.cantidad,
                    stock: variante.cantidad
                });
            }
        }
        res.status(200).json({
            ok: true,
            respuesta
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

export const aumentarCantidad = async (req, res) => {
    try {
        const { usuarioId, productoId, cantidad } = req.body;
        const carrito = await Carrito.findOne({ usuario_id: usuarioId });
        if (!carrito) {
            return res.status(404).json({
                msg: "Carrito no encontrado"
            });
        }
        const productoCarrito = carrito.productos.find(
            producto => producto.id.toString() === productoId
        );
        if (!productoCarrito) {
            return res.status(404).json({
                msg: "Producto no está en el carrito"
            });
        }
        productoCarrito.cantidad = cantidad;
        await carrito.save();
        res.json({
            ok: true,
            carrito
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar cantidad",
            error
        });
    }
};

export const eliminarProductoCarrito = async (req, res) => {
    try {
        const { usuarioId, productoId, varianteId } = req.body;
        console.log(usuarioId);
        const carrito = await Carrito.findOne({ usuario_id: usuarioId });
        if (!carrito) {
            return res.status(404).json({
                ok: false,
                msg: "Carrito no encontrado"
            });
        }
        carrito.productos = carrito.productos.filter(producto => {
            // Si el producto a eliminar tiene variante
            if (varianteId) {
                return !(
                    producto.id.toString() === productoId &&
                    producto.variante?.toString() === varianteId
                );
            }
            // Si el producto a eliminar no tiene variante
            return producto.id.toString() !== productoId;
        });
        await carrito.save();
        res.status(200).json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }
};

