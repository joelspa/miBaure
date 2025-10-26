const config = require('../config/config');

// Validar contraseña de administrador
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

// Validar token de autenticación en el header Authorization
const REQUIRED_TOKEN = process.env.ADMIN_TOKEN || 'baure-admin-token';

const requireToken = (req, res, next) => {
    const auth = req.headers.authorization || req.headers.Authorization;

    if (!auth) {
        return res.status(401).json({
            message: 'Falta header Authorization. Usa: Authorization: Bearer <token>'
        });
    }

    const [scheme, token] = String(auth).split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            message: 'Formato inválido. Usa: Authorization: Bearer <token>'
        });
    }

    if (token !== REQUIRED_TOKEN) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    // Token válido -> continuar
    next();
};

module.exports = { validateAdminPassword, requireToken };
