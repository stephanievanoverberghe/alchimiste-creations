export type MethodDependencyIcon = 'fileText' | 'image' | 'keySquare' | 'globe' | 'shieldCheck' | 'folderOpen' | 'type' | 'link2' | 'listChecks';

export type MethodDependencyListItem = {
    icon: MethodDependencyIcon;
    label: string;
};

export type MethodDependencyTag = {
    icon: MethodDependencyIcon;
    label: string;
};

export type MethodDependencyCard = {
    id: 'prerequisites' | 'formats' | 'bestPractices';
    title: string;
    icon: MethodDependencyIcon;
    items: MethodDependencyListItem[];
    tags?: MethodDependencyTag[];
    exampleTitle: string;
    exampleDescription: string;
};

export type MethodDependenciesContent = {
    badge: string;
    title: string;
    description: string;
    cards: MethodDependencyCard[];
    footnote: string;
};
