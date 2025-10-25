const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const { buildRecipeContext, buildWebSearchPrompt, buildLocalPrompt } = require('../utils/promptTemplates');

// Cargar contexto
const contextPath = path.join(__dirname, '../context/baure-context.txt');
let baureContext = '';

try {
    baureContext = fs.readFileSync(contextPath, 'utf8');
    console.log('✓ Contexto de cocina Baure cargado');
} catch (error) {
    console.error('✗ Error al cargar el contexto:', error.message);
    baureContext = 'Contexto no disponible';
}

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const modelWithGrounding = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    tools: [{ googleSearch: {} }]
});

const modelBasic = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Detectar si la pregunta requiere búsqueda web
const needsWebSearch = (question) => {
    const webSearchKeywords = [
        'vegana', 'vegano', 'vegetariana', 'vegetariano',
        'proteína', 'proteinas', 'más proteína', 'añadir proteína',
        'alternativa', 'sustituto', 'reemplazar', 'cambiar por',
        'sin carne', 'sin lácteos', 'sin gluten',
        'fitness', 'saludable', 'light', 'bajo en calorías',
        'nutritivo', 'nutrición', 'vitaminas',
        'moderno', 'contemporáneo', 'fusión',
        'internacional', 'tendencia', 'actual'
    ];
    
    return webSearchKeywords.some(keyword => question.toLowerCase().includes(keyword));
};

exports.chatWithGemma = async (req, res) => {
    const { question, recipeData } = req.body;

    if (!question) {
        return res.status(400).json({ message: 'No se proporcionó una pregunta.' });
    }

    // Validar API key
    if (!config.geminiApiKey) {
        return res.status(500).json({
            message: 'API Key de Google Gemini no configurado en el servidor.'
        });
    }

    const useWebSearch = needsWebSearch(question);
    const selectedModel = useWebSearch ? modelWithGrounding : modelBasic;

    // Construir contexto y prompt
    const recipeContext = buildRecipeContext(recipeData);
    const prompt = useWebSearch 
        ? buildWebSearchPrompt(question, baureContext, recipeContext)
        : buildLocalPrompt(question, baureContext, recipeContext);

    try {
        console.log(useWebSearch ? '🌐 Usando búsqueda web...' : '📚 Usando contexto local...');
        
        // Generar respuesta con Gemini
        const result = await selectedModel.generateContent(prompt);
        const response = await result.response;
        let answer = response.text();

        // Limpiar y formatear la respuesta
        answer = answer.trim();
        
        // Limitar longitud para respuestas completas (máximo 2000 caracteres)
        if (answer.length > 2000) {
            const cutPoint = answer.lastIndexOf('.', 2000);
            answer = cutPoint > 1500 ? answer.substring(0, cutPoint + 1) : answer.substring(0, 2000) + '...';
        }

        res.json({ answer, usedWebSearch: useWebSearch });

    } catch (err) {
        console.error("❌ Error en chatWithGemma:", err.message);

        let errorMessage = 'Error al procesar la solicitud de IA.';
        if (err.message.includes('429')) {
            errorMessage = 'El servicio de IA está sobrecargado. Por favor, intenta de nuevo en unos momentos.';
        } else if (err.message.includes('401') || err.message.includes('403')) {
            errorMessage = 'Token de autenticación inválido. Verifica la configuración del servidor.';
        } else if (err.message.includes('not supported')) {
            errorMessage = 'El modelo de IA no está disponible actualmente. Contacta al administrador.';
        }

        res.status(500).json({ message: errorMessage });
    }
};