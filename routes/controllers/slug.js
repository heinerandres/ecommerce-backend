import Slug from'../../models/Slug.js';
import Producto from '../../models/Producto.js';
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export const crearSlug = async (req, res) => {
    try{
        const slug = new Slug({
            ...req.body,
            img1: req.files?.img1?.[0]
                ? `/uploads/${req.files.img1[0].filename}`
                : null,
            img2: req.files?.img2?.[0]
                ? `/uploads/${req.files.img2[0].filename}`
                : null,
            img3: req.files?.img3?.[0]
                ? `/uploads/${req.files.img3[0].filename}`
                : null,
            img4: req.files?.img4?.[0]
                ? `/uploads/${req.files.img4[0].filename}`
                : null
        }); 
        await slug.save();

        res.status(201).json({
            ok: true,
            slug
        });
    }
    catch(error){
        console.log("no se pudo guardar el slug");
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const obtenerSlug = async (req, res) => {
    try{
        const slug = await Slug.find({});
        const slugConCantidad = await Promise.all(
            slug.map(async (slug) => {
                const cantidadProductos = await Producto.countDocuments({
                    slug: slug._id
                });
            return {
                ...slug.toObject(),
                cantidadProductos
            };
            })
        );
        res.status(201).json({
            ok: true,
            slugs: slugConCantidad
        });
    }
    catch(error){
        console.log("no se pudieron obtener las slugs");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarSlug = async (req, res) => {
    const id = req.body;
    try {
        const slug = await Slug.findById(req.body._id);
        if (!slug) {
            return res.status(404).json({
                ok: false,
                msg: "Slug no encontrado"
            });
        }
        // Actualizar campos de texto
        slug.slug = req.body.slug;
        slug.categoria = req.body.categoria;
        //elimina las imagenes anteriores
        for(let i=1; i<=4; i++){
            const nombreCampo = `img${i}`
            //los archivos enviados con formData llegan en req.files[]
            if (req.files?.[nombreCampo]?.length) {
                const rutaAnterior = path.join(
                    process.cwd(),
                    "public",
                    slug[nombreCampo]
                );
                if(fs.existsSync(rutaAnterior)){
                    await fsPromises.unlink(rutaAnterior);
                }
                // guardar nombre de la nueva imagen
                slug[nombreCampo] = `/uploads/${req.files[nombreCampo][0].filename}`;
            }
        }
        await slug.save();
        res.status(200).json({
            ok: true,
            slug: slug
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const eliminarSlug = async (req, res) => {
    try {
        const _id  = req.body;

        const slug = await Slug.findById(_id);
        
        if (!slug) {
            return res.status(404).json({
                ok: false,
                msg: 'Talla no encontrado'
            });
        }

        for(let i = 1; i <= 4; i++){

            const nombreCampo = `img${i}`;

            if(slug[nombreCampo]){

                const rutaImagen = path.join(
                    process.cwd(),
                    "public",
                    slug[nombreCampo]
                );

                if(fs.existsSync(rutaImagen)){
                    await fsPromises.unlink(rutaImagen);
                }
            }
        }

        await Slug.findByIdAndDelete(_id);

        res.status(200).json({
            ok: true,
            msg: 'Slug eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

export const slugBySlug = async (req, res) => {
    try{
        const slug = await Slug.findOne(req.body);
        res.status(201).json({
            ok: true,
            slug
        });
    }
    catch(error){
        console.log("no se pudo obtener el slug");
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor. Por favor hable con el administrador'
        });
    }
}