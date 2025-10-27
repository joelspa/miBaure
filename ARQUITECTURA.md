# Arquitectura del Proyecto - Archivo Baure

Descripción detallada de la arquitectura, patrones de diseño y decisiones técnicas del sistema.

---

## Resumen en 1 minuto

- Frontend: React + Vite, componentes con rutas (`RecipeList`, `RecipeDetail`, `LifeStories`, `BaureCulture`, `AdminPanel`).
- Backend: Express + Mongoose, rutas REST (`/api/recipes`, `/api/life-stories`, `/api/cultural-data`, `/api/chat`).
- IA: Gemini Flash con prompts contextuales y detección simple de búsqueda web.
- Datos: MongoDB Atlas (3 colecciones principales) y archivo de contexto `backend/context/baure-context.txt`.

Si necesitas el detalle, sigue leyendo.

---

## Tabla de Contenidos

- [Visión General](#visión-general)
- [Arquitectura de Alto Nivel](#arquitectura-de-alto-nivel)
- [Backend](#backend)
- [Frontend](#frontend)
- [Base de Datos](#base-de-datos)
- [Integración con IA](#integración-con-ia)
- [Flujo de Datos](#flujo-de-datos)
- [Patrones de Diseño](#patrones-de-diseño)
- [Seguridad](#seguridad)

---

## Visión General

**Archivo Baure** es una aplicación web full-stack con arquitectura **cliente-servidor** que sigue el patrón **MVC** (Modelo-Vista-Controlador) en el backend y **Component-Based Architecture** en el frontend.

### Principios Arquitectónicos

1. **Separación de Responsabilidades** - Frontend y Backend completamente independientes
2. **API RESTful** - Comunicación estandarizada vía HTTP/JSON
3. **Código Limpio** - Principios SOLID, DRY, KISS
4. **Escalabilidad** - Arquitectura modular y extensible
5. **Mantenibilidad** - Código autodocumentado y bien estructurado

---

## Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTE                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │              React App (Frontend)                   │     │
│  │  - Componentes React                                │     │
│  │  - React Router (Navegación)                        │     │
│  │  - API Service (HTTP Client)                        │     │
│  │  - Estado Local (useState)                          │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/JSON (REST API)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVIDOR                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │           Express.js Server (Backend)               │     │
│  │  - Rutas (Routes)                                   │     │
│  │  - Controladores (Controllers)                      │     │
│  │  - Modelos (Mongoose Models)                        │     │
│  │  - Middleware (CORS, JSON Parser)                   │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴──────────────┐
              │                            │
              ▼                            ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   MongoDB (DB)           │  │  Google Gemini 2.0       │
│  - Recipes Collection    │  │  - AI Assistant          │
│  - LifeStories Collection│  │  - Web Search Grounding  │
│  - CulturalData Collection  │  - Prompt Engineering    │
└──────────────────────────┘  └──────────────────────────┘
```

---

## Backend

### Stack Tecnológico

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Base de Datos**: MongoDB + Mongoose ODM
- **IA**: Google Generative AI (Gemini 2.0 Flash)
- **Configuración**: dotenv

### Estructura MVC

```
backend/
├── config/              # Configuración centralizada
│   └── config.js        # Variables de entorno
├── models/              # Modelos de datos (Mongoose Schemas)
│   ├── Recipe.js
│   ├── LifeStory.js
│   └── CulturalData.js
├── controllers/         # Lógica de negocio
│   ├── recipeController.js
│   ├── aiController.js
│   ├── lifeStoryController.js
│   └── culturalDataController.js
├── routes/              # Definición de endpoints
│   ├── recipes.js
│   ├── ai.js
│   ├── lifeStories.js
│   └── culturalData.js
├── utils/               # Utilidades
│   └── promptTemplates.js
├── context/             # Datos de contexto
│   └── baure-context.txt
└── server.js            # Punto de entrada
```

### Flujo de Request

```
Request → Middleware (CORS, JSON) → Router → Controller → Model → Database
                                                    ↓
Response ← Middleware ← Router ← Controller ← Model ← Database
```

### Modelos de Datos

#### Recipe Schema
```javascript
{
  name: String,              // Nombre de la receta
  baureName: String,         // Nombre en lengua Baure
  description: String,       // Descripción
  ingredients: [String],     // Lista de ingredientes
  preparation: String,       // Pasos de preparación
  utensils: [String],        // Utensilios necesarios
  consumption: String,       // Forma de consumo
  conservation: String,      // Método de conservación
  sourcePerson: String,      // Fuente de información
  tags: [String],            // Etiquetas
  imageUrl: String,          // URL de imagen principal
  images: [{                 // Imágenes adicionales
    url: String,
    caption: String
  }]
}
```

#### LifeStory Schema
```javascript
{
  title: String,             // Título del recuento
  personName: String,        // Nombre de la persona
  age: Number,               // Edad
  community: String,         // Comunidad
  story: String,             // Historia completa
  relatedThemes: [String],   // Temas relacionados
  photoUrl: String,          // Foto de la persona
  recordedDate: Date,        // Fecha de registro
  recordedBy: String         // Quién registró
}
```

#### CulturalData Schema
```javascript
{
  title: String,             // Título del artículo
  category: String,          // Categoría (enum)
  content: String,           // Contenido principal
  subsections: [{            // Subsecciones
    subtitle: String,
    text: String
  }],
  images: [{                 // Imágenes
    url: String,
    caption: String
  }],
  sources: [String],         // Fuentes de información
  relatedTopics: [String]    // Temas relacionados
}
```

### Controladores

#### Recipe Controller
```javascript
exports.getAllRecipes = async (req, res) => {
  // Obtiene todas las recetas de MongoDB
  // Maneja errores con try-catch
}

exports.getRecipeById = async (req, res) => {
  // Busca receta por ID
  // Retorna 404 si no existe
}
```

#### AI Controller
```javascript
exports.chatWithGemma = async (req, res) => {
  // 1. Valida entrada (question, recipeData)
  // 2. Detecta si necesita búsqueda web
  // 3. Construye prompt contextual
  // 4. Llama a Gemini 2.0 Flash
  // 5. Procesa y formatea respuesta
  // 6. Retorna answer + usedWebSearch
}
```

---

## Frontend

### Stack Tecnológico

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.12
- **Routing**: React Router 7.1.3
- **HTTP Client**: Axios 1.7.9
- **Markdown**: React Markdown 10.0.1
- **Estilos**: CSS Modules + CSS Variables

### Arquitectura de Componentes

```
App (Router)
├── Header
│   ├── Logo
│   ├── Theme Toggle
│   └── Home Button
├── Navigation
│   ├── Recetas Link
│   ├── Recuentos Link
│   └── Cultura Link
├── Main Content (Routes)
│   ├── RecipeList
│   │   ├── SearchBar
│   │   └── RecipeCard[]
│   ├── RecipeDetail
│   │   ├── Breadcrumbs
│   │   ├── RecipeHero
│   │   ├── ChatSection (opcional)
│   │   │   ├── ChatMessages
│   │   │   └── ChatInput
│   │   └── RecipeSections[]
│   ├── LifeStories
│   │   └── StoryCard[]
│   └── BaureCulture
│       ├── CategoryFilters
│       └── CulturalArticle[]
└── Footer
```

### Servicios y Utilidades

#### API Service (`api.service.js`)
```javascript
const apiService = {
  getAllRecipes: () => axios.get(`${API_URL}/api/recipes`),
  getRecipeById: (id) => axios.get(`${API_URL}/api/recipes/${id}`),
  getAllStories: () => axios.get(`${API_URL}/api/life-stories`),
  getAllCulturalData: () => axios.get(`${API_URL}/api/cultural-data`),
  askAI: (question, recipeData) => axios.post(`${API_URL}/api/chat`, {...})
};
```

#### Constants (`constants.js`)
```javascript
export const API_URL = import.meta.env.VITE_API_URL;
export const ERROR_MESSAGES = { ... };
export const LOADING_MESSAGES = { ... };
export const PLACEHOLDERS = { ... };
export const CULTURAL_CATEGORIES = [ ... ];
```

### Componentes Reutilizables

#### Loading Component
```jsx
<Loading 
  message="Cargando recetas..." 
  error={false} 
  icon="hourglass_empty" 
/>
```

#### ChatSection Component
```jsx
<ChatSection recipe={recipeData} />
// Maneja todo el estado y lógica del chatbot
```

### Estado y Gestión de Datos

- **Estado Local**: `useState` para estado de componente
- **Side Effects**: `useEffect` para llamadas API
- **Navegación**: `useParams`, `Link`, `useNavigate` de React Router

Ejemplo:
```javascript
const [recipes, setRecipes] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  apiService.getAllRecipes()
    .then(res => {
      setRecipes(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, []);
```

---

## Base de Datos

### MongoDB Atlas

**Tipo**: Base de datos NoSQL orientada a documentos

**Colecciones**:
1. `recipes` - Recetas ancestrales
2. `lifestories` - Recuentos de vida
3. `culturaldata` - Datos culturales

### Índices

```javascript
// Índices automáticos
_id: ObjectId (índice único automático)

// Índices recomendados para producción
recipes: { name: 1, tags: 1 }
lifestories: { personName: 1, community: 1 }
culturaldata: { category: 1, title: 1 }
```

### Seeding

Script `seedAll.js` para poblar la base de datos:

```javascript
// 1. Conecta a MongoDB
// 2. Limpia colecciones existentes
// 3. Inserta datos de recetas (7 documentos)
// 4. Inserta recuentos de vida (4 documentos)
// 5. Inserta datos culturales (6 documentos)
// 6. Cierra conexión
```

---

## Integración con IA

### Google Gemini 2.0 Flash

**Modelo**: `gemini-2.0-flash`

**Características**:
- Generación de texto rápida y eficiente
- Búsqueda web integrada (grounding)
- Prompts personalizados

### Arquitectura de Prompts

```
backend/utils/promptTemplates.js
├── buildRecipeContext(recipeData)      # Construye contexto de receta
├── buildWebSearchPrompt(...)           # Prompt con búsqueda web
└── buildLocalPrompt(...)               # Prompt con contexto local
```

### Flujo del Chatbot

```
1. Usuario escribe pregunta
   ↓
2. Frontend envía POST /api/chat
   ↓
3. Backend detecta necesidad de web search
   ↓
4. Construye prompt contextual
   ↓
5. Llama a Gemini 2.0 Flash
   ↓
6. Procesa respuesta (limita a 600-800 chars)
   ↓
7. Retorna respuesta en Markdown
   ↓
8. Frontend renderiza con ReactMarkdown
```

### Detección de Búsqueda Web

```javascript
function needsWebSearch(question) {
  const keywords = [
    'vegana', 'vegetariana', 'sin gluten',
    'proteína', 'vitaminas', 'calorías',
    'alternativa', 'sustituto', 'reemplazar',
    'fitness', 'moderno', 'fusión'
  ];
  
  return keywords.some(k => question.toLowerCase().includes(k));
}
```

---

## Flujo de Datos

### Cargar Recetas

```
RecipeList Component
    ↓ useEffect()
apiService.getAllRecipes()
    ↓ axios.get()
Express Server
    ↓ /api/recipes
recipeController.getAllRecipes()
    ↓ Recipe.find()
MongoDB Atlas
    ↓ resultados
recipeController
    ↓ res.json(recipes)
React Component
    ↓ setRecipes(data)
UI Update (render)
```

### Chat con IA

```
ChatSection Component
    ↓ handleSubmit()
apiService.askAI(question, recipeData)
    ↓ axios.post()
Express Server
    ↓ /api/chat
aiController.chatWithGemma()
    ↓ needsWebSearch()
    ↓ buildPrompt()
    ↓ generateContent()
Google Gemini API
    ↓ respuesta
aiController
    ↓ procesa y limita texto
    ↓ res.json({ answer, usedWebSearch })
ChatSection
    ↓ setChatHistory()
ReactMarkdown render
```

---

## Patrones de Diseño

### Backend

1. **MVC (Modelo-Vista-Controlador)**
   - Modelos: Mongoose Schemas
   - Controladores: Lógica de negocio
   - Vistas: JSON responses (API REST)

2. **Repository Pattern**
   - Mongoose actúa como capa de abstracción sobre MongoDB

3. **Dependency Injection**
   - Configuración centralizada en `config.js`
   - Importada donde se necesita

4. **Factory Pattern**
   - `promptTemplates.js` genera prompts según contexto

### Frontend

1. **Component-Based Architecture**
   - Componentes reutilizables (Loading, ChatSection)
   - Composición de componentes

2. **Service Pattern**
   - `api.service.js` centraliza llamadas HTTP

3. **Container/Presentational Pattern**
   - Componentes contenedores: manejan estado y lógica
   - Componentes presentacionales: solo UI

4. **Custom Hooks (potencial)**
   - Lógica de fetch reutilizable

---

## Seguridad

### Variables de Entorno

```bash
# Backend .env
MONGODB_URI=mongodb+srv://...    # No exponer
GEMINI_API_KEY=AIza...           # No exponer
PORT=5000                        # Configurable

# Frontend .env
VITE_API_URL=http://localhost:5000  # Solo URL pública
```

### CORS

```javascript
app.use(cors()); // Actualmente: permite todos los orígenes
```

**Producción** (recomendado):
```javascript
app.use(cors({
  origin: ['https://archivobaure.com'],
  methods: ['GET', 'POST'],
  credentials: true
}));
```

### Validación de Entrada

```javascript
// AI Controller
if (!question) {
  return res.status(400).json({ message: 'No se proporcionó pregunta' });
}
```

### Manejo de Errores

```javascript
try {
  const recipes = await Recipe.find();
  res.json(recipes);
} catch (err) {
  res.status(500).json({ message: err.message });
}
```

---

## Diagrama de Arquitectura Completo

```
┌──────────────────────────────────────────────────────────────┐
│                       NAVEGADOR                               │
│  ┌────────────────────────────────────────────────────┐      │
│  │                   React App                         │      │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────┐  │      │
│  │  │   Routes     │  │  Components  │  │ Services│  │      │
│  │  │ - /          │  │ - RecipeList │  │ - API   │  │      │
│  │  │ - /recipe/:id│  │ - RecipeDetail│ │ - Constants│     │
│  │  │ - /recuentos │  │ - LifeStories│  └─────────┘  │      │
│  │  │ - /cultura   │  │ - BaureCulture                │      │
│  │  │              │  │ - ChatSection │               │      │
│  │  │              │  │ - Loading     │               │      │
│  │  └──────────────┘  └──────────────┘               │      │
│  └────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────┘
                            │
                            │ REST API (HTTP/JSON)
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER                             │
│  ┌────────────────────────────────────────────────────┐      │
│  │  Middleware: CORS, JSON Parser                     │      │
│  └────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────┐      │
│  │  Routes                                             │      │
│  │  - /api/recipes       → recipeController           │      │
│  │  - /api/chat          → aiController               │      │
│  │  - /api/life-stories  → lifeStoryController        │      │
│  │  - /api/cultural-data → culturalDataController     │      │
│  └────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────┐      │
│  │  Controllers                                        │      │
│  │  - Lógica de negocio                               │      │
│  │  - Validación                                       │      │
│  │  - Manejo de errores                               │      │
│  └────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────┐      │
│  │  Models (Mongoose)                                  │      │
│  │  - Recipe Schema                                    │      │
│  │  - LifeStory Schema                                │      │
│  │  - CulturalData Schema                             │      │
│  └────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────┘
          │                                    │
          │                                    │
          ▼                                    ▼
┌──────────────────────┐           ┌─────────────────────────┐
│   MongoDB Atlas      │           │  Google Gemini 2.0      │
│  ┌────────────────┐  │           │  ┌──────────────────┐  │
│  │ recipes        │  │           │  │ generateContent  │  │
│  │ lifestories    │  │           │  │ googleSearch     │  │
│  │ culturaldata   │  │           │  │ promptTemplates  │  │
│  └────────────────┘  │           │  └──────────────────┘  │
└──────────────────────┘           └─────────────────────────┘
```

---

## Escalabilidad

### Horizontal Scaling

- Backend stateless → Fácil de escalar horizontalmente
- Load balancer para distribuir tráfico
- MongoDB Atlas auto-scaling

### Vertical Scaling

- Aumentar recursos del servidor
- Optimizar queries de MongoDB
- Cache de respuestas frecuentes

### Mejoras Futuras

1. **Redis Cache** para recetas populares
2. **CDN** para imágenes estáticas
3. **Lazy Loading** de componentes React
4. **Server-Side Rendering** con Next.js
5. **GraphQL** en lugar de REST
6. **Microservicios** para separar IA de API principal

---

<div align="center">

**Arquitectura diseñada para escalabilidad, mantenibilidad y rendimiento**

[Volver arriba](#arquitectura-del-proyecto---archivo-baure)

</div>
