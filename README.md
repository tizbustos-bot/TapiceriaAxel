# Tapicería Axel — Landing Page

Landing page de una sola página para **Tapicería Axel** (tapizado y restauración de muebles).
Hecha en **HTML + CSS + JavaScript puro**, sin frameworks ni build. Lista para subir a cualquier
hosting estático (Render, Netlify, GitHub Pages, Hostinger, etc.).

Objetivo principal: que el cliente **envíe una foto del mueble por WhatsApp** para pedir presupuesto.

---

## 📁 Estructura

```
landing-tapiceria-axel/
├── index.html          → Contenido y estructura
├── styles.css          → Estilos (paleta negro/dorado/blanco)
├── script.js           → WhatsApp, menú, FAQ, galería, configurador de color
├── README.md           → Este archivo
└── assets/
    └── images/
        ├── logo.jpg              → Logo (header + redes)
        ├── og.jpg               → Imagen para compartir en redes
        ├── hero.jpg             → Foto de fondo del Hero (sillón en el taller)
        ├── cta-segunda.jpg      → Fondo de la sección "segunda oportunidad"
        ├── sillon-color.png     → Sillón del configurador (fondo transparente)
        └── trabajo-01..07.jpg   → Galería de trabajos (fotos reales)
```

---

## ✅ Datos ya cargados

- **WhatsApp:** +54 9 11 7824-1899 (todos los botones abren WhatsApp con mensaje predeterminado)
- **Logo real** de Tapicería Axel en el header.
- **7 fotos reales** en la galería (todas son respaldos: modelos pétalos/concha y canaleteados).
- **Configurador de color** interactivo (sillón de muestra).
- **Textos, FAQ y CTAs:** completos, en español de Argentina.

---

## 🎨 Configurador de color (sección "Colores")

Sección interactiva donde el cliente elige color de tela sobre un sillón de muestra (dibujo SVG)
y cambia el fondo de pared entre blanco y negro. Al elegir un color, el botón de WhatsApp arma
un mensaje que **incluye el color elegido** ("...me interesa un trabajo en color Camel...").

- **Editar los colores disponibles:** en `index.html`, buscá `id="cfgSwatches"`. Cada color es un
  `<button>` con `style="--c:#XXXXXX"`, `data-color="#XXXXXX"` y `data-name="Nombre"`. Agregá,
  quitá o cambiá los que quieras (nombre + código hex).
- **Cambiar el sillón del configurador:** reemplazá `assets/images/sillon-color.png` por otra foto
  de un mueble **con fondo transparente y de color claro/crema** (funciona mejor para el recoloreo).
  Si cambiás el nombre del archivo, actualizalo en `styles.css` dentro de `.cfg-sofa` (aparece dos
  veces: en `background-image` y en `mask`/`-webkit-mask`).
  El color se aplica mezclando el color con la foto (`background-blend-mode: multiply`) recortado a
  la silueta, conservando pliegues y sombras.
- Es una **guía visual**: el aviso al pie aclara que los colores en pantalla son orientativos.

---

## 🔧 Cómo editar lo importante

### 1) Cambiar el número o el mensaje de WhatsApp
Abrí `script.js` y editá **solo** estas dos líneas (arriba de todo):

```js
var WHATSAPP_NUMBER  = "5491178241899";   // formato internacional, sin +, sin 0, sin 15, sin espacios
var WHATSAPP_MESSAGE = "Hola Axel! Vi tu página y quería consultar...";
```

Todos los botones se actualizan solos.

### 2) Cambiar / sumar fotos de la galería
Las fotos están en `assets/images/` como `trabajo-01.jpg` … `trabajo-07.jpg`.
Para **sumar sillones o pufs** (hoy la galería son respaldos): copiá tu foto a esa carpeta y
duplicá un bloque `<figure class="gallery-item reveal">…</figure>` en `index.html` apuntando al
nuevo archivo. Actualizá el `alt` describiendo el mueble (bueno para SEO). El grid se adapta solo.

### 3) Cambiar la foto del Hero
Reemplazá `assets/images/hero.jpg` por otra foto (o cambiá el `src` en `<section class="hero">`).

### 4) Imagen para redes (Open Graph)
Reemplazá `assets/images/og.jpg` por una foto de **1200×630 px** si querés algo más apaisado.
Actualizá también `og:url` y `canonical` en el `<head>` con el dominio real.

### 5) Colores de la marca
En `styles.css`, en `:root`, están todas las variables (`--gold`, `--black`, `--white`, etc.).

---

## ⚠️ Pendientes / a mejorar

| Elemento | Estado | Nota |
|---|---|---|
| Fotos de sillones y pufs | Faltan | Hoy la galería muestra respaldos. Sumá fotos cuando las tengas |
| Dominio (`og:url`, `canonical`) | Ejemplo | Cambiar por el dominio real |
| Dirección / horarios | No incluidos | No se inventaron. Si Axel tiene local, se puede agregar mapa + datos |

> **No se agregó mapa** porque no se aportó dirección física. Si Axel atiende en un local,
> avisá y se suma sección de ubicación + Google Maps + `address` en los datos estructurados.

---

## 🚀 Subir a Render (sitio estático)

1. Subí esta carpeta a un repositorio de GitHub.
2. En [render.com](https://render.com) → **New** → **Static Site**.
3. Conectá el repo.
4. Configuración:
   - **Build Command:** *(vacío)*
   - **Publish Directory:** `.` (donde está `index.html`)
5. **Create Static Site**. En un minuto tenés la URL pública.

Para otros hosts (Netlify, GitHub Pages, Hostinger): subí los archivos tal cual; no requiere compilación.

---

## 🧩 Características incluidas

- Mobile-first, responsive desde ~360px, sin scroll horizontal.
- Header sticky con logo + menú hamburguesa en mobile.
- **Configurador de color** interactivo con CTA de WhatsApp dinámico.
- Galería con lightbox (clic para ampliar, flechas y teclado).
- FAQ tipo acordeón con animación.
- Botón flotante de WhatsApp (verde oficial) con animación sutil.
- Animaciones de aparición al scroll; respeta `prefers-reduced-motion`.
- SEO: title, meta description, Open Graph, un solo H1, `alt` en imágenes, HTML semántico.
- Datos estructurados Schema.org (`HomeAndConstructionBusiness`).
