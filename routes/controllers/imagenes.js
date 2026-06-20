
import Imagenes from '../../models/Imagenes.js';


export const obtenerImagenesByProducto = async (req, res) => {
    try {
        console.log("obtenerImagenes");
        
        const imagenes = await Imagenes.find({producto: req.body.producto});
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