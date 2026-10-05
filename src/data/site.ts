import { teams } from './teams';

export const site = {
  name: 'Nexus Labs',
  institution: 'Universidad Panamericana',
  contactEmail: 'panteras@up.edu.mx',
  joinSubject: 'Quiero unirme a Nexus Labs',
};

/** Correo de contacto de un equipo; si no tiene uno propio se usa el general de Nexus. */
export function contactFor(email?: string): string {
  return email ?? site.contactEmail;
}

/** Enlace `mailto:` para unirse a un equipo (`label`) o, sin argumentos, a Nexus Labs en general. */
export function joinMailto(label?: string, email?: string): string {
  const subject = label ? `Quiero unirme a ${label}` : site.joinSubject;
  return `mailto:${contactFor(email)}?subject=${encodeURIComponent(subject)}`;
}

export const mailtoHref = joinMailto();

export const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/equipos', label: 'Equipos' },
  { href: '/proyectos', label: 'Proyectos' },
];

export const teamLinks = teams.map((team) => ({
  href: `/equipos/${team.slug}`,
  label: team.shortName,
  id: team.id,
  subteams: team.subteams
    .filter((subteam) => subteam.status === 'activo')
    .map((subteam) => ({ href: `/equipos/${team.slug}/${subteam.slug}`, label: subteam.name })),
}));
