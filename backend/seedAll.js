// seedAll.js - Script para poblar todas las colecciones
require('dotenv').config();
const mongoose = require('mongoose');

const Recipe = require('./models/Recipe');
const LifeStory = require('./models/LifeStory');
const CulturalData = require('./models/CulturalData');

// Recetas (Datos validados y enriquecidos con el PDF)
const recipesToSeed = [
    {
        name: "Sopa de bucheres",
        baureName: "Ejaj to Woshor",
        description:
            "Una de las preparaciones típicas y representativas del municipio de Baures. Este pescado, que es sacado de pozas (aguas oscuras), era su fuente de alimentación desde el comienzo de la historia del pueblo Baure.",
        ingredients: [
            "Buchere (pescado de agua dulce)",
            "Agua",
            "Sal",
            "Urucú (para condimentar y dar color)",
            "Plátano (opcional)",
            "Verduras (opcional)"
        ],
        preparation:
            "La preparación tradicional es muy fácil: primero se lavan los pescados sin sacar escamas. Luego se ponen a hervir en abundante agua con sal durante aproximadamente 40 minutos. Se añade un poco de urucú y está listo para degustar. Hoy en día se le agregan plátano y algunas verduras.",
        utensils: ["Olla", "Cucharón", "Hornillas (trempe)", "Leñas"],
        consumption: "Consumido en desayuno, cena o almuerzo; es de consumo habitual debido a su fácil acceso.",
        conservation: "No se conserva; es elaborada y consumida el mismo día.",
        sourcePerson: "Adil Arredondo (Jasiaquiri)",
        tags: ["Río", "Tradicional", "Pescado"],
        imageUrl: "/images/recipes/sopa-bucheres.png"
    },
    {
        name: "Asado de carne del monte (Jochi, Taitetú o Tropero)",
        baureName: "Tropero o Jochi",
        description:
            "Carne de monte asada tradicionalmente (tropero, jochi, taitetú) por familias comunarias; se pueden usar carnes como venado, sajino u otra, siendo el tropero un tipo de cerdo favorito de los lugareños.",
        ingredients: [
            "Carne del monte (jochi, taitetú o tropero)",
            "Sal",
            "Cebolla (opcional para algunas variantes)"
        ],
        preparation:
            "Se realizan dos tipos de asados: 1) Al horno de barro: la carne se coloca en recipientes metálicos, se condimenta y se lleva al horno previamente calentado. 2) Asado a las brasas: se coloca la carne sobre una base de tacuaras verdes, a una distancia de 80 cm del fuego. La cocción es lenta (unas 2 horas).",
        utensils: ["Parrilla/Asador", "Horno de barro", "Gavetas de metal", "Hornillas con tacuaras", "Leñas"],
        consumption: "Es de consumo muy habitual, especialmente en hogares de personas de escasos recursos o en celebraciones.",
        conservation: "Por el tipo de cocción, se puede guardar refrigerado bastante tiempo y usarse para otras elaboraciones.",
        sourcePerson: "Dalia Durán (El Cairo)",
        tags: ["Tradicional", "Carne", "Monte"],
        imageUrl: "/images/recipes/asado-monte.png"
    },
    {
        name: "Shocorimba",
        baureName: "Shokorimbo",
        description:
            "Preparación tradicional a base de maíz blando, antiguamente era un alimento con que se alimentaban los abuelos. Con esta preparación también se hacía otro plato típico (pipián).",
        ingredients: ["Maíz blando", "Agua", "Sal", "Leche (opcional)", "Chicharrón de res (opcional)"],
        preparation:
            "El maíz blando se pone a tostar, se sancochaba y se le agregaba sal. Se consumía cuando se sentía hambre a media mañana, o como refrigerio. También se le podía agregar chicharrón de res y se acompañaba con leche.",
        utensils: ["Olla", "Batán", "Cedazo", "Hornillas", "Tiesto"],
        consumption: "Era consumida como refrigerio a media mañana. Hoy en día es desconocida por la mayoría de los comunarios.",
        conservation: "No aplica (sin datos en el documento sobre conservación).",
        sourcePerson: "Ignacia Durán (Baures)",
        tags: ["Maíz", "Tradicional", "Refrigerio"],
        imageUrl: "/images/recipes/shocorimba.png"
    },
    {
        name: "Cajapueti de yuca o de plátano",
        baureName: "Cajapueti",
        description:
            "Elaboración muy típica que está a punto de desaparecer. Es una especie de guiso o locro preparado con yuca o plátano y menudos de vaca.",
        ingredients: [
            "Menudos de vaca (tripa, panza, corazón, ubre)",
            "Ají",
            "Sal",
            "Cebolla en hoja",
            "Pimienta",
            "Plátano o yuca",
            "Urucú"
        ],
        preparation:
            "Primero se pela la yuca o el plátano y se pica en trozos pequeños. Se pone una olla con agua a hervir y se agrega el plátano o la yuca, enseguida los menudos de vaca. Se condimenta y se deja a cocción por unos 40 minutos. Queda una preparación no muy líquida ni muy espesa, parecida al locro. Se acompaña con chivé.",
        utensils: ["Ollas", "Hornillas", "Leñas"],
        consumption: "Era muy representativa, pero hoy es poco conocida por los jóvenes. Es preparado en ferias, una vez al año.",
        conservation: "Por el tipo de cocción (guiso), se puede guardar refrigerado aproximadamente una semana.",
        sourcePerson: "Sra. Juana Sosa (Tacana, I.L.C.B.)",
        tags: ["Yuca", "Plátano", "Tradicional", "Menudos"],
        imageUrl: "/images/recipes/cajapueti.png"
    },
    {
        name: "Sabayón",
        baureName: "To Sakopi",
        description:
            "Elaboración ya no consumida, hecha a partir de gusanos de tierra llamados sabayones. Se usaba como espesante o se consumía hervido, aunque no era muy apetitoso (sabor amargo y textura a goma).",
        ingredients: ["Sabayón (gusanos de tierra)"],
        preparation:
            "Los insectos se sacaban de la tierra y se ponían a remojar para quitar el barro. Después se les sacaba la tripa y se secaban al sol en cueros de vaca. Una vez deshidratados, se molían y el polvo se echaba en mate para guardar, usándolo para espesar comidas. Otros lo consumían hervido con ají.",
        utensils: ["Cuero de vaca", "Mate"],
        consumption: "Ha desaparecido; su consumo es prácticamente inexistente y no es preparado actualmente.",
        conservation: "Se podía guardar refrigerado aproximadamente una semana (hervido).",
        sourcePerson: "Juana Sosa (Baures)",
        tags: ["Insectos", "Tradicional", "Desaparecida"],
        imageUrl: "/images/recipes/sabayon.png"
    },
    {
        name: "Pan de mentira",
        baureName: "Pan mentir",
        description:
            "Un horneado a base de harina de maíz y harina de trigo que utilizaba chicha fuerte de maíz como agente leudante (levadura).",
        ingredients: [
            "Chicha fuerte de maíz (como levadura)",
            "Harina de maíz",
            "Harina de trigo",
            "Manteca de res o cerdo",
            "Sal",
            "Huevo",
            "Canela",
            "Anís",
            "Azúcar o miel"
        ],
        preparation:
            "Se preparaba una masa con las harinas, manteca, sal, huevo, canela, anís, azúcar/miel. Se usaba la chicha fuerte como levadura, agregada al centro de la masa con agua. Se amasaba, se hacían bollitos, se aplanaban y se colocaban en fuentes. Se horneaban en horno de barro previamente calentado, con cuidado por la rapidez de la cocción.",
        utensils: ["Horno de barro", "Leña", "Fuentes metálicas"],
        consumption: "Ya no es consumida; su preparación es prácticamente inexistente.",
        conservation: "Como es una masa blanda de pan, no dura más de 3 días.",
        sourcePerson: "Lorgio Suárez (La Asunta)",
        tags: ["Maíz", "Horneado", "Tradicional", "Desaparecida"],
        imageUrl: "/images/recipes/pan-mentira.png"
    },
    {
        name: "Chicha de yuca",
        baureName: "Pulaqui",
        description:
            "Bebida típica por excelencia del municipio, hecha a base de yuca. Es una bebida fermentada muy consumida, especialmente una semana después de su preparación.",
        ingredients: ["Yuca", "Agua", "Miel (para endulzar, opcional)"],
        preparation:
            "La yuca se pela, se pica y se pone a hervir hasta que ablande (el líquido se reserva). Se procede a patacar o masticar (es necesario para la preparación), se estruja, y se guarda hasta el otro día. Luego se cuela, y el líquido se mezcla con el líquido reservado. Se vuelve a cocer por unas 2 horas. Después se enfría y se guarda en mates o cántaros para fermentar.",
        utensils: ["Olla", "Hornilla", "Leña", "Gaveta", "Cántaros", "Mate"],
        consumption: "Se consume prácticamente todos los días; es la bebida típica por excelencia. A la gente le gusta consumirla fermentada (una semana después).",
        conservation: "Se puede guardar una semana; pasado este tiempo comienza a fermentar.",
        sourcePerson: "Eloisa Sandoval (Baures)",
        tags: ["Yuca", "Bebida", "Tradicional", "Fermentada"],
        imageUrl: "/images/recipes/chicha-yuca.png"
    }
];

