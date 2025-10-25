# Documentación API - Archivo Baure

Especificación completa de los endpoints REST del backend.

**Base URL**: `http://localhost:5000`

---

## Tabla de Contenidos

- [Autenticación](#autenticación)
- [Endpoints de Recetas](#endpoints-de-recetas)
- [Endpoints de IA](#endpoints-de-ia)
- [Endpoints de Recuentos de Vida](#endpoints-de-recuentos-de-vida)
- [Endpoints de Datos Culturales](#endpoints-de-datos-culturales)
- [Códigos de Estado](#códigos-de-estado)
- [Ejemplos de Uso](#ejemplos-de-uso)

---

## Autenticación

**Estado Actual**: No requiere autenticación (API pública)

**Futuro**: Se implementará autenticación JWT para operaciones de escritura.

---

## Endpoints de Recetas

### GET `/api/recipes`

Obtiene todas las recetas disponibles.

**Método**: `GET`

**Headers**: Ninguno requerido

**Query Parameters**: Ninguno

**Respuesta Exitosa** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Sopa de bucheres",
    "baureName": "Ejaj to Woshor",
    "description": "Una de las preparaciones típicas...",
    "ingredients": [
      "Buchere (pescado de agua dulce)",
      "Agua",
      "Sal",
      "Urucú (para dar color)"
    ],
    "preparation": "Se lavan los pescados sin sacar escamas...",
    "utensils": ["Olla grande", "Cucharón", "Hornilla o leña"],
    "consumption": "Consumido en desayuno o almuerzo...",
    "conservation": "Se consume el mismo día...",
    "sourcePerson": "Adil Arredondo (Jasiaquiri)",
    "tags": ["Río", "Tradicional"],
    "imageUrl": "/images/recipes/sopa-bucheres.jpg",
    "images": [
      {
        "url": "/images/recipes/sopa-bucheres-prep.jpg",
        "caption": "Preparación tradicional"
      }
    ],
    "createdAt": "2025-10-24T00:00:00.000Z",
    "updatedAt": "2025-10-24T00:00:00.000Z"
  }
]
```

**Errores**:
- `500`: Error del servidor

---

### GET `/api/recipes/:id`

Obtiene una receta específica por ID.

**Método**: `GET`

**URL Parameters**:
- `id` (string, requerido): MongoDB ObjectId de la receta

**Respuesta Exitosa** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Sopa de bucheres",
  "baureName": "Ejaj to Woshor",
  "description": "Una de las preparaciones típicas...",
  "ingredients": ["..."],
  "preparation": "...",
  "utensils": ["..."],
  "consumption": "...",
  "conservation": "...",
  "sourcePerson": "Adil Arredondo (Jasiaquiri)",
  "tags": ["Río", "Tradicional"],
  "imageUrl": "/images/recipes/sopa-bucheres.jpg"
}
```

**Errores**:
- `404`: Receta no encontrada
- `500`: Error del servidor

---

## Endpoints de IA

### POST `/api/chat`

Envía una pregunta al asistente IA (Gemini 2.0 Flash).

**Método**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "question": "¿Cómo hacer esta receta vegana?",
  "recipeData": {
    "name": "Sopa de bucheres",
    "baureName": "Ejaj to Woshor",
    "description": "...",
    "ingredients": ["..."],
    "preparation": "...",
    "utensils": ["..."],
    "consumption": "...",
    "conservation": "...",
    "sourcePerson": "..."
  }
}
```

**Campos**:
- `question` (string, requerido): Pregunta del usuario
- `recipeData` (object, opcional): Datos de la receta para contexto

**Respuesta Exitosa** (200):
```json
{
  "answer": "**Alternativas Veganas**\n\nPara hacer esta receta vegana...",
  "usedWebSearch": true
}
```

**Campos de Respuesta**:
- `answer` (string): Respuesta en formato Markdown
- `usedWebSearch` (boolean): Indica si se usó búsqueda web

**Errores**:
- `400`: No se proporcionó pregunta
- `500`: API Key no configurado o error de IA

**Detección Automática de Búsqueda Web**:

El sistema detecta automáticamente si la pregunta requiere búsqueda web basándose en palabras clave:
- Dietas: vegana, vegetariana, sin gluten, sin lácteos
- Nutrición: proteína, vitaminas, calorías
- Modificaciones: alternativa, sustituto, reemplazar
- Moderno: fitness, contemporáneo, fusión

---

## Endpoints de Recuentos de Vida

### GET `/api/life-stories`

Obtiene todos los recuentos de vida.

**Método**: `GET`

**Respuesta Exitosa** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Los secretos de la cocina que aprendí de mi abuela",
    "personName": "Adil Arredondo",
    "age": 65,
    "community": "Jasiaquiri",
    "story": "Mi abuela siempre me decía que la cocina...",
    "relatedThemes": ["Cocina tradicional", "Transmisión generacional"],
    "photoUrl": "/images/people/adil-arredondo.jpg",
    "recordedDate": "2024-03-15",
    "recordedBy": "Equipo de investigación Baure",
    "createdAt": "2025-10-24T00:00:00.000Z",
    "updatedAt": "2025-10-24T00:00:00.000Z"
  }
]
```

**Errores**:
- `500`: Error del servidor

---

## Endpoints de Datos Culturales

### GET `/api/cultural-data`

Obtiene todos los datos culturales.

**Método**: `GET`

**Respuesta Exitosa** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Origen e historia del pueblo Baure",
    "category": "Historia",
    "content": "El pueblo Baure tiene raíces profundas...",
    "subsections": [
      {
        "subtitle": "Época precolombina",
        "text": "Antes de la llegada de los españoles..."
      }
    ],
    "images": [
      {
        "url": "/images/culture/baure-history.jpg",
        "caption": "Territorio histórico Baure"
      }
    ],
    "sources": ["Archivo Histórico de Baures", "Entrevistas comunitarias"],
    "relatedTopics": ["Territorio", "Tradiciones"],
    "createdAt": "2025-10-24T00:00:00.000Z",
    "updatedAt": "2025-10-24T00:00:00.000Z"
  }
]
```

**Errores**:
- `500`: Error del servidor

---

### GET `/api/cultural-data/category/:category`

Obtiene datos culturales filtrados por categoría.

**Método**: `GET`

**URL Parameters**:
- `category` (string, requerido): Una de: Historia, Tradiciones, Lengua, Territorio, Cocina

**Respuesta Exitosa** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Origen e historia del pueblo Baure",
    "category": "Historia",
    "content": "...",
    "subsections": [...],
    "images": [...],
    "sources": [...],
    "relatedTopics": [...]
  }
]
```

**Errores**:
- `500`: Error del servidor

---

## Códigos de Estado

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Solicitud exitosa |
| 400 | Bad Request | Datos de entrada inválidos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## Ejemplos de Uso

### Ejemplo 1: Obtener todas las recetas

**JavaScript (Fetch)**:
```javascript
fetch('http://localhost:5000/api/recipes')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**JavaScript (Axios)**:
```javascript
import axios from 'axios';

const recipes = await axios.get('http://localhost:5000/api/recipes');
console.log(recipes.data);
```

**cURL**:
```bash
curl http://localhost:5000/api/recipes
```

---

### Ejemplo 2: Obtener receta por ID

**JavaScript (Axios)**:
```javascript
const recipeId = '507f1f77bcf86cd799439011';
const recipe = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`);
console.log(recipe.data);
```

**cURL**:
```bash
curl http://localhost:5000/api/recipes/507f1f77bcf86cd799439011
```

---

### Ejemplo 3: Consultar al chatbot IA

**JavaScript (Axios)**:
```javascript
const response = await axios.post('http://localhost:5000/api/chat', {
  question: '¿Cómo hacer esta receta más saludable?',
  recipeData: {
    name: 'Sopa de bucheres',
    baureName: 'Ejaj to Woshor',
    ingredients: ['Buchere', 'Agua', 'Sal'],
    preparation: '...'
  }
});

console.log(response.data.answer);
console.log('Búsqueda web:', response.data.usedWebSearch);
```

**cURL**:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "question": "¿Cómo hacer esta receta vegana?",
    "recipeData": {
      "name": "Sopa de bucheres",
      "ingredients": ["Buchere", "Agua", "Sal"]
    }
  }'
```

---

### Ejemplo 4: Obtener recuentos de vida

**JavaScript (Axios)**:
```javascript
const stories = await axios.get('http://localhost:5000/api/life-stories');
console.log(stories.data);
```

---

### Ejemplo 5: Filtrar datos culturales por categoría

**JavaScript (Axios)**:
```javascript
const historiaData = await axios.get('http://localhost:5000/api/cultural-data/category/Historia');
console.log(historiaData.data);
```

**cURL**:
```bash
curl http://localhost:5000/api/cultural-data/category/Tradiciones
```

---

## Configuración del Cliente

### Usando el Servicio API (Recomendado)

El proyecto incluye un servicio centralizado en `frontend/src/services/api.service.js`:

```javascript
import apiService from '../services/api.service';

// Recetas
const recipes = await apiService.getAllRecipes();
const recipe = await apiService.getRecipeById(id);

// Recuentos
const stories = await apiService.getAllStories();

// Datos culturales
const culturalData = await apiService.getAllCulturalData();
const historiaData = await apiService.getCulturalDataByCategory('Historia');

// IA
const response = await apiService.askAI(question, recipeData);
```

---

## CORS

El backend tiene CORS habilitado para todas las solicitudes:

```javascript
app.use(cors());
```

Para producción, se recomienda configurar orígenes específicos:

```javascript
app.use(cors({
  origin: 'https://archivobaure.com'
}));
```

---

## Seguridad

### Variables de Entorno

Todas las credenciales sensibles están en archivos `.env`:

```env
MONGODB_URI=mongodb+srv://...
GEMINI_API_KEY=AIza...
PORT=5000
```

**Nunca** commitear archivos `.env` al repositorio.

### Rate Limiting (Futuro)

Se recomienda implementar rate limiting para proteger los endpoints de IA:

```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50 // límite de 50 requests
});

app.use('/api/chat', chatLimiter);
```

---

## Notas Importantes

1. **Base de Datos**: Asegúrate de poblar la BD con `node seedAll.js` antes de usar la API
2. **Gemini API**: Requiere API key válida de Google AI Studio
3. **MongoDB**: Usa MongoDB Atlas o instancia local
4. **Búsqueda Web**: Se activa automáticamente según palabras clave
5. **Markdown**: Las respuestas del chatbot usan formato Markdown

---

## Próximas Mejoras

- [ ] Autenticación JWT
- [ ] Endpoints de creación/edición de recetas (POST, PUT, DELETE)
- [ ] Paginación en listados
- [ ] Filtros avanzados (por ingredientes, tags, etc.)
- [ ] Búsqueda full-text en recetas
- [ ] Upload de imágenes
- [ ] Sistema de favoritos
- [ ] Comentarios y valoraciones

---

<div align="center">

**¿Preguntas?** Abre un issue en [GitHub](https://github.com/joelspa/miBaure/issues)

[Volver arriba](#documentación-api---archivo-baure)

</div>
