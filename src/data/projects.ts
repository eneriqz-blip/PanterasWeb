import type { TeamId } from './teams';

export interface ProjectDetail {
  label: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  team: TeamId;
  /** Slug del subequipo dentro del área (opcional). */
  subteam?: string;
  year?: number;
  status: 'En curso' | 'Completado';
  summary: string;
  /** Bloques de texto con lo que el equipo cuenta del proyecto; si no hay, la página no inventa nada. */
  details?: ProjectDetail[];
  tags: string[];
  /** Cifra destacada. Se omite cuando no hay un número real que mostrar. */
  metric?: { label: string; value: string };
  links?: { label: string; href: string }[];
  /**
   * Miniatura explícita. No hace falta casi nunca: si existe public/projects/<slug>.(webp|jpg|jpeg|png|avif),
   * se usa sola (ver src/lib/thumbnail.ts).
   */
  thumbnail?: { src: string; alt: string };
}

export const projects: Project[] = [
  {
    slug: 'the-pumpkin-paradox',
    title: 'The Pumpkin Paradox',
    team: 'play',
    subteam: 'vortex-paradox',
    status: 'En curso',
    summary:
      'Aventura de acción en 2D donde el combate ágil se mezcla con una exploración capaz de alterar el paso del tiempo.',
    details: [
      {
        label: 'Sobre el juego',
        text: 'El Señor Oscuro ha ganado. ¿Y ahora qué? Descúbrelo en esta peculiar aventura de acción en 2D, donde el combate ágil se mezcla con una exploración capaz de alterar el paso del tiempo. Cambia las estaciones, transforma el mundo, resuelve ingeniosos rompecabezas y déjate llevar por una historia conmovedora, llena de personajes excéntricos, humor y un encanto ligeramente oscuro.',
      },
      {
        label: 'Estado actual',
        text: 'Es el proyecto principal de Vortex Paradox y sigue en desarrollo activo. El equipo trabaja en distintas áreas como arte, diseño, programación, narrativa, QA y mercadotecnia.',
      },
      {
        label: 'Plan actual',
        text: 'Ahora en beta, el plan incluye nuevas iteraciones de niveles, integración y polish de entornos, cinemáticas, UI y menús, jefes, localización, QA final y contenido para redes.',
      },
    ],
    tags: ['Videojuego 2D', 'Unity', 'Comercial'],
    links: [
      { label: 'Ver en Steam', href: 'https://store.steampowered.com/app/4604640/The_Pumpkin_Paradox' },
      { label: 'Instagram', href: 'https://www.instagram.com/pumpkin.paradox/' },
    ],
  },
  {
    slug: 'dron-autonomo',
    title: 'Dron autónomo',
    team: 'mechanics',
    subteam: 'robotics',
    status: 'En curso',
    summary: 'Construcción de un dron autónomo, el proyecto actual de Robotics.',
    tags: ['Robótica', 'Drones'],
  },
  {
    slug: 'mini-proyectos-robotics',
    title: 'Mini-proyectos Robotics',
    team: 'mechanics',
    subteam: 'robotics',
    status: 'En curso',
    summary: 'Mini-proyectos paralelos al dron autónomo, parecidos a lo que era Build-UP.',
    tags: ['Robótica'],
  },
  {
    slug: 'dron-autonomo-construccion-anterior',
    title: 'Dron autónomo (construcción anterior)',
    team: 'mechanics',
    subteam: 'robotics',
    status: 'Completado',
    summary:
      'Anterior construcción de un dron autónomo; el equipo estuvo cerca de participar en el Torneo Nacional de Robótica.',
    tags: ['Robótica', 'Drones'],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByTeam(team: TeamId): Project[] {
  return projects.filter((project) => project.team === team);
}

export function getProjectsBySubteam(team: TeamId, subteam: string): Project[] {
  return projects.filter((project) => project.team === team && project.subteam === subteam);
}

export function getFeatured(count = 6): Project[] {
  return [...projects].sort((a, b) => Number(b.status === 'En curso') - Number(a.status === 'En curso')).slice(0, count);
}
