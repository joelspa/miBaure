// Este script contiene las recetas extraídas del PDF
// Archivo fuente: ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE_.pdf

require('dotenv').config();

const recipesToSeed = [
    {
        name: "Sopa de bucheres",
        baureName: "Ejaj to Woshor",
        description:
            "Una de las preparaciones típicas, representativas del municipio de Baures. Este pescado, que es sacado de pozas (aguas oscuras), era su fuente de alimentación.",
        ingredients: [
            "Buchere (pescado de agua dulce)",
            "Agua",
            "Sal",
            "Urucú (para dar color)",
            "Plátano (opcional)",
            "Verduras (opcional)"
        ],
        preparation:
            "Se lavan los pescados sin sacar escamas; luego se ponen a hervir en abundante agua con sal durante aproximadamente 40 minutos. Se añade poco urucú para condimentar y dar color. Servir caliente.",
        utensils: ["Olla grande", "Cucharón", "Hornilla o leña"],
        consumption: "Consumido en desayuno o almuerzo por la comunidad.",
        conservation: "Se consume el mismo día; no es plato de conservación prolongada.",
        sourcePerson: "Adil Arredondo (Jasiaquiri)"
    },

    {
        name: "Asado de carne del monte",
        baureName: "-",
        description:
            "Carne de monte asada tradicionalmente por familias comunarias; preparada en fuego de leña y sazonada de manera sencilla.",
        ingredients: ["Carne de monte (venado, sajino u otra)", "Sal", "Ajo (opcional)", "Pimienta (opcional)"],
        preparation:
            "La carne se limpia y se sala; se coloca sobre brasas o asador improvisado hasta obtener el punto deseado. En algunas variantes se marina brevemente con ajo y sal.",
        utensils: ["Parrilla o asador", "Pinzas", "Leñas o brasas"],
        consumption: "Plato principal en celebraciones o reuniones comunitarias.",
        conservation: "Puede conservarse unas horas en frío, pero es preferible consumirla recién asada.",
        sourcePerson: "Relatos orales (comunidad de Baures)"
    },

    {
        name: "Shocorimba",
        baureName: "Shokurimba",
        description:
            "Preparación tradicional a base de yuca y maíz que se consume en diversas ocasiones; tiene importancia cultural en la dieta local.",
        ingredients: ["Yuca", "Maíz", "Agua", "Sal"],
        preparation:
            "La yuca y el maíz se cocinan hasta ablandar; luego se machacan o muelen y se mezclan hasta obtener la consistencia deseada. Se sazona con sal al gusto.",
        utensils: ["Olla", "Mortero o utensilio para moler", "Cuchara"],
        consumption: "Acompañamiento o plato principal en desayunos y comidas familiares.",
        conservation: "Consumir el mismo día o dentro de las pocas horas posteriores a su preparación.",
        sourcePerson: "Tradición local (documentado en el PDF)"
    },

    {
        name: "Jochi",
        baureName: "Jochi",
        description:
            "Preparación hecha con ingredientes locales; en el documento se menciona como una de las comidas tradicionales del área.",
        ingredients: ["Harina de yuca o maíz", "Agua", "Sal"],
        preparation:
            "Se realiza una masa con la harina y el agua, se forma y cocina según la técnica tradicional (a la plancha o hervida), dependiendo de la variante.",
        utensils: ["Plancha u olla", "Cuchillo"],
        consumption: "Consumido en desayunos o como acompañamiento.",
        conservation: "Mejor fresco; no se recomienda guardar por varios días.",
        sourcePerson: "Relatos del material etnográfico"
    },

    {
        name: "Taitetú",
        baureName: "Taitetú",
        description:
            "Plato tradicional cuyo nombre aparece en el compendio; preparado con carne y condimentos locales.",
        ingredients: ["Carne (tipo local)", "Sal", "Especias locales"],
        preparation:
            "La carne se prepara y condimenta de forma sencilla, asada o cocida según la costumbre familiar; se sirve caliente.",
        utensils: ["Olla u hornilla", "Cuchillo", "Pinzas"],
        consumption: "Plato fuerte en reuniones familiares.",
        conservation: "Consumir en el día para mejor sabor.",
        sourcePerson: "Documento: ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE"
    },

    {
        name: "Tropero",
        baureName: "Tropero",
        description:
            "Receta señalada en el PDF; suele ser un guiso o preparación de carne acompañado de tubérculos o plátano.",
        ingredients: ["Carne","Plátano o tubérculos","Sal","Especias (opcional)"],
        preparation:
            "Guisar la carne con los acompañamientos hasta que estén tiernos; sazonar al gusto. Varía según la familia.",
        utensils: ["Olla", "Cuchara de madera"],
        consumption: "Almuerzo o cena familiar.",
        conservation: "Se puede mantener algunas horas refrigerado; recalentar antes de consumir.",
        sourcePerson: "Relatos compilados en el PDF"
    },

    {
        name: "Chicha de yuca",
        baureName: "Chicha",
        description:
            "Bebida tradicional fermentada levemente a base de yuca; consumida en fiestas y rituales.",
        ingredients: ["Yuca", "Agua", "Azúcar (opcional)", "Levadura natural (opcional)"],
        preparation:
            "La yuca se cocina, se muele y se mezcla con agua para luego fermentar según la tradición; el tiempo de fermentación determina el grado alcohólico.",
        utensils: ["Recipiente grande", "Colador"],
        consumption: "Bebida ceremonial y festiva.",
        conservation: "Fermentada puede durar varios días; conservar en lugar fresco.",
        sourcePerson: "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf"
    }
];

// Modo de uso:
// - Si existe la variable de entorno MONGODB_URI se intentará conectar e insertar las recetas.
// - Si no existe, el script hace un dry-run y exporta el arreglo para evitar conexiones accidentales.

if (process.env.MONGODB_URI) {
    // Lógica mínima para insertar en la BD si se proporciona MONGODB_URI
    const mongoose = require('mongoose');
    const Recipe = require('./models/Recipe');

    mongoose
        .connect(process.env.MONGODB_URI)
        .then(async () => {
            console.log('Conectado a MongoDB. Insertando recetas...');
            try {
                await Recipe.deleteMany({});
                await Recipe.insertMany(recipesToSeed);
                console.log(`Insertadas ${recipesToSeed.length} recetas.`);
            } catch (err) {
                console.error('Error al insertar recetas:', err);
            } finally {
                await mongoose.disconnect();
                process.exit(0);
            }
        })
        .catch(err => {
            console.error('Error de conexión a MongoDB:', err);
            process.exit(1);
        });
} else {
    console.log('MONGODB_URI no está definida. Dry-run: no se intentará conectar a la DB.');
    console.log(`Recetas cargadas en memoria: ${recipesToSeed.length}`);
    // exportar para pruebas o uso desde otros scripts
    module.exports = recipesToSeed;
}