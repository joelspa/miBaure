# Frontend — Archivo Baure (React + Vite)

Aplicación React para explorar recetas, recuentos de vida y datos culturales del pueblo Baure, con un chat de apoyo.

---

## Requisitos

- Node 18+
- Variable de entorno `VITE_API_URL` apuntando al backend (por defecto: `http://localhost:5000`)

Ejemplo `.env` en `frontend/`:

```
VITE_API_URL=http://localhost:5000
```

---

## Scripts útiles

- Desarrollo: `npm run dev` (puerto por defecto: 5173)
- Build: `npm run build`
- Preview: `npm run preview`

---

## Rutas principales

- `/` Recetas (lista y búsqueda)
- `/recipe/:id` Detalle de receta (+ Chat opcional)
- `/life-stories` Recuentos de vida
- `/culture` Datos culturales
- `/admin-panel-baure` Panel Admin (CRUD protegido por token)

---

## Documentación

- Guía general y Matriz de Trazabilidad: ver `../README.md`
- API y endpoints: ver `../API.md`
- Token y acceso admin: ver `../AUTENTICACION-TOKEN.md`

---

Hecho con React + Vite. Estilos en `src/styles/` y componentes en `src/components/`.