const lifeStories = [
    {
        title: "El pan de choclo y la comida de turo",
        personName: "Dolores Chimanacay",
        birthYear: 1932,
        deathYear: 2022,
        community: "Concepción de Baures",
        story: `Sobre nuestra fuente de alimentación, teníamos arroz y comíamos comida de choclo, así en forma de pastel, le echamos carne y todo. Lindo es. Un dato es cómo elaborábamos comida con turo (caracol); íbamos al río, lo asábamos, y luego lo limpiábamos. Lo comía con chive, sabía a gusto de churiqui de gallina. También hacíamos tamal de este turo. Por eso la gente antes aquí era guapa y no tenía enfermedades.`,
        relatedThemes: ["Maíz", "Caracol (Turo)", "Salud", "Cocina tradicional"],
        photoUrl: "/images/people/dolores-chimanacay.jpg",
        recordedBy: "Franziska Riedel (2012)",
    },
    {
        title: "Chivé de Cusi y el tamal de Turo",
        personName: "Rosalia Pinaicobo",
        birthYear: 1932,
        deathYear: 2020,
        community: "Concepción de Baures",
        story: `La fuente principal de nuestra alimentación era el chivé o harina de cusi (actualmente en peligro de extinción). También comí el tamal de turo (caracol); había sido lindo con maíz. El maíz se molía y se entreveraba la carne picada con el agua del turo, agregándole manteca. Yo comí el turo, pero el sabayón (gusano de tierra), no lo comía; le tenía miedo. Mi papá decía: "Usted es bien cochina, porque lo come el sabayón". Pero la gente que lo comía era sana y valiente.`,
        relatedThemes: ["Cusi", "Caracol (Turo)", "Sabayón", "Alimentos antiguos"],
        photoUrl: "/images/people/rosalia-pinaicobo.jpg",
        recordedBy: "Franziska Riedel (2012)",
    },
    {
        title: "Memoria de los platos de mi abuela horneadora",
        personName: "Juana Sosa Tacana",
        age: 87,
        community: "Concepción de Baures (capital)",
        story: `Fui criada por mi abuela, quien era horneadora en las fiestas patronales de productos típicos como panquete, masaco, chimas y tortitas de maíz. Ella me enseñó todo. Recuerdo que antes comíamos patasca de maíz, cajapueti (un picado de yuca con tripas), turos en escabeche y tamal de turo. También se comía el sabayón (gusano de tierra) en una generación antes, lo disecaban y tenía sabor amargo.`,
        relatedThemes: ["Fiestas patronales", "Horneados", "Platos típicos", "Cajapueti"],
        photoUrl: "/images/people/juana-sosa.png",
        recordedBy: "Investigación gastronómica",
    },
    {
        title: "La cocina comunitaria y la pérdida de platos",
        personName: "Rafaela Moreroa Urapiña",
        age: 83,
        community: "Jasiaquiri (residente)",
        story: `Nací en Ascensión de Guarayos y migré a Baures. Desde que tengo memoria, mi madre me cocinaba picado de yuca. Éramos pobres y sobrevivíamos de lo que la naturaleza nos proveía. El tiempo que viví en Jasiaquiri me ha tocado ver diferentes platos, que incluso se han ido perdiendo; la gente ya no come esas elaboraciones, solo cuando hay algún tipo de feria escolar.`,
        relatedThemes: ["Pérdida cultural", "Subsistencia", "Recuperación de recetas"],
        photoUrl: "/images/people/rafaela-moreroa.png",
        recordedBy: "Investigación gastronómica",
    },
    {
        title: "Comercio de la comunidad y la agricultura",
        personName: "Emilse Ortiz Omitari",
        age: 73,
        community: "El Cairo (residente)",
        story: `Soy de ascendencia cruceña. Recuerdo que desde esos años la comunidad empezó a exportar varias cosas en lanchas de motor a leña, como tejidos de hamacas, aguardientes de caña, manteca de cerdo en cantidades grandes, almidón, chive y maíz. Me dedico a la agricultura y la cacería, y mi alimentación se basaba en lo que me proveía la naturaleza.`,
        relatedThemes: ["Agricultura", "Cacería", "Economía local", "Comercio histórico"],
        photoUrl: "/images/people/emilse-ortiz.png",
        recordedBy: "Investigación gastronómica (Fuente del PDF)",
    },
    {
        title: "El Tropero en las fiestas",
        personName: "Don Alberto",
        age: 72,
        community: "Comunidad Baure",
        story: `En nuestras fiestas tradicionales, la comida es el centro de todo, para celebrar juntos y fortalecer los lazos de la comunidad. Recuerdo las grandes ollas de tropero que se preparaban para todos. Cada familia contribuía con algo: yuca, carne, plátano, especias. La comida nos une más que cualquier otra cosa.`,
        relatedThemes: ["Fiestas tradicionales", "Cocina comunitaria", "Tropero", "Identidad cultural"],
        photoUrl: "/images/people/fiesta.jpg",
        recordedBy: "Proyecto Archivo Baure (Historia de ejemplo)"
    }
];

