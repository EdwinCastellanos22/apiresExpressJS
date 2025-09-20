const express = require('express');
const sequelize = require("../database/config");
const routes = require("../routes/routes");
const verifyToken = require("../middleware/auth");
require('dotenv').config()

const server = express();
server.use(express.json());

//Rutas publicas sin jwt
server.use("/api", routes);

//Rutas protegidas
server.use("/api/profile", verifyToken, (req, res) => {
  res.json({
    "message": "Bienvenido",
    usuario: req.user
  });
});

//ruta para probar el token si es valido aun.
server.use("/api/status", verifyToken, (req, res) => {
  res.status(200).json({
    "message": "servidor funcionando",
    "token": "valido",
    "fecha": new Date().getTime() 
  })
});

//conectar a bd y up server
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