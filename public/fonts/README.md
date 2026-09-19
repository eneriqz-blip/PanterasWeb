# Tipografías institucionales pendientes de licencia

Este repositorio **no incluye** los archivos de las tipografías oficiales de
Universidad Panamericana, porque son propiedad de la Institución y su
licencia no es redistribuible:

- **Laurentian Std** (Regular, Semibold, Bold) — tipografía primaria, usada
  en encabezados y descriptivos (Manual de Marca, pág. 30).
- **Seravek** (Light, Medium) — tipografía secundaria, usada en cuerpos de
  texto (Manual de Marca, pág. 31). Seravek viene preinstalada en macOS/iOS;
  en Windows/Android se requiere el archivo con licencia.

## Cómo activarlas

1. Solicita los archivos `.woff2` con licencia de uso web al equipo de Marca
   de Universidad Panamericana.
2. Colócalos en:
   - `public/fonts/laurentian/LaurentianStd-Regular.woff2`
   - `public/fonts/laurentian/LaurentianStd-Semibold.woff2`
   - `public/fonts/laurentian/LaurentianStd-Bold.woff2`
   - `public/fonts/seravek/Seravek-Light.woff2`
   - `public/fonts/seravek/Seravek-Medium.woff2`
3. No se necesita ningún otro cambio: las reglas `@font-face` en
   `src/styles/global.css` ya apuntan a estas rutas y activan la tipografía
   real automáticamente.

Mientras tanto, el sitio usa **Fraunces Variable** (encabezados) e
**Inter Variable** (cuerpo) como red de seguridad tipográfica, ambas
auto-hospedadas vía `@fontsource`, sin peticiones a servicios externos.
