export type TeamId = 'computer-science' | 'play' | 'mechanics' | 'iise';

export interface TeamStat {
  label: string;
  value: string;
}

export interface Subteam {
  /** Único dentro de la división (no global): la URL completa es /equipos/{division}/{slug}. */
  slug: string;
  name: string;
  status: 'activo' | 'inactivo';
  briefDescription: string;
  /** Texto largo de "qué es y qué hace"; si existe, sustituye a briefDescription en la cabecera de la página. */
  description?: string;
  objective?: string;
  mission?: string;
  vision?: string;
  activities?: string[];
  currentProjects?: { label: string; items: string[] };
  milestones?: string[];
  /** Rótulo de la lista de hitos; por defecto "Hitos". */
  milestonesLabel?: string;
  stats?: TeamStat[];
  /** `dark`: el logo es claro/de color sobre fondo oscuro; `wordmark` se muestra bajo el símbolo. */
  logo?: { src: string; alt: string; dark?: boolean; wordmark?: string };
  gallery?: { src: string; alt: string }[];
  /** Id de la paleta (`data-tone`) cuando el equipo tiene colores propios distintos a los de su área. */
  tone?: string;
  links?: { label: string; href: string }[];
  /** Nota corta, p. ej. aclarando por qué un equipo histórico ya no está activo. */
  note?: string;
}

export interface Team {
  id: TeamId;
  slug: TeamId;
  shortName: string;
  fullName: string;
  /** Línea corta bajo el nombre: las palabras clave del flyer. */
  tagline: string;
  summary: string;
  keywords: string[];
  events: string[];
  description: string[];
  stats: TeamStat[];
  joinNote?: string;
  subteams: Subteam[];
}

