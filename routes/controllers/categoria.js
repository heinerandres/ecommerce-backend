import Categoria from '../../models/Categoria.js';

export const crearCategoria = async (req, res) => {

    try{
        const categoria = new Categoria( req.body );
        await categoria.save();

        res.status(201).json({
            ok: true,
            categoria
        });
    }
    catch(error){
        console.log("no se pudo guardar el categoria");
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerCategorias = async (req, res) => {
    try{
        const categoria = await categoria.find({});
        res.status(201).json({
            ok: true,
            categoria
        });
    }
    catch(error){
        console.log("no se pudieron obtener los categoria");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}
