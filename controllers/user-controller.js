const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { format } = require('timeago.js');
require('dotenv').config();


exports.register = async (req, res) => {
    try {

        const { name, email, password, password2 } = req.body;
        const hashedPasswd = await bcrypt.hash(password, 10);

        if (password == password2) {
            const newUser = await User.create({
                name, email, password : hashedPasswd
            });
            res.status(201).json({
                "message": "Ususario creado exitosamente!", usuario: newUser
            });
        }
        else {
            res.status(400).json({
                "message": "Las contraseñas no coinciden!"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
    finally {
        console.table({
            'Timestamp': format(new Date().getTime()),
            'Solicitud': 'Create New User'
        });
    }
}

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user= await User.findOne({where: {email}});

        if(!user){
            return res.status(404).json({
                "error": "Usuario no encontrado"
            });
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass){
            return res.status(401).json({
                "error": "Contraseña Invalida"
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({
            "message": "Login Exitoso", token
        });

    }
    catch (e) {
        res.status(500).json({
            "error": e.message
        })
    }
    finally {
        console.table({
            'Timestamp': format(new Date().getTime()),
            'Solicitud': 'Login'
        });
    }

}