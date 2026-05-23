import Color from '../../models/Color.js';

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
        const color = await Color.find({});
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
            msg: 'Por favor hable con el administrador'
        });
    }
}