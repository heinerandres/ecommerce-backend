
import Talla from'../../models/Talla.js';

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
        console.log("obtener Tallas");
        const talla = await Talla.find({});
        res.status(201).json({
            ok: true,
            talla
        });
    }
    catch(error){
        console.log("no se pudieron obtener los talla");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}