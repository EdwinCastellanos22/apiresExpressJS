const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductInfo} = require("../controllers/products-controllers");
const auth = require("../middleware/auth")
const roleStatus = require("../middleware/rol-status");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *               - status
 *               - imageUrl
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camisa
 *               description:
 *                 type: string
 *                 example: Camisa de algodón
 *               price:
 *                 type: number
 *                 example: 199.99
 *               category:
 *                  type: string
 *                  example: Vestuario
 *               stock:
 *                  type: number
 *                  example: 23
 *               status:
 *                  type: string
 *                  example: active
 *               imageUrl:
 *                  type: string
 *                  example: http://images/product.png
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.post("/", auth, roleStatus("admin", "active"), createProduct);


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", auth, roleStatus("admin", "active"), updateProduct);
router.delete("/:id", auth, roleStatus("admin", "active"), deleteProduct)
router.post("/info", auth, roleStatus("admin", "active"), getProductInfo);


module.exports = router;