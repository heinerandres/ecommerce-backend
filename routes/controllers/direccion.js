
import Direccion from '../../models/Direccion.js';

export const crearDireccion = async (req, res) => {
    try{
        console.log("direccion");
        console.log(req.body);
        const direccion = new Direccion( req.body );
        await direccion.save();

        res.status(201).json({
            ok: true,
            direccion
        });
    }
    catch(error){
        console.log(error);
        console.log("no se pudo guardar la direccion");
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerDireccion = async (req, res) => {
    try{
        const direccion = await Direccion.findOne(req.body);
        res.status(201).json({
            ok: true,
            direccion
        });
    }
    catch(error){
        console.log("no se pudo obtener la direccion");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor. Por favor hable con el administrador'
        });
    }
}

export const editarDireccion = async (req, res) => {
    const id = req.body.carrito;
    console.log(id);
    try {
        const direccionActualizada = await Direccion.findOneAndUpdate(
            { carrito: id },
            req.body,
            { new: true } // devuelve el documento actualizado
        );
        if (!direccionActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Direccion no encontrada'
            });
        }
        res.status(200).json({
            ok: true,
            direccion: direccionActualizada
        });
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            res.status(500).json({
                ok: false,
                msg: 'La Direccion ya existe'
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};