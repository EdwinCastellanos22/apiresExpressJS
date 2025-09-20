const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    // Se espera algo como: "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: "Token requerido!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ error: "Token inválido o expirado!" });
    }
}

module.exports = verifyToken;