export const teams: Team[] = [
  {
    id: 'computer-science',
    slug: 'computer-science',
    shortName: 'Computer Science',
    fullName: 'Nexus Labs · Computer Science',
    tagline: 'Software · Hackeo',
    keywords: ['Software', 'Hackeo'],
    events: ['CSAW', 'ICPC', 'Hacker Cup'],
    summary:
      'Cuatro equipos para quienes quieren programar: Development (aplicaciones web y móviles), PwnTeras (CTF, criptografía y redes), Coding (programación competitiva) y DataLabs (análisis y procesos de datos).',
    description: ['Computer Science agrupa los equipos de Nexus dedicados al software, el hackeo y los datos.'],
    stats: [{ label: 'Equipos activos', value: '4' }],
    subteams: [
      {
        slug: 'datalabs',
        name: 'DataLabs',
        status: 'activo',
        briefDescription: 'Análisis y procesos de datos.',
        description:
          'Equipo multidisciplinario de estudiantes enfocado en la transformación de datos, la inteligencia artificial y la automatización empresarial. Diseña e implementa soluciones integrales de datos, desde la ingesta en la nube hasta modelos predictivos, asistentes de PLN y tableros ejecutivos.',
        objective:
          'Que los integrantes diseñen e implementen soluciones end-to-end de datos, integren IA y automatizaciones en procesos reales, y construyan un portafolio profesional.',
        mission:
          'Formar a estudiantes en ingeniería de datos, IA y automatización mediante talleres y proyectos prácticos, para resolver problemas reales de empresas y de la comunidad universitaria con soluciones tecnológicas.',
        vision:
          'Ser un equipo estudiantil de referencia en datos e inteligencia artificial, reconocido por desarrollar soluciones con impacto real —como un Data Lakehouse, un chatbot RAG interno y tableros y flujos automatizados para PyMEs locales— y por formar profesionales listos para la industria.',
        activities: [
          'Curso de Data Analytics y Power BI: taller práctico de modelado de datos, ETL y visualización.',
          'Data Lakehouse & Cloud Project: proyecto avanzado de arquitectura de datos en la nube (Snowflake/AWS), con ingesta, pipelines de procesamiento y gobernanza.',
          'Capacitación: workshops de SQL, Python, Power BI y LLMs.',
        ],
        note: 'Es un equipo nuevo, por lo que todavía no tiene proyectos anteriores.',
        logo: { src: '/teams/datalabs-logo.jpg', alt: 'Logotipo de DataLabs' },
      },
      {
        slug: 'pwnteras',
        name: 'PwnTeras',
        status: 'activo',
        briefDescription: 'Competencias de CTF, criptografía, redes y más.',
        description:
          'Grupo de hackeo ético y seguridad informática de la universidad. Enseñan a quienes están empezando y compiten en CTF cada fin de semana.',
        objective:
          'Formar una comunidad de estudiantes capaces y éticos en ciberseguridad, que aprendan haciendo y compartan lo que saben.',
        mission:
          'Complementar la formación en seguridad informática mediante enseñanza, práctica constante y competencias CTF, con un enfoque ético y colaborativo.',
        vision:
          'Ser el grupo referente de ciberseguridad en la universidad y un equipo reconocido en CTF a nivel nacional, que forme generaciones de profesionales con ética, habilidad técnica y pasión.',
        activities: [
          'Aprendizaje: clases y prácticas físicas.',
          'Práctica: máquinas designadas y actividades colaborativas.',
          'Competencia: CTF semanales.',
        ],
        tone: 'pwnteras',
        logo: {
          src: '/teams/pwnteras-mark.svg',
          alt: 'Logotipo de PwnTeras',
          dark: true,
          wordmark: '/teams/pwnteras-wordmark.svg',
        },
        gallery: [
          { src: '/teams/pwnteras-sesion-1.webp', alt: 'Sesión de PwnTeras: un grupo de estudiantes atiende una explicación frente a una pantalla.' },
          { src: '/teams/pwnteras-sesion-2.webp', alt: 'Sesión de PwnTeras: integrantes con laptops frente a una pantalla con una terminal.' },
        ],
        links: [
          { label: 'pwnteras.dev', href: 'https://pwnteras.dev' },
          { label: 'learn.pwnteras.dev', href: 'https://learn.pwnteras.dev' },
        ],
      },
      {
        slug: 'development',
        name: 'Development',
        status: 'activo',
        briefDescription: 'Desarrollo full-stack de aplicaciones web y móviles.',
        note: 'Información detallada pendiente de confirmar con el equipo.',
      },
      {
        slug: 'coding',
        name: 'Coding',
        status: 'activo',
        briefDescription: 'Programación competitiva.',
        note: 'Información detallada pendiente de confirmar con el equipo.',
      },
    ],
  },
  {
    id: 'play',
    slug: 'play',
    shortName: 'Play',
    fullName: 'Nexus Labs · Play',
    tagline: 'Juegos · Artes · Cine',
    keywords: ['Juegos', 'Artes', 'Cine'],
    events: ['Pixelatl', 'Liga CONADEIP', 'Gamergy', '48 Hour Film'],
    summary:
      'Cinco equipos creativos: Gaming (equipos profesionales de eSports), Vortex Paradox y Vortex SIMP (desarrollo de videojuegos), Studio (producción audiovisual) y Animation (producción de cortos animados).',
    description: ['Play agrupa los equipos de Nexus dedicados a los juegos, las artes y el cine.'],
    stats: [{ label: 'Equipos activos', value: '5' }],
    subteams: [
      {
        slug: 'studio',
        name: 'Studio',
        status: 'activo',
        briefDescription: 'Producción audiovisual.',
        note: 'Información detallada pendiente de confirmar con el equipo.',
      },
      {
        slug: 'animation',
        name: 'Animation',
        status: 'activo',
        briefDescription: 'Producción de cortos animados.',
        note: 'Información detallada pendiente de confirmar con el equipo.',
      },
      {
        slug: 'vortex-paradox',
        name: 'Vortex Paradox',
        status: 'activo',
        briefDescription: 'Desarrollo de videojuegos a nivel profesional.',
        description:
          'Vortex Paradox es un estudio independiente de videojuegos nacido en la Universidad Panamericana. Su proyecto principal es The Pumpkin Paradox, un videojuego comercial desarrollado por un equipo multidisciplinario. Además del desarrollo del juego, participan en espacios de la industria como festivales, convocatorias, pitching, networking y eventos como Pixelatl, GCMX y Super Indie Games.',
        objective:
          'Crear videojuegos originales con calidad profesional y dar a los integrantes experiencia real trabajando en un proyecto comercial. También buscan acercar al equipo a la industria mediante publicación, pitching, exhibiciones, convocatorias y contacto con otros estudios y profesionales.',
        mission:
          'Desarrollar videojuegos originales mediante un equipo multidisciplinario, usando procesos y herramientas profesionales y dando a sus integrantes experiencia práctica dentro de una producción real.',
        vision:
          'Consolidarse como un estudio independiente capaz de llevar proyectos nacidos en la universidad a lanzamientos comerciales, festivales, convocatorias y oportunidades dentro de la industria.',
        activities: [
          'Programación y desarrollo en Unity.',
          'Arte 2D, animación y diseño visual.',
          'Game design y diseño de niveles.',
          'Narrativa y escritura.',
          'Música y audio.',
          'QA y pruebas de juego.',
          'Producción y coordinación entre disciplinas.',
          'Uso de herramientas como GitHub, Notion, Blender, Rive, FMOD y Aseprite.',
          'Preparación de builds y materiales promocionales.',
          'Pitching, networking y desarrollo de negocio.',
          'Participación en festivales, exposiciones y convocatorias de la industria.',
        ],
        milestones: [
          'Fundación y organización de cinco ediciones de la Game Jam UP.',
          'Más de 30 juegos de jam lanzados.',
          '6 cursos impartidos: Unity, Blender, Pixel Art, Escritura y Producción de Videojuegos.',
          'Expositores en el Indie Booth de EGS 2025, Game Pitch Pixelatl 2025 y Super Indie Games 2026.',
          'Colaboraciones y vinculación con estudios y profesionales de la industria.',
          'Participación constante en espacios como Pixelatl, GCMX y otras iniciativas de videojuegos independientes.',
        ],
        stats: [
          { label: 'Ediciones de la Game Jam UP', value: '5' },
          { label: 'Juegos de jam lanzados', value: '30+' },
          { label: 'Cursos impartidos', value: '6' },
        ],
        links: [
          { label: 'The Pumpkin Paradox en Steam', href: 'https://store.steampowered.com/app/4604640/The_Pumpkin_Paradox' },
          { label: 'Instagram de The Pumpkin Paradox', href: 'https://www.instagram.com/pumpkin.paradox/' },
        ],
      },
      {
        slug: 'gaming',
        name: 'Gaming',
        status: 'activo',
        briefDescription: 'Equipos profesionales de eSports.',
        note: 'Información detallada pendiente de confirmar con el equipo.',
      },
      {
        slug: 'vortex-simp',
        name: 'Vortex SIMP',
        status: 'activo',
        briefDescription: 'Desarrollo de videojuegos accesible a principiantes.',
        note: 'Información detallada pendiente de confirmar con el equipo.',
      },
    ],
  },
  {
    id: 'mechanics',
    slug: 'mechanics',
    shortName: 'Mechanics',
    fullName: 'Nexus Labs · Mechanics',
    tagline: 'Automotriz · Mecánica · Robótica',
    keywords: ['Automotriz', 'Mecánica', 'Robótica'],
    events: ['Shell Eco-marathon', 'Torneo Mexicano de Robótica'],
    summary:
      'Una de las 4 áreas principales de Nexus, encargada de las disciplinas relacionadas con todo lo mecánico y mecatrónico: robótica, manufactura, diseño mecánico y más.',
    description: [
      'El objetivo de Mechanics es proporcionar la infraestructura y la coordinación necesarias para que los equipos que la conforman desarrollen proyectos de manera eficiente, colaborativa y sostenible en el tiempo.',
      'Su misión es impulsar la excelencia en ingeniería aplicada mediante la creación, gestión y desarrollo de equipos estudiantiles multidisciplinarios, promoviendo el aprendizaje práctico, la innovación y la resolución de problemas en mecatrónica y mecánica.',
      'Actualmente, Robotics es el único equipo activo bajo Mechanics. Antes existieron también Racing, Baja y Build: puedes ver su historia más abajo.',
    ],
    stats: [
      { label: 'Equipos activos', value: '1' },
      { label: 'Equipos históricos', value: '3' },
      { label: 'Proyecto actual', value: 'Dron autónomo' },
    ],
    joinNote: 'Robotics es, por ahora, el único equipo activo bajo Mechanics.',
    subteams: [
      {
        slug: 'robotics',
        name: 'Robotics',
        status: 'activo',
        briefDescription:
          'Equipo de robótica de Nexus, enfocado actualmente en la construcción de drones, coches autónomos y sumo-bots.',
        objective:
          'Desarrollar proyectos autónomos y competitivos, optimizando el diseño, prototipado, programación y prueba para superar las metas del laboratorio y de las competencias.',
        mission:
          'Diseñar, construir y programar sistemas robóticos autónomos —incluyendo drones, coches y más— formando personas capaces de afrontar retos complejos a través de la experimentación continua, el trabajo en equipo y la participación activa en competencias.',
        vision:
          'Ser un equipo de robótica estudiantil referente a nivel universitario, destacando por la creación de nuestras propias ideas.',
        activities: ['Construcción de sistemas robóticos.'],
      },
      {
        slug: 'racing',
        name: 'Racing',
        status: 'inactivo',
        briefDescription: 'Antiguo equipo de Mechanics. Actualmente no está activo.',
        note: 'Uno de los equipos que históricamente formaron parte de Mechanics, junto con Baja y Build.',
      },
      {
        slug: 'baja',
        name: 'Baja',
        status: 'inactivo',
        briefDescription: 'Antiguo equipo de Mechanics. Actualmente no está activo.',
        note: 'Uno de los equipos que históricamente formaron parte de Mechanics, junto con Racing y Build.',
      },
      {
        slug: 'build',
        name: 'Build',
        status: 'inactivo',
        briefDescription: 'Antiguo equipo de Mechanics. Actualmente no está activo.',
        note: 'Los mini-proyectos actuales de Robotics son parecidos a lo que era Build-UP.',
      },
    ],
  },
  {
    id: 'iise',
    slug: 'iise',
    shortName: 'IISE',
    fullName: 'Nexus Labs · IISE — Capítulo Estudiantil',
    tagline: 'Ingeniería industrial · Logística',
    keywords: ['Ingeniería industrial', 'Logística'],
    events: ['UN Sustainability'],
    summary: 'Capítulo IISE de ingeniería industrial, presente en los campus Mixcoac y Ciudad UP.',
    description: ['IISE es el capítulo IISE de ingeniería industrial de Nexus, presente en los campus Mixcoac y Ciudad UP.'],
    stats: [{ label: 'Equipos activos', value: '1' }],
    subteams: [
      {
        slug: 'iise-921',
        name: 'IISE 921',
        status: 'activo',
        briefDescription: 'Capítulo IISE de ingeniería industrial.',
        description:
          'Capítulo estudiantil del Institute of Industrial and Systems Engineers (IISE) en la Universidad Panamericana. Conecta a los alumnos con concursos, casos de estudio, actividades académicas, proyectos de investigación y profesionales de México y el mundo, y los prepara para competir y desarrollarse más allá del salón de clase. Está abierto a alumnos de todas las carreras, no solo de Ingeniería Industrial.',
        objective:
          'Formar ingenieros con visión empresarial, con oportunidades prácticas para aplicar lo que aprenden en ingeniería industrial y de sistemas, a través de case competitions, concursos, talleres y vinculación con la industria y con otras universidades.',
        mission:
          'Formar ingenieros con visión empresarial que generen impacto en su entorno. A través de case competitions, investigación y contacto con la industria, les da herramientas y oportunidades para mejorar sistemas y procesos.',
        vision:
          'Ser un capítulo de referencia a nivel nacional e internacional que forme a los líderes de la industria del mañana, con un impacto que cambie la vida de sus miembros y de las comunidades a las que llega.',
        activities: [
          'Taller de Case Study para preparar equipos de competencia.',
          'Participación en concursos y case competitions nacionales e internacionales.',
          'Vinculación con empresas y otras instituciones.',
          'Investigación.',
          'Difusión de actividades en redes sociales.',
        ],
        currentProjects: {
          label: 'Proyectos actuales · Otoño 2026 / Primavera 2027',
          items: [
            'Reto Actinver (modalidad Universitaria)',
            'Global Case Competition at Harvard',
            'NASBITE International Case Competition',
            'Fall Global Sustainability Supply Chain Student Competition (GS3, ONU)',
            'Concurso Rockwell IISE',
            'Concurso Sim FI_SIM UNAM',
            'Social Logistics Clan',
            'Taller de Case Study 2026-2027',
            'Ponencias',
          ],
        },
        milestonesLabel: 'Proyectos anteriores relevantes',
        milestones: [
          'Gold Award del Chapter Recognition Program 2026 de IISE.',
          'NASBITE International Case Competition 2026, con el caso Switchgrass Spirits.',
          'Global Case Competition at Harvard, con una delegación del capítulo.',
          'Reto Actinver 2025.',
        ],
        links: [{ label: 'Instagram', href: 'https://www.instagram.com/up_iise921/' }],
      },
    ],
  },
];

export function getTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

export function getSubteam(divisionSlug: string, subteamSlug: string): { team: Team; subteam: Subteam } | undefined {
  const team = getTeam(divisionSlug);
  const subteam = team?.subteams.find((s) => s.slug === subteamSlug);
  return team && subteam ? { team, subteam } : undefined;
}

export function activeSubteams(team: Team): Subteam[] {
  return team.subteams.filter((s) => s.status === 'activo');
}
