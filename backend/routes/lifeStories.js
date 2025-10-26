// routes/lifeStories.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const lifeStoryController = require('../controllers/lifeStoryController');

/**
 * @openapi
 * components:
 *   schemas:
 *     ImageObj:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           example: "http://localhost:5000/uploads/1729893180-abc.png"
 *         caption:
 *           type: string
 *           example: ""
 *
 *     LifeStory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "671b6be6f0b8d8d2b3c12345"
 *         title:
 *           type: string
 *           example: "La pesca en el Iténez"
 *         personName:
 *           type: string
 *           example: "Adil Arredondo"
 *         age:
 *           type: number
 *           example: 54
 *         community:
 *           type: string
 *           example: "Baures"
 *         story:
 *           type: string
 *           example: "Relato sobre la temporada de pesca..."
 *         relatedThemes:
 *           type: array
 *           items: { type: string }
 *           example: ["Río","Tradición","Pesca"]
 *         photoUrl:
 *           type: string
 *           nullable: true
 *           example: "http://localhost:5000/uploads/1729893180-abc.png"
 *         images:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/ImageObj"
 *         recordedDate:
 *           type: string
 *           format: date-time
 *           example: "2024-09-10T00:00:00.000Z"
 *         recordedBy:
 *           type: string
 *           example: "Equipo de campo"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "El campo \"title\" es requerido"
 */

/**
 * @openapi
 * /api/life-stories:
 *   post:
 *     tags: [Recuentos de Vida]
 *     summary: Crear recuento de vida con imagen principal
 *     description: |
 *       Enviar **multipart/form-data**. Los campos tipo array aceptan:
 *       - JSON string: `["Río","Tradición"]`
 *       - Ó keys repetidas: `relatedThemes=Río` y `relatedThemes=Tradición`
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - personName
 *               - story
 *             properties:
 *               title:
 *                 type: string
 *               personName:
 *                 type: string
 *               age:
 *                 type: number
 *               community:
 *                 type: string
 *               story:
 *                 type: string
 *               relatedThemes:
 *                 oneOf:
 *                   - type: string
 *                     example: '["Río","Tradición","Pesca"]'
 *                   - type: array
 *                     items: { type: string }
 *               recordedDate:
 *                 type: string
 *                 format: date-time
 *               recordedBy:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Imagen principal (opcional)"
 *           encoding:
 *             relatedThemes: { style: form, explode: true }
 *     responses:
 *       201:
 *         description: Recuento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LifeStory"
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post('/', upload.single('image'), lifeStoryController.createLifeStory);

/**
 * @openapi
 * /api/life-stories/{id}/image:
 *   patch:
 *     tags: [Recuentos de Vida]
 *     summary: Agregar o actualizar imagen principal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Recuento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LifeStory"
 *       400:
 *         description: Falta archivo o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Recuento no encontrado
 */
router.patch('/:id/image', upload.single('image'), lifeStoryController.updateMainImage);

/**
 * @openapi
 * /api/life-stories/{id}/images:
 *   patch:
 *     tags: [Recuentos de Vida]
 *     summary: Agregar múltiples imágenes adicionales
 *     description: Sube una o varias imágenes con el campo **images**
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Recuento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LifeStory"
 *       400:
 *         description: Faltan archivos o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Recuento no encontrado
 */
router.patch('/:id/images', upload.array('images', 10), lifeStoryController.addExtraImages);

/**
 * @openapi
 * /api/life-stories:
 *   get:
 *     tags: [Recuentos de Vida]
 *     summary: Listar recuentos de vida
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/LifeStory"
 */
router.get('/', lifeStoryController.getAllLifeStories);

/**
 * @openapi
 * /api/life-stories/{id}:
 *   get:
 *     tags: [Recuentos de Vida]
 *     summary: Obtener recuento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LifeStory"
 *       404:
 *         description: Recuento no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get('/:id', lifeStoryController.getLifeStoryById);

/**
 * @openapi
 * /api/life-stories/{id}:
 *   put:
 *     tags: [Life Stories]
 *     summary: Actualizar recuento de vida completo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               personName:
 *                 type: string
 *               age:
 *                 type: number
 *               community:
 *                 type: string
 *               story:
 *                 type: string
 *               relatedThemes:
 *                 type: string
 *               recordedDate:
 *                 type: string
 *                 format: date
 *               recordedBy:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Recuento actualizado exitosamente
 *       404:
 *         description: Recuento no encontrado
 */
router.put('/:id', upload.single('image'), lifeStoryController.updateLifeStory);

/**
 * @openapi
 * /api/life-stories/{id}:
 *   delete:
 *     summary: Eliminar un recuento de vida
 *     tags: [Life Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recuento eliminado exitosamente
 *       404:
 *         description: Recuento no encontrado
 */
router.delete('/:id', lifeStoryController.deleteLifeStory);

module.exports = router;
