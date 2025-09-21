module.exports = (role, status) => {
    return (req, res, next) => {
        const user= req.user;

        if (!user || user.role !== role || user.status !== status){
            return res.status(401).json({
                error: "Usuario no autorizado."
            });
        }
        next();
    }
}