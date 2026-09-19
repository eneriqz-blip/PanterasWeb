/**
 * Los 4 equipos de Nexus Labs.
 *
 * Asignación de color: para no introducir tonos ajenos al Manual de Marca,
 * cada equipo hereda uno de los 4 colores cromáticos ya aprobados
 * institucionalmente (dorado, azul, vino, verde), eligiendo el que mejor
 * dialoga con el significado que el propio manual les atribuye
 * (pág. 32, "Inspiración de los colores"):
 *   - Azul  → Prudencia e inteligencia   → Computer Science
 *   - Vino  → Fortaleza, audacia, honor  → Mechanics
 *   - Verde → Constancia y esperanza     → IISE
 *   - Dorado→ Excelencia y grandeza      → Play
 */

export type TeamId = 'computer-science' | 'play' | 'mechanics' | 'iise';

export interface TeamStat {
  label: string;
  value: string;
}

export interface Team {
  id: TeamId;
  slug: TeamId;
  shortName: string;
  fullName: string;
  tagline: string;
  color: 'blue' | 'garnet' | 'green' | 'gold';
  summary: string;
  description: string[];
  focusAreas: { title: string; detail: string }[];
  stats: TeamStat[];
  cadence: string;
  joinNote: string;
}

export const teams: Team[] = [
  {
    id: 'computer-science',
    slug: 'computer-science',
    shortName: 'Computer Science',
    fullName: 'Nexus Labs · Computer Science',
    tagline: 'Software con criterio, construido en comunidad.',
    color: 'blue',
    summary:
      'El equipo que convierte código en producto: desarrollo de software, inteligencia artificial y competencias de programación con estándares de la industria.',
    description: [
      'Computer Science reúne a estudiantes de Ingeniería en Sistemas, Ciencia de Datos y carreras afines que quieren aprender construyendo: aplicaciones reales, con revisión de código, arquitectura pensada y despliegue en producción, no sólo ejercicios de clase.',
      'El equipo opera como una consultora interna: recibe retos de otros equipos y de la comunidad universitaria, y responde con soluciones de software —desde automatizaciones internas hasta productos completos— documentadas y mantenibles.',
      'Semanalmente hay espacio para dos velocidades distintas: quienes se preparan para competencias de programación competitiva y hackathons, y quienes prefieren profundizar en un stack (web, IA aplicada, sistemas distribuidos) a través de proyectos de largo plazo.',
    ],
    focusAreas: [
      { title: 'Desarrollo de producto', detail: 'Equipos pequeños que llevan una idea de cero a una versión usable, con ciclos cortos de retroalimentación.' },
      { title: 'IA aplicada', detail: 'Proyectos con modelos de lenguaje y aprendizaje automático orientados a problemas reales del campus.' },
      { title: 'Programación competitiva', detail: 'Entrenamiento semanal y participación en competencias interuniversitarias e ICPC.' },
      { title: 'Buenas prácticas', detail: 'Code review entre pares, control de versiones y documentación como hábito, no como trámite.' },
    ],
    stats: [
      { label: 'Integrantes activos', value: '48' },
      { label: 'Proyectos en curso', value: '9' },
      { label: 'Años operando', value: '6' },
      { label: 'Hackathons ganados', value: '5' },
    ],
    cadence: 'Sesiones los martes y jueves, 18:00–20:00 · Laboratorio de Sistemas',
    joinNote: 'No se requiere experiencia previa en un lenguaje específico: sí, curiosidad por resolver problemas con código.',
  },
  {
    id: 'play',
    slug: 'play',
    shortName: 'Play',
    fullName: 'Nexus Labs · Play',
    tagline: 'Diseñar mundos jugables, de la idea al playtest.',
    color: 'gold',
    summary:
      'El equipo de desarrollo de videojuegos y diseño interactivo: narrativa, arte, sonido y programación de juegos trabajando como un estudio real.',
    description: [
      'Play existe para quienes quieren crear experiencias interactivas —videojuegos, instalaciones, experiencias en realidad aumentada— y entender el proceso completo detrás de ellas: concepto, prototipo, producción y lanzamiento.',
      'El equipo funciona con roles de estudio (diseño, arte, programación, audio, producción) que rotan entre proyectos, para que cada integrante entienda el juego como sistema completo antes de especializarse.',
      'Cada semestre cierra con una jornada de playtesting abierta a la comunidad universitaria, donde los prototipos se prueban con jugadores reales y se documentan hallazgos para la siguiente iteración.',
    ],
    focusAreas: [
      { title: 'Game design', detail: 'Mecánicas, balance y documentación de diseño como base de cada prototipo.' },
      { title: 'Arte y narrativa', detail: 'Dirección de arte, worldbuilding y guion para experiencias con identidad propia.' },
      { title: 'Programación de juegos', detail: 'Motores como Unity y Godot, con foco en rendimiento y jugabilidad.' },
      { title: 'Playtesting', detail: 'Sesiones estructuradas de prueba con jugadores reales antes de cada entrega.' },
    ],
    stats: [
      { label: 'Integrantes activos', value: '34' },
      { label: 'Juegos publicados', value: '7' },
      { label: 'Años operando', value: '5' },
      { label: 'Game jams participadas', value: '11' },
    ],
    cadence: 'Sesiones los lunes y miércoles, 17:30–19:30 · Estudio Creativo Nexus Labs',
    joinNote: 'Se buscan perfiles diversos: diseño, arte, audio, escritura y programación son igual de necesarios.',
  },
  {
    id: 'mechanics',
    slug: 'mechanics',
    shortName: 'Mechanics',
    fullName: 'Nexus Labs · Mechanics',
    tagline: 'De la maqueta al prototipo funcional.',
    color: 'garnet',
    summary:
      'Robótica, manufactura y diseño mecánico: el equipo que diseña, fabrica y compite con máquinas propias.',
    description: [
      'Mechanics es el taller de Nexus Labs: diseño mecánico asistido por computadora, manufactura (impresión 3D, corte CNC, mecanizado básico) y electrónica embebida aplicados a robots y prototipos funcionales.',
      'Los proyectos nacen de un problema concreto —una competencia, una necesidad del campus, un reto propuesto por la industria— y avanzan por las mismas etapas que un producto de ingeniería real: requerimientos, diseño, simulación, fabricación y pruebas.',
      'El equipo mantiene un taller físico con herramientas compartidas y protocolos de seguridad, y forma a cada nueva generación en manufactura antes de asignarle responsabilidad sobre un subsistema completo.',
    ],
    focusAreas: [
      { title: 'Diseño mecánico', detail: 'Modelado CAD, simulación estructural y diseño para manufactura.' },
      { title: 'Manufactura', detail: 'Impresión 3D, corte láser/CNC y ensamble de prototipos funcionales.' },
      { title: 'Electrónica y control', detail: 'Sensores, actuadores y sistemas embebidos para robótica autónoma.' },
      { title: 'Competencias', detail: 'Participación en torneos nacionales de robótica y vehículos de diseño propio.' },
    ],
    stats: [
      { label: 'Integrantes activos', value: '39' },
      { label: 'Prototipos construidos', value: '14' },
      { label: 'Años operando', value: '7' },
      { label: 'Podios en competencia', value: '6' },
    ],
    cadence: 'Sesiones los martes y viernes, 16:00–19:00 · Taller Mechanics',
    joinNote: 'El taller es abierto a todas las carreras: se aprende manufactura desde cero, con acompañamiento de integrantes avanzados.',
  },
  {
    id: 'iise',
    slug: 'iise',
    shortName: 'IISE',
    fullName: 'Nexus Labs · IISE — Capítulo Estudiantil',
    tagline: 'Optimizar sistemas, decidir con datos.',
    color: 'green',
    summary:
      'Capítulo estudiantil del Institute of Industrial and Systems Engineers: mejora de procesos, análisis de datos y consultoría aplicada a organizaciones reales.',
    description: [
      'IISE es el capítulo estudiantil ligado al Institute of Industrial and Systems Engineers dentro de Nexus Labs, enfocado en aplicar ingeniería industrial y de sistemas a problemas de operación, logística y calidad en organizaciones reales.',
      'El equipo trabaja por proyectos de consultoría: empresas, dependencias universitarias y organizaciones sociales presentan un problema operativo, y equipos de IISE lo abordan con las herramientas de la disciplina —mapeo de procesos, simulación, análisis estadístico, Lean y Six Sigma— hasta entregar una recomendación accionable.',
      'Además mantiene vínculo activo con la red internacional de IISE, participando en competencias de estudio de caso y foros que conectan a sus integrantes con profesionales en activo.',
    ],
    focusAreas: [
      { title: 'Mejora de procesos', detail: 'Mapeo, medición y rediseño de procesos con metodologías Lean y Six Sigma.' },
      { title: 'Analítica de operaciones', detail: 'Modelos de simulación y análisis de datos para decisiones de capacidad y logística.' },
      { title: 'Consultoría aplicada', detail: 'Proyectos con organizaciones reales, de diagnóstico a plan de implementación.' },
      { title: 'Comunidad profesional', detail: 'Vínculo con la red internacional IISE y participación en competencias de caso.' },
    ],
    stats: [
      { label: 'Integrantes activos', value: '27' },
      { label: 'Proyectos de consultoría', value: '12' },
      { label: 'Años operando', value: '4' },
      { label: 'Organizaciones atendidas', value: '9' },
    ],
    cadence: 'Sesiones los miércoles, 18:00–20:00 · Sala de Casos, Facultad de Ingeniería',
    joinNote: 'Ideal para perfiles analíticos con interés en operaciones, datos o consultoría, de cualquier ingeniería.',
  },
];

export function getTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}
