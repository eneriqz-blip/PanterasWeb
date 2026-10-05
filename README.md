# Nexus Labs · Universidad Panamericana

Sitio oficial de **Nexus Labs**, la plataforma de clubes estudiantiles de
Ingeniería y Tecnología de la Universidad Panamericana (Computer Science,
Play, Mechanics e IISE).

- **Stack:** [Astro](https://astro.build) (salida 100% estática) + [Tailwind CSS v4](https://tailwindcss.com) vía plugin de Vite, TypeScript estricto, cero frameworks de UI en cliente.
- **Hosting:** [Cloudflare Workers](https://developers.cloudflare.com/workers/) con **Static Assets** — sin servidor, sin cold starts, distribuido en el edge global de Cloudflare.
- **Diseño:** ver [`docs/BRAND.md`](docs/BRAND.md) para el sistema de diseño completo, derivado del Manual de Marca institucional.

## Estructura del repositorio

```text
Panteras/
├─ MANUAL DE MARCA UP_.pdf     # Manual de marca fuente (no versionado, ver .gitignore)
├─ docs/
│  └─ BRAND.md                 # Sistema de diseño: tokens, tipografía, paleta, criterios
├─ public/
│  ├─ favicon.svg
│  ├─ _headers                 # Cabeceras de seguridad (CSP, X-Frame-Options…) y caché de /_astro/*
│  ├─ fonts/                   # Tipografías con licencia (Laurentian Std, Seravek) — ver README interno
│  ├─ social/                  # Imágenes Open Graph (pendiente de generar con fotografía real)
│  └─ teams/                   # Logos y fotos de equipos (DataLabs, PwnTeras)
├─ src/
│  ├─ components/
│  │  ├─ Header.astro          # Nav sticky (se oculta al bajar), menú a pantalla completa en móvil, barra de progreso
│  │  ├─ Footer.astro
│  │  ├─ Hero.astro            # Hero con titular en versales y mapa interactivo
│  │  ├─ NexusMap.astro        # Mapa SVG de los 4 equipos (nodos navegables)
│  │  ├─ Manifesto.astro       # Texto que se revela palabra por palabra con el scroll (CSS)
│  │  ├─ TeamStack.astro       # Tarjetas de equipo apiladas (position: sticky)
│  │  ├─ FeaturedRail.astro    # Carrusel de proyectos con scroll-snap
│  │  ├─ CoverArt.astro        # Portadas SVG generativas por equipo (sin imágenes)
│  │  ├─ NexusMark.astro       # Lockup provisional (ver docs/BRAND.md §6)
│  │  ├─ Button.astro
│  │  ├─ StatRow.astro         # Cifras con contador animado
│  │  ├─ TeamCard.astro        # Tarjeta de equipo (enlace)
│  │  ├─ ProjectCard.astro     # Tarjeta de proyecto (enlace a su página de detalle)
│  │  ├─ ProjectGallery.astro  # Galería filtrable por equipo (?equipo=slug)
│  │  └─ CTASection.astro      # Sección "Únete" con botón de copiar correo
│  ├─ data/
│  │  ├─ site.ts               # Nombre, correo de contacto y navegación (un solo lugar)
│  │  ├─ teams.ts              # Divisiones + sus subequipos (tipos Team y Subteam)
│  │  └─ projects.ts           # Catálogo de proyectos por equipo
│  ├─ layouts/
│  │  ├─ BaseLayout.astro      # <head>, SEO/OG, Header/Footer
│  │  ├─ TeamLayout.astro      # Plantilla de división (los 4 "grandes"), incluye sus subequipos
│  │  └─ SubteamLayout.astro   # Plantilla de subequipo (p. ej. Robotics dentro de Mechanics)
│  ├─ middleware.ts            # Al compilar, une palabras cortas (de, la, y…) con la siguiente (sin orfandad)
│  ├─ lib/
│  │  ├─ typography.ts         # Reglas de espacios de no separación para español
│  │  └─ art.ts                # Generadores deterministas del arte (redes, sprites, engranajes, flujos)
│  ├─ scripts/
│  │  └─ ui.ts                 # Menú, header, revelado, contadores, copiar, carrusel (~2 KB gzip)
│  ├─ pages/
│  │  ├─ index.astro           # Home: Quiénes somos + equipos + proyectos destacados
│  │  ├─ equipos/
│  │  │  ├─ index.astro        # Overview de los 4 equipos
│  │  │  ├─ computer-science.astro
│  │  │  ├─ play.astro
│  │  │  ├─ mechanics.astro
│  │  │  ├─ iise.astro
│  │  │  └─ [division]/
│  │  │     └─ [subteam].astro  # Una página por subequipo (generada desde teams.ts, p. ej. /equipos/mechanics/robotics)
│  │  ├─ proyectos/
│  │  │  ├─ index.astro        # Vitrina/showcase filtrable, vinculada a cada equipo
│  │  │  └─ [slug].astro       # Página de detalle de cada proyecto (reto, enfoque, métrica)
│  │  ├─ 404.astro             # Página de error servida por Workers (not_found_handling)
│  │  ├─ sitemap.xml.ts        # Generado en build con la URL definida en SITE_URL
│  │  └─ robots.txt.ts
│  └─ styles/
│     └─ global.css            # Design tokens (@theme), colores por equipo (data-tone), utilidades de marca
├─ worker/
│  └─ index.ts                 # Worker mínimo: sólo /api/health; el resto lo sirve Static Assets
├─ astro.config.mjs
├─ tsconfig.json
├─ wrangler.jsonc               # Configuración de despliegue a Cloudflare Workers
├─ package.json
└─ .gitignore
```

## Desarrollo local

Requiere Node 18.20+.

```bash
npm install
npm run dev
```

Sitio disponible en `http://localhost:4321`.

```bash
npm run build     # astro check + astro build -> /dist
npm run preview   # sirve /dist localmente con Astro
```

## Despliegue a Cloudflare Workers

El sitio se compila como salida estática (`output: 'static'` en
`astro.config.mjs`) y se sirve mediante **Workers Static Assets**
(`wrangler.jsonc`, campo `assets`). El worker en `worker/index.ts` no
renderiza nada: las páginas y assets los sirve directamente Static Assets
(sin invocar el Worker) y sólo `/api/health` pasa por él. Las cabeceras de
seguridad y la caché inmutable de `/_astro/*` se definen en `public/_headers`.

El comando `build` de `wrangler.jsonc` ejecuta `astro build` antes de cada
`wrangler deploy`, así que Cloudflare no necesita un build command aparte.

```bash
# una sola vez
npm install -g wrangler
wrangler login

# preview local contra el runtime real de Workers
npm run cf:preview

# deploy a producción
npm run cf:deploy

# deploy al entorno de staging declarado en wrangler.jsonc
wrangler deploy --env staging
```

No se requieren variables de entorno secretas para el sitio actual. Si en
el futuro se añade un endpoint con credenciales (p. ej. un formulario de
contacto), usar:

```bash
wrangler secret put NOMBRE_SECRETO
```

nunca variables en texto plano en `wrangler.jsonc`.

## Arquitectura: divisiones y subequipos

Nexus se organiza en 4 "grandes" (`src/data/teams.ts`, tipo `Team`):
Computer Science, Play, Mechanics e IISE. Dentro de una división puede haber
varios subequipos (`Team.subteams: Subteam[]`) — por ejemplo Mechanics
agrupa a Robotics (activo) y a Racing/Baja/Build (históricos, ya no
activos). Cada subequipo con `subteams.length > 0` genera automáticamente:

- Una tarjeta en la sección "Equipos" de la página de su división
  (`TeamLayout.astro`), separando activos de históricos.
- Su propia página en `/equipos/{division}/{subteam}` (`SubteamLayout.astro`,
  ruta dinámica en `src/pages/equipos/[division]/[subteam].astro`).

Un proyecto puede además asociarse a un subequipo específico con el campo
opcional `Project.subteam` en `src/data/projects.ts` (p. ej. los proyectos
de Robotics llevan `subteam: 'robotics'`); si no aplica, se omite.

Para agregar una división nueva son 4 cambios: una entrada en `teams`, su
`src/pages/equipos/<slug>.astro` (una línea, ver los 4 existentes), sus
proyectos en `projects.ts`, y listo — subequipos, filtros y sitemap salen
solos de los datos.

## Contenido: solo información real

Todo el texto del sitio sale de fuentes reales; no hay cifras ni descripciones
inventadas:

- **Flyer de Nexus:** nombres de las 4 áreas y los 11 equipos, descripción corta
  de cada equipo, palabras clave y concursos por área, la frase de bienvenida
  y los cinco beneficios (compite, crea productos, vincúlate con empleadores,
  arma comunidad, gana experiencia real), y los **colores de cada equipo**.
- **Mechanics / Robotics:** correo de Piero Esquiliano (coordinación).
- **DataLabs**, **Vortex Paradox** y **PwnTeras:** sus formularios (incluye el
  proyecto *The Pumpkin Paradox*, enlaces a Steam e Instagram, hitos y logo de
  DataLabs; descripción, objetivo, misión, visión, actividades, enlaces, logos,
  fotos y paleta de PwnTeras).
- **IISE Chapter 921:** su documento de información (descripción, objetivo,
  misión, visión, actividades, proyectos actuales y anteriores, Instagram).

| Área | Equipos | Qué hay de cada equipo |
|---|---|---|
| **Computer Science** | DataLabs, PwnTeras, Development, Coding | DataLabs y PwnTeras: completo. Los otros 2: descripción corta del flyer |
| **Play** | Studio, Animation, Vortex Paradox, Gaming, Vortex SIMP | Vortex Paradox: completo. Los otros 4: descripción corta del flyer |
| **Mechanics** | Robotics (activo); Racing, Baja, Build (históricos) | Robotics: completo. Históricos: solo lo que dijo Piero |
| **IISE** | IISE 921 | Completo (sin logo ni mesa directiva, ver privacidad) |

Cuando un equipo mande su información (descripción, objetivo, misión, visión,
actividades, proyectos), se agrega en `src/data/teams.ts` y
`src/data/projects.ts` con el mismo formato que DataLabs o Robotics. Lo que no
se sabe se deja fuera: las páginas no inventan nada.

**Privacidad:** el repositorio es público, así que no se incluyeron los
nombres, correos institucionales ni matrículas de líderes que aparecen en el
flyer, ni el correo personal del líder de Vortex Paradox, ni el contacto de
PwnTeras, ni la mesa directiva y el correo del presidente de IISE 921 (todos
con matrícula en el correo). Si el equipo quiere publicarlos, se agregan al
campo `links` del subequipo. Las fotos de PwnTeras ya traen los rostros
pixelados.

## Miniaturas de proyectos

Cada equipo sube la imagen de su proyecto y el sitio la usa sola: basta con
guardar `public/projects/<slug-del-proyecto>.webp` (también `avif`, `jpg`,
`jpeg` o `png`). Si no hay imagen, la tarjeta muestra el arte animado del
área. Detalles y nombres de archivo exactos en
[`public/projects/README.md`](public/projects/README.md).

## Pendientes antes de producción

1. **Información de los equipos que faltan**: misión, objetivo y proyectos de Development, Coding, Studio, Animation, Gaming y Vortex SIMP. PwnTeras avisó que actualizará la suya en unas semanas.
2. **Tipografías con licencia** (Laurentian Std, Seravek) — ver `public/fonts/README.md`.
3. **Wordmark/escudo oficial en SVG** — ver `docs/BRAND.md` §6.
4. **Fotografía real** siguiendo el Territorio Visual del Manual — ver `docs/BRAND.md` §5.
5. **Logos y fotografía**: el flyer trae el logo oficial de Nexus Labs y fotos del equipo, pero hacen falta los archivos originales (SVG/PNG) para usarlos; el logo de DataLabs entregado está recortado en el borde derecho. Vortex Paradox compartió una carpeta de Drive con material (key art, screenshots, fotos).
6. **Dominio y DNS**: el sitio usa `nexuslabs.up.edu.mx` como marcador de posición para el dominio (canonical, sitemap, robots.txt, `SITE_URL`); falta confirmar el dominio final y apuntarlo al Worker vía *Custom Domain* en Cloudflare.
