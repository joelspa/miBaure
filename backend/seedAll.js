// seedAll.js - Script para poblar todas las colecciones
require('dotenv').config();
const mongoose = require('mongoose');

const Recipe = require('./models/Recipe');
const LifeStory = require('./models/LifeStory');
const CulturalData = require('./models/CulturalData');

// Recetas
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
        sourcePerson: "Adil Arredondo (Jasiaquiri)",
        tags: ["Río", "Tradicional"],
        imageUrl: "/images/recipes/sopa-bucheres.jpg"
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
        sourcePerson: "Relatos orales (comunidad de Baures)",
        tags: ["Tradicional"],
        imageUrl: "/images/recipes/asado-monte.jpg"
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
        sourcePerson: "Tradición local (documentado en el PDF)",
        tags: ["Yuca", "Maíz", "Tradicional"],
        imageUrl: "/images/recipes/shocorimba.jpg"
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
        sourcePerson: "Relatos del material etnográfico",
        tags: ["Yuca", "Maíz"],
        imageUrl: "/images/recipes/jochi.jpg"
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
        sourcePerson: "Documento: ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE",
        tags: ["Tradicional"],
        imageUrl: "/images/recipes/taitetu.jpg"
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
        sourcePerson: "Relatos compilados en el PDF)",
        tags: ["Yuca", "Tradicional"],
        imageUrl: "/images/recipes/tropero.jpg"
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
        sourcePerson: "ACERCAMIENTO-AL-MUNDO-DE-LA-COCINA-BAURE.pdf",
        tags: ["Yuca", "Tradicional"],
        imageUrl: "/images/recipes/chicha-yuca.jpg"
    }
];

const lifeStories = [
    {
        title: "Memorias de cocina de mi abuela",
        personName: "Adil Arredondo",
        community: "Comunidad Baure",
        story: `Mi abuela era una gran cocinera, sabía preparar muchas comidas tradicionales de nuestra cultura Baure. 
        
Recuerdo especialmente cómo preparaba la chicha de yuca, un proceso que requería paciencia y conocimiento ancestral. Primero pelaba la yuca con cuidado, luego la cocinaba hasta que estuviera bien blanda. El secreto estaba en el punto exacto de cocción y en cómo se dejaba fermentar.

También preparaba el jochi pintado de manera exquisita. Cazaba el animal con respeto, sabiendo que era un regalo de la naturaleza. Lo limpiaba meticulosamente y lo cocinaba con yuca y maíz, creando un platillo que nutría no solo el cuerpo sino también el espíritu de la comunidad.

Ella me enseñó que la cocina Baure no es solo alimento, es memoria, es conexión con nuestros ancestros y con el territorio que nos da vida.`,
        relatedThemes: ["Cocina tradicional", "Transmisión de conocimientos", "Yuca", "Chicha"],
        photoUrl: "/images/people/adil-arredondo.jpg",
        recordedBy: "Proyecto Archivo Baure"
    },
    {
        title: "La pesca en el río Baures",
        personName: "Don Ramiro",
        age: 67,
        community: "Ribera del Río Baures",
        story: `Desde niño he vivido cerca del río. Mi padre me enseñó a pescar cuando tenía apenas 6 años. El río Baures es nuestra vida, nos da de comer y nos conecta con otras comunidades.

Conozco cada curva del río, cada lugar donde los peces se reúnen según la época del año. Pescamos con respeto, tomando solo lo necesario. Sabemos que si cuidamos el río, él nos cuidará a nosotros y a nuestros hijos.

La sopa de bucheres que prepara mi esposa con el pescado fresco es incomparable. Lleva ese sabor del río, de nuestra tierra. Cuando la como, siento que estoy conectado con todo: el agua, los peces, la selva, mi familia.

Esta es nuestra forma de vida, heredada de generación en generación. Es nuestro deber preservarla.`,
        relatedThemes: ["Pesca tradicional", "Río Baures", "Sostenibilidad", "Conexión territorial"],
        photoUrl: "/images/people/pescador.jpg",
        recordedBy: "Proyecto Archivo Baure"
    },
    {
        title: "Cultivando la tierra como nuestros ancestros",
        personName: "Doña Mercedes",
        age: 58,
        community: "Comunidad Baure",
        story: `La yuca es más que un cultivo para nosotros, es parte de nuestra identidad. Desde que tengo memoria, he trabajado en el chaqueado, preparando la tierra para sembrar.

Mi madre me enseñó a seleccionar los mejores esquejes, a plantarlos en la posición correcta, a saber cuándo la tierra está lista. No es solo técnica, es sabiduría que viene de nuestros abuelos y abuelas.

Con la yuca hacemos tantas cosas: chicha, masaco, la cocinamos hervida, la combinamos con pescado y carne. Es la base de nuestra alimentación y de nuestra economía familiar.

Cuando cosecho, agradezco a la tierra. Ella nos da vida. Cada tubérculo que sacamos es un regalo que debemos honrar, no desperdiciar. Por eso aprovechamos todo y compartimos con la comunidad.`,
        relatedThemes: ["Agricultura tradicional", "Yuca", "Sabiduría ancestral", "Economía comunitaria"],
        photoUrl: "/images/people/agricultora.jpg",
        recordedBy: "Proyecto Archivo Baure"
    },
    {
        title: "Las fiestas y la comida comunitaria",
        personName: "Don Alberto",
        age: 72,
        community: "Comunidad Baure",
        story: `En nuestras fiestas tradicionales, la comida es el centro de todo. No es solo para alimentarse, es para celebrar juntos, para fortalecer los lazos de la comunidad.

Recuerdo las grandes ollas de tropero que se preparaban para todos. Cada familia contribuía con algo: yuca, carne, plátano, especias. Las mujeres se reunían desde temprano a cocinar juntas, conversando, riendo, compartiendo secretos culinarios.

El tropero lleva mucho trabajo: hay que pelar kilos de yuca, picar la carne, dorar todo en el aceite caliente. Pero cuando lo hacemos entre todos, es una fiesta en sí misma.

Cuando servimos la comida, todos comen del mismo plato grande. Esto nos recuerda que somos una sola familia, un solo pueblo. La comida nos une más que cualquier otra cosa.`,
        relatedThemes: ["Fiestas tradicionales", "Cocina comunitaria", "Tropero", "Identidad cultural"],
        photoUrl: "/images/people/fiesta.jpg",
        recordedBy: "Proyecto Archivo Baure"
    }
];

