# API del Proyecto - Archivo Baure

Aquí está cómo funciona el backend y qué endpoints puedes usar.

**URL Base**: `http://localhost:5000`

## Resumen rápido

- Endpoints públicos (GET): recetas, recuentos de vida y datos culturales.
- Endpoints protegidos (POST/PUT/DELETE): usan header Authorization con `Bearer baure-admin-token`.
- Chat IA: POST `/api/chat` con `{ question, recipeData? }`.
Para token y panel admin, ver `AUTENTICACION-TOKEN.md`.

---

## Autenticación

Para crear, editar o eliminar cosas necesitas un token. Ver: [AUTENTICACION-TOKEN.md](./AUTENTICACION-TOKEN.md)

Token por defecto: `baure-admin-token`

---

## Recetas

### Ver todas las recetas
- **GET** `/api/recipes`
- No necesita token
- Devuelve un array con todas las recetas

### Ver una receta específica
- **GET** `/api/recipes/:id`
- No necesita token
- Cambia `:id` por el ID de la receta

### Crear receta
- **POST** `/api/recipes`
- **Necesita token** en header: `Authorization: Bearer baure-admin-token`
- Body (form-data):
  - `name` (obligatorio)
  - `baureName` (opcional)
  - `description` (opcional)
  - `ingredients` (array como JSON string o repetir keys)
  - `preparation` (opcional)
  - `utensils` (array)
  - `consumption` (opcional)
  - `conservation` (opcional)
  - `sourcePerson` (opcional)
  - `tags` (array)
  - `image` (archivo, opcional)

### Actualizar receta
- **PUT** `/api/recipes/:id`
- **Necesita token**
- Body: Los campos que quieras cambiar (mismo formato que crear)

### Eliminar receta
- **DELETE** `/api/recipes/:id`
- **Necesita token**
- No necesita body

---

## Recuentos de Vida

### Ver todos los recuentos
- **GET** `/api/life-stories`
- No necesita token

### Ver un recuento específico
- **GET** `/api/life-stories/:id`
- No necesita token

### Crear recuento
- **POST** `/api/life-stories`
- **Necesita token**
- Body (form-data):
  - `title` (obligatorio)
  - `personName` (obligatorio)
  - `age` (número, opcional)
  - `community` (opcional)
  - `story` (obligatorio)
  - `relatedThemes` (array)
  - `recordedDate` (fecha ISO, opcional)
  - `recordedBy` (opcional)
  - `image` (archivo, opcional)

### Actualizar recuento
- **PUT** `/api/life-stories/:id`
- **Necesita token**
- Body: Campos a cambiar

### Eliminar recuento
- **DELETE** `/api/life-stories/:id`
- **Necesita token**

---

## Datos Culturales

### Ver todos los datos
- **GET** `/api/cultural-data`
- No necesita token

### Ver por categoría
- **GET** `/api/cultural-data/category/:category`
- Categorías: Historia, Tradiciones, Lengua, Cosmovisión, Territorio, Organización Social, Cocina, Otro

### Ver un dato específico
- **GET** `/api/cultural-data/:id`
- No necesita token

### Crear dato cultural
- **POST** `/api/cultural-data`
- **Necesita token**
- Body (form-data):
  - `title` (obligatorio)
  - `category` (obligatorio)
  - `content` (obligatorio)
  - `sources` (array JSON)
  - `relatedTopics` (array JSON)
  - `image` (archivo, opcional)

### Actualizar dato
- **PUT** `/api/cultural-data/:id`
- **Necesita token**

### Eliminar dato
- **DELETE** `/api/cultural-data/:id`
- **Necesita token**

---

## Chatbot IA

### Hacer pregunta al chatbot
- **POST** `/api/chat`
- No necesita token
- Body (JSON):
  ```json
  {
    "question": "¿Cómo hacer esto vegano?",
    "recipeData": {
      "name": "Sopa de bucheres",
      "ingredients": ["..."],
      "preparation": "..."
    }
  }
  ```
- Respuesta:
  ```json
  {
    "answer": "Respuesta del chatbot en markdown...",
    "usedWebSearch": false
  }
  ```

---

## Panel Admin

### Validar contraseña
- **POST** `/api/admin/validate`
- Body (JSON):
  ```json
  {
    "password": "admin123"
  }
  ```
- Respuesta si es correcta:
  ```json
  {
    "message": "Acceso concedido",
    "valid": true,
    "token": "baure-admin-token"
  }
  ```

---

## Códigos de Estado

- **200**: Todo bien
- **201**: Creado exitosamente
- **400**: Faltan datos o están mal
- **401**: No tienes autorización (falta token o es inválido)
- **404**: No se encontró lo que buscas
- **500**: Error del servidor

---

## Ejemplo Completo (Postman)

Crear una receta:

1. Método: POST
2. URL: `http://localhost:5000/api/recipes`
3. Headers:
   - `Authorization: Bearer baure-admin-token`
4. Body (form-data):
   - name: Masaco de yuca
   - ingredients: ["yuca", "queso", "sal"]
   - preparation: Rallar y mezclar
   - image: (tu archivo)

Si todo sale bien, recibes un 201 con la receta creada que incluye el `_id` generado.

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

---

## Notas Importantes

1. **Base de Datos**: Asegúrate de poblar la BD con `node seedAll.js` antes de usar la API
2. **Gemini API**: Requiere API key válida de Google AI Studio
3. **MongoDB**: Usa MongoDB Atlas o instancia local
4. **Búsqueda Web**: Se activa automáticamente según palabras clave
5. **Markdown**: Las respuestas del chatbot usan formato Markdown
