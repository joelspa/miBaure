# Archivo Baure

Plataforma web para preservar y difundir el patrimonio gastronómico y cultural del pueblo Baure.

---

## Índice

1. [Descripción del Producto](#descripción-del-producto)
2. [Variables de Entorno](#variables-de-entorno)
3. [Matriz de Trazabilidad](#matriz-de-trazabilidad-hallazgo--decisión--uiflujo)
4. [Métricas UX](#métricas-ux-para-verificación-de-mejoras)
5. [Instalación y Ejecución](#instalación-y-ejecución)
6. [Dependencias Principales](#dependencias-principales)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Cumplimiento de Requisitos](#cumplimiento-de-requisitos-del-proyecto)

---

## Descripción del Producto

**Archivo Baure** es una plataforma web diseñada para preservar y difundir el patrimonio gastronómico y cultural del pueblo Baure. El proyecto combina tecnología moderna con investigación antropológica para crear un archivo digital interactivo que documenta:

- **Recetas tradicionales** con nombres en lengua Baure, ingredientes, métodos de preparación, consumo y conservación
- **Recuentos de vida** de personas mayores que transmiten conocimiento oral ancestral
- **Información cultural** organizada por categorías (gastronomía, costumbres, historia, etc.)
- **Asistente conversacional IA** que responde dudas sobre recetas y cultura Baure

### Tecnologías Utilizadas

- **Backend:** Node.js + Express + MongoDB
- **Frontend:** React + Vite
- **IA:** Google Gemini para chatbot inteligente
- **Storage:** Sistema de archivos local para imágenes
- **Documentación:** Swagger/OpenAPI

### Características Principales

- CRUD completo para recetas, recuentos de vida y datos culturales  
- Panel de administración protegido por token  
- Upload de imágenes con drag & drop  
- Búsqueda y filtrado de contenido  
- Chatbot IA contextualizado con información Baure  
- Interfaz bilingüe (español + términos en Baure)  
- Diseño responsive optimizado para móviles  
- API REST documentada con Swagger  

Este proyecto surge de una investigación rigurosa basada en metodología DEXPLOS (Diseño Exploratorio Secuencial), combinando análisis documental y trabajo de campo con entrevistas a miembros de la comunidad Baure.

---

## Variables de Entorno

El proyecto requiere configurar variables de entorno en ambos componentes (backend y frontend). Utiliza los archivos `.env.example` como plantilla.

### Backend (`backend/.env`)

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/baure?retryWrites=true&w=majority

# Google Gemini API Key
# Obtén tu key desde Google AI Studio (https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=AIzaSy...tu-clave-aqui

# Puerto del servidor
PORT=5000

# Token de administración (opcional, si no se define usa el default)
ADMIN_TOKEN=baure-admin-token
```

**Instrucciones:**
1. **MONGODB_URI:** Crea un cluster gratuito en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **GEMINI_API_KEY:** Obtén una API key gratuita en [Google AI Studio](https://aistudio.google.com/app/apikey)
3. **PORT:** Puerto donde correrá el servidor (por defecto 5000)
4. **ADMIN_TOKEN:** Token personalizado para acceder al panel admin

### Frontend (`frontend/.env`)

```env
# URL del backend API
# Para desarrollo local:
VITE_API_URL=http://localhost:5000

# Para producción, reemplazar con tu URL de deployment:
# VITE_API_URL=https://tu-api.com
```

**Nota:** Las variables en Vite deben tener el prefijo `VITE_` para ser accesibles en el código del frontend.

---

## Enlaces rápidos

- API y endpoints: `API.md`
- Arquitectura: `ARQUITECTURA.md`
- Autenticación (token simple): `AUTENTICACION-TOKEN.md`
- Contexto de investigación: `backend/context/baure-context.txt`


## Matriz de Trazabilidad (hallazgo → decisión → UI/flujo)

### Evidencias del Estudio Baure

| # | Hallazgo (evidencia citada) | Decisión de diseño/funcionalidad | Dónde se ve en la UI/flujo |
|---|---|---|---|
| 1 | Representatividad de "Sopa de buchere (Ejaj to Woshor)" y consumo habitual. **Evidencia:** "Elaboraciones típicas — Sopa de bucheres (Relato de: Adil Arredondo)", `backend/context/baure-context.txt`, p. 14-15. | Modelar Receta con campos `consumption` y `conservation`; destacar nombre en Baure. | Pantalla `RecipeDetail.jsx` (secciones Consumo y Conservación); listado `RecipeList.jsx` muestra nombre y `baureName`. |
| 2 | Técnicas/utensilios ancestrales (batán, horno de barro) son parte clave del conocimiento. **Evidencia:** "DATO EXTRA — BATÁN" y flujos de asado en horno de barro, `backend/context/baure-context.txt`, p. 13-15. | Campo `utensils` en Recetas; chips/etiquetas y visualización clara. | Creación/edición en `RecipeCreate.jsx` y `RecipeEdit.jsx` con `TagInput.jsx`; lectura en `RecipeDetail.jsx`. |
| 3 | Transmisión oral y relatos de vida de personas mayores sostienen la memoria gastronómica. **Evidencia:** "Resultados — entrevistas (Dolores Chimanacay 2012; Rosalia Pinaicobo 2012)", `backend/context/baure-context.txt`, p. 12-13. | Sección "Recuentos de vida" con tarjetas y detalle; campos de fuente/persona en recetas. | `LifeStories.jsx` (listado), `LifeStoryDetail` (si aplica), campos `sourcePerson` en recetas; flujo CRUD en Panel Admin. |
| 4 | Métodos de registro y marco mixto del estudio (Tabla 1 Dexplos) legitiman la estructura por categorías y metadatos. **Evidencia:** "Tabla 1 — Diseño exploratorio secuencial (Dexplos)", `backend/context/baure-context.txt`, p. 12. | Modelo "CulturalData" con categorías, subsecciones, fuentes, imágenes. | Vista `BaureCulture.jsx` filtra por categoría; creación/edición en `CulturalDataCreate.jsx`/`CulturalDataEdit.jsx`. |
| 5 | Preservación lingüística: uso de términos Baure (Ej: "Pulaqui", "To Sakopi"). **Evidencia:** múltiples entradas con nombres en Baure, `backend/context/baure-context.txt`, p. 15-16. | Campo `baureName` en Recetas y rendering secundario del nombre local. | `RecipeDetail.jsx` y tarjetas de receta muestran `baureName` junto al nombre en español. |

### Evidencias de Análisis UX (Unlighthouse Report)

| # | Hallazgo (evidencia citada) | Decisión de diseño/funcionalidad | Dónde se ve en la UI/flujo |
|---|---|---|---|
| 6 | **Performance Score: 0.40** (40/100) - FCP: 11.7s, LCP: 21.5s, CLS: 0.3. **Evidencia:** Reporte Unlighthouse `.unlighthouse/localhost/b948/reports/lighthouse.json`, ejecutado el 2025-10-27. | Optimizar carga inicial: lazy loading de imágenes, code splitting por rutas, implementar caché de API. | Implementar en `vite.config.js` (optimizeDeps, build.rollupOptions), lazy() en `App.jsx` para rutas, usar React.memo en componentes pesados. |
| 7 | **Accessibility Score: 0.91** (91/100) - Buen contraste de colores, labels correctos, pero mejora posible en navegación por teclado. **Evidencia:** Reporte Unlighthouse accessibility audit. | Implementar ARIA labels completos, skip links, mejorar focus visible en todos los elementos interactivos. | Añadir aria-labels en `RecipeList.jsx`, `LifeStories.jsx`; implementar skip-to-content en `App.jsx`; mejorar outline CSS en `index.css`. |
| 8 | **SEO Score: 0.92** (92/100) - Meta descriptions presentes, pero falta optimización de alt texts en imágenes. **Evidencia:** Reporte Unlighthouse SEO audit. | Agregar alt texts descriptivos a todas las imágenes, mejorar meta descriptions por ruta. | Validar alt en `ImageDropzone.jsx`; implementar react-helmet para meta tags dinámicos en cada vista. |
| 9 | **Cumulative Layout Shift: 0.3** - Desplazamiento de contenido durante carga afecta experiencia. **Evidencia:** CLS metric en Unlighthouse performance audit. | Reservar espacio para imágenes con aspect-ratio CSS, evitar carga dinámica que desplace contenido. | Implementar skeleton loaders en `RecipeList.jsx`, `LifeStories.jsx`; usar aspect-ratio en tarjetas de imagen. |
| 10 | **Time to Interactive: 21.6s** - Usuario debe esperar excesivamente para interactuar. **Evidencia:** TTI metric en Unlighthouse. | Reducir JavaScript inicial, implementar server-side rendering o static generation para contenido crítico. | Evaluar migración a Next.js o implementar pre-rendering en Vite; code splitting agresivo por rutas. |

**Notas de citación:**
- **Estudio Baure:** Además de "Tabla 1", se referencian párrafos con entrevistas, "Elaboraciones típicas" y "Datos extra" (batán/torno/urupê) del archivo `baure-context.txt`. Fuentes adicionales: Admiraal 2013; Bogado 2019; Townsend 2014.
- **Análisis UX:** Reporte Unlighthouse ejecutado en localhost:5173 el 27/10/2025, disponible en `.unlighthouse/localhost/b948/reports/lighthouse.json`.

---

## Métricas UX para Verificación de Mejoras

### Métricas de Rendimiento (Performance)

| Métrica | Valor Actual | Objetivo | Método de Verificación |
|---------|--------------|----------|------------------------|
| First Contentful Paint (FCP) | 11.7s | ≤ 1.8s | Lighthouse CI, Unlighthouse monitoring continuo |
| Largest Contentful Paint (LCP) | 21.5s | ≤ 2.5s | Web Vitals API, campo RUM (Real User Monitoring) |
| Cumulative Layout Shift (CLS) | 0.3 | ≤ 0.1 | Layout Shift API, herramientas DevTools Performance |
| Time to Interactive (TTI) | 21.6s | ≤ 3.8s | Lighthouse, métricas sintéticas en CI/CD |
| Total Blocking Time (TBT) | 67ms | ≤ 200ms | Lighthouse Performance audit |

### Métricas de Usabilidad (UX)

| Métrica | Objetivo | Método de Verificación |
|---------|----------|------------------------|
| Tiempo medio de creación de receta (Admin) | ≤ 2 minutos | Instrumentar con `performance.mark()` al iniciar/completar formulario; almacenar en analytics. |
| Tasa de abandono de formularios | < 10% | Tracking de eventos: `form_start`, `form_abandon`, `form_submit`; calcular ratio abandono/inicio. |
| Descubribilidad de contenido clave | ≥ 80% encuentran "Sopa de bucheres" en ≤ 2 clics o ≤ 10s | Heatmaps (Hotjar/Clarity), pruebas de usuario moderadas con tasks, analytics de navegación. |
| Tasa de éxito en navegación por teclado | 100% de funcionalidad accesible | Test manual con solo teclado, automated axe-core tests, user testing con personas con discapacidad. |
| Satisfacción del usuario (SUS Score) | ≥ 68 (promedio aceptable) | Encuesta SUS (System Usability Scale) post-interacción con 10 preguntas Likert. |

### Métricas de Accesibilidad

| Métrica | Valor Actual | Objetivo | Método de Verificación |
|---------|--------------|----------|------------------------|
| Accessibility Score | 91/100 | ≥ 95/100 | Lighthouse Accessibility audit, axe DevTools |
| Contraste de colores (WCAG AA) | Passing | 100% compliance | Automated checks con axe, manual review con Contrast Checker |
| Navegación por teclado | Parcial | 100% funcionalidad | Manual testing, automated tab order checks |
| Screen reader compatibility | No verificado | 100% contenido legible | Testing con NVDA, JAWS, VoiceOver |

### Implementación de Monitoreo

```javascript
// Ejemplo: tracking de tiempo de completitud de formulario
// En RecipeCreate.jsx
const trackFormCompletion = () => {
  performance.mark('form-start');
  // Al submit exitoso:
  performance.mark('form-end');
  performance.measure('recipe-creation-time', 'form-start', 'form-end');
  
  const measure = performance.getEntriesByName('recipe-creation-time')[0];
  // Enviar a analytics: measure.duration
  analytics.track('recipe_form_completed', {
    duration_ms: measure.duration,
    duration_min: (measure.duration / 1000 / 60).toFixed(2)
  });
};
```

**Cómo medir (recomendaciones):**
1. **Performance:** Integrar Lighthouse CI en pipeline, usar Web Vitals API para RUM
2. **Eventos de usuario:** Google Analytics 4 / Plausible para tracking de eventos
3. **Heatmaps:** Hotjar o Microsoft Clarity para visualizar interacciones
4. **User Testing:** Pruebas moderadas con 5-8 usuarios representativos
5. **Encuestas:** SUS (System Usability Scale), NPS (Net Promoter Score) post-interacción
6. **Accessibility:** Automated tests con axe-core, Pa11y en CI; manual testing con usuarios con discapacidades

---

## Instalación y Ejecución

### Requisitos Previos

- **Node.js** v18 o superior
- **MongoDB** (MongoDB Atlas recomendado para desarrollo)
- **npm** o **yarn**
- Cuenta en Google AI Studio (para API key de Gemini)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/joelspa/miBaure.git
cd miBaure
```

### 2. Configurar Backend

#### Instalar dependencias:

```bash
cd backend
npm install
```

#### Configurar variables de entorno:

Copia el archivo de ejemplo y completa con tus credenciales:

```bash
cp .env.example .env
```

Edita `backend/.env`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/baure?retryWrites=true&w=majority

# Gemini AI
GEMINI_API_KEY=tu_api_key_de_google_ai_studio

# Servidor
PORT=5000

# Token de Admin (opcional)
ADMIN_TOKEN=admin123
```

#### Poblar la base de datos (primera vez):

```bash
node seedAll.js
```

#### Ejecutar el servidor:

```bash
npm start
# Servidor corriendo en http://localhost:5000
```

### 3. Configurar Frontend

#### Instalar dependencias:

```bash
cd ../frontend
npm install
```

#### Configurar variables de entorno:

```bash
cp .env.example .env
```

Edita `frontend/.env`:

```env
# URL del backend
VITE_API_URL=http://localhost:5000
```

#### Ejecutar en desarrollo:

```bash
npm run dev
# Aplicación corriendo en http://localhost:5173
```

### 4. Acceder a la Aplicación

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Panel Admin:** http://localhost:5173/admin-panel-baure
  - Contraseña por defecto: `admin123` (ver `AUTENTICACION-TOKEN.md`)

### 5. Build para Producción

#### Frontend:

```bash
cd frontend
npm run build
# Los archivos se generan en dist/
```

#### Backend:

El backend no requiere build, se ejecuta directamente con:

```bash
cd backend
npm start
```

---

## Dependencias Principales

### Backend

| Paquete | Versión | Uso |
|---------|---------|-----|
| express | ^4.18.2 | Framework web |
| mongoose | ^8.0.0 | ODM para MongoDB |
| @google/generative-ai | ^0.1.3 | API de Gemini |
| cors | ^2.8.5 | CORS middleware |
| dotenv | ^16.3.1 | Variables de entorno |
| multer | ^1.4.5-lts.1 | Upload de archivos |
| swagger-jsdoc | ^6.2.8 | Documentación API |
| swagger-ui-express | ^5.0.0 | UI Swagger |

### Frontend

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | ^18.2.0 | Biblioteca UI |
| react-router-dom | ^6.20.0 | Enrutamiento |
| axios | ^1.6.2 | Cliente HTTP |
| react-dropzone | ^14.2.3 | Upload de imágenes |
| lucide-react | ^0.294.0 | Iconos |

---

## Documentación Adicional

- **API y endpoints:** Ver `API.md`
- **Arquitectura técnica:** Ver `ARQUITECTURA.md`
- **Sistema de autenticación:** Ver `AUTENTICACION-TOKEN.md`
- **Contexto de investigación:** Ver `backend/context/baure-context.txt`

---

## Estructura del Proyecto

```
miBaure/
├── backend/
│   ├── config/          # Configuración (DB, Multer, Swagger)
│   ├── controllers/     # Lógica de negocio
│   ├── middleware/      # Middlewares (auth)
│   ├── models/          # Modelos Mongoose
│   ├── routes/          # Rutas de API
│   ├── public/uploads/  # Archivos subidos
│   ├── context/         # Documentación del estudio
│   └── server.js        # Punto de entrada
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── services/    # Servicios API
│   │   ├── hooks/       # Custom hooks
│   │   ├── styles/      # Estilos CSS
│   │   └── config/      # Configuración
│   └── public/          # Assets estáticos
│
└── README.md            # Este archivo
```

---

## Créditos y Licencia

Este proyecto se nutre del estudio documental y de campo recopilado en `backend/context/baure-context.txt`, con el objetivo de preservar y difundir el patrimonio culinario del pueblo Baure.

**Referencias principales:**
- Admiraal, W. (2013)
- Bogado, M. (2019)
- Townsend, W. (2014)

**Desarrollado por:** Joel Spa  
**Repositorio:** https://github.com/joelspa/miBaure

---

## Cumplimiento de Requisitos del Proyecto

### Checklist de Documentación Completa

#### 1. Descripción del Producto
- Descripción breve y completa del propósito
- Características principales
- Tecnologías utilizadas
- Contexto de investigación

#### 2. Instrucciones de Instalación/Ejecución
- Requisitos previos detallados
- Pasos de instalación paso a paso
- Comandos para ejecutar backend y frontend
- Instrucciones de acceso a la aplicación
- Build para producción

#### 3. Dependencias y Variables de Entorno
- Archivos `.env.example` en backend y frontend
- Documentación completa de cada variable
- Instrucciones para obtener API keys
- Tabla de dependencias principales con versiones

#### 4. Matriz de Trazabilidad (Investigación → Requisitos → Interfaz)
- 10 hallazgos documentados:
  - 5 evidencias del estudio Baure (con citas específicas)
  - 5 evidencias de análisis UX (Unlighthouse/Lighthouse)
- Cada hallazgo incluye:
  - Evidencia citada con fuente específica
  - Decisión de diseño/funcionalidad resultante
  - Ubicación exacta en la UI/flujo (componentes específicos)

#### 5. Evidencia de Métricas UX Definidas
- Métricas de Rendimiento: FCP, LCP, CLS, TTI, TBT con valores actuales y objetivos
- Métricas de Usabilidad:
  - Tasa de éxito: 100% navegación por teclado, ≥80% descubribilidad
  - Tiempo promedio de tarea: ≤2 min creación de receta
  - Tasa de error: <10% abandono de formularios
  - SUS Score ≥68 (satisfacción del usuario)
- Métricas de Accesibilidad: Accessibility Score, contraste, screen readers
- Métodos de verificación específicos para cada métrica
- Código de ejemplo para implementación de tracking

### Documentos Complementarios

- `API.md` - Documentación completa de endpoints
- `ARQUITECTURA.md` - Diagrama y explicación de arquitectura
- `AUTENTICACION-TOKEN.md` - Sistema de autenticación
- `backend/context/baure-context.txt` - Contexto de investigación

---

## Soporte y Contribuciones

Para reportar problemas o sugerir mejoras, abre un issue en el repositorio de GitHub.

**Contacto:** [Crear issue en GitHub](https://github.com/joelspa/miBaure/issues)

