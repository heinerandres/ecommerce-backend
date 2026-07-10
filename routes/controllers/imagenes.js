
import Imagenes from '../../models/Imagenes.js';
import Producto_variantes from '../../models/Producto_variantes.js';


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

export const obtenerImagenesByVariante = async (req, res) => {
    try {
        const producto_variante = req.body.variante;
        const imagenes = await Imagenes.find({producto_variante: producto_variante});
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

export const editarImagenesVariante = async (req, res) => {
    try {
        const { _id } = req.body;
        const variante = await Producto_variantes.findById(_id);
        if (!variante) {
            return res.status(404).json({
                ok: false,
                msg: 'Variante no encontrado'
            });
        }
        // Obtener imágenes actuales
        const imagenesAnteriores = await Imagenes.find({
            producto_variante: variante._id
        });
        console.log(imagenesAnteriores);
        // Borrar archivos físicos
        for (const imagen of imagenesAnteriores) {
            const ruta = path.join(
                process.cwd(),
                'public/uploads',
                imagen.url
            );
            console.log(ruta);
            console.log(fs.existsSync(ruta));
            if (fs.existsSync(ruta)) {
                await fsPromises.unlink(ruta);
            }
        }
        // Borrar registros de MongoDB
        await Imagenes.deleteMany({
            producto_variante: variante._id
        });
        // Insertar nuevas imágenes
        
        if (req.files) {
            await Imagenes.insertMany(
                Object.values(req.files)
                    .flat()
                    .map(file => ({
                        producto_variante: variante._id,
                        url: file.filename
                    }))
            );
        }
        res.status(200).json({
            ok: true,
            variante
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};