const culturalData = [
    {
        title: "El Pueblo Baure: Historia y Territorio",
        category: "Historia",
        content: `El pueblo Baure es un pueblo indígena de tierras bajas de Bolivia, asentado principalmente en la región de los llanos de Moxos, en el departamento del Beni. Su territorio ancestral se encuentra en las riberas del río Baures, del cual toman su nombre. Los Baure recolectaban frutas, huevos de diferentes animales (petas, lagartos, caimanes) y gusanos de tierra (sabayones). Antes de la reducción por los Jesuitas, el pueblo Baure fue tan poderoso (más de 40.000 personas) y organizado que llegó a implementar mecanismos para el manejo del medio ambiente, aprovechando el exceso de agua en épocas de inundación y usándola durante periodos de escasez, lo que hizo posible la piscicultura y otras actividades agrícolas.`,
        subsections: [
            {
                subtitle: "Ubicación geográfica",
                text: "El territorio tradicional Baure se encuentra en el municipio de Magdalena y zonas aledañas, en la provincia de Iténez del departamento del Beni. La capital, Baures, se encuentra a 70 km al sureste de Magdalena. La investigación del registro gastronómico se realizó en 4 juntas vecinales (distrito 1) y 7 comunidades aledañas (distrito 2) del municipio."
            },
            {
                subtitle: "Población actual",
                text: "Actualmente, la población Baure se estima en varios cientos de personas, distribuidas en diferentes comunidades. Muchos han migrado a centros urbanos, pero mantienen vínculos estrechos con sus comunidades de origen y participan en festividades y actividades tradicionales."
            }
        ],
        images: [
            {
                url: "/images/culture/territorio-baure.jpg",
                caption: "Vista del río Baures y su territorio"
            }
        ],
        sources: ["Investigación de campo - Proyecto Archivo Baure", "Testimonios comunitarios", "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf"],
        relatedTopics: ["Territorio", "Historia colonial", "Geografía amazónica"]
    },
    {
        title: "La Lengua Baure y la Cocina",
        category: "Lengua",
        content: `La lengua baure pertenece a la familia lingüística Arawak, una de las más extensas de América del Sur. Se considera en peligro de extinción, pero hay esfuerzos por su revitalización. En la cocina, varios platillos conservan sus nombres en lengua baure, como "Ejaj to Woshor" (Sopa de bucheres) y "Shokorimbo" (Shocorimba), manteniendo viva la memoria lingüística a través de la gastronomía.`,
        subsections: [
            {
                subtitle: "Estado actual de la lengua",
                text: "La mayoría de los hablantes de baure son adultos mayores. Existen muy pocos hablantes fluidos menores de 50 años, lo que sitúa a la lengua en una situación crítica. A pesar de ello, el idioma todavía tiene la posibilidad de ser escuchado."
            },
            {
                subtitle: "Palabras baure y utensilios",
                text: "El urupé (conocido como *jiros* en baure) se hace de *jipuri*, que se obtiene raspando la hoja de cusi, y se teje. Muchos nombres de alimentos y preparaciones se conservan en lengua baure, como *Pulaqui* (Chicha de yuca) o *To Sakopi* (Sabayón)."
            }
        ],
        images: [],
        sources: ["Investigación lingüística comunitaria", "Testimonios de hablantes", "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf"],
        relatedTopics: ["Lenguas en peligro", "Revitalización lingüística", "Patrimonio inmaterial"]
    },
    {
        title: "La Yuca: Fundamento de la Alimentación Baure",
        category: "Cocina",
        content: `La yuca (manihot esculenta) es el cultivo más importante en la tradición agrícola y culinaria del pueblo Baure. Constituye la base de la dieta, junto con el plátano, maíz, joco, camote, frutas silvestres, y otros productos nativos.

La yuca no solo se consume hervida o asada. Los Baure han desarrollado múltiples técnicas de procesamiento: elaboración de chicha fermentada, masaco, harina de yuca, y su combinación con otros alimentos locales como pescado, carne de monte y maíz. Por ejemplo, el cultivo de yuca es esencial para hacer el chive. El tornillo, un instrumento manual de madera, se usaba para triturar los alimentos (como la yuca) antes de ser reemplazado por rayadores metálicos.`,
        subsections: [
            {
                subtitle: "Chivé de Cusi",
                text: "Antiguamente, el chivé de cusi era una fuente principal de alimentación. Se preparaba machucando las frutas de cusi para extraer el jane (bajo la cáscara), se lavaba y se tendía sobre cuero de res por unos cuatro días para secarse. Luego se molía y cernía. El producto, de color rosado, se bebía con leche o se usaba como acompañante."
            },
            {
                subtitle: "El Batán",
                text: "El batán consta de una gaveta/vasija de madera y una piedra tallada, usado para moler maíz (insumo principal para horneados) y, antiguamente, para moler semillas de cacao y elaborar chocolate."
            },
            {
                subtitle: "La Cocina Precolonial",
                text: "En el tiempo precolonial, el hombre Baure cazaba y pescaba, mientras la mujer se quedaba a preparar comida, acarrear leña, hacer chicha, tejer, y fabricar utensilios como ollas y tinajas."
            }
        ],
        images: [
            {
                url: "/images/culture/cultivo-yuca.jpg",
                caption: "Cultivo tradicional de yuca en chaco Baure"
            }
        ],
        sources: ["Conocimiento tradicional comunitario", "Observación participante", "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf"],
        relatedTopics: ["Agricultura tradicional", "Soberanía alimentaria", "Etnobotánica"]
    },
    {
        title: "El Río Baures: Fuente de Vida",
        category: "Territorio",
        content: `El río Baures es la arteria vital que ha sustentado a la comunidad. La pesca provee alimento al pueblo y a las comunidades, siendo el buchere (Hoplosternum sp.) un pescado pequeño y abundante en los curiches o pozas. El conocimiento ecológico tradicional ha permitido mantener poblaciones saludables de peces.

Un método de pesca tradicional implicaba usar un bejuco llamado coropi, que al ser machacado e introducido en lagunas, intoxicaba las aguas, haciendo que los peces salieran a la superficie. Existía otra variedad de coropi de efecto más fuerte, pero estaba prohibido su uso por ser una planta tabú.`,
        subsections: [
            {
                subtitle: "Caza y Recolección",
                text: "La caza y pesca son actividades importantes. Los cazadores venden carne de monte en el pueblo. La carne de monte es importante para familias sin ingresos fijos o cuando la carne de vaca es difícil de conseguir. Se recolectaban huevos de peta (tortuga), lagartos, caimanes, piyos, perdices y caracoles (turos). Un comportamiento de caza que se mantiene es la prohibición de bañarse o tener relaciones sexuales durante 7 días después de cazar la primera o segunda anta."
            },
            {
                subtitle: "Consumo de Turo y Sabayón",
                text: "El caracol (turo) era consumido asado o sancochado con chivé, y se hacía tamal de turo. Algunos, como Rosalia Pinaicobo, comían turo en tamal (con maíz y manteca) pero temían al gusano de tierra sabayón (To Sakopi), aunque otros decían que era lo mejor para no enfermarse."
            }
        ],
        images: [
            {
                url: "/images/culture/rio-baures.jpg",
                caption: "El río Baures en época de aguas altas"
            }
        ],
        sources: ["Testimonios de pescadores tradicionales", "Observación etnográfica", "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf"],
        relatedTopics: ["Pesca tradicional", "Ecología de ríos", "Cosmovisión indígena"]
    },
    {
        title: "Cocina Comunitaria y Festividades",
        category: "Tradiciones",
        content: `La cocina Baure es un espacio de construcción comunitaria. La comida es el centro de las fiestas tradicionales. En estas celebraciones, la preparación de grandes cantidades de comida es una tarea colectiva. La Sra. Juana Sosa Tacana, quien fue criada por su abuela, recuerda que ella era horneadora en las fiestas patronales de productos típicos como panquete, masaco, chimas, y tortitas de maíz. Las festividades son espacios educativos donde los jóvenes aprenden técnicas culinarias, normas sociales y valores comunitarios.`,
        subsections: [
            {
                subtitle: "Ejemplos de Platos Festivos y Antiguos",
                text: "Además de los horneados, Juana Sosa recuerda que antes se comía patasca de maíz, cajapueti (un picado de yuca, pero con tripas), turos en escabeche y tamal de turo. La cocina baure es un patrimonio cultural crucial que no debe perderse, al igual que su idioma."
            },
            {
                subtitle: "Reciprocidad y Sentimiento",
                text: "En cada hogar, las personas mayores siguen hablando de cómo cocinaban sus abuelos, con ese sentimiento de aprecio por la comida que hoy los jóvenes apenas conocen."
            },
            {
                subtitle: "El Chocolate Baures",
                text: "Baures es una de las zonas más turísticas del Beni, muy conocida por los famosos Chocolates Baures, uno de los insumos más connotados y apreciados del país."
            }
        ],
        images: [
            {
                url: "/images/culture/fiesta-comunitaria.jpg",
                caption: "Preparación colectiva de comida en festividad tradicional"
            }
        ],
        sources: ["Observación participante en festividades", "Testimonios comunitarios", "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf"],
        relatedTopics: ["Organización social", "Rituales y festividades", "Economía de la reciprocidad"]
    },
    {
        title: "La Cocina como Memoria y Resistencia",
        category: "Cocina",
        content: `La cocina tradicional Baure se ha convertido en un espacio de resistencia cultural y memoria colectiva, afirmando la identidad indígena frente a las presiones externas. La documentación busca fortalecer la identidad y generar orgullo en las nuevas generaciones.

El presente artículo es un acercamiento al mundo de la cocina Baure para generar referencias y documentación sobre técnicas antiguas y utensilios. La investigación de este registro fue valorada y reconocida por la Alcaldía Municipal de Baures y el Instituto de Lengua y Cultura Baures (ILCB), ya que no existía suficiente información escrita similar documentada.`,
        subsections: [
            {
                subtitle: "Desafíos y Técnicas de Estudio",
                text: "La investigación se realizó mediante un modelo mixto (cuantitativo y cualitativo), usando encuestas, entrevistas (incluyendo la consulta de entrevistas previas de la Dra. Franziska Riedel de 2007) y observación de campo. La dificultad para acceder a todas las comunidades en la selva limitó la investigación a 4 juntas vecinales y 7 comunidades."
            },
            {
                subtitle: "Recomendaciones para Futuras Investigaciones",
                text: "Para un estudio exhaustivo, se recomienda extender el tiempo de investigación a más de un año para documentar festejos y las complejas relaciones humanas, y así enriquecer el registro."
            }
        ],
        images: [],
        sources: ["Reflexión comunitaria participativa", "Investigación aplicada", "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf"],
        relatedTopics: ["Patrimonio cultural", "Identidad indígena", "Soberanía alimentaria"]
    }
];

