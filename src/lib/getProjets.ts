import projects from '@/data/projects.json';

export type Project = {
    slug: string;
    titre: string;
    sousTitre: string;
    client: string;
    pourQui: string;
    besoin: string;
    citationClient: string;
    proposition: string[];
    resultat: string;
    temoignage?: string;
    temoignage2?: string;
    collaboration?: string;
    image: string;
    lien: string;
};

export async function getProjects(): Promise<Project[]> {
    return projects as Project[];
}
