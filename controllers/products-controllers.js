const Product = require("../models/products-model");

//create product
exports.createProduct = async (req,res) => {
    try{
        const user = req.user;
        if (user.role != 'admin'){
            return res.status(401).json({
                error: "Usuario no autorizado!"
            })
        }
        const { name, description, price} = req.body;
        const newProduct = await Product.create({ name, description, price});
        res.status(201).json({
            "message": "producto creado con exito",
            product: newProduct
        })

    }
    catch (e){
        res.status(500).json({
            error: e.message
        });
    }
};

//list of products
exports.getProducts = async (req, res) => {
    try{
        const products= await Product.findAll();
        res.status(200).json({
            products
        });
    }
    catch (e){
        res.status(500).json({
            error: e.message
        });
    }
};


//get product by ID
exports.getProductById = async (req, res) => {
    try{
        const product= await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Producto no encontrado"})
        res.status(200).json({product})
    }
    catch (e){
        res.status(500).json({
            error: e.message
        })
    }
};

//update product
exports.updateProduct = async(req, res) => {
    try{
        const user = req.user;
        if (user.role != 'admin'){
            return res.status(401).json({
                error: "Usuario no autorizado!"
            })
        }
        const {id} = req.params;
        const { name, description, price, stock, category, imageUrl, status } = req.body;

        const product= await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Producto no encontrado"})

        await product.update({ name, description, price, stock, category, imageUrl, status});

        res.status(200).json({ 
            message: "Producto actualizado", product
        })
    }
    catch (e){
        res.status(500).json({
            error: e.message
        })
    }
}

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin'){
        return res.status(401).json({
            error: "Usuario no autorizado!"
        })
    }
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};