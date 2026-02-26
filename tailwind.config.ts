import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: 'hsl(var(--bg))',
                surface: 'hsl(var(--surface))',
                'surface-elevated': 'hsl(var(--surface-elevated))',
                text: 'hsl(var(--text))',
                'text-muted': 'hsl(var(--text-muted))',
                primary: 'hsl(var(--primary))',
                accent: 'hsl(var(--accent))',
                border: 'hsl(var(--border))',
            },
        },
    },
};

export default config;
