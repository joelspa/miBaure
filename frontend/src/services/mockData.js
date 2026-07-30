export const mockRecipes = [
    {
        _id: "m1",
        name: "Sopa de bucheres",
        baureName: "Ejaj to Woshor",
        description: "Una de las preparaciones típicas y representativas del municipio de Baures. Se destaca por el uso de pescado de río fresco y un toque de urucú que le da su característico color.",
        ingredients: ["Buchere fresco (pescado)", "Agua", "Sal", "Urucú", "Plátano verde", "Verduras locales (cebolla, pimentón)"],
        preparation: "Se lavan los pescados sin sacar las escamas. Se hierven en abundante agua con sal por 40 minutos. Se añade urucú para dar color y plátano verde rallado para espesar el caldo.",
        utensils: ["Olla de barro o aluminio", "Cucharón de madera", "Hornillas", "Leña de cuchi"],
        consumption: "Ideal para desayuno fuerte, almuerzo o cena.",
        conservation: "No se conserva, se consume en el día debido a que no lleva conservantes.",
        sourcePerson: "Adil Arredondo (Jasiaquiri)",
        tags: ["Río", "Tradicional", "Pescado"],
        imageUrl: "https://images.unsplash.com/photo-1548943487-a2e4e43b4850?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "m2",
        name: "Asado de carne del monte",
        baureName: "Tropero o Jochi",
        description: "Carne de monte asada lentamente a la leña, es una delicia que reúne a las familias comunarias en ocasiones especiales.",
        ingredients: ["Carne del monte (Jochi o Taitetú)", "Sal gruesa", "Cebolla", "Limón o naranja agria"],
        preparation: "La carne se macera con sal y jugo cítrico. Luego se cocina al horno de barro o a las brasas sobre tacuaras verdes, dándole la vuelta constantemente con un fuego muy lento por varias horas.",
        utensils: ["Parrilla/Asador de tacuara", "Horno de barro", "Leñas secas"],
        consumption: "Consumo muy habitual en celebraciones y fiestas patronales.",
        conservation: "Se puede guardar refrigerado bastante tiempo o en manteca.",
        sourcePerson: "Dalia Durán (El Cairo)",
        tags: ["Festivo", "Carne", "Monte"],
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "m3",
        name: "Chicha de yuca",
        baureName: "Pulaqui",
        description: "Bebida fermentada típica por excelencia del municipio, hecha a base de yuca y consumida a diario como refresco y fuente de energía.",
        ingredients: ["Yuca dulce", "Agua", "Miel o azúcar", "Levadura natural"],
        preparation: "La yuca se pela y se hierve. Se estruja y guarda. Antiguamente se masticaba para acelerar la fermentación. Luego se cuela, mezcla, cuece 2 horas y se deja fermentar en cántaros de barro.",
        utensils: ["Olla grande", "Cántaros de barro (urupes)", "Mortero de madera"],
        consumption: "Se consume todos los días en el campo o en el pueblo.",
        conservation: "Se puede guardar una semana; cada día su fermentación aumenta.",
        sourcePerson: "Eloisa Sandoval (Baures)",
        tags: ["Yuca", "Bebida", "Fermento"],
        imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "m4",
        name: "Majadito de charque",
        baureName: "Majau",
        description: "Un plato sustancioso a base de arroz y carne seca deshidratada al sol, muy arraigado en la cultura de todo el Beni y consumido en Baures con particular sazón.",
        ingredients: ["Charque (carne secada al sol)", "Arroz", "Urucú", "Plátano frito", "Huevo", "Cebolla y pimentón"],
        preparation: "Hervir el charque para quitar exceso de sal y ablandar. Tostar el arroz y ahogarlo con las verduras picadas y el charque desmenuzado. Añadir agua coloreada con urucú y dejar secar.",
        utensils: ["Sartén grande o paila", "Cucharón"],
        consumption: "Ideal para el almuerzo.",
        conservation: "Dura hasta el día siguiente si se refrigera.",
        sourcePerson: "Tradición popular Baure",
        tags: ["Arroz", "Carne seca", "Diario"],
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "m5",
        name: "Empanada de arroz",
        baureName: "Pan de arroz",
        description: "Horneado típico con textura chiclosa y sabor a queso y yuca que se sirve comúnmente con café de siesta.",
        ingredients: ["Harina de arroz", "Queso criollo", "Yuca hervida", "Manteca de cerdo", "Leche"],
        preparation: "Se amasa la harina de arroz con puré de yuca, manteca y queso rallado hasta obtener una masa uniforme. Se forman porciones en hojas de plátano y se hornean.",
        utensils: ["Horno de barro", "Bandejas", "Hojas de plátano"],
        consumption: "Típico para la siesta (horneado de la tarde).",
        conservation: "Se conserva un par de días a temperatura ambiente.",
        sourcePerson: "Comunidad de Jasiaquiri",
        tags: ["Horneado", "Arroz", "Merienda"],
        imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const mockLifeStories = [
    {
        _id: "ls1",
        title: "El pan de choclo y la comida de turo",
        personName: "Dolores Chimanacay",
        birthYear: 1932,
        deathYear: 2022,
        community: "Concepción de Baures",
        story: "Sobre nuestra fuente de alimentación, teníamos arroz y comíamos comida de choclo, así en forma de pastel. Un dato muy interesante de mi juventud es cómo elaborábamos comida con turo (caracol gigante de agua dulce). Íbamos al río temprano, lo buscábamos entre las plantas, lo asábamos en las brasas y luego lo limpiábamos. Yo lo comía con chivé, y tenía un sabor muy parecido al churiqui de gallina.",
        relatedThemes: ["Maíz", "Caracol", "Cocina de recolección"],
        photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        recordedBy: "Franziska Riedel (2012)",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "ls2",
        title: "Chivé de Cusi y el tamal de Turo",
        personName: "Rosalia Pinaicobo",
        birthYear: 1932,
        deathYear: 2020,
        community: "Concepción de Baures",
        story: "La fuente principal de nuestra alimentación era el chivé o harina de cusi. También recuerdo vívidamente cómo se preparaba el tamal de turo. El maíz se molía cuidadosamente en tacú y se entreveraba la carne del turo muy bien picada con su propio caldo, agregándole manteca para que no quede seco. Era una labor que hacíamos entre varias mujeres y nos llevaba toda la tarde.",
        relatedThemes: ["Cusi", "Turo", "Tamal", "Trabajo comunitario"],
        photoUrl: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        recordedBy: "Franziska Riedel (2012)",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "ls3",
        title: "Las moliendas de caña",
        personName: "Juana Ipamo",
        birthYear: 1945,
        deathYear: null,
        community: "El Cairo",
        story: "En la época de mi padre, cuando llegaba el tiempo de la zafra, hacíamos las moliendas de caña usando un trapiche de madera tirado por bueyes. Con ese jugo dulce hacíamos empanizao y melaza. Todo el pueblo olía a dulce. Nos levantábamos a las 4 de la mañana para prender los hornos.",
        relatedThemes: ["Caña de azúcar", "Molienda", "Zafra"],
        photoUrl: "https://images.unsplash.com/photo-1615638210332-9c1c5a932c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        recordedBy: "Proyecto Voces Baure",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "ls4",
        title: "El respeto al monte y la cacería",
        personName: "Ignacio Mopi",
        birthYear: 1950,
        deathYear: null,
        community: "San Francisco",
        story: "Mis abuelos siempre nos decían que el monte tiene dueño, 'El Jichi'. Cuando íbamos a cazar, no podíamos sacar más animales de los necesarios para comer esa semana. Si un cazador era ambicioso, se perdía en el monte. Por eso siempre pedíamos permiso antes de entrar a buscar pavas o troperos.",
        relatedThemes: ["Mitos y leyendas", "Caza", "Respeto a la naturaleza"],
        photoUrl: "https://images.unsplash.com/photo-1598285994273-30b62e49d564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        recordedBy: "Proyecto Voces Baure",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const mockCulturalData = [
    {
        _id: "c1",
        title: "El Pueblo Baure: Historia y Territorio",
        category: "Historia",
        content: "El pueblo Baure es un pueblo indígena de tierras bajas de Bolivia, asentado en los llanos de Moxos, departamento del Beni. Su territorio ancestral se encuentra principalmente en las riberas del caudaloso río Baures y sus afluentes. Antes de la llegada de los españoles, los Baures formaban sociedades complejas con avanzados sistemas de agricultura en camellones, canales y terraplenes que evitaban las inundaciones.",
        subsections: [
            { subtitle: "Ubicación geográfica", text: "Municipio de Magdalena, Baures y Huacaraje." },
            { subtitle: "Organización social precolonial", text: "Estaban organizados bajo el mando de caciques poderosos, llamados 'arama'." }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1533596545283-4ee196b0521e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Paisaje amazónico, territorio Baure." }],
        sources: ["Investigación de campo 2012"],
        relatedTopics: ["Territorio", "Historia precolonial", "Llanos de Moxos"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "c2",
        title: "La Lengua Baure y sus expresiones",
        category: "Lengua",
        content: "La lengua baure pertenece a la gran familia lingüística Arawak. A pesar del fuerte proceso de castellanización, el idioma mantiene su importancia cultural. Hoy en día, es una lengua en serio peligro de extinción, pero existen esfuerzos de revitalización. Varios platillos y plantas medicinales conservan sus nombres originarios en lengua baure, lo cual demuestra la intrínseca conexión entre idioma y saberes culinarios.",
        subsections: [
            { subtitle: "Estado actual", text: "Lengua en peligro de extinción, mayormente hablada por adultos mayores, aunque se están abriendo escuelas comunitarias para su enseñanza." },
            { subtitle: "Palabras comunes de la cocina", text: "Woshor (sopa/caldo), Pulaqui (chicha)." }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1587422119106-7eeb783857d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Libros y registros de revitalización lingüística." }],
        sources: ["Investigación lingüística Arawak"],
        relatedTopics: ["Lengua Arawak", "Identidad", "Revitalización"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "c3",
        title: "La Danza de los Macheteros",
        category: "Tradiciones",
        content: "La danza de los Macheteros, o 'Tontochi', es la expresión coreográfica más emblemática de los pueblos de Moxos, incluyendo los Baures. Es una danza de reverencia sagrada, donde los bailarines portan un tocado inmenso de plumas de paraba y llevan en la mano un machete de madera (yopo). El ritmo lo marcan los paichichíes (semillas atadas a los tobillos) y el bombo gigante.",
        subsections: [
            { subtitle: "El plumaje", text: "El tocado se arma cuidadosamente con plumas de paraba roja y azul, que antiguamente se recolectaban sin hacer daño a las aves." }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1518001509172-e16e4dbb38be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Bailarín con tocado tradicional de plumas." }],
        sources: ["Archivo Folklórico del Beni"],
        relatedTopics: ["Danzas", "Música", "Fiestas Patronales"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "c4",
        title: "Uso del Cusi y Plantas Medicinales",
        category: "Saberes",
        content: "El cusi es una palmera endémica muy valorada por la cultura Baure. Su fruto se procesa para obtener aceite, que es utilizado tanto para la cocina como para fines cosméticos (cuidado del cabello) y medicinales (curación de problemas respiratorios). La recolección del cusi y su extracción manual (quebrando los cocos) es una actividad tradicionalmente femenina.",
        subsections: [
            { subtitle: "Aceite de cusi", text: "Elaborado artesanalmente hirviendo la almendra machacada." }
        ],
        images: [{ url: "https://images.unsplash.com/photo-1605553556012-706d9b4b03a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Aceites e infusiones artesanales." }],
        sources: ["Conocimiento de ancianos curanderos"],
        relatedTopics: ["Plantas Medicinales", "Palmeras", "Cosmetología indígena"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
