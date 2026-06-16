
import Categoria from '../../models/Categoria.js';
import Producto from '../../models/Producto.js';

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
       
        console.log("obtener categorias");
        const categorias = await Categoria.find({});

        const categoriasConCantidad = await Promise.all(
            categorias.map(async (Categoria) => {
                const cantidadCategorias = await Producto.countDocuments({
                    Categoria: Producto._id
                });

            return {
                ...Categoria.toObject(),
                cantidadCategorias
            };
            })
        );


        res.status(201).json({
            ok: true,
            categorias: categoriasConCantidad
        });


    }
    catch(error){
        console.log("no se pudieron obtener las categoria");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

export const obtenerCategoriaByNombre = async (req, res) => {
    try {
        
        console.log("obtener Categoria Por Nombre");
        const categoria = await Categoria.find({nombre: req.body.nombre});
            res.status(201).json({
                ok: true,
                categoria,
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


