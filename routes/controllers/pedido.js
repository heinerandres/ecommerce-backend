import Carrito from '../../models/Carrito.js';
import Producto_variantes from '../../models/Producto_variantes.js';
import Producto from '../../models/Producto.js';
import Direccion from '../../models/Direccion.js';
import Pedido from '../../models/Pedido.js';
import mongoose from "mongoose";

export const colocarOrden = async (req, res) => {
/*
1- restar el stock del producto
2- eliminar los productos del carrito
3- crear un pedido nuevo con la lista de productos del carrito
5- generar el tipo de pedido (en página o en tienda)
6- generar el estapago = false
5- guardar fecha y hora
6- guardar usuario y dirección
*/
    const session = await mongoose.startSession();

    try{
        await session.startTransaction();

        const { IdCarrito } = req.body;
        console.log(req.body.IdCarrito);

        const carrito = await Carrito.findById(IdCarrito).session(session);

        if (!carrito) {
            throw new Error("Carrito no encontrado.");
        }
        if (carrito.productos.length === 0) {
            throw new Error("El carrito está vacío.");
        }

        await descontarStock(carrito, session);

        const direccion = await Direccion.findOne({carrito: carrito._id}).session(session);
        if (!direccion) {
            throw new Error("Dirección no encontrada.");
        }

        const pedido = await crearPedido(carrito, direccion._id, "EnPagina", session);

        carrito.productos = [];

        await carrito.save({ session });

        await session.commitTransaction();
        res.status(201).json({
            ok: true,
            pedido
        });
    }
    catch(error){
        await session.abortTransaction();
        console.log("no se pudo guardar el producto");
        console.log(error);
        if(error.code === 11000){
            return res.status(500).json({
                ok: false,
                msg: 'El producto ya existe'
            });
        }
        if (error instanceof Error) {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    finally{
        await session.endSession();
    }
}
export const descontarStock = async (carrito, session) => {
    for (const item of carrito.productos) {
        const Modelo = item.variante
            ? Producto_variantes
            : Producto;
        const id = item.variante ?? item.id;
        const resultado = await Modelo.findOneAndUpdate(
            {_id: id, cantidad: { $gte: item.cantidad }},
            { $inc: { cantidad: -item.cantidad }},
            { new: true,session }
        );
        if (!resultado) {
            throw new Error("Stock insuficiente.");
        }
    }
};

export const crearPedido = async (
    carrito,
    direccion_id,
    tipoPedido,
    session
) => {

    let total = 0;
    const productosPedido = [];

    for (const item of carrito.productos) {
        let precio = 0;
        if (item.variante) {
            const variante = await Producto_variantes.findById(item.variante).session(session);
            if (!variante) {
                throw new Error("Variante no encontrada.");
            }
            precio = variante.precio;
        } else {
            const producto = await Producto.findById(item.id).session(session);
            if (!producto) {
                throw new Error("Producto no encontrado.");
            }
            precio = producto.precio;
        }
        const subtotal = precio * item.cantidad;
        total += subtotal;
        productosPedido.push({
            id: item.id,
            variante: item.variante,
            cantidad: item.cantidad,
            precioUnitario: precio,
            subtotal
        });
    }
    const pedido = new Pedido({
        usuario_id: carrito.usuario_id,
        direccion_id,
        tipoPedido,
        estaPago: false,
        productos: productosPedido,
        total
    });
    await pedido.save({ session });
    return pedido;
}


export const obtenerPedidos = async (req, res) => {
    try{
        console.log("pedidos");
        const pedidos = await Pedido.find()
        .populate("direccion_id")
        .populate("productos.id")
        .populate("productos.variante")
        res.status(201).json({
            ok: true,
            pedidos
        });
    }
    catch(error){
        console.log("no se pudieron obtener los pedidos");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const colocarPedidoEnTienda = async (req, res) => {
    console.log(req.body.pedido);
    const { pedido } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await descontarStock(pedido, session);
        const [nuevoPedido] = await Pedido.create(
            [pedido],
            { session }
        );
        await session.commitTransaction();
        return res.status(201).json({
            ok: true,
            pedido: nuevoPedido
        });

    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
    finally{
        await session.endSession();
    }
}


export const actualizarEstadoPedido = async ( req, res) => {
    try {
        const { idPedido } = req.body;
        const { estado } = req.body;

        console.log(idPedido);

        const pedido = await Pedido.findById(idPedido);
        if (!pedido) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }
        pedido.estado = estado;
        await pedido.save();
        return res.status(200).json({
            ok: true,
            message: "Estado actualizado correctamente",
            pedido
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok:false,
            message: "Error al actualizar estado"
        });

    }
};