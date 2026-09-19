# Tipografías institucionales pendientes de licencia

Este repositorio **no incluye** los archivos de las tipografías oficiales de
Universidad Panamericana, porque son propiedad de la Institución y su
licencia no es redistribuible:

- **Laurentian Std** (Regular, Semibold, Bold) — tipografía primaria, usada
  en encabezados y descriptivos (Manual de Marca, pág. 30).
- **Seravek** (Light, Medium) — tipografía secundaria, usada en cuerpos de
  texto (Manual de Marca, pág. 31). Seravek viene preinstalada en macOS/iOS.

Mientras tanto, el sitio usa **Fraunces Variable** (encabezados) e
**Inter Variable** (cuerpo), auto-hospedadas vía `@fontsource`, sin
peticiones a servicios externos. `--font-display` y `--font-body` ya listan
primero las tipografías oficiales, así que un equipo que las tenga
instaladas las verá sin ningún cambio.

## Cómo activarlas para todos los visitantes

1. Solicita los archivos `.woff2` con licencia de uso web al equipo de Marca
   de Universidad Panamericana.
2. Colócalos en `public/fonts/laurentian/` y `public/fonts/seravek/`.
3. Agrega estas reglas al inicio de `src/styles/global.css` (después de los
   `@import`), ajustando los nombres de archivo a los recibidos:

```css
@font-face {
  font-family: "Laurentian Std";
  src: url("/fonts/laurentian/LaurentianStd-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Laurentian Std";
  src: url("/fonts/laurentian/LaurentianStd-Semibold.woff2") format("woff2");
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: "Laurentian Std";
  src: url("/fonts/laurentian/LaurentianStd-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: "Seravek";
  src: url("/fonts/seravek/Seravek-Light.woff2") format("woff2");
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: "Seravek";
  src: url("/fonts/seravek/Seravek-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}
```

No las incluyas antes de tener los archivos: cada `@font-face` con una URL
inexistente provoca una petición 404 en cada carga de página.
