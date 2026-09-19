import type { TeamId } from './teams';

export interface Project {
  slug: string;
  title: string;
  team: TeamId;
  year: number;
  status: 'En curso' | 'Completado' | 'Piloto';
  summary: string;
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
    tags: ['Six Sigma', 'Calidad'],
    metric: { label: 'Reducción de variabilidad', value: '24%' },
  },
];

export function getProjectsByTeam(team: TeamId): Project[] {
  return projects.filter((p) => p.team === team);
}
