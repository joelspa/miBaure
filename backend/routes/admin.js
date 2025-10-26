// routes/admin.js - Rutas de administración
const express = require('express');
const router = express.Router();
const { validateAdminPassword } = require('../middleware/adminAuth');

/**
 * @openapi
 * /api/admin/validate:
 *   post:
 *     tags: [Admin]
 *     summary: Validar contraseña de administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: "miPasswordSeguro123"
 *     responses:
 *       200:
 *         description: Contraseña correcta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acceso concedido"
 *                 valid:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Contraseña incorrecta
 *       400:
 *         description: Falta contraseña
 */
router.post('/validate', validateAdminPassword, (req, res) => {
    res.json({ message: 'Acceso concedido', valid: true });
});

module.exports = router;
