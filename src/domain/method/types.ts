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

export type MethodTldrPillar = {
    title: string;
    description: string;
};

export type MethodTldrMetrics = {
    delaisMoyens: string;
    cyclesRetours: string;
    capaciteProjets: string;
};

export type MethodTldrContent = {
    badge: string;
    title: string;
    description: string;
    pillars: [MethodTldrPillar, MethodTldrPillar, MethodTldrPillar];
    metricLabels: {
        delaisMoyens: string;
        cyclesRetours: string;
        capaciteProjets: string;
    };
    footnote: string;
    detailsCta: string;
    defaultMetrics: MethodTldrMetrics;
};

export type MethodPrincipleIcon = 'leaf' | 'accessibility' | 'gauge' | 'userCheck' | 'shieldCheck' | 'sparkles';

export type MethodPrinciple = {
    icon: MethodPrincipleIcon;
    title: string;
    desc: string;
    example: string;
};

export type MethodPrinciplesContent = {
    badge: string;
    title: string;
    description: string;
    exampleLabel: string;
    principles: MethodPrinciple[];
    footnote: string;
};
