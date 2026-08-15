import Pedido from '../../models/Pedido.js';
import stripe from '../../stripe/stripe.routes.js'

export const crearCheckout = async (req, res) => {
  try {
    const { pedidoId } = req.body;

    // 1. Buscar el pedido
    const pedido = await Pedido.findById(pedidoId)
    .populate("productos.id")
    if (!pedido) {
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    }
    pedido.productos.forEach((producto) => {
        console.log(producto.id.nombre);
    });

    const line_items = pedido.productos.map((producto) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: producto.id.nombre,
            },
            unit_amount: producto.precioUnitario * 100,
        },
        quantity: producto.cantidad,
    }));

    console.log(JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items,
        metadata: { pedido_id: pedido._id.toString(), },
        success_url: "http://localhost:3000/pedidos?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/pedidos",
    });

    console.log("5. Sesión creada:", session.id);


    return res.status(200).json({
        url: session.url,
    });
    
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear el pago",
    });
  }
};