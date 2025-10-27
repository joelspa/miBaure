# Archivo Baure

Plataforma web para preservar y difundir el patrimonio gastronómico y cultural del pueblo Baure.

**Tecnologías:** Node.js + Express + MongoDB (backend) | React + Vite (frontend) | Google Gemini AI (chatbot)

---

## Instalación y Ejecución

### Requisitos Previos
- Node.js v18+
- MongoDB
- API key de Google Gemini

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/joelspa/miBaure.git
cd miBaure

# Backend
cd backend
npm install
cp .env.example .env  # Configurar variables (ver sección Variables de Entorno)
node seedAll.js       # Poblar base de datos
npm start             # http://localhost:5000

# Frontend (en otra terminal)
cd frontend
npm install
cp .env.example .env
npm run dev           # http://localhost:5173
```

### Acceso
- **App:** http://localhost:5173
- **Panel Admin:** http://localhost:5173/admin-panel-baure (contraseña: `baure2025`)
- **API Docs:** http://localhost:5000/api-docs

---

## Variables de Entorno

### Backend (`backend/.env`)
```env
MONGODB_URI=mongodb+srv://usuario:pass@cluster.mongodb.net/baure
GEMINI_API_KEY=AIzaSy...  # Obtener en https://aistudio.google.com/app/apikey
PORT=5000
ADMIN_TOKEN=admin123
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## Métricas UX Definidas

**Performance:** Se establecen objetivos para First Contentful Paint (FCP) de ≤1.8s desde los actuales 11.7s, Largest Contentful Paint (LCP) de ≤2.5s desde 21.5s, y Cumulative Layout Shift (CLS) de ≤0.1 desde 0.3. La verificación se realiza mediante Lighthouse CI para FCP, Web Vitals API para LCP, y Layout Shift API para CLS.

**Usabilidad:** El tiempo de creación de recetas en el panel admin debe ser ≤2 minutos, medido con `performance.mark()` al inicio y fin del formulario. La tasa de abandono de formularios debe mantenerse <10%, rastreada mediante eventos `form_start`, `form_abandon` y `form_submit`. La descubribilidad, medida con la tarea de encontrar "Sopa de bucheres", debe alcanzar ≥80% de éxito en ≤2 clics o ≤10 segundos, verificable con heatmaps (Hotjar/Clarity) y user testing. La navegación por teclado debe cubrir 100% de la funcionalidad, validada con testing manual y axe-core automated.

## Métricas UX Definidas

### Métricas de Performance

| Métrica                          | Actual  | Objetivo  | Verificación          |
|----------------------------------|---------|-----------|------------------------|
| First Contentful Paint (FCP)     | 11.7s   | ≤ 1.8s    | Lighthouse CI          |
| Largest Contentful Paint (LCP)   | 21.5s   | ≤ 2.5s    | Web Vitals API         |
| Cumulative Layout Shift (CLS)    | 0.3     | ≤ 0.1     | Layout Shift API       |

### Métricas de Usabilidad

| Métrica                                         | Objetivo                      | Verificación                                          |
|-------------------------------------------------|-------------------------------|-------------------------------------------------------|
| **Tiempo de creación de receta** (Admin)       | ≤ 2 min                       | `performance.mark()` inicio/fin formulario            |
| **Tasa de abandono de formularios**            | < 10%                         | Eventos: `form_start`, `form_abandon`, `form_submit`  |
| **Descubribilidad** (encontrar "Sopa de bucheres") | ≥ 80% en ≤ 2 clics o ≤ 10s    | Heatmaps (Hotjar/Clarity), user testing               |
| **Navegación por teclado**                      | 100% funcionalidad            | Test manual + axe-core automated                      |

