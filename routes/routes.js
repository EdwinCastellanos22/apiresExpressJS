const express = require('express');
const router = express.Router();
const {register, login, getAllUsers} = require("../controllers/user-controller");
const verifyToken = require("../middleware/auth");
const rolStatus = require("../middleware/rol-status");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API para autenticar y registrar usuarios
 */


router.post("/register", register);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - password2
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               password2:
 *                  type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos incorrectos
 *       500:
 *         description: Error en el servidor
 */

router.post("/login", login);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Obtener token JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - password2
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud correcta
 *       400:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */


router.get("/users", verifyToken, rolStatus('admin', 'active'), getAllUsers);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios (solo administradores)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Solicitud correcta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       500:
 *         description: Error en el servidor
 */



module.exports = router;