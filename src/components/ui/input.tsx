import { cn } from '@/lib/utils';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={cn('focus-ring w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted', props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cn('focus-ring min-h-32 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted', props.className)}
        />
    );
}
