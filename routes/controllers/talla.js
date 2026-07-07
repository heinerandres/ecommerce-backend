
import Talla from'../../models/Talla.js';
import Producto from '../../models/Producto.js';

export const crearTalla = async (req, res) => {

    try{
        const talla = new Talla( req.body );
        await talla.save();

        res.status(201).json({
            ok: true,
            talla
        });
    }
    catch(error){
        console.log("no se pudo guardar el talla");
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerTallas = async (req, res) => {
    try{
        const tallas = await Talla.find({});
        const tallasConCantidad = await Promise.all(
            tallas.map(async (talla) => {
                const cantidadProductos = await Producto.countDocuments({
                    talla: talla._id
                });
            return {
                ...talla.toObject(),
                cantidadProductos
            };
            })
        );
        res.status(201).json({
            ok: true,
            tallas: tallasConCantidad
        });
    }
    catch(error){
        console.log("no se pudieron obtener las tallas");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const tallaByValor = async (req, res) => {
    try{
        const talla = await Talla.findOne(req.body);
        res.status(201).json({
            ok: true,
            talla
        });
    }
    catch(error){
        console.log("no se pudieron obtener las tallas");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor. Por favor hable con el administrador'
        });
    }
}

export const editarTalla = async (req, res) => {
    const id = req.body;
    try {
        const tallaActualizada = await Talla.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // devuelve el documento actualizado
        );
        if (!tallaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Talla no encontrada'
            });
        }
        res.status(200).json({
            ok: true,
            talla: tallaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


export const eliminarTalla = async (req, res) => {
    try {
        const id  = req.body;
        const talla = await Talla.findByIdAndDelete(id);
        if (!talla) {
            return res.status(404).json({
                ok: false,
                msg: 'Talla no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Talla eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};