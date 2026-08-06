import { request } from 'express';
import Producto_variantes from'../../models/Producto_variantes.js';

export const crearVariante = async (req, res) => {

    try{
        console.log("crear variantes");
        console.log(req.body);

        const variante = new Producto_variantes(req.body);
        await variante.save();

        res.status(201).json({
            ok: true,
            variante
        });
    }
    catch(error){
        console.log("no se pudo guardar la variante");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerVariantes = async (req, res) => {
    try{
        const variantes = await Producto_variantes.find({})
        .populate("color")
        .populate("talla");
        res.status(201).json({
            ok: true,
            variantes
        });
    }
    catch(error){
        console.log("no se pudieron obtener las variantes");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const getVariantesByProducto = async (req, res) => {
    try{
        const {producto} = req.body.producto
        console.log("variantes por producto");
        console.log(req.body);
        const variantes = await Producto_variantes.find(request.body)
        .populate("color")
        .populate("talla");
        res.status(201).json({
            ok: true,
            variantes
        });
    }
    catch(error){
        console.log("no se pudieron obtener las variantes");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarVariante = async (req, res) => {
    const id = req.body;
    console.log("editar variante");
    console.log(id);
    try {
        const varianteActualizada = await Producto_variantes.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // devuelve el documento actualizado
        );
        if (!varianteActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Variante no encontrada'
            });
        }
        res.status(200).json({
            ok: true,
            variante: varianteActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const eliminarVariante = async (req, res) => {
    try {
        const id  = req.body;
        const variante = await Producto_variantes.findByIdAndDelete(id);
        if (!variante) {
            return res.status(404).json({
                ok: false,
                msg: 'Variante no encontrada'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Variante eliminada'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

