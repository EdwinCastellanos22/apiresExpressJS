const Cart = require("../models/cart-model");
const Product = require("../models/products-model");
const { client, paypal } = require("../paypal/config-paypal");
//get cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findAll({
            where: { userId, status: "active" }, include: [{ model: Product }]
        });

        const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

        res.status(200).json({
            cart: cart, total: total.toFixed(2)
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
};

//agg Cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ error: "Producto no encontrado" })
        price = product.price

        //view exists
        let cartItem = await Cart.findOne({ where: { userId, productId, status: "active" } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }
        else {
            cartItem = await Cart.create({
                userId,
                productId,
                quantity,
                price
            });
        }

        res.status(201).json({
            message: "Producto agregado al carrito",
            item: cartItem
        });

    }
    catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
};

//update cart
exports.updateCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findOne({ where: { id, userId, status: "active" } });

        if (!cartItem) return res.status(404).json({ error: "Producto en carrito no encontrado" });

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: "cantidad actualizada", item: cartItem });

    }
    catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
};

//delete cart
exports.deleteCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.body;

        const cartItem = await Cart.findOne({ where: { id, userId } });
        if (!cartItem) return res.status(404).json({ error: "Producto en carrito no encontrado" });

        await cartItem.destroy();
        res.status(200).json({ message: "producto eliminado del carrito", item: cartItem });

    }
    catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
}

//create order paypal
exports.createOrder = async (req, res) => {
    const { cart, total } = req.body;

    const requestOrder = new paypal.orders.OrdersCreateRequest();
    requestOrder.prefer("return=representation");
    requestOrder.requestBody({
        intent: "CAPTURE",
        application_context: {
            brand_name: "Mi Tienda",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: "http://127.0.0.1:3000/api/cart/capture-order",
            cancel_url: "http://127.0.0.1:3000/api/cart/cancel"
        },
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: Number(total).toFixed(2),
                    breakdown: {
                        item_total: { currency_code: "USD", value: Number(total).toFixed(2) }
                    }
                },
                items: cart.map(item => ({
                    name: item.Product['name'],
                    unit_amount: { currency_code: "USD", value: item.price.toFixed(2) },
                    quantity: item.quantity.toString()
                }))
            }
        ]
    })

    try {
        const order = await client().execute(requestOrder);
        res.status(201).json({
            id: order.result.id,
            links: order.result.links
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }

}

//capture order
exports.captureOrder = async (req, res) => {

    const { token } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});

    try {
        const capture = await client().execute(request);
        res.status(200).json(capture.result);
    }
    catch (e){
        res.status(500).json({ error: e.message })
    }
}


