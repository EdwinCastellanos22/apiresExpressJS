const express = require('express');
const sequelize = require("../database/config-db");
const routes = require("../routes/routes");
const productRoutes = require("../routes/productRoutes");
const cartRoutes= require("../routes/cart-route");
const uploadRoutes = require("../routes/uploadFile");
const verifyToken = require("../middleware/auth");
require('dotenv').config()

const { swaggerUi, specs } = require("../docs/config");


const server = express();
server.use(express.urlencoded({ extended: true }))
server.use(express.json());

//------- Rutas publicas sin jwt
server.use("/api", routes);

//swaggerUI
server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

//Rutas protegidas
server.use("/api/profile", verifyToken, (req, res) => {
  res.json({
    "message": "Bienvenido",
    usuario: req.user
  });
});
//-------------------------------

// --- Upload routes ----
server.use("/upload", uploadRoutes);
//---------------------------

//---- Rutas Productos ------
server.use("/api/products", productRoutes);

//ruta para probar el token si es valido aun.
server.use("/api/status", verifyToken, (req, res) => {
  res.status(200).json({
    "message": "servidor funcionando",
    "token": "valido",
    "fecha": new Date().getTime() 
  })
});
//-------------------------------------

//------ Rutas Carrito ------------
server.use("/api/cart", cartRoutes);
// -------------------------------

//----------------- conectar a bd y up server
sequelize.sync()
.then(() =>{
  console.log("BD READY!!")
  server.listen(process.env.PORT, () => {
    console.log(
  `%cServer listen on port: ${process.env.PORT} !`,
  'color: #068010ff; font-family: sans-serif; text-decoration: underline;'
);
  })
})
.catch (err => console.log(
  '%cError en conexion a DB!' ,
  'color: #ae4416ff; font-family: sans-serif; text-decoration: underline;', err
));
//----------------------------------------