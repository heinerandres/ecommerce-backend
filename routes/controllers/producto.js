
import Producto from '../../models/Producto.js';
import Imagenes from '../../models/Imagenes.js';
import path from 'path';
import fs from 'fs';
import fsPromises from "fs/promises";

export const crearProducto = async (req, res) => {

    try{
        console.log(req.body);

        const producto = new Producto(req.body);
        await producto.save();

        res.status(201).json({
            ok: true,
            producto
        });
    }
    catch(error){
        console.log("no se pudo guardar el producto");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarProducto = async (req, res) => {
    const id = req.body;
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // devuelve el documento actualizado
        );
        if (!productoActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            producto: productoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const editarProductoConImagenes = async (req, res) => {
    try {
        const { _id } = req.body;
        const producto = await Producto.findById(_id);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }
        // Obtener imágenes actuales
        const imagenesAnteriores = await Imagenes.find({
            producto: producto._id
        });
        console.log(imagenesAnteriores);
        // Borrar archivos físicos
        for (const imagen of imagenesAnteriores) {
            const ruta = path.join(
                process.cwd(),
                'public/uploads',
                imagen.url
            );
            console.log(ruta);
            console.log(fs.existsSync(ruta));
            if (fs.existsSync(ruta)) {
                await fsPromises.unlink(ruta);
            }
        }
        // Borrar registros de MongoDB
        await Imagenes.deleteMany({
            producto: producto._id
        });
        // Insertar nuevas imágenes
        
        if (req.files) {
            await Imagenes.insertMany(
                Object.values(req.files)
                    .flat()
                    .map(file => ({
                        producto: producto._id,
                        url: file.filename
                    }))
            );
        }
        res.status(200).json({
            ok: true,
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const obtenerProductos = async (req, res) => {
    try{
        console.log("productos");
        const productos = await Producto.find()
        .populate("variantes")
        .populate("categoria")
        .populate("imagenes");
        res.status(201).json({
            ok: true,
            productos
        });
    }
    catch(error){
        console.log("no se pudieron obtener los producto");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerProductosConImagenes = async (req, res) => {
    try{
        console.log("productos");
        const productos = await Producto.find()
        .populate("variantes")
        .populate("imagenes");

        const visibles = productos.filter(
            p=> p.imagenes.length > 0
        );

        res.status(201).json({
            ok: true,
            productos: visibles
        });
    }
    catch(error){
        console.log("no se pudieron obtener los producto");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerProductoBySlug = async (req, res) => {
    try {
        console.log("obtenerProducto");
        const slug = req.body.slug;
        const producto = await Producto.findOne({slug})
        .populate({
            path: "variantes",
            populate: [{path: "color"},{path: "talla"}]
        })
        .populate("categoria");

            res.status(201).json({
                ok: true,
                producto,
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

export const eliminarProducto = async (req, res) => {
    try {
        const id  = req.body;
        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

