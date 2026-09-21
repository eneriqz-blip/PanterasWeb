import type { TeamId } from './teams';

export interface Project {
  slug: string;
  title: string;
  team: TeamId;
  year: number;
  status: 'En curso' | 'Completado' | 'Piloto';
  summary: string;
  challenge: string;
  approach: string;
  tags: string[];
  metric: { label: string; value: string };
}

export const projects: Project[] = [
  {
    slug: 'campusmap-navegacion-interior',
    title: 'CampusMap: navegación interior del campus',
    team: 'computer-science',
    year: 2025,
    status: 'En curso',
    summary:
      'Aplicación web progresiva que guía a estudiantes de nuevo ingreso entre edificios y salones mediante mapas interactivos y rutas accesibles.',
    challenge:
      'Los alumnos de nuevo ingreso pierden los primeros días buscando salones en edificios que no conocen, y los mapas impresos no muestran rutas accesibles.',
    approach:
      'Construimos una aplicación web progresiva con mapa interactivo y búsqueda de salones, con rutas alternas para personas con movilidad reducida y funcionamiento sin conexión.',
    tags: ['Web', 'PWA', 'UX'],
    metric: { label: 'Sesiones semanales', value: '1,200+' },
  },
  {
    slug: 'asesorias-ia-matching',
    title: 'Sistema de match para asesorías entre pares',
    team: 'computer-science',
    year: 2024,
    status: 'Completado',
    summary:
      'Motor de recomendación que empareja estudiantes que piden asesoría con mentores disponibles según materia, horario y calificación previa.',
    challenge:
      'Las asesorías entre pares dependían de mensajes sueltos en grupos: quien necesitaba ayuda no sabía quién podía dársela ni cuándo.',
    approach:
      'Diseñamos un motor de recomendación que cruza materia, horario y desempeño previo para proponer al mentor adecuado, con revisión humana antes de confirmar cada asesoría.',
    tags: ['IA aplicada', 'Backend', 'Datos'],
    metric: { label: 'Asesorías generadas', value: '860' },
  },
  {
    slug: 'nexus-cli-devtools',
    title: 'Nexus CLI: herramientas internas para equipos',
    team: 'computer-science',
    year: 2024,
    status: 'Completado',
    summary:
      'Línea de comandos de código abierto que automatiza despliegues y reportes internos usados por los cuatro equipos de Nexus Labs.',
    challenge:
      'Cada equipo desplegaba sus proyectos y generaba reportes a mano, con pasos distintos y errores repetidos.',
    approach:
      'Unificamos esos flujos en una línea de comandos de código abierto, con plantillas por equipo, pruebas automáticas y documentación incluida en el propio repositorio.',
    tags: ['Open source', 'DevOps'],
    metric: { label: 'Despliegues automatizados', value: '300+' },
  },
  {
    slug: 'roble-and-thorn',
    title: 'Roble & Thorn',
    team: 'play',
    year: 2025,
    status: 'En curso',
    summary:
      'Aventura narrativa 2D inspirada en el simbolismo del escudo institucional, desarrollada en Godot con arte pixel original.',
    challenge:
      'Queríamos contar una historia con identidad propia sin depender de recursos genéricos, y comprobar que un equipo mixto de arte, escritura y código puede sostener un juego completo.',
    approach:
      'Trabajamos en ciclos cortos de prototipo y playtest, con guion, arte pixel y música originales integrados en Godot desde las primeras versiones.',
    tags: ['Videojuego 2D', 'Narrativa', 'Arte'],
    metric: { label: 'Playtesters', value: '140' },
  },
  {
    slug: 'campus-run',
    title: 'Campus Run',
    team: 'play',
    year: 2024,
    status: 'Completado',
    summary:
      'Endless runner ambientado en el campus, creado en 48 horas durante una game jam interna y jugado por más de 2,000 personas.',
    challenge:
      'Una game jam interna de 48 horas: llegar a un juego terminado y publicable con un equipo recién formado.',
    approach:
      'Acotamos el alcance a una sola mecánica, repartimos roles de estudio desde la primera hora y reservamos las últimas seis horas sólo para pruebas y pulido.',
    tags: ['Game jam', 'Unity', 'Arcade'],
    metric: { label: 'Partidas jugadas', value: '2,300+' },
  },
  {
    slug: 'realidad-aumentada-museo',
    title: 'AR del Museo de Sitio universitario',
    team: 'play',
    year: 2023,
    status: 'Piloto',
    summary:
      'Experiencia de realidad aumentada que reconstruye piezas del museo universitario sobre el celular del visitante.',
    challenge:
      'Varias piezas del museo universitario no se pueden manipular ni exhibir juntas, y los visitantes rara vez tienen contexto sobre ellas.',
    approach:
      'Digitalizamos piezas con fotogrametría y las mostramos en realidad aumentada sobre el celular, con fichas breves que explican su origen y uso.',
    tags: ['Realidad aumentada', 'Cultura'],
    metric: { label: 'Piezas digitalizadas', value: '18' },
  },
  {
    slug: 'rover-autonomo-v3',
    title: 'Rover autónomo v3',
    team: 'mechanics',
    year: 2025,
    status: 'En curso',
    summary:
      'Tercera generación del rover de exploración autónoma del equipo, con navegación por visión y evasión de obstáculos en tiempo real.',
    challenge:
      'La versión anterior del rover se detenía ante obstáculos imprevistos y dependía de un operador para retomar la ruta.',
    approach:
      'Rediseñamos el chasis para bajar peso, integramos visión por computadora para detectar obstáculos y probamos la autonomía en recorridos cronometrados dentro del campus.',
    tags: ['Robótica', 'Visión computacional', 'Manufactura'],
    metric: { label: 'Autonomía de prueba', value: '45 min' },
  },
  {
    slug: 'baja-sae-chasis',
    title: 'Chasis para vehículo todo terreno (Baja SAE)',
    team: 'mechanics',
    year: 2024,
    status: 'Completado',
    summary:
      'Diseño y manufactura completa del chasis tubular para la competencia nacional Baja SAE, optimizado por simulación estructural.',
    challenge:
      'La competencia exige un chasis resistente y ligero, y el diseño anterior superaba el peso objetivo.',
    approach:
      'Iteramos la geometría con simulación estructural, validamos cada versión contra los requisitos del reglamento y manufacturamos el tubular en el taller del equipo.',
    tags: ['CAD', 'Simulación', 'Competencia'],
    metric: { label: 'Reducción de peso', value: '18%' },
  },
  {
    slug: 'brazo-robotico-clasificacion',
    title: 'Brazo robótico de clasificación de residuos',
    team: 'mechanics',
    year: 2023,
    status: 'Completado',
    summary:
      'Prototipo funcional que clasifica residuos reciclables por tipo de material usando sensores ópticos y control embebido.',
    challenge:
      'Separar residuos a mano es lento y propenso a errores en los puntos de reciclaje del campus.',
    approach:
      'Armamos un brazo con sensores ópticos que identifica el tipo de material y lo dirige al contenedor correcto, con control embebido y calibración por lotes.',
    tags: ['Automatización', 'Sustentabilidad'],
    metric: { label: 'Precisión de clasificación', value: '92%' },
  },
  {
    slug: 'lean-cafeteria-central',
    title: 'Rediseño de flujo en cafetería central',
    team: 'iise',
    year: 2025,
    status: 'Completado',
    summary:
      'Diagnóstico Lean del proceso de servicio en la cafetería principal del campus, con rediseño de layout y reducción de tiempos de espera.',
    challenge:
      'En horas pico las filas de la cafetería central se hacían largas y el flujo entre caja y entrega generaba cuellos de botella.',
    approach:
      'Mapeamos el proceso con cronometraje en sitio, aplicamos herramientas Lean y propusimos un nuevo layout y una asignación de personal por franja horaria.',
    tags: ['Lean', 'Procesos', 'Consultoría'],
    metric: { label: 'Reducción de espera', value: '31%' },
  },
  {
    slug: 'simulacion-logistica-donaciones',
    title: 'Simulación logística para banco de alimentos',
    team: 'iise',
    year: 2024,
    status: 'Completado',
    summary:
      'Modelo de simulación de rutas y capacidad de almacenamiento para una organización social aliada, hecho con datos reales de operación.',
    challenge:
      'Una organización aliada distribuía alimentos con rutas definidas por costumbre, sin saber si la capacidad de almacenamiento alcanzaba.',
    approach:
      'Construimos un modelo de simulación con sus datos reales de operación y comparamos escenarios de rutas y capacidad para recomendar la configuración más eficiente.',
    tags: ['Simulación', 'Logística', 'Impacto social'],
    metric: { label: 'Rutas optimizadas', value: '14' },
  },
  {
    slug: 'six-sigma-laboratorios',
    title: 'Six Sigma en laboratorios de ingeniería',
    team: 'iise',
    year: 2023,
    status: 'Piloto',
    summary:
      'Proyecto DMAIC para reducir variabilidad en los tiempos de preparación de prácticas en los laboratorios de ingeniería.',
    challenge:
      'El tiempo de preparación de las prácticas variaba mucho entre laboratorios, lo que retrasaba el inicio de las sesiones.',
    approach:
      'Seguimos el ciclo DMAIC: medimos la variabilidad, identificamos causas raíz y estandarizamos los pasos de preparación con listas de verificación.',
    tags: ['Six Sigma', 'Calidad'],
    metric: { label: 'Reducción de variabilidad', value: '24%' },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByTeam(team: TeamId): Project[] {
  return projects.filter((project) => project.team === team);
}

export function getFeatured(count = 6): Project[] {
  return [...projects].sort((a, b) => b.year - a.year).slice(0, count);
}
