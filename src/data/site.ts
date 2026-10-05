import { teams } from './teams';

export const site = {
  name: 'Nexus Labs',
  institution: 'Universidad Panamericana',
  contactEmail: 'panteras@up.edu.mx',
  joinSubject: 'Quiero unirme a Nexus Labs',
};

export const mailtoHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent(site.joinSubject)}`;

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
