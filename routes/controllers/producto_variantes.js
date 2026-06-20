import Producto_variantes from'../../models/Producto_variantes.js';

export const crearVariante = async (req, res) => {

    try{
        console.log("crear variantes");
        console.log(req.body);

        const variante = new Producto_variantes(req.body);
        await variante.save();

        res.status(201).json({
            ok: true,
            variante
        });
    }
    catch(error){
        console.log("no se pudo guardar la variante");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerVariantes = async (req, res) => {
    try{
        console.log("variantes");
        console.log(req.body);
        const variantes = await Producto_variantes.find({});
        res.status(201).json({
            ok: true,
            variantes
        });
    }
    catch(error){
        console.log("no se pudieron obtener las variantes");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerVarianteById = async (req, res) => {
    try {
        console.log("obtenerProducto");
        const variante = await Producto_variantes.find({_id: req.body._id});
            res.status(201).json({
                ok: true,
                variante,
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