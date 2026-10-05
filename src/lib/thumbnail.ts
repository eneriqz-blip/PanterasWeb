import fs from 'node:fs';
import path from 'node:path';
import type { Project } from '@/data/projects';

const EXTENSIONS = ['webp', 'avif', 'jpg', 'jpeg', 'png'];

export function getThumbnail(project: Project): { src: string; alt: string } | undefined {
  if (project.thumbnail) return project.thumbnail;

  const folder = path.join(process.cwd(), 'public', 'projects');
  for (const extension of EXTENSIONS) {
    if (fs.existsSync(path.join(folder, `${project.slug}.${extension}`))) {
      return { src: `/projects/${project.slug}.${extension}`, alt: `Imagen de ${project.title}` };
    }
  }
  return undefined;
}
