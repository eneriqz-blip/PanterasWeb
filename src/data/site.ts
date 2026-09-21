import { teams } from './teams';

export const site = {
  name: 'Nexus Labs',
  institution: 'Universidad Panamericana',
  contactEmail: 'nexuslabs@up.edu.mx',
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
  color: team.color,
}));
