const User = require("../models/users-model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { format } = require('timeago.js');
require('dotenv').config();

exports.register = async (req, res) => {
    try {

        const { username, email, password, password2 } = req.body;
        const hashedPasswd = await bcrypt.hash(password, 10);

        if (password == password2) {
            const newUser = await User.create({
                username, email, password : hashedPasswd
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
            'Solicitud': 'Create New User',
            "Status": res.statusCode,
            "User": req.body.email,
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

        const token = jwt.sign({ id: user.id, email: user.email, username: user.username, role: user.role, status: user.status}, process.env.JWT_SECRET, { expiresIn: '24h'});
        res.status(200).json({
            token, user
        });

    }
    catch (e) {
        res.status(500).json({
            "error": e.message
        })
    }
    finally {
        console.table({
            'Timestamp': new Date().toISOString(),
            'Solicitud': 'Login',
            "Status": res.statusCode,
            "User": req.body.email,
        });
    }

}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        users.forEach(user => {
            user.password = "aG9sYSB0cm9sbyEKaG9sYSB0cm9sbyEKaG9sYSB0cm9sbyEKaG9sYSB0cm9sbyEK123"; 
        });
        res.status(200).json(users);
    }
    catch (e) {
        res.status(500).json({
            "error": e.message
        });
    }
    finally {
        console.table({
            'Timestamp': new Date().toISOString(),
            'Solicitud': 'Get All Users',
            "Status": res.statusCode,
            "User": req.body.email,
        });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                "message": "Usuario no encontrado"
            });
        }
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json({
            "error": e.message
        });
    }
    finally {
        console.table({
            'Timestamp': new Date().toISOString(),
            'Solicitud': 'Get User By Id',
            "Status": res.statusCode,
            "User": req.body.email,
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role, status } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                "message": "Usuario no encontrado"
            });
        }

        const hashedPasswd = await bcrypt.hash(password, 10);

        await user.update({
            username, email, password: hashedPasswd, role, status
        });

        res.status(200).json({
            "message": "Usuario actualizado exitosamente!", user
        });
    }
    catch (e) {
        res.status(500).json({
            "error": e.message
        });
    }
    finally {
        console.table({
            'Timestamp': new Date().toISOString(),
            'Solicitud': 'Update User By Id',
            "Status": res.statusCode,
            "User": req.body.email,
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                "message": "Usuario no encontrado"
            });
        }
        await user.destroy();
        res.status(200).json({
            "message": "Usuario eliminado exitosamente!"
        });
    }
    catch (e) {
        res.status(500).json({
            "error": e.message
        });
    }
    finally {
        console.table({
            'Timestamp': new Date().toISOString(),
            'Solicitud': 'Delete User By Id',
            "Status": res.statusCode,
            "User": req.body.email,
        });
    }
}