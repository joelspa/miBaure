# Archivo Baure - Cocina, Memoria y Territorio

**Plataforma web para preservar y difundir la cocina tradicional y cultura del pueblo Baure de Bolivia.**

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node](https://img.shields.io/badge/Node-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![AI](https://img.shields.io/badge/AI-Gemini%202.0-purple)

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación](#documentación)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Descripción

**Archivo Baure** es una plataforma digital diseñada para preservar, documentar y compartir la riqueza culinaria, cultural e histórica del pueblo Baure de Bolivia. El proyecto integra:

- **Recetas ancestrales** con ingredientes, preparación y contexto cultural
- **Recuentos de vida** de miembros de la comunidad
- **Datos culturales** sobre historia, tradiciones, lengua y territorio
- **Asistente IA** con búsqueda web para consultas culinarias

---

## Características

### Interfaz de Usuario
- Diseño basado en wireframe con identidad visual Baure
- Colores culturales: Terracota (#d97706), Verde (#059669), Azul (#0ea5e9), Amarillo (#eab308)
- Modo oscuro/claro
- Diseño responsive (mobile-first)
- Navegación intuitiva por secciones

### Recetas Ancestrales
- Catálogo completo de recetas tradicionales
- Búsqueda por nombre, ingredientes o descripción
- Imágenes de cada receta
- Información detallada: ingredientes, preparación, utensilios, conservación
- Fuentes de información (personas de la comunidad)

### Asistente IA (Gemini 2.0)
- Chat contextual por receta
- Búsqueda web automática para consultas modernas
- Respuestas estructuradas en Markdown
- Combina conocimiento ancestral con información actual

### Recuentos de Vida
- Testimonios de la comunidad
- Historias personales y memorias
- Temas relacionados (tags)
- Fotografías de personas

### Cultura Baure
- Artículos categorizados: Historia, Tradiciones, Lengua, Territorio, Cocina
- Filtros por categoría
- Contenido enriquecido con imágenes
- Subsecciones y temas relacionados

---

## Tecnologías

### Frontend
- **React** 19.1.1 - UI framework
- **Vite** 7.1.12 - Build tool
- **React Router** 7.1.3 - Navegación
- **Axios** 1.7.9 - HTTP client
- **React Markdown** 10.0.1 - Renderizado de Markdown
- **Public Sans** - Tipografía
- **Material Symbols** - Iconografía

### Backend
- **Node.js** con **Express** 5.1.0
- **MongoDB** con **Mongoose** 8.9.5
- **Google Generative AI** (@google/generative-ai) - Gemini 2.0 Flash
- **dotenv** 16.4.7 - Variables de entorno
- **CORS** 2.8.5 - Políticas de acceso

### Base de Datos
- **MongoDB Atlas** (cloud)
- 3 colecciones: Recipes, LifeStories, CulturalData

### IA
- **Gemini 2.0 Flash** con Google Search grounding
- Prompts optimizados para cocina ancestral

---

## Instalación

### Requisitos Previos
- Node.js 18+ y npm
- Cuenta MongoDB Atlas
- API Key de Google Gemini

### 1. Clonar el Repositorio
```bash
git clone https://github.com/joelspa/miBaure.git
cd miBaure
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/baure
GEMINI_API_KEY=tu_api_key_de_gemini
PORT=5000
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
```

Crear archivo `.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Poblar Base de Datos
```bash
cd ../backend
node seedAll.js
```

### 5. Iniciar Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## Uso

### Explorar Recetas
1. Navega a la página principal
2. Usa la barra de búsqueda para filtrar recetas
3. Haz clic en una receta para ver detalles completos

### Consultar al Asistente IA
1. En el detalle de una receta, haz clic en "Consulta Ancestral"
2. Escribe tu pregunta (ej: "¿Cómo hacer esta receta vegana?")
3. El asistente responderá con información contextual

### Ver Recuentos de Vida
1. Navega a "Recuentos de Vida"
2. Lee testimonios de la comunidad Baure
3. Explora temas relacionados

### Explorar Cultura
1. Navega a "Cultura Baure"
2. Filtra por categoría (Historia, Tradiciones, Lengua, etc.)
3. Lee artículos y explora imágenes

---

## 📁 Estructura del Proyecto

```
miBaure/
├── backend/
│   ├── config/
│   │   └── config.js              # Configuración centralizada
│   ├── controllers/
│   │   ├── aiController.js        # Lógica del chatbot IA
│   │   ├── recipeController.js    # CRUD de recetas
│   │   ├── lifeStoryController.js # CRUD de recuentos
│   │   └── culturalDataController.js
│   ├── models/
│   │   ├── Recipe.js              # Schema de recetas
│   │   ├── LifeStory.js           # Schema de recuentos
│   │   └── CulturalData.js        # Schema de datos culturales
│   ├── routes/
│   │   ├── recipes.js             # Rutas de recetas
│   │   ├── ai.js                  # Rutas del chatbot
│   │   ├── lifeStories.js
│   │   └── culturalData.js
│   ├── utils/
│   │   └── promptTemplates.js     # Plantillas de prompts IA
│   ├── context/
│   │   └── baure-context.txt      # Contexto para IA
│   ├── server.js                  # Punto de entrada
│   ├── seedAll.js                 # Script de población de DB
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── images/                # Imágenes de recetas/cultura
│   ├── src/
│   │   ├── components/
│   │   │   ├── RecipeList.jsx     # Lista de recetas
│   │   │   ├── RecipeDetail.jsx   # Detalle de receta
│   │   │   ├── ChatSection.jsx    # Chatbot IA
│   │   │   ├── LifeStories.jsx    # Recuentos de vida
│   │   │   ├── BaureCulture.jsx   # Datos culturales
│   │   │   └── Loading.jsx        # Componente de carga
│   │   ├── config/
│   │   │   └── constants.js       # Constantes globales
│   │   ├── services/
│   │   │   └── api.service.js     # Servicio API centralizado
│   │   ├── App.jsx                # Componente principal
│   │   ├── App.css                # Estilos globales
│   │   ├── main.jsx               # Punto de entrada
│   │   └── index.css
│   └── package.json
│
├── README.md                      # Este archivo
├── API.md                         # Documentación de API
├── ARQUITECTURA.md                # Arquitectura del proyecto
└── GUIA-DESARROLLO.md             # Guía para desarrolladores
```

---

## Documentación

- **[API.md](./API.md)** - Especificación completa de endpoints
- **[ARQUITECTURA.md](./ARQUITECTURA.md)** - Diseño y patrones del sistema
- **[GUIA-DESARROLLO.md](./GUIA-DESARROLLO.md)** - Guía para desarrolladores
- **[REFACTORIZACION-CODIGO-LIMPIO.md](./REFACTORIZACION-CODIGO-LIMPIO.md)** - Mejoras de código limpio

---

## Diseño

El proyecto sigue un diseño basado en wireframes con:

- **Identidad Visual Baure**: Colores culturales (terracota, verde, azul, amarillo)
- **Tipografía**: Public Sans (pesos 400, 500, 700, 900)
- **Iconografía**: Material Symbols Outlined
- **Layout**: Full-width responsive con padding adaptativo
- **Temas**: Modo claro/oscuro

---

## Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Guías de Contribución
- Sigue los principios de Código Limpio y KISS
- Escribe código autodocumentado
- Agrega tests cuando sea posible
- Mantén la consistencia con el estilo existente

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## Autores

- **Joel** - Desarrollo principal - [@joelspa](https://github.com/joelspa)

---

## Agradecimientos

- Comunidad Baure por compartir su conocimiento ancestral
- Pueblo de Baures, Beni, Bolivia
- Contribuidores del proyecto

---

## Contacto

Para preguntas o sugerencias:
- GitHub Issues: [miBaure/issues](https://github.com/joelspa/miBaure/issues)
- Email: contacto@archivobaure.org

---

## Roadmap

### Versión Actual (1.0.0)
- Catálogo de recetas ancestrales
- Chatbot IA con Gemini 2.0
- Recuentos de vida
- Datos culturales
- Diseño responsive

### Próximas Versiones
- Autenticación de usuarios
- Sistema de favoritos
- Comentarios en recetas
- Compartir en redes sociales
- PWA (Progressive Web App)
- Multiidioma (Español/Baure)
- Versión móvil nativa

---

<div align="center">
  
**Hecho para preservar la cultura Baure**

[Volver arriba](#archivo-baure---cocina-memoria-y-territorio)

</div>
