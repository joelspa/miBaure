// Middleware simple para validar contraseña de admin
const config = require('../config/config');

// Middleware para validar que la contraseña sea correcta
const validateAdminPassword = (req, res, next) => {
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ message: 'Se requiere contraseña' });
    }
    
    if (password !== config.adminPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    
    next();
};

module.exports = { validateAdminPassword };
