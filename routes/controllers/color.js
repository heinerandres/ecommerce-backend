import Color from '../../models/Color.js';
import Producto from '../../models/Producto.js';

export const crearColor = async (req, res) => {

    try{
        const color = new Color( req.body );
        await color.save();

        res.status(201).json({
            ok: true,
            color
        });
    }
    catch(error){
        console.log("no se pudo guardar el color");
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerColor = async (req, res) => {
    try{
        const colores = await Color.find({});

        const coloresConCantidad = await Promise.all(
            colores.map(async (color) => {
                const cantidadProductos = await Producto.countDocuments({
                    color: color._id
                });

            return {
                ...color.toObject(),
                cantidadProductos
            };
            })
        );

        res.status(201).json({
            ok: true,
            colores: coloresConCantidad
        });
    }
    catch(error){
        console.log("no se pudieron obtener los color");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const colorByNombre = async (req, res) => {
    console.log("color por nombre");
    console.log(req.body);
    try{
        const color = await Color.findOne(req.body);
        res.status(201).json({
            ok: true,
            color
        });
    }
    catch(error){
        console.log("no se pudieron obtener los color");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor. Por favor hable con el administrador'
        });
    }
}

export const editarColor = async (req, res) => {
    const id = req.body;
    console.log(id);
    console.log(req.body);
    try {
        const colorActualizado = await Color.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // devuelve el documento actualizado
        );
        if (!colorActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'Color no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            color: colorActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


export const eliminarColor = async (req, res) => {
    try {
        const id  = req.body;

        const color = await Color.findByIdAndDelete(id);

        if (!color) {
            return res.status(404).json({
                ok: false,
                msg: 'Color no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Color eliminado'
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};