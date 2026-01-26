'use client';

import { cn } from '@/lib/utils';
import type { FingerName } from '@/lib/types';
import React from 'react';

type HandGuideProps = {
    highlightFinger: FingerName | null;
}

const Finger = ({ path, isHighlighted }: { path: string; isHighlighted: boolean }) => (
    <path
        d={path}
        className={cn(
            'fill-card-foreground/5 stroke-card-foreground/10 transition-colors duration-150',
            isHighlighted && 'fill-accent/50 stroke-accent'
        )}
        strokeWidth="1.5"
        strokeLinejoin="round"
    />
);

export function HandGuide({ highlightFinger }: HandGuideProps) {
    const isThumb = highlightFinger === 'thumb';
    return (
        <div className="flex justify-center items-end gap-4 w-full max-w-xl mx-auto h-40">
            {/* Left Hand */}
            <svg viewBox="0 0 123 113" className="h-full w-auto">
                <g>
                    <path d="M113.5,61.5v-13c0-5.2-4-9.5-9-9.5H89.2c-5,0-9,4.2-9,9.5v32c0,5.2,4,9.5,9,9.5h8.2c5,0,9-4.2,9-9.5V61.5z" className={cn('fill-card-foreground/5 stroke-card-foreground/10 transition-colors duration-150', isThumb && 'fill-accent/50 stroke-accent')} strokeWidth="1.5" strokeLinejoin="round" />
                    <Finger path="M68.8,88.5H53.2c-5,0-9-4.2-9-9.5V10c0-5.2,4-9.5,9-9.5h15.5c5,0,9,4.2,9,9.5v69C77.8,84.2,73.8,88.5,68.8,88.5z" isHighlighted={highlightFinger === 'left-middle'} />
                    <Finger path="M44.2,77.5H28.8c-5,0-9-4.2-9-9.5V21c0-5.2,4-9.5,9-9.5h15.5c5,0,9,4.2,9,9.5v47C53.2,73.2,49.2,77.5,44.2,77.5z" isHighlighted={highlightFinger === 'left-ring'} />
                    <Finger path="M19.8,66.5H4.2c-2.2,0-4-2-4-4.5V32c0-2.5,1.8-4.5,4-4.5h15.5c2.2,0,4,2,4,4.5v30C23.8,64.5,22,66.5,19.8,66.5z" isHighlighted={highlightFinger === 'left-pinky'} />
                    <Finger path="M92.2,77.5H76.8c-5,0-9-4.2-9-9.5V21c0-5.2,4-9.5,9-9.5h15.5c5,0,9,4.2,9,9.5v47C101.2,73.2,97.2,77.5,92.2,77.5z" isHighlighted={highlightFinger === 'left-index'} />
                </g>
            </svg>

            {/* Right Hand */}
            <svg viewBox="0 0 123 113" className="h-full w-auto scale-x-[-1]">
                <g>
                    <path d="M113.5,61.5v-13c0-5.2-4-9.5-9-9.5H89.2c-5,0-9,4.2-9,9.5v32c0,5.2,4,9.5,9,9.5h8.2c5,0,9-4.2,9-9.5V61.5z" className={cn('fill-card-foreground/5 stroke-card-foreground/10 transition-colors duration-150', isThumb && 'fill-accent/50 stroke-accent')} strokeWidth="1.5" strokeLinejoin="round" />
                    <Finger path="M68.8,88.5H53.2c-5,0-9-4.2-9-9.5V10c0-5.2,4-9.5,9-9.5h15.5c5,0,9,4.2,9,9.5v69C77.8,84.2,73.8,88.5,68.8,88.5z" isHighlighted={highlightFinger === 'right-middle'} />
                    <Finger path="M44.2,77.5H28.8c-5,0-9-4.2-9-9.5V21c0-5.2,4-9.5,9-9.5h15.5c5,0,9,4.2,9,9.5v47C53.2,73.2,49.2,77.5,44.2,77.5z" isHighlighted={highlightFinger === 'right-ring'} />
                    <Finger path="M19.8,66.5H4.2c-2.2,0-4-2-4-4.5V32c0-2.5,1.8-4.5,4-4.5h15.5c2.2,0,4,2,4,4.5v30C23.8,64.5,22,66.5,19.8,66.5z" isHighlighted={highlightFinger === 'right-pinky'} />
                    <Finger path="M92.2,77.5H76.8c-5,0-9-4.2-9-9.5V21c0-5.2,4-9.5,9-9.5h15.5c5,0,9,4.2,9,9.5v47C101.2,73.2,97.2,77.5,92.2,77.5z" isHighlighted={highlightFinger === 'right-index'} />
                </g>
            </svg>
        </div>
    )
}
