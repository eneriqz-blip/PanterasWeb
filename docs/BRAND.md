# Nexus Labs × Universidad Panamericana — Sistema de diseño

Este documento traduce el **Manual de Marca de Universidad Panamericana
(2020)** —incluido en la raíz del proyecto como `MANUAL DE MARCA UP_.pdf`,
no versionado en git por su peso— a decisiones concretas de producto digital
para el sitio de Nexus Labs. Cualquier cambio de marca debe empezar por
revisar este documento contra el manual fuente.

## 1. Análisis de inspiración & concepto

Nexus Labs necesita verse como un **laboratorio de producto**, no como una
página institucional de trámites. Las cinco referencias se sintetizan así:

| Referencia | Qué tomamos | Cómo se aplicó |
|---|---|---|
| [huyml.co](https://huyml.co) | Jerarquía tipográfica editorial, microinteracciones sutiles en enlaces/botones | Subrayados animados en nav (`Header.astro`), hover con `transform` + easing propio (`--ease-editorial`) |
| [white-desert.com](https://white-desert.com) | Navegación minimalista con CTA persistente, ritmo editorial de secciones con mucho aire | Header sticky con blur, `--spacing-section-y` fluido en todas las páginas |
| [mrblack-case.dolganev.com](https://mrblack-case.dolganev.com) | Tarjetas de presentación numeradas, storytelling por bloques modulares | `TeamCard.astro` (índice `01–04`, color de acento, arrow-hover), grid de 4 equipos |
| [contrast.studio/.../flightwave](https://www.contrast.studio/portfolio-projects/flightwave) | Estructura de caso: hero con propuesta de valor, métrica destacada, ficha de datos | `ProjectCard.astro` (métrica + status + tags) y cabecera de cada equipo (stats en `StatRow.astro`) |
| [ylem.watch](https://ylem.watch) | "Elemental over ornamental": mucho blanco, tipografía protagonista, pulido en detalle | Paleta neutra dominante (`--color-up-paper`), color institucional usado como acento, no como fondo saturado |

Esta estética de estudio creativo se ancla a la identidad de UP mediante el
**sistema gráfico oficial del Franco Cuartel + Tahalí** (Manual, pág.
206–215): la diagonal dorada que cruza el hero y las cabeceras de equipo
(`.tahali` en `global.css`) es ese mismo recurso heráldico, no una licencia
creativa nueva.

## 2. Paleta de color

Fuente: Manual de Marca, "Paleta de Color" (pág. 19, 33) y las páginas de
color de cada submarca (108–141). Los cuatro colores cromáticos aprobados
por la Institución son:

| Token CSS | Uso | Pantone | CMYK | RGB | HEX |
|---|---|---|---|---|---|
| `--color-up-gold` | Dorado institucional (constante en Institucional \| Alumni \| Fundación) | 465 CP | 9.29.66.24 | 185.151.91 | `#B9975B` |
| `--color-up-gold-metallic` | Dorado metálico (impresión) | METALLIC 10403 C | — | — | `#AB8855` |
| `--color-up-blue` | Azul — submarca Preparatoria ("Prudencia") | 288 CP | 100.80.6.32 | 0.45.114 | `#002D72` |
| `--color-up-garnet` | Vino — submarca Universidad/Licenciatura ("Fortaleza") | 1955 CP | 9.100.54.43 | 138.21.56 | `#8A1538` |
| `--color-up-green` | Verde — submarca Posgrados ("Esperanza") | 329 CP | 100.14.60.49 | 0.104.94 | `#00685E` |

**Por qué esta combinación y no otra.** Nexus Labs es una plataforma
transversal (no pertenece a un solo nivel educativo), así que se ancla a la
**Marca Institucional** (dorado como constante) y usa el azul como neutro
frío de identidad (el binomio azul + dorado es el que la mayoría de la
comunidad asocia con el escudo histórico). El vino se reserva como color de
*acento* (CTAs, hover, subrayados) siguiendo el pedido explícito de
"dorados/rojos de acento" del brief, y es defendible porque es un Pantone
ya aprobado por la Institución (1955 CP), no un color inventado.

**Dorado como texto.** `#B9975B` sobre blanco da ~2.6:1 de contraste (AA exige 4.5:1), así que nunca se usa como color de texto sobre fondos claros. Para texto se usa `--color-up-gold-ink` (dorado metálico con 45% de negro, ~7.9:1) y sobre fondos dorados el texto va en negro (`--on-accent`). Los colores de cada equipo se resuelven con `data-tone` en `global.css`: `--accent` (relleno), `--accent-text` (texto) y `--on-accent` (contenido sobre el relleno).

**Asignación por equipo** (ver `src/data/teams.ts`): cada uno de los 4
colores cromáticos aprobados se asigna a un equipo según el significado que
el propio Manual le atribuye (pág. 32):

- Azul (*prudencia e inteligencia*) → **Computer Science**
- Vino (*fortaleza, audacia, honor*) → **Mechanics**
- Verde (*constancia, esperanza*) → **IISE**
- Dorado (*excelencia, grandeza*) → **Play**

Esto evita introducir tonos ajenos al manual: los 4 equipos usan
exclusivamente colores ya institucionales.

**No usar en este proyecto:** los Pantones exclusivos del escudo (466C
`#C6AA76`, 186C `#C8102E`, 288C ya cubierto arriba) están reservados por el
Manual únicamente para el escudo institucional (pág. 38) y no deben
aplicarse como color de UI genérico.

## 3. Tipografía

| Rol | Tipografía oficial | Pesos usados | Fallback auto-hospedado (mientras se licencia) |
|---|---|---|---|
| Encabezados / descriptivos | **Laurentian Std** | Regular, Semibold, Bold | Fraunces Variable |
| Cuerpo de texto | **Seravek** | Light, Medium | Inter Variable |

Ver [`public/fonts/README.md`](../public/fonts/README.md) para instalar las
fuentes reales. Especificaciones de composición tipográfica (tracking,
leading, alineación) siguen el Manual, pág. 213–214:

- Cabezas: siempre en versalitas/altas, `line-height` 85% del tamaño, tracking +10.
- Destacados: minúsculas, tracking -5%.
- Alineación: izquierda por defecto; centrada permitida sólo en redes sociales.

Escala tipográfica fluida (`--text-display-*` en `global.css`) usa `clamp()`
para mantener proporciones consistentes entre 360px y 1920px sin *media
queries* adicionales.

## 4. Espaciado, forma y movimiento

- **Ritmo de sección:** `--spacing-section-y` = `clamp(4rem, 3rem + 4vw, 8rem)` — mismo respiro editorial en todas las páginas (inspirado en white-desert.com).
- **Radios:** `0.5rem`–`1.5rem` según jerarquía (botones = pill, tarjetas = `1.1–1.25rem`).
- **Movimiento:** una sola curva de easing en todo el sitio, `--ease-editorial: cubic-bezier(0.16, 1, 0.3, 1)`, con 3 duraciones (`fast/base/slow`). Se respeta `prefers-reduced-motion` globalmente.
- **Sistema gráfico institucional** ("Panamericanismo", Manual pág. 206–211): el **Franco Cuartel** (bloque de color, contenedor fotográfico) y el **Tahalí** (banda diagonal) deben aparecer siempre juntos. Implementado como utilidades `.franco-cuartel` / `.tahali` en `global.css`, reutilizadas en `Hero.astro` y `TeamLayout.astro`.

## 5. Fotografía (Territorio Visual, Manual pág. 19–28)

El manual exige fotografía real de la comunidad universitaria (estudiantes,
profesores, personal), en luz natural, actitud espontánea y positiva —nunca
stock genérico ni imágenes posadas. **Este repositorio no incluye
fotografía** (no se fabrica contenido que aparente ser real): los
`ProjectCard` usan bloques de color + iniciales tipográficas como marcador
de posición. Antes de producción, sustituir por fotografía real siguiendo:

- Primer uso: tomas abiertas, contacto visual, luz natural (pág. 22, 25).
- Segundo uso: close-ups de actividad/arquitectura como descanso visual (pág. 23, 26).
- Evitar: partes del cuerpo sin contexto, flares, escenarios posados, blanco y negro o filtros de color (pág. 28).

## 6. Logotipo — nota importante

`src/components/NexusMark.astro` es un **lockup provisional** (texto +
barra diagonal dorada) que sigue el modelo de arquitectura de marca por
endoso del Manual (pág. 14–16), pero **no reproduce el escudo ni el
wordmark oficial** de Universidad Panamericana: esos archivos vectoriales
tienen licencia y no forman parte de este repositorio. Sustituir por el
wordmark oficial en SVG en cuanto Rectoría/Comunicación lo entregue,
respetando el área de protección (pág. 41 y 69 del Manual).

## 7. Tono de voz (Manual pág. 18)

*Mentor inspirador, sensible y empático*. Todo el copy del sitio (ver
`src/data/teams.ts`, `src/data/projects.ts` y las páginas) evita el tono
publicitario genérico: describe procesos reales, usa cifras concretas y
habla de igual a igual con quien está eligiendo un club, no le vende una
fantasía.
