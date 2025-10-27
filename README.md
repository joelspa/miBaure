# Archivo Baure

Este proyecto es una plataforma web para preservar y difundir el patrimonio gastronómico y cultural del pueblo Baure.

La investigación "Acercamiento al mundo de la cocina baure" nos mostró que esta cultura está en riesgo. El conocimiento lo tienen principalmente los ancianos, y los jóvenes ya casi no conocen las recetas. Muchas preparaciones están "a punto de desaparecer".

Nuestra solución es esta página web (una SPA) que funciona como un archivo digital. Aquí guardamos las recetas, las "historias de vida" de la gente, los utensilios que usaban (como el batán o el torno) y sus técnicas de cocina.

---

## Tecnologías usadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + MongoDB
- **IA:** Google Gemini (para un chatbot de ayuda)

---

## ¿Cómo instalar y ejecutar el proyecto?

Necesitarás Node.js (v18+) y una conexión a MongoDB.

### 1. El Backend (API)

```bash
# Entra a la carpeta del backend
cd backend

# Instala las dependencias
npm install

# Copia el archivo de ejemplo .env
cp .env.example .env

# (IMPORTANTE) Edita el archivo .env con tus claves de MongoDB y Gemini

# (Opcional) Poblar base de datos con datos de ejemplo
node seedAll.js

# Inicia el servidor
npm start

# El servidor estará corriendo en http://localhost:5000
```

### 2. El Frontend (Aplicación Web)

```bash
# (En una nueva terminal) Entra a la carpeta del frontend
cd frontend

# Instala las dependencias
npm install

# Copia el archivo de ejemplo .env
cp .env.example .env

# (IMPORTANTE) Edita el .env para que apunte a tu API (VITE_API_URL=http://localhost:5000)

# Inicia la aplicación
npm run dev

# La aplicación estará corriendo en http://localhost:5173
```

### 3. Acceso al Proyecto

Una vez iniciados ambos servidores:

- **Aplicación Web:** http://localhost:5173
- **Panel de Administración:** http://localhost:5173/admin (contraseña por defecto: `baure-admin-token`)
- **API Documentación:** http://localhost:5000/api-docs (Swagger)

---

## Variables de Entorno (.env)

Necesitas crear archivos `.env` en `frontend/` y `backend/`. Puedes copiar los `.env.example` que están en el proyecto.

### backend/.env

```env
MONGODB_URI=mongodb+srv://usuario:pass@cluster.mongodb.net/baure
GEMINI_API_KEY=AIzaSy...  # Obtener en https://aistudio.google.com/app/apikey
PORT=5000
ADMIN_TOKEN=baure-admin-token
```

### frontend/.env

```env
VITE_API_URL=http://localhost:5000
```

---

## ¿Por qué el proyecto es así? (Trazabilidad)

Se basa en la investigación sobre la cocina Baure.
La investigación nos dijo qué problemas había, y la página web los soluciona:

### 1. Transmisión oral en riesgo

**El problema:** El conocimiento se está perdiendo porque solo lo tienen los ancianos y no se está pasando a los jóvenes.

**La solución:** Creamos una ruta dinámica `/receta/:id`. Esta página no solo da la receta, sino que cuenta la "historia" de quién la compartió, guardando esa tradición oral.

### 2. Recetas desconocidas

**El problema:** Muchas recetas ya "están a punto de desaparecer" o son "desconocidas".

**La solución:** La página tiene un buen buscador con filtros por categoría (Yuca, Maíz, Pescado, Bebida, Desaparecida) y un chatbot asistente con IA (Google Gemini) disponible en cada receta para responder preguntas. La idea es que la gente las encuentre fácil.

### 3. Patrimonio integral

**El problema:** La cultura no son solo recetas. También son "utensilios" (como el batán o el urupé) y "técnicas".

**La solución:** Creamos secciones separadas en el modelo de datos (campo `utensils` en recetas) y una sección dedicada "Cultura Baure" (`/cultura`) para datos culturales complementarios. El archivo documenta el patrimonio de forma integral.

### 4. Centralización de información

**El problema:** Se necesita un "registro gastronómico" para centralizar la información.

**La solución:** Creamos un panel de administración (`/admin`) protegido con contraseña donde se pueden añadir, editar y gestionar recetas, recuentos de vida y datos culturales (haciendo POST, PUT y DELETE a la API) usando autenticación por token.

---


## ¿Cómo medimos si la web funciona? (Métricas UX)

Para saber si la web de verdad ayuda a preservar la cultura, definimos estas métricas:

### Métrica 1: Descubribilidad de Contenido

**¿La gente encuentra las recetas fácilmente?**