const culturalData = [
    {
        title: "El Pueblo Baure: Historia y Territorio",
        category: "Historia",
        content: `El pueblo Baure es un pueblo indígena de tierras bajas de Bolivia, asentado principalmente en la región de los llanos de Moxos, en el departamento del Beni. Su territorio ancestral se encuentra en las riberas del río Baures, del cual toman su nombre.

Históricamente, los Baure fueron uno de los pueblos más numerosos de la región amazónica boliviana. Durante el período colonial, fueron contactados por las misiones jesuíticas, lo que transformó profundamente su organización social y cultural, aunque conservaron elementos fundamentales de su identidad.

El territorio Baure se caracteriza por ser una región de sabanas inundables, bosques de galería y ríos caudalosos. Esta geografía ha moldeado su cultura, especialmente su relación con el agua, la pesca y la agricultura de tubérculos adaptados a suelos húmedos.`,
        subsections: [
            {
                subtitle: "Ubicación geográfica",
                text: "El territorio tradicional Baure se encuentra en el municipio de Magdalena y zonas aledañas, en la provincia de Iténez del departamento del Beni. La comunidad principal está ubicada en las márgenes del río Baures, afluente importante del río Iténez o Guaporé."
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
        sources: ["Investigación de campo - Proyecto Archivo Baure", "Testimonios comunitarios"],
        relatedTopics: ["Territorio", "Historia colonial", "Geografía amazónica"]
    },
    {
        title: "La Lengua Baure",
        category: "Lengua",
        content: `La lengua baure pertenece a la familia lingüística Arawak, una de las más extensas de América del Sur. Aunque actualmente se considera una lengua en peligro de extinción, existen esfuerzos comunitarios para su revitalización y documentación.

El idioma baure posee características fonológicas y gramaticales propias que reflejan la cosmovisión del pueblo. Muchas palabras están íntimamente relacionadas con elementos de la naturaleza, la pesca, la agricultura y las relaciones sociales.

En la cocina tradicional, varios platillos conservan sus nombres en lengua baure, como la "shocorimba", manteniendo viva la memoria lingüística a través de la gastronomía.`,
        subsections: [
            {
                subtitle: "Estado actual de la lengua",
                text: "La mayoría de los hablantes de baure son adultos mayores. Existen muy pocos hablantes fluidos menores de 50 años, lo que sitúa a la lengua en una situación crítica. Sin embargo, hay programas de documentación y enseñanza que buscan revertir esta tendencia."
            },
            {
                subtitle: "Palabras baure en la cocina",
                text: "Muchos nombres de alimentos y preparaciones se conservan en lengua baure: shocorimba (masa de yuca y maíz), nombres de pescados locales, plantas comestibles y utensilios tradicionales. Estos términos son repositorios de conocimiento ecológico y cultural."
            }
        ],
        images: [],
        sources: ["Investigación lingüística comunitaria", "Testimonios de hablantes"],
        relatedTopics: ["Lenguas en peligro", "Revitalización lingüística", "Patrimonio inmaterial"]
    },
    {
        title: "La Yuca: Fundamento de la Alimentación Baure",
        category: "Cocina",
        content: `La yuca (manihot esculenta) es el cultivo más importante en la tradición agrícola y culinaria del pueblo Baure. Este tubérculo, domesticado hace miles de años en la Amazonía, constituye la base de la dieta y la economía de subsistencia de la comunidad.

El ciclo de cultivo de la yuca involucra conocimientos tradicionales transmitidos de generación en generación: selección de variedades, preparación del terreno (chaqueado), época de siembra, cuidados durante el crecimiento y momento óptimo de cosecha.

La yuca no solo se consume hervida o asada. Los Baure han desarrollado múltiples técnicas de procesamiento: elaboración de chicha fermentada, masaco, harina de yuca, y su combinación con otros alimentos locales como pescado, carne de monte y maíz.`,
        subsections: [
            {
                subtitle: "Variedades de yuca",
                text: "Los Baure cultivan diversas variedades de yuca, tanto dulces como amargas. Cada variedad tiene usos específicos: algunas son mejores para hervir, otras para hacer chicha o harina. Este conocimiento botánico tradicional es fundamental para la seguridad alimentaria."
            },
            {
                subtitle: "Procesamiento tradicional",
                text: "El procesamiento de la yuca requiere técnicas específicas, especialmente para las variedades amargas que contienen compuestos tóxicos. Los métodos tradicionales de rallado, prensado y fermentación eliminan estas toxinas y crean alimentos nutritivos y conservables."
            },
            {
                subtitle: "Significado cultural",
                text: "La yuca trasciende su valor nutricional. Es un marcador de identidad cultural, un elemento central en festividades, intercambios comunitarios y rituales. Regalar yuca o chicha es un gesto de reciprocidad y solidaridad."
            }
        ],
        images: [
            {
                url: "/images/culture/cultivo-yuca.jpg",
                caption: "Cultivo tradicional de yuca en chaco Baure"
            }
        ],
        sources: ["Conocimiento tradicional comunitario", "Observación participante"],
        relatedTopics: ["Agricultura tradicional", "Soberanía alimentaria", "Etnobotánica"]
    },
    {
        title: "El Río Baures: Fuente de Vida",
        category: "Territorio",
        content: `El río Baures es mucho más que un curso de agua para el pueblo que lleva su nombre. Es la arteria vital que ha sustentado a la comunidad durante siglos, proveyendo alimento, agua, transporte y conexión espiritual con el territorio.

La pesca en el río Baures se practica con técnicas tradicionales que garantizan la sostenibilidad del recurso. Los pescadores conocen los ciclos de los peces, sus hábitats y comportamientos estacionales. Este conocimiento ecológico tradicional ha permitido mantener poblaciones saludables de peces durante generaciones.

El río también es un espacio social: lugar de encuentro, de trabajo colectivo, de transmisión de conocimientos de padres a hijos. Las historias del río, sus seres y espíritus, forman parte fundamental de la cosmovisión Baure.`,
        subsections: [
            {
                subtitle: "Especies de peces tradicionales",
                text: "El río Baures alberga numerosas especies de peces que forman parte de la dieta tradicional: pacú, surubí, dorado, sábalo, y muchos otros. Cada especie tiene su época, su forma de captura y su preparación culinaria específica."
            },
            {
                subtitle: "Técnicas de pesca tradicional",
                text: "Las técnicas de pesca incluyen el uso de flechas, anzuelos, redes y trampas tradicionales. Estas técnicas son selectivas y permiten liberar peces pequeños, garantizando la reproducción de las especies."
            },
            {
                subtitle: "El río en la cosmovisión Baure",
                text: "El río es considerado un ser vivo que merece respeto. Existen relatos sobre espíritus del agua y normas tradicionales sobre cómo comportarse cerca del río. Esta relación espiritual refuerza prácticas de conservación."
            }
        ],
        images: [
            {
                url: "/images/culture/rio-baures.jpg",
                caption: "El río Baures en época de aguas altas"
            }
        ],
        sources: ["Testimonios de pescadores tradicionales", "Observación etnográfica"],
        relatedTopics: ["Pesca tradicional", "Ecología de ríos", "Cosmovisión indígena"]
    },
    {
        title: "Cocina Comunitaria y Festividades",
        category: "Tradiciones",
        content: `La cocina Baure trasciende el ámbito doméstico para convertirse en un espacio de construcción comunitaria. Las festividades tradicionales y religiosas son ocasiones en las que la preparación y el consumo colectivo de alimentos refuerzan los lazos sociales.

En estas celebraciones, la preparación de grandes cantidades de comida es una tarea colectiva. Las mujeres se organizan para pelar yuca, picar carne, preparar chicha. Los hombres se encargan de la caza y pesca. Esta división del trabajo es flexible y refleja principios de complementariedad.

Platos como el tropero, preparado en grandes cantidades, simbolizan la abundancia y la generosidad. Compartir la comida en un solo plato grande o en múltiples recipientes que circulan entre los presentes es una práctica que materializa la unidad comunitaria.`,
        subsections: [
            {
                subtitle: "Festividades principales",
                text: "Las festividades del santo patrono, las celebraciones de cosecha y otros eventos comunitarios son momentos clave donde la comida juega un papel central. Cada festividad tiene sus platillos característicos y sus formas de preparación ritual."
            },
            {
                subtitle: "Reciprocidad y redistribución",
                text: "En las fiestas opera un sistema de reciprocidad: las familias contribuyen con alimentos y trabajo, y todos participan del consumo. Esto garantiza que nadie quede excluido y refuerza la cohesión social."
            },
            {
                subtitle: "Transmisión de conocimientos",
                text: "Las festividades son espacios educativos donde los jóvenes aprenden técnicas culinarias, normas sociales y valores comunitarios. Observar y participar en la preparación de grandes cantidades de comida es parte de la formación cultural."
            }
        ],
        images: [
            {
                url: "/images/culture/fiesta-comunitaria.jpg",
                caption: "Preparación colectiva de comida en festividad tradicional"
            }
        ],
        sources: ["Observación participante en festividades", "Testimonios comunitarios"],
        relatedTopics: ["Organización social", "Rituales y festividades", "Economía de la reciprocidad"]
    },
    {
        title: "La Cocina como Memoria y Resistencia",
        category: "Cocina",
        content: `En el contexto de cambios acelerados y presiones sobre las culturas indígenas, la cocina tradicional Baure se ha convertido en un espacio de resistencia cultural y memoria colectiva. Mantener las formas tradicionales de cultivar, cazar, pescar y cocinar es un acto de afirmación identitaria.

Cada receta, cada técnica, cada nombre de platillo en lengua baure, es un archivo viviente que conecta el presente con el pasado ancestral. Las abuelas que enseñan a sus nietas a preparar chicha no solo transmiten una técnica, transmiten una visión del mundo, un conjunto de valores y una forma de relacionarse con el territorio.

La documentación y revitalización de la cocina tradicional, como este Archivo Baure, busca fortalecer la identidad cultural, generar orgullo en las nuevas generaciones y mostrar al mundo la riqueza y sofisticación de estos conocimientos milenarios.`,
        subsections: [
            {
                subtitle: "Desafíos actuales",
                text: "La cocina tradicional enfrenta desafíos: migración de jóvenes, disponibilidad de alimentos procesados, cambios en el uso del territorio. Sin embargo, existe una creciente valoración de lo propio y esfuerzos de recuperación."
            },
            {
                subtitle: "Iniciativas de revitalización",
                text: "Proyectos de documentación, talleres intergeneracionales de cocina, ferias gastronómicas y este mismo Archivo Digital son herramientas para mantener viva la tradición culinaria Baure."
            },
            {
                subtitle: "La cocina como patrimonio",
                text: "La cocina tradicional Baure es patrimonio cultural inmaterial que merece ser reconocido, protegido y celebrado. No solo por su valor histórico, sino por su relevancia actual para la soberanía alimentaria y la sostenibilidad."
            }
        ],
        images: [],
        sources: ["Reflexión comunitaria participativa", "Investigación aplicada"],
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
