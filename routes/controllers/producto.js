
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
    try {
        const { _id, ...datosProducto } = req.body;
        const producto = await Producto.findByIdAndUpdate(
            _id,
            datosProducto,
            { new: true }
        );
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
        const productos = await Producto.find({});
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

export const obtenerProductoBySlug = async (req, res) => {
    try {
        console.log("obtenerProducto");
        const producto = await Producto.findOne({slug: req.body.slug});
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