# Cómo Usar el Token de Autenticación

Este proyecto usa un token simple para proteger las operaciones de crear, editar y eliminar contenido.

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

1. Ve al panel de administración: `http://localhost:5173/admin-panel-baure`
2. Ingresa la contraseña (por defecto: `admin123`)
3. Listo! El sistema guarda el token automáticamente
4. Ahora puedes crear, editar y eliminar contenido sin problemas

### Forma Manual (para probar)

Si solo quieres probar rápido:

1. Abre la consola del navegador (F12)
2. Escribe esto:
   ```javascript
   sessionStorage.setItem('authToken', 'baure-admin-token')
   ```
3. Recarga la página

**Para cerrar sesión:**
```javascript
sessionStorage.clear()
```

---

## Usar en Postman

### Paso 1: Agregar el Header

En todas las peticiones de crear/editar/eliminar, agrega este header:

**Nombre del header:** `Authorization`

**Valor:** `Bearer baure-admin-token`

(Nota: hay un espacio después de "Bearer")

### Paso 2: Ejemplos

**Crear una receta:**
- Método: POST
- URL: `http://localhost:5000/api/recipes`
- Headers: `Authorization: Bearer baure-admin-token`
- Body (form-data):
  - name: Masaco de yuca
  - ingredients: ["yuca", "queso"]
  - preparation: Rallar y mezclar
  - image: (archivo)

**Editar una receta:**
- Método: PUT
- URL: `http://localhost:5000/api/recipes/ID_DE_LA_RECETA`
- Headers: `Authorization: Bearer baure-admin-token`
- Body: Los campos que quieras cambiar

**Eliminar una receta:**
- Método: DELETE
- URL: `http://localhost:5000/api/recipes/ID_DE_LA_RECETA`
- Headers: `Authorization: Bearer baure-admin-token`

---

## Problemas Comunes

**Error: "Falta header Authorization"**
- Olvidaste agregar el header en Postman
- En la app: no iniciaste sesión en el panel admin

**Error: "Token inválido"**
- El token no es el correcto
- Asegúrate de usar: `baure-admin-token`

**Error: "Formato de token inválido"**
- Debe ser: `Bearer baure-admin-token` (con espacio)
- No uses comillas extra

---

## Cambiar el Token (Opcional)

Si quieres usar otro token en lugar de `baure-admin-token`:

1. En el backend, crea/edita el archivo `.env`
2. Agrega: `ADMIN_TOKEN=mi-token-nuevo`
3. Reinicia el servidor

---

## Comandos Rápidos (Consola del Navegador)

Ver si tengo token:
```javascript
sessionStorage.getItem('authToken')
```

Poner el token manualmente:
```javascript
sessionStorage.setItem('authToken', 'baure-admin-token')
```

Cerrar sesión:
```javascript
sessionStorage.clear()
```

---

## Nota Importante

⚠️ Este es un sistema simple para desarrollo. **No es seguro para producción real**. 

Para un proyecto en producción necesitarías:
- JWT con expiración
- HTTPS
- Tokens que caduquen
- Mejor seguridad

Pero para este proyecto de universidad está perfecto 👍

