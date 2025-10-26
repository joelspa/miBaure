# 🚀 Guía Rápida de Inicio - Panel Admin

## Paso 1: Verificar Variables de Entorno

El archivo `backend/.env` ya tiene la contraseña:
```env
ADMIN_PASSWORD=baure2025
```

## Paso 2: Reiniciar el Servidor Backend

Detén el servidor actual y vuelve a iniciarlo:

```powershell
cd backend
npm start
```

## Paso 3: Asegurarse que el Frontend esté corriendo

```powershell
cd frontend
npm run dev
```

## Paso 4: Acceder al Panel

1. Abre tu navegador
2. Ve a: **http://localhost:3000/admin-panel-baure**
3. Ingresa la contraseña: **baure2025**
4. ¡Listo! Ya puedes administrar el contenido

---

## 📋 Resumen de Archivos Creados/Modificados

### Backend
- ✅ `middleware/adminAuth.js` - Validación de contraseña
- ✅ `routes/admin.js` - Ruta de validación
- ✅ `config/config.js` - Agregada variable adminPassword
- ✅ `server.js` - Ruta /api/admin registrada
- ✅ `.env` - Variable ADMIN_PASSWORD agregada
- ✅ `.env.example` - Documentación de variables

### Frontend
- ✅ `components/AdminPanel.jsx` - Componente del panel
- ✅ `styles/AdminPanel.css` - Estilos del panel
- ✅ `App.jsx` - Ruta /admin-panel-baure agregada
- ✅ `services/api.service.js` - Método validateAdminPassword

### Documentación
- ✅ `PANEL-ADMIN.md` - Documentación completa

---

## 🎯 ¿Qué puede hacer el administrador?

Desde el panel puedes:
- ➕ Crear nuevas recetas
- ➕ Crear nuevos recuentos de vida
- ➕ Crear nuevos datos culturales
- 👁️ Ver todas las recetas
- 👁️ Ver todos los recuentos
- 🌍 Ver información cultural

**Nota importante:** Los botones de crear contenido han sido **removidos de la vista pública**. Solo son accesibles desde el panel de administración.

---

## 🔒 Seguridad

- La URL `/admin-panel-baure` no aparece en ningún menú público
- Solo quien conoce la URL puede intentar acceder
- Se requiere contraseña para entrar
- La sesión es temporal (se cierra al cerrar el navegador)

---

## 💡 Cambiar la Contraseña

Para mayor seguridad, cambia la contraseña en `backend/.env`:

```env
ADMIN_PASSWORD=tu_contraseña_super_segura_123
```

Luego reinicia el servidor backend.

---

## ✅ ¡Todo Listo!

Ya tienes un panel de administración funcional y seguro para tu aplicación Baure.