- **Prueba:** Medir el tiempo que toma encontrar la "Sopa de bucheres" usando el buscador
- **Objetivo:** 90% de usuarios en ≤ 10 segundos
- **Verificación:** Google Analytics - Event tracking en búsquedas + Time to result

### Métrica 2: Engagement con el Chatbot

**¿La gente usa el asistente de IA para aprender más?**

- **Prueba:** Medir interacciones con el chatbot por visita
- **Objetivo:** ≥ 30% de visitas a recetas abren el chatbot

### Métrica 3: Performance Web (Core Web Vitals)

**¿La aplicación carga rápido y es usable?**

- **LCP (Largest Contentful Paint):** Actual: 21.5s → Objetivo: ≤ 2.5s
- **FID (First Input Delay):** Objetivo: ≤ 100ms
- **CLS (Cumulative Layout Shift):** Actual: 0.3 → Objetivo: ≤ 0.1
- **Verificación:** Lighthouse

### Métrica 4: Tasa de Éxito en Búsquedas

**¿Los usuarios encuentran lo que buscan?**

- **Prueba:** Búsquedas que resultan en clic vs búsquedas sin resultados

### Métrica 5: Accesibilidad

**¿La aplicación es accesible para todos?**

- **Prueba:** Score de Lighthouse Accessibility
- **Objetivo:** Mantener ≥ 90/100
- **Verificación:** Lighthouse


---
## Cómo Usar el Token de Autenticación
Este proyecto usa un token simple para proteger las operaciones de crear, editar y eliminar contenido.

- Agrega el header: `Authorization: Bearer baure-admin-token`
- O inicia sesión en el Panel Admin y el sistema lo hace por ti.
---
## ¿Qué es esto?
Cuando quieres crear, editar o eliminar recetas, recuentos de vida o datos culturales, necesitas enviar un token de autorización. Es como una contraseña temporal que confirma que tienes permiso para hacer cambios.
**Token por defecto:** `baure-admin-token`
---
## Rutas que Necesitan Token
Solo las operaciones de escritura:
- Crear, editar o eliminar **recetas**
- Crear, editar o eliminar **recuentos de vida**
- Crear, editar o eliminar **datos culturales**
**NO necesitas token para:**
- Ver recetas, recuentos o datos culturales (GET)
- Usar el chatbot de IA
---
## Usar en la Aplicación Web
### Forma Automática (Recomendada)
1. Ve al panel de administración: `http://localhost:5173/admin` 
2. Ingresa la contraseña (por defecto: `baure2025`)
3. Listo! El sistema guarda el token automáticamente
4. Ahora puedes crear, editar y eliminar contenido sin problemas

---

## Probar con Postman

### Endpoint de Prueba Rápida

**POST** `http://localhost:5000/api/recipes`

**Headers:**
```bash
Content-Type: application/json
Authorization: Bearer baure-admin-token
```

**Body (JSON):**
```json
{
  "name": "Prueba de Token",
  "baureName": "Test Token",
  "description": "Receta de prueba para verificar autenticación",
  "ingredients": ["Ingrediente 1", "Ingrediente 2"],
  "preparation": "Pasos de preparación de prueba",
  "consumption": "Consumir inmediatamente",
  "utensils": ["Olla", "Cuchara"],
  "tags": ["Prueba"]
}
```

**Respuesta Exitosa (201):**
```json
{
  "_id": "...",
  "name": "Prueba de Token",
  "baureName": "Test Token",
  "createdAt": "2025-10-26T..."
}
```

**Error sin Token (401):**
```json
{
  "message": "Token de autorización requerido"
}
```

**Error con Token Incorrecto (403):**
```json
{
  "message": "Token inválido"
}
```

### Otros Endpoints Protegidos

**Crear Recuento de Vida:**
```bash
POST http://localhost:5000/api/lifestories
Authorization: Bearer baure-admin-token
Content-Type: application/json

Body:
{
  "title": "Historia de prueba",
  "personName": "Nombre de la persona",
  "story": "El relato de vida...",
  "community": "Comunidad",
  "age": 65
}
```

**Crear Dato Cultural:**
```bash
POST http://localhost:5000/api/culturaldata
Authorization: Bearer baure-admin-token
Content-Type: application/json

Body:
{
  "title": "Dato cultural de prueba",
  "category": "Historia",
  "content": "Contenido del dato cultural..."
}
```

**Editar Receta:**
```bash
PUT http://localhost:5000/api/recipes/:id
Authorization: Bearer baure-admin-token
```

**Eliminar Receta:**
```bash
DELETE http://localhost:5000/api/recipes/:id
Authorization: Bearer baure-admin-token
```
```bash
DELETE http://localhost:5000/api/recipes/:id
Authorization: Bearer baure-admin-token
```

---
