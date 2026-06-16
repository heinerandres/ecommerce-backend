
import Producto from'../../models/Producto.js';

export const crearProducto = async (req, res) => {

    try{

        console.log(req.body);

        const producto = new Producto({
            ...req.body,
            img1: req.files?.img1?.[0]
                ? `/uploads/${req.files.img1[0].filename}`
                : null,
            img2: req.files?.img2?.[0]
                ? `/uploads/${req.files.img2[0].filename}`
                : null,
            img3: req.files?.img3?.[0]
                ? `/uploads/${req.files.img3[0].filename}`
                : null,
            img4: req.files?.img4?.[0]
                ? `/uploads/${req.files.img4[0].filename}`
                : null
        });
        await producto.save();

        res.status(201).json({
            ok: true,
            producto
        });
    }
    catch(error){
        console.log("no se pudo guardar el producto");
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

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
        const producto = await Producto.find({slug: req.body.slug});
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