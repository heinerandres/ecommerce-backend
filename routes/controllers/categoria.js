
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
            categorias.map(async (categoria) => {
                const cantidadProductos = await Producto.countDocuments({
                    categoria: categoria._id
                });
            return {
                ...categoria.toObject(),
                cantidadProductos
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
        const categoria = await Categoria.findOne({nombre: req.body.nombre});
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

export const editarCategoria= async (req, res) => {
    const nombre = req.body;
    try {
         console.log("editarCategoria");
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            nombre,
            req.body,
            { new: true } // devuelve el documento actualizado
        );
        if (!categoriaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
            });
        }
        res.status(200).json({
            ok: true,
            color: categoriaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


export const eliminarCategoria = async (req, res) => {
    try {
        console.log("eliminar Categoria")
        const id  = req.body;
        const categoria = await Categoria.findByIdAndDelete(id);
        if (!id) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Categoria eliminada'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


export const categoriaByNombre = async (req, res) => {
    try{
        const categoria = await Categoria.findOne(req.body);
        res.status(201).json({
            ok: true,
            categoria
        });
    }
    catch(error){
        console.log("no se pudieron obtener la categoria");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor. Por favor hable con el administrador'
        });
    }
}

export const eliminarCategoria = async (req, res) => {
    try {
        const id  = req.body;
        const categoria = await Categoria.findByIdAndDelete(id);
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Categoria eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const editarCategoria = async (req, res) => {
    const id = req.body;
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // devuelve el documento actualizado
        );
        if (!categoriaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
            });
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};
