const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const ctrl = require('../controllers/recipeController');

/**
 * @openapi
 * components:
 *   schemas:
 *     ImageObj:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           example: "http://localhost:3000/uploads/1729893180-abc.png"
 *         caption:
 *           type: string
 *           example: ""
 *
 *     Recipe:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "671b6be6f0b8d8d2b3c12345"
 *         name:
 *           type: string
 *           example: "Masaco de yuca"
 *         baureName:
 *           type: string
 *           example: "Tunu Masako"
 *         description:
 *           type: string
 *           example: "Plato tradicional con yuca y queso."
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           example: ["yuca","queso","sal"]
 *         preparation:
 *           type: string
 *           example: "Rallar yuca, mezclar con queso, dorar..."
 *         utensils:
 *           type: array
 *           items:
 *             type: string
 *           example: ["rallador","sartén"]
 *         consumption:
 *           type: string
 *           example: "Consumir caliente"
 *         conservation:
 *           type: string
 *           example: "Refrigerar hasta 24h"
 *         sourcePerson:
 *           type: string
 *           example: "Relato de: Adil Arredondo"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Tradicional","Yuca"]
 *         imageUrl:
 *           type: string
 *           nullable: true
 *           example: "http://localhost:3000/uploads/1729893180-abc.png"
 *         images:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/ImageObj"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "El campo \"name\" es requerido"
 */

/**
 * @openapi
 * /api/recipes:
 *   post:
 *     tags: [Recetas]
 *     summary: Crear receta completa con imagen principal
 *     description: |
 *       Enviar **multipart/form-data**. Los campos tipo array aceptan:
 *       - JSON string: `["yuca","queso"]`
 *       - O keys repetidas: `ingredients=yuca` y `ingredients=queso`
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Masaco de yuca"
 *               baureName:
 *                 type: string
 *                 example: "Tunu Masako"
 *               description:
 *                 type: string
 *                 example: "Plato tradicional con yuca y queso."
 *               ingredients:
 *                 oneOf:
 *                   - type: string
 *                     example: '["yuca","queso","sal"]'
 *                   - type: array
 *                     items:
 *                       type: string
 *               preparation:
 *                 type: string
 *                 example: "Rallar yuca, mezclar con queso, dorar..."
 *               utensils:
 *                 oneOf:
 *                   - type: string
 *                     example: '["rallador","sartén"]'
 *                   - type: array
 *                     items:
 *                       type: string
 *               consumption:
 *                 type: string
 *                 example: "Consumir caliente"
 *               conservation:
 *                 type: string
 *                 example: "Refrigerar hasta 24h"
 *               sourcePerson:
 *                 type: string
 *                 example: "Relato de: Adil Arredondo"
 *               tags:
 *                 oneOf:
 *                   - type: string
 *                     example: '["Tradicional","Yuca"]'
 *                   - type: array
 *                     items:
 *                       type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Imagen principal (opcional)"
 *           encoding:
 *             ingredients: { style: form, explode: true }
 *             utensils: { style: form, explode: true }
 *             tags: { style: form, explode: true }
 *     responses:
 *       201:
 *         description: Receta creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post('/', upload.single('image'), ctrl.createRecipe);

/**
 * @openapi
 * /api/recipes/{id}/image:
 *   patch:
 *     tags: [Recetas]
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
 *         description: Receta actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       400:
 *         description: Falta archivo o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Receta no encontrada
 */
router.patch('/:id/image', upload.single('image'), ctrl.updateMainImage);

/**
 * @openapi
 * /api/recipes:
 *   get:
 *     tags: [Recetas]
 *     summary: Listar recetas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Recipe"
 */
router.get('/', ctrl.getAllRecipes);

/**
 * @openapi
 * /api/recipes/{id}:
 *   get:
 *     tags: [Recetas]
 *     summary: Obtener receta por ID
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
 *               $ref: "#/components/schemas/Recipe"
 *       404:
 *         description: Receta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get('/:id', ctrl.getRecipeById);

/**
 * @openapi
 * /api/recipes/{id}:
 *   put:
 *     tags: [Recetas]
 *     summary: Actualizar receta completa
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
 *               name:
 *                 type: string
 *               baureName:
 *                 type: string
 *               description:
 *                 type: string
 *               preparation:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               utensils:
 *                 type: string
 *               tags:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Receta actualizada exitosamente
 *       404:
 *         description: Receta no encontrada
 */
router.put('/:id', upload.single('image'), ctrl.updateRecipe);

module.exports = router;
