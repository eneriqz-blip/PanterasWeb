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
│  ├─ robots.txt
│  ├─ fonts/                   # Tipografías con licencia (Laurentian Std, Seravek) — ver README interno
│  └─ social/                  # Imágenes Open Graph (pendiente de generar con fotografía real)
├─ src/
│  ├─ components/
│  │  ├─ Header.astro          # Nav sticky + mega-menú de equipos + menú móvil
│  │  ├─ Footer.astro
│  │  ├─ Hero.astro            # Hero de home con sistema gráfico Franco Cuartel/Tahalí
│  │  ├─ NexusMark.astro       # Lockup provisional (ver docs/BRAND.md §6)
│  │  ├─ Button.astro
│  │  ├─ StatRow.astro
│  │  ├─ TeamCard.astro        # Tarjeta de presentación de equipo (grid Home/Equipos)
│  │  ├─ ProjectCard.astro     # Tarjeta de proyecto (usada por la galería)
│  │  ├─ ProjectGallery.astro  # Galería filtrable por equipo (vanilla JS, sin dependencias)
│  │  └─ CTASection.astro      # Sección "Únete a Nexus Labs"
│  ├─ data/
│  │  ├─ teams.ts              # Contenido de los 4 equipos (copy, stats, cadencia)
│  │  └─ projects.ts           # Catálogo de proyectos por equipo
│  ├─ layouts/
│  │  ├─ BaseLayout.astro      # <head>, SEO/OG, Header/Footer
│  │  └─ TeamLayout.astro      # Plantilla compartida por las 4 páginas de equipo
│  ├─ pages/
│  │  ├─ index.astro           # Home: Quiénes somos + equipos + proyectos destacados
│  │  ├─ equipos/
│  │  │  ├─ index.astro        # Overview de los 4 equipos
│  │  │  ├─ computer-science.astro
│  │  │  ├─ play.astro
│  │  │  ├─ mechanics.astro
│  │  │  └─ iise.astro
│  │  └─ proyectos/
│  │     └─ index.astro        # Vitrina/showcase filtrable, vinculada a cada equipo
│  └─ styles/
│     └─ global.css            # Design tokens (@theme), @font-face, utilidades de marca
├─ worker/
│  └─ index.ts                 # Worker de borde: cabeceras de seguridad + caché (ver abajo)
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
renderiza nada: sólo añade cabeceras de seguridad (`CSP`, `X-Frame-Options`,
etc.) y política de caché por tipo de archivo antes de devolver la
respuesta, manteniendo el runtime prácticamente en 0 ms de CPU.

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
5. Ajustar `site` en `astro.config.mjs` y `SITE_URL` en `wrangler.jsonc` si el dominio final cambia.
