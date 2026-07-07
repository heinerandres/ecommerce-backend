
import Imagenes from '../../models/Imagenes.js';


export const obtenerImagenes = async (req, res) => {
    try{
        console.log("imagenes");
        const imagenes = await Imagenes.find();
        res.status(201).json({
            ok: true,
            imagenes
        });
    }
    catch(error){
        console.log("no se pudieron obtener las imagenes");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerImagenesByProducto = async (req, res) => {
    try {
        console.log("obtenerImagenes");
        console.log(req.body.producto);
        const producto = req.body.producto;
        const imagenes = await Imagenes.find({producto: producto});
            res.status(201).json({
                ok: true,
                imagenes,
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
