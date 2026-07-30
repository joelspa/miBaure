export const mockRecipes = [
    {
        _id: "m1",
        name: "Sopa de bucheres",
        baureName: "Ejaj to Woshor",
        description: "Una de las preparaciones típicas y representativas del municipio de Baures.",
        ingredients: ["Buchere", "Agua", "Sal", "Urucú", "Plátano", "Verduras"],
        preparation: "Se lavan los pescados sin sacar escamas. Se hierven en abundante agua con sal por 40 min. Se añade urucú.",
        utensils: ["Olla", "Cucharón", "Hornillas", "Leñas"],
        consumption: "Desayuno, cena o almuerzo.",
        conservation: "No se conserva, se consume en el día.",
        sourcePerson: "Adil Arredondo (Jasiaquiri)",
        tags: ["Río", "Tradicional", "Pescado"],
        imageUrl: "/images/recipes/sopa-bucheres.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "m2",
        name: "Asado de carne del monte",
        baureName: "Tropero o Jochi",
        description: "Carne de monte asada tradicionalmente por familias comunarias.",
        ingredients: ["Carne del monte", "Sal", "Cebolla"],
        preparation: "Al horno de barro o a las brasas sobre tacuaras verdes. Cocción lenta.",
        utensils: ["Parrilla/Asador", "Horno de barro", "Leñas"],
        consumption: "Consumo muy habitual en celebraciones.",
        conservation: "Se puede guardar refrigerado bastante tiempo.",
        sourcePerson: "Dalia Durán (El Cairo)",
        tags: ["Tradicional", "Carne", "Monte"],
        imageUrl: "/images/recipes/asado-monte.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "m3",
        name: "Chicha de yuca",
        baureName: "Pulaqui",
        description: "Bebida típica por excelencia del municipio, hecha a base de yuca.",
        ingredients: ["Yuca", "Agua", "Miel"],
        preparation: "La yuca se pela, hierve y mastica. Se estruja y guarda. Luego se cuela, mezcla, cuece 2 horas y fermenta.",
        utensils: ["Olla", "Hornilla", "Cántaros"],
        consumption: "Se consume todos los días.",
        conservation: "Se puede guardar una semana, luego fermenta.",
        sourcePerson: "Eloisa Sandoval (Baures)",
        tags: ["Yuca", "Bebida", "Tradicional"],
        imageUrl: "/images/recipes/chicha-yuca.png",
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
        story: "Sobre nuestra fuente de alimentación, teníamos arroz y comíamos comida de choclo, así en forma de pastel. Un dato es cómo elaborábamos comida con turo (caracol); íbamos al río, lo asábamos, y luego lo limpiábamos. Lo comía con chive, sabía a gusto de churiqui de gallina.",
        relatedThemes: ["Maíz", "Caracol", "Cocina tradicional"],
        photoUrl: "/images/people/dolores-chimanacay.jpg",
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
        story: "La fuente principal de nuestra alimentación era el chivé o harina de cusi. También comí el tamal de turo (caracol). El maíz se molía y se entreveraba la carne picada con el agua del turo, agregándole manteca.",
        relatedThemes: ["Cusi", "Caracol (Turo)", "Sabayón"],
        photoUrl: "/images/people/rosalia-pinaicobo.jpg",
        recordedBy: "Franziska Riedel (2012)",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const mockCulturalData = [
    {
        _id: "c1",
        title: "El Pueblo Baure: Historia y Territorio",
        category: "Historia",
        content: "El pueblo Baure es un pueblo indígena de tierras bajas de Bolivia, asentado en los llanos de Moxos. Su territorio ancestral se encuentra en las riberas del río Baures.",
        subsections: [
            { subtitle: "Ubicación geográfica", text: "Municipio de Magdalena y zonas aledañas." }
        ],
        images: [],
        sources: ["Investigación de campo"],
        relatedTopics: ["Territorio", "Historia"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        _id: "c2",
        title: "La Lengua Baure y la Cocina",
        category: "Lengua",
        content: "La lengua baure pertenece a la familia lingüística Arawak. Varios platillos conservan sus nombres en lengua baure.",
        subsections: [
            { subtitle: "Estado actual", text: "Lengua en peligro de extinción, mayormente hablada por adultos mayores." }
        ],
        images: [],
        sources: ["Investigación lingüística"],
        relatedTopics: ["Lengua", "Identidad"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
