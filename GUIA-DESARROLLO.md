# Guía de Desarrollo - Archivo Baure

Guía completa para desarrolladores que deseen contribuir o entender el proyecto.

---

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estructura del Código](#estructura-del-código)
- [Convenciones de Código](#convenciones-de-código)
- [Flujo de Desarrollo](#flujo-de-desarrollo)
- [Testing](#testing)
- [Debugging](#debugging)
- [Despliegue](#despliegue)
- [Troubleshooting](#troubleshooting)

---

## Requisitos Previos

### Software Necesario

- **Node.js** 18+ y **npm** 9+
- **Git** para control de versiones
- **Editor de código** (VS Code recomendado)
- **MongoDB Compass** (opcional, para explorar BD)
- **Postman** o **Thunder Client** (opcional, para probar API)

### Cuentas Requeridas

1. **MongoDB Atlas** - Base de datos en la nube
   - Crear cuenta en [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Crear cluster gratuito
   - Obtener connection string

2. **Google AI Studio** - Para API de Gemini
   - Ir a [aistudio.google.com](https://aistudio.google.com/)
   - Obtener API key gratuita

### Conocimientos Recomendados

- JavaScript ES6+
- React y Hooks
- Node.js y Express
- MongoDB y Mongoose
- REST APIs
- Git y GitHub

---

## Configuración del Entorno

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
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/baure?retryWrites=true&w=majority
GEMINI_API_KEY=AIzaSy...
PORT=5000
NODE_ENV=development
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

Deberías ver:
```
✓ Conectado a MongoDB
✓ Colecciones limpiadas
✓ 7 recetas insertadas
✓ 4 recuentos de vida insertados
✓ 6 datos culturales insertados
🎉 ¡Base de datos poblada exitosamente!
```

### 5. Verificar Instalación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Deberías ver:
```
✓ Conectado a MongoDB
✓ Contexto de cocina Baure cargado
✓ Servidor corriendo en puerto 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Deberías ver:
```
VITE v7.1.12  ready in 250 ms
➜  Local:   http://localhost:5173/
```

---

## Estructura del Código

### Backend

```
backend/
├── config/
│   └── config.js           # Configuración centralizada
│       - Exporta variables de entorno
│       - Usado por todos los módulos
│
├── controllers/
│   ├── recipeController.js     # CRUD de recetas
│   │   - getAllRecipes()
│   │   - getRecipeById(id)
│   │
│   ├── aiController.js         # Lógica del chatbot
│   │   - chatWithGemma()
│   │   - needsWebSearch()
│   │
│   ├── lifeStoryController.js  # CRUD de recuentos
│   │   - getAllStories()
│   │
│   └── culturalDataController.js # CRUD de datos culturales
│       - getAllCulturalData()
│       - getCulturalDataByCategory()
│
├── models/
│   ├── Recipe.js           # Schema de Mongoose
│   │   - Campos: name, baureName, ingredients, etc.
│   │
│   ├── LifeStory.js       # Schema de recuentos
│   │   - Campos: title, personName, story, etc.
│   │
│   └── CulturalData.js    # Schema de datos culturales
│       - Campos: title, category, content, etc.
│
├── routes/
│   ├── recipes.js         # GET /api/recipes
│   │                      # GET /api/recipes/:id
│   │
│   ├── ai.js              # POST /api/chat
│   │
│   ├── lifeStories.js     # GET /api/life-stories
│   │
│   └── culturalData.js    # GET /api/cultural-data
│                          # GET /api/cultural-data/category/:category
│
├── utils/
│   └── promptTemplates.js # Plantillas para IA
│       - buildRecipeContext()
│       - buildWebSearchPrompt()
│       - buildLocalPrompt()
│
├── context/
│   └── baure-context.txt  # Contexto cultural para IA
│
├── server.js              # Punto de entrada
│   - Configura Express
│   - Conecta a MongoDB
│   - Registra rutas
│
└── seedAll.js             # Población de BD
    - Inserta datos de prueba
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── RecipeList.jsx       # Lista de recetas
│   │   │   - useState: recipes, loading, error, searchTerm
│   │   │   - useEffect: fetch recipes
│   │   │   - Render: SearchBar + RecipeCard grid
│   │   │
│   │   ├── RecipeDetail.jsx     # Detalle de receta
│   │   │   - useState: recipe, loading, showChatbot
│   │   │   - useParams: obtiene ID de URL
│   │   │   - Render: Hero + Sections + ChatSection
│   │   │
│   │   ├── ChatSection.jsx      # Chatbot IA
│   │   │   - Props: recipe
│   │   │   - useState: question, chatHistory, isAskingAI
│   │   │   - handleAskAI(): llama a API
│   │   │   - Render: Messages + Input
│   │   │
│   │   ├── LifeStories.jsx      # Recuentos de vida
│   │   │   - useState: stories, loading, error
│   │   │   - Render: Grid de StoryCards
│   │   │
│   │   ├── BaureCulture.jsx     # Datos culturales
│   │   │   - useState: culturalData, selectedCategory
│   │   │   - Render: Filters + Articles
│   │   │
│   │   └── Loading.jsx          # Componente reutilizable
│   │       - Props: message, error, icon
│   │
│   ├── config/
│   │   └── constants.js         # Constantes globales
│   │       - API_URL
│   │       - ERROR_MESSAGES
│   │       - LOADING_MESSAGES
│   │       - PLACEHOLDERS
│   │       - CULTURAL_CATEGORIES
│   │
│   ├── services/
│   │   └── api.service.js       # Servicio HTTP
│   │       - getAllRecipes()
│   │       - getRecipeById(id)
│   │       - askAI(question, recipeData)
│   │       - getAllStories()
│   │       - getAllCulturalData()
│   │
│   ├── App.jsx                  # Componente raíz
│   │   - useState: darkMode
│   │   - Routes: /, /recipe/:id, /recuentos, /cultura
│   │   - Render: Header + Nav + Routes + Footer
│   │
│   ├── App.css                  # Estilos globales
│   │   - CSS Variables para temas
│   │   - Responsive design
│   │   - Utilidades
│   │
│   ├── main.jsx                 # Punto de entrada
│   │   - Renderiza <App />
│   │
│   └── index.css                # Reset CSS básico
│
└── public/
    └── images/                  # Imágenes estáticas
        ├── recipes/
        ├── people/
        └── culture/
```

---

## Convenciones de Código

### Nombres de Archivos

- **Componentes React**: PascalCase (ej: `RecipeList.jsx`)
- **Servicios**: camelCase (ej: `api.service.js`)
- **Utilidades**: camelCase (ej: `promptTemplates.js`)
- **Modelos**: PascalCase (ej: `Recipe.js`)
- **Rutas**: camelCase (ej: `recipes.js`)

### Nombres de Variables

```javascript
// ✅ Bien
const [recipes, setRecipes] = useState([]);
const API_URL = 'http://localhost:5000';
const ERROR_MESSAGES = { ... };

// ❌ Mal
const [recipesList, updateRecipes] = useState([]);
const apiUrl = 'http://localhost:5000';
const error_messages = { ... };
```

### Nombres de Funciones

```javascript
// ✅ Bien - Verbos descriptivos
const getAllRecipes = async () => { ... }
const handleSubmit = (e) => { ... }
const needsWebSearch = (question) => { ... }

// ❌ Mal
const recipes = async () => { ... }
const submit = (e) => { ... }
const webSearch = (question) => { ... }
```

### Imports

```javascript
// ✅ Bien - Ordenados por tipo
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import Loading from './Loading';
import { ERROR_MESSAGES } from '../config/constants';

// ❌ Mal - Desordenados
import Loading from './Loading';
import { useState } from 'react';
import apiService from '../services/api.service';
import { useEffect } from 'react';
```

### Comentarios

```javascript
// ✅ Bien - Explica POR QUÉ, no QUÉ
// Detecta si la pregunta requiere búsqueda web para respuestas modernas
const needsWebSearch = (question) => { ... }

// ❌ Mal - Obvia
// Esta función busca en la web
const needsWebSearch = (question) => { ... }
```

### Código Limpio

```javascript
// ✅ Bien - Funciones pequeñas y específicas
const buildRecipeContext = (recipeData) => {
  if (!recipeData) return '';
  return `...contexto...`;
}

// ❌ Mal - Función muy larga
const chatWithGemma = async (req, res) => {
  // 200 líneas de código
}
```

---

## Flujo de Desarrollo

### 1. Crear Nueva Feature

```bash
# Crear rama desde main
git checkout main
git pull origin main
git checkout -b feature/nombre-feature

# Ejemplo
git checkout -b feature/recipe-comments
```

### 2. Desarrollar

```bash
# Hacer cambios
# Testear localmente
npm run dev

# Verificar que funciona
```

### 3. Commit

```bash
# Agregar cambios
git add .

# Commit descriptivo
git commit -m "feat: Agrega sistema de comentarios en recetas"

# Tipos de commit:
# feat: Nueva funcionalidad
# fix: Corrección de bug
# refactor: Refactorización de código
# docs: Cambios en documentación
# style: Cambios de formato (no afectan lógica)
# test: Agregar o modificar tests
```

### 4. Push y Pull Request

```bash
# Push a GitHub
git push origin feature/recipe-comments

# Crear Pull Request en GitHub
# Describir cambios
# Solicitar review
```

### 5. Merge

```bash
# Después de aprobación
# Merge en GitHub
# Borrar rama local
git checkout main
git pull origin main
git branch -d feature/recipe-comments
```

---

## Testing

### Testing Manual

**Backend:**
```bash
# Probar endpoint con curl
curl http://localhost:5000/api/recipes

# Probar chatbot
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"Hola, ¿qué recetas conoces?"}'
```

**Frontend:**
```bash
# Iniciar app
npm run dev

# Probar manualmente:
# - Navegación
# - Búsqueda de recetas
# - Chatbot
# - Modo oscuro
# - Responsive design
```

### Testing con Postman

1. Importar colección de endpoints
2. Configurar variable `{{API_URL}}` = `http://localhost:5000`
3. Probar cada endpoint

### Tests Automatizados (Futuro)

```bash
# Backend (Jest)
npm test

# Frontend (Vitest)
npm run test
```

---

## Debugging

### Backend

**Logs:**
```javascript
console.log('✓ Conectado a MongoDB');
console.log('🌐 Usando búsqueda web...');
console.error('❌ Error:', err.message);
```

**Debugger de Node:**
```bash
# Agregar en código
debugger;

# Ejecutar con inspect
node --inspect server.js

# Abrir Chrome DevTools
chrome://inspect
```

### Frontend

**React DevTools:**
- Instalar extensión de Chrome
- Inspeccionar componentes
- Ver estado y props

**Console.log:**
```javascript
console.log('Recipes:', recipes);
console.log('Loading:', loading);
console.error('Error:', error);
```

**Network Tab:**
- Ver requests HTTP
- Verificar payloads
- Inspeccionar respuestas

---

## Despliegue

### Producción

**Backend (Railway/Render):**
1. Conectar repo de GitHub
2. Configurar variables de entorno
3. Deploy automático en push a `main`

**Frontend (Vercel/Netlify):**
1. Conectar repo de GitHub
2. Configurar `VITE_API_URL` con URL de producción
3. Deploy automático en push a `main`

**MongoDB:**
- Usar MongoDB Atlas (ya configurado)
- Whitelist IPs de producción

### Variables de Entorno

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://...
GEMINI_API_KEY=AIza...
PORT=5000
NODE_ENV=production
```

**Frontend (.env.production):**
```env
VITE_API_URL=https://api.archivobaure.com
```

---

## Troubleshooting

### Error: "EADDRINUSE: address already in use"

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

### Error: "MongoNetworkError"

```bash
# Verificar connection string
# Verificar whitelist de IPs en MongoDB Atlas
# Verificar firewall
```

### Error: "API Key no válida"

```bash
# Verificar GEMINI_API_KEY en .env
# Regenerar API key en Google AI Studio
# Verificar límites de uso
```

### Error: "Module not found"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Frontend no se conecta al Backend

```bash
# Verificar VITE_API_URL en .env
# Verificar que backend esté corriendo
# Verificar CORS en backend
```

---

## Recursos Adicionales

- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Vite Docs](https://vitejs.dev/)
- [Google AI Docs](https://ai.google.dev/)

---

## Contribución

1. Fork el proyecto
2. Crear rama de feature
3. Hacer commits descriptivos
4. Push y crear Pull Request
5. Esperar review

**Toda contribución es bienvenida**

---

<div align="center">

**¿Dudas?** Abre un issue en [GitHub](https://github.com/joelspa/miBaure/issues)

[Volver arriba](#guía-de-desarrollo---archivo-baure)

</div>
