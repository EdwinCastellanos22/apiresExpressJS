const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct} = require("../controllers/products-controllers");
const auth = require("../middleware/auth")

router.post("/create", auth, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct)

module.exports = router;