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
│  └─ social/                  # Imágenes Open Graph (pendiente de generar con fotografía real)
├─ src/
│  ├─ components/
│  │  ├─ Header.astro          # Nav sticky (se oculta al bajar), menú a pantalla completa en móvil, barra de progreso
│  │  ├─ Footer.astro
│  │  ├─ Hero.astro            # Hero con titular en versales y mapa interactivo
│  │  ├─ NexusMap.astro        # Mapa SVG de los 4 equipos (nodos navegables)
│  │  ├─ Marquee.astro         # Cinta animada (CSS)
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
│  │  ├─ teams.ts              # Contenido de los 4 equipos (copy, stats, cadencia)
│  │  └─ projects.ts           # Catálogo de proyectos por equipo
│  ├─ layouts/
│  │  ├─ BaseLayout.astro      # <head>, SEO/OG, Header/Footer
│  │  └─ TeamLayout.astro      # Plantilla compartida por las 4 páginas de equipo
│  ├─ lib/
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
│  │  │  └─ iise.astro
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

## Contenido y copy

Todo el copy (equipos, proyectos, pilares) vive en `src/data/*.ts` como
datos tipados en TypeScript — sin `lorem ipsum` y sin necesidad de tocar
componentes para actualizar texto, cifras o agregar un proyecto nuevo.
Para agregar un proyecto: añade una entrada a `src/data/projects.ts`;
aparecerá automáticamente en `/proyectos` y en la página del equipo
correspondiente.

## Pendientes antes de producción

1. **Tipografías con licencia** (Laurentian Std, Seravek) — ver `public/fonts/README.md`.
2. **Wordmark/escudo oficial en SVG** — ver `docs/BRAND.md` §6.
3. **Fotografía real** siguiendo el Territorio Visual del Manual — ver `docs/BRAND.md` §5.
4. **Dominio y DNS**: apuntar `nexuslabs.up.edu.mx` (o el subdominio que defina TI) a la ruta del Worker vía un *Custom Domain* en el dashboard de Cloudflare.
5. Definir la URL final: variable de entorno `SITE_URL` en el build (alimenta `site`, el canonical, `sitemap.xml` y `robots.txt`) y `SITE_URL` en `wrangler.jsonc`. El dominio y el correo de contacto actuales son de ejemplo.
6. Reemplazar el contenido de ejemplo (integrantes, cifras y métricas de `src/data/*.ts`) por datos reales.
