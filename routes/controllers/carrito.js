
import Carrito from '../../models/Carrito.js';
import Producto from '../../models/Producto.js';
import ObjectId from 'mongodb';

export const obtenerCarrito = async (req, res) => {
    try {
        console.log("obtenerCarrito");
        const carrito = await Carrito.findOne({usuario_id: req.body.usuario_id});
        if( carrito == null){
            res.status(201).json({
                ok: true,
                carrito,
                productos: [],
            });
        }
        else {
            let productos = []
            if(carrito.productos.length > 0 ){
                const productos_ids = carrito.productos;
                const idProductosCarrito = productos_ids.map(item =>  item._id );
                productos = await Producto.find({ _id: { $in: idProductosCarrito} });
            }
            
            res.status(201).json({
                ok: true,
                carrito,
                productos
            });
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}
/* export const obtenerCarrito = async (req, res) => {
    try {
        console.log("obtenerCarrito");
        const carrito = await Carrito.findOne({usuario_id: req.body.usuario_id});
            res.status(201).json({
                ok: true,
                carrito,
            });
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
} */

export const crearCarrito = async (req, res) => {
    try {
        let productos = [];
        const carrito = new Carrito( req.body );
        await carrito.save();
        if(carrito.productos.length > 0){
            const productos_ids = carrito.productos;
            const idProductosCarrito = productos_ids.map(item =>  item.id );
            const productos = await Producto.find({ _id: { $in: idProductosCarrito} });
        }

        res.status(201).json({
            ok: true,
            carrito,
            productos
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const editarCarrito = async (req, res) => {
    try{ 
        console.log("editarCarrito");
        console.log(req.body);
        const {_id, productos} = req.body;
        console.log(_id);
        console.log(productos);
        const carritoActualizado = await Carrito.findByIdAndUpdate(
            _id,
            {
                productos: productos
            },
            {
                new: true
            }
        );
        res.json({
            ok: true,
            carrito: carritoActualizado
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

/* const pagarCarrito = async (req, res) => {
    const carrito_id = req.body.carrito_id;
    const estaPago = req.body.estaPago;
    await Carrito.updateOne(
        {_id: new ObjectId (carrito_id)},
        {$set: { estaPago: estaPago}}
    ).then(result => {
        if(!result){
            console.log("No se pudo actualizar");
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        }else {
            console.log("se actualizó estaPago");
            res.status(201).json({
                ok: true
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    });
} */

export const respuestaActualizar = async (req, res) => {
    sobreEscribirProductosCarrito(req, res).then( async () => {
        const carrito = await Carrito.findOne({_id: new ObjectId(req.body.carrito_id)});
        const productos_ids = carrito.productos;
        const idProductosCarrito = productos_ids.map(item =>  item.id );
        const productos = await Productos.find({ _id: { $in: idProductosCarrito} });
        res.status(201).json({
            ok: true,
            msg: 'Actualización correcta',
            carrito,
            productos
        });
    });
}

export const sobreEscribirProductosCarrito = async (req, res) =>{
    const carrito_id = req.body.carrito_id;
    const actualizar = req.body.actualizar;
    const insertar = req.body.insertar;
    const eliminar = req.body.eliminar;
    if(actualizar.length !== 0){
        //actualizar
        await actualizarCarrito(carrito_id, actualizar).then(result =>{
            if(!result){
                console.log("no se actualizaron registros");
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el administrador'
                });
            }else{
                console.log("se actualizaron los registros");
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        });
    } if (insertar.length !== 0){
        //insertar
        await insertarProductosCarrito(carrito_id, insertar).then(result =>{
            if(!result){
                console.log("no se insertaron registros");
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el administrador'
                });
            }else{
                console.log("se insertaron los registros");
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        });
    } if (eliminar.length !== 0){
        //eliminar
        await eliminarProductosCarrito(carrito_id, eliminar).then(result =>{
            if(!result){
                console.log("no se eliminaron registros");
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el administrador'
                });
            }else{
                console.log("se eliminaron los registros");
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        });
    }
}

export const insertarProductosCarrito = async(carrito_id, insertar)=>{
    const result = await Carrito.updateOne(
        { _id: new ObjectId(carrito_id)},
        { $push: {productos: {$each: insertar }}},
        { writeConcern: { w: 'majority'}}
    );
    return result;
};

export const eliminarProductosCarrito = async(carrito_id, eliminar)=> {
    const result = await Carrito.updateOne(
        { _id: new ObjectId(carrito_id)},
        {$pull: {productos: {id: {$in: eliminar}}}},
        { writeConcern: { w: 'majority'}}
    );
    return result;
};


export const actualizarCarrito = async (carrito_id, actualizar) => {
    const filtros = actualizar.map((item, index) => ({
        [`element${index}.id`]: new ObjectId(item.id)
    }));

    const set = actualizar.reduce((acc, item, index) => {
        acc[`productos.$[element${index}].cantidad`] = item.cantidad;
        return acc;
    }, {});

    const result = await Carrito.updateOne(
        {_id: new ObjectId (carrito_id)},
        {$set: set},
        {arrayFilters: filtros},
        { writeConcern: { w: 'majority'}}
    );
    return result;
}