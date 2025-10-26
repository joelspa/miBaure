# 🔐 Panel de Administración

## Acceso al Panel

El panel de administración está protegido mediante una URL secreta y contraseña.

### URL de Acceso
```
http://localhost:3000/admin-panel-baure
```

### Contraseña por Defecto
```
baure2025
```

**⚠️ IMPORTANTE**: Cambia la contraseña en el archivo `.env` del backend antes de usar en producción.

---

## Cómo Usar el Panel

1. **Acceder**: Navega a la URL secreta en tu navegador
2. **Autenticar**: Ingresa la contraseña configurada
3. **Gestionar**: Usa las opciones del panel para:
   - ✅ Crear nuevas recetas
   - ✅ Crear nuevos recuentos de vida
   - ✅ Ver contenido existente
   - ✅ Acceder a la información cultural

---

## Seguridad

### Nivel de Seguridad Actual
- 🔒 URL secreta (no listada en la interfaz pública)
- 🔒 Validación de contraseña en backend
- 🔒 Sesión temporal (se cierra al cerrar el navegador)

### Cambiar la Contraseña

Edita el archivo `backend/.env`:

```env
ADMIN_PASSWORD=tu_nueva_contraseña_segura
```

Luego reinicia el servidor backend.

---

## Características

### ✅ Sesión Temporal
- La sesión se guarda en `sessionStorage`
- Se cierra automáticamente al cerrar el navegador
- No se comparte entre pestañas nuevas

### ✅ Sin Sistema de Usuarios
- Implementación simple y directa
- Una sola contraseña compartida
- Ideal para equipos pequeños

### ✅ Fácil de Usar
- Interfaz intuitiva con cards visuales
- Acceso directo a todas las funciones de administración
- Integrado con los formularios existentes

---

## Mejoras Futuras (Opcional)

Si en el futuro necesitas mayor seguridad, puedes implementar:

1. **Múltiples usuarios**: Sistema de login con usuarios y roles
2. **JWT Tokens**: Tokens de autenticación más robustos
3. **Registro de actividad**: Log de acciones administrativas
4. **Autenticación de dos factores (2FA)**: Capa extra de seguridad

---

## Solución de Problemas

### "Contraseña incorrecta"
- Verifica que el `.env` tenga la variable `ADMIN_PASSWORD`
- Asegúrate de haber reiniciado el servidor backend después de cambiarla

### "Error al conectar con el servidor"
- Verifica que el backend esté corriendo en el puerto 5000
- Revisa la configuración de `VITE_API_URL` en `frontend/.env`

### La sesión se cierra sola
- Esto es normal, `sessionStorage` se limpia al cerrar el navegador
- Simplemente vuelve a ingresar la contraseña

---

## Contacto

Para más información o soporte, contacta al equipo de desarrollo.