async function seedAll() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB\n');

        // Limpiar colecciones
        console.log('🗑️  Limpiando colecciones...');
        await Recipe.deleteMany({});
        await LifeStory.deleteMany({});
        await CulturalData.deleteMany({});
        console.log('✅ Colecciones limpiadas\n');

        // Insertar recetas
        console.log('📖 Insertando recetas...');
        await Recipe.insertMany(recipesToSeed);
        console.log(`✅ Insertadas ${recipesToSeed.length} recetas\n`);

        // Insertar recuentos de vida
        console.log('👥 Insertando recuentos de vida...');
        await LifeStory.insertMany(lifeStories);
        console.log(`✅ Insertados ${lifeStories.length} recuentos de vida\n`);

        // Insertar datos culturales
        console.log('🏛️  Insertando datos culturales...');
        await CulturalData.insertMany(culturalData);
        console.log(`✅ Insertados ${culturalData.length} datos culturales\n`);

        console.log('🎉 ¡Base de datos poblada exitosamente!');
        console.log('\n📊 Resumen:');
        console.log(`   - Recetas: ${recipesToSeed.length}`);
        console.log(`   - Recuentos de Vida: ${lifeStories.length}`);
        console.log(`   - Datos Culturales: ${culturalData.length}`);
        console.log(`   - Total: ${recipesToSeed.length + lifeStories.length + culturalData.length} documentos`);

        mongoose.connection.close();
        console.log('\n✅ Conexión cerrada');
    } catch (error) {
        console.error('❌ Error al poblar base de datos:', error);
        process.exit(1);
    }
}

seedAll();