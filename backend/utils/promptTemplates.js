// Plantillas de prompts para IA

const buildRecipeContext = (recipeData) => {
    if (!recipeData) return '';
    
    return `
RECETA ESPECÍFICA EN CONTEXTO:
Nombre: ${recipeData.name}
Nombre Baure: ${recipeData.baureName || 'N/A'}
Descripción: ${recipeData.description || 'N/A'}

INGREDIENTES:
${recipeData.ingredients ? recipeData.ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n') : 'No especificados'}

PREPARACIÓN:
${recipeData.preparation || 'No especificada'}

UTENSILIOS:
${recipeData.utensils ? recipeData.utensils.join(', ') : 'No especificados'}

CONSUMO:
${recipeData.consumption || 'N/A'}

CONSERVACIÓN:
${recipeData.conservation || 'N/A'}

FUENTE:
${recipeData.sourcePerson || 'N/A'}
`;
};

const buildWebSearchPrompt = (question, baureContext, recipeContext) => `Eres un experto chef especializado en cocina tradicional Baure de Bolivia con conocimiento en técnicas culinarias modernas.

${recipeContext}

CONTEXTO BAURE:
${baureContext.substring(0, 2000)}

PREGUNTA: ${question}

FORMATO DE RESPUESTA OBLIGATORIO:
Responde de forma ESTRUCTURADA, CONCISA y DIRECTA usando este formato:

**[Título de la respuesta]**

[1-2 oraciones de introducción directa al punto]

**Opciones/Ingredientes/Pasos:** (según corresponda)
• Opción 1: [nombre] - [descripción breve] ([cantidad/medida si aplica])
• Opción 2: [nombre] - [descripción breve] ([cantidad/medida si aplica])
• Opción 3: [nombre] - [descripción breve] ([cantidad/medida si aplica])

**Implementación:**
1. [Paso concreto y específico]
2. [Paso concreto y específico]

**Tip:** [Consejo práctico en 1 oración]

REGLAS ESTRICTAS:
✓ Máximo 600 caracteres total
✓ 3-5 opciones/pasos concretos
✓ Incluir cantidades específicas (ej: "1 taza", "200g")
✓ Usar viñetas (•) y negritas (**)
✓ Directo al grano, SIN relleno
✓ Combinar tradición Baure + info web moderna
✓ TODO en español

RESPUESTA:`;

const buildLocalPrompt = (question, baureContext, recipeContext) => `Eres un experto en cocina tradicional Baure de Bolivia.

${recipeContext}

CONTEXTO:
${baureContext.substring(0, 3000)}

PREGUNTA: ${question}

FORMATO DE RESPUESTA OBLIGATORIO:
Responde de forma ESTRUCTURADA y CONCISA:

**[Título descriptivo]**

[Respuesta directa en 1-2 oraciones]

**Detalles clave:**
• Punto 1: [información específica]
• Punto 2: [información específica]
• Punto 3: [información específica]

**Nota:** [Información adicional relevante en 1 oración]

REGLAS ESTRICTAS:
✓ Máximo 500 caracteres
✓ Usar viñetas (•) y negritas (**)
✓ PRIORIZAR info de la receta específica arriba
✓ Si no tienes la info exacta, di "No especificado en la receta" pero ofrece contexto general Baure
✓ Directo y práctico
✓ TODO en español

RESPUESTA:`;

module.exports = {
    buildRecipeContext,
    buildWebSearchPrompt,
    buildLocalPrompt
};
