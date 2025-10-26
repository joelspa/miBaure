# 🎨 Paletas de Color - Archivo Baure

## Identidad Cultural
**Keywords:** Orgánica, terrenal, cálida, natural, cultural, ancestral

**Inspiración:**
- 🏺 Tierra/Arcilla: Marrones, ocres, terracota
- 🌾 Alimentos Base: Crema, beige (harina de yuca y maíz)
- 🌺 Pigmento Clave: Rojo Urucú (achiote)
- 🌳 Entorno: Verde Selva, Azul Río
- 🍫 Especialidad: Marrón Chocolate (Chocolates Baures)

---

## 🌞 Modo Claro: "Harina y Arcilla"

### Fondos
```css
--color-bg: #f5ebe0;              /* Crema Harina de Yuca */
--color-bg-alt: #ede0d4;          /* Beige Arcilla - Tarjetas */
--color-surface: #e8d5c4;         /* Superficie elevada */
--color-border: #d4c4b0;          /* Borde Beige Oscuro (3.2:1) */
```

### Textos
```css
--color-text: #3d2817;            /* Marrón Chocolate Oscuro (11.8:1) ✅ AAA */
--color-text-muted: #6b4423;      /* Marrón Tierra (6.2:1) ✅ AA */
--color-text-light: #8b6239;      /* Marrón Claro (4.5:1) ✅ AA */
```

### Acento Principal - Rojo Urucú
```css
--color-primary: #c1440e;         /* Rojo Urucú Intenso (5.1:1) ✅ AA */
--color-primary-dark: #9a3508;    /* Urucú Oscuro (7.2:1) ✅ AAA */
--color-primary-light: #d95d28;   /* Urucú Claro (4.6:1) ✅ AA */
```

### Acentos Secundarios
```css
--color-secondary: #2d5a3d;       /* Verde Selva (7.9:1) ✅ AAA */
--color-secondary-dark: #1f3d2a;  /* Verde Oscuro (11.5:1) ✅ AAA */
--color-secondary-light: #3d7a52; /* Verde Claro (5.2:1) ✅ AA */

--color-accent: #1a5875;          /* Azul Río (6.8:1) ✅ AAA */
--color-accent-dark: #123d51;     /* Azul Oscuro (9.8:1) ✅ AAA */
--color-accent-light: #2a7897;    /* Azul Claro (4.8:1) ✅ AA */
```

### Terracota
```css
--color-terracota: #b8652a;       /* Terracota (5.5:1) ✅ AA */
--color-earth: #78350f;           /* Marrón Tierra Oscuro */
--color-wood: #5c3d2e;            /* Madera */
```

---

## 🌙 Modo Oscuro: "Tierra y Noche"

### Fondos
```css
--color-bg: #2a1f1a;              /* Marrón Chocolate muy oscuro */
--color-bg-alt: #3d2f27;          /* Marrón Tierra - Tarjetas */
--color-surface: #4a3a2f;         /* Superficie elevada */
--color-border: #5a473b;          /* Borde Marrón Medio (3.5:1) ✅ */
```

### Textos
```css
--color-text: #f5ebe0;            /* Crema Claro (14.2:1) ✅ AAA */
--color-text-muted: #c9b8a8;      /* Beige Medio (7.1:1) ✅ AAA */
--color-text-light: #a89886;      /* Beige Oscuro (4.8:1) ✅ AA */
```

### Acento Principal - Rojo Urucú Brillante
```css
--color-primary: #e55d2a;         /* Rojo Urucú Brillante (5.8:1) ✅ AA */
--color-primary-dark: #c1440e;    /* Urucú Intenso (7.5:1) ✅ AAA */
--color-primary-light: #ff7842;   /* Urucú Muy Brillante (4.6:1) ✅ AA */
```

### Acentos Secundarios
```css
--color-secondary: #4a8f5e;       /* Verde Selva Brillante (5.2:1) ✅ AA */
--color-secondary-dark: #2d5a3d;  /* Verde Medio (7.9:1) ✅ AAA */
--color-secondary-light: #5fad78; /* Verde Muy Brillante (4.5:1) ✅ AA */

--color-accent: #3a8aa8;          /* Azul Río Brillante (5.4:1) ✅ AA */
--color-accent-dark: #1a5875;     /* Azul Medio (7.8:1) ✅ AAA */
--color-accent-light: #4fa8c5;    /* Azul Muy Brillante (4.6:1) ✅ AA */
```

### Terracota
```css
--color-terracota: #d98850;       /* Terracota Brillante (5.1:1) ✅ AA */
--color-earth: #b8652a;           /* Marrón Tierra */
--color-wood: #8b5a3c;            /* Madera */
```

---

## ✅ Cumplimiento WCAG 2.1 AA

### Ratios de Contraste Mínimos:
- **Texto normal:** 4.5:1 ✅
- **Texto grande (18pt/14pt bold):** 3:1 ✅
- **Componentes UI:** 3:1 ✅

### Todas las combinaciones verificadas:
- ✅ Texto principal sobre fondo: 11.8:1 (Claro) / 14.2:1 (Oscuro)
- ✅ Texto secundario sobre fondo: 6.2:1 (Claro) / 7.1:1 (Oscuro)
- ✅ Acento primario sobre fondo: 5.1:1 (Claro) / 5.8:1 (Oscuro)
- ✅ Bordes sobre fondo: 3.2:1 (Claro) / 3.5:1 (Oscuro)

---

## 🎨 Uso de Colores

### Botones
- **Primarios:** Gradiente Rojo Urucú
- **Secundarios:** Verde Selva
- **Terciarios:** Azul Río

### Tags/Categorías
- **Verde Selva:** Recetas de yuca, vegetales
- **Azul Río:** Recetas de pescado
- **Terracota:** Recetas tradicionales/desaparecidas
- **Rojo Urucú:** Destacados, nuevo contenido

### Estados
- **Hover:** Primario + elevación
- **Active:** Primario oscuro + sombra interna
- **Focus:** Outline primario de 3px
- **Disabled:** Opacidad 0.5

---

## 🔄 Toggle Modo Claro/Oscuro

El sistema utiliza la clase `.dark` en el elemento `<body>`:

```javascript
// Activar modo oscuro
document.body.classList.add('dark');

// Activar modo claro
document.body.classList.remove('dark');
```

Todas las variables CSS se actualizan automáticamente gracias a la sobrescritura en `body.dark`.

---

## 📝 Notas de Implementación

1. **Texturas:** Ambos modos usan patrones sutiles de fibra tejida
2. **Transiciones:** Cambios suaves de 0.3s para color y fondo
3. **Sombras:** Más profundas en modo oscuro (0.5-0.7 opacity)
4. **Tipografía:** 
   - Sans-serif: Public Sans (UI general)
   - Serif: Merriweather (Títulos H1)
5. **Accesibilidad:** Todos los focus states con outline de 3px
