
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