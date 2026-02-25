// lib/getPacks.ts

import projects from '@/infrastructure/content/projects.json';

export async function getProjects() {
    return projects;
}
