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
        strokeLinecap="round"
    />
);

export function HandGuide({ highlightFinger }: HandGuideProps) {
    const isThumb = highlightFinger === 'thumb';

    return (
        <div className="flex justify-center items-end gap-2 w-full max-w-2xl mx-auto h-48 -mb-4">
            {/* Left Hand */}
            <svg viewBox="0 0 150 120" className="h-full w-auto">
                <g>
                    {/* Palm */}
                    <path d="M 110 118 C 80 125, 40 120, 20 95 S 10 50, 45 45 S 85 30, 100 50 S 135 60, 125 90 Z" className="fill-card-foreground/5" />

                    {/* Fingers */}
                    <Finger path="M 28 70 C 20 65, 18 45, 25 30 S 35 12, 42 15 S 50 35, 45 50 S 40 75, 28 70 Z" isHighlighted={highlightFinger === 'left-pinky'} />
                    <Finger path="M 52 52 C 45 45, 45 25, 53 13 S 65 -2, 72 2 S 82 23, 75 38 S 65 60, 52 52 Z" isHighlighted={highlightFinger === 'left-ring'} />
                    <Finger path="M 78 45 C 72 38, 72 15, 80 3 S 90 -8, 98 -5 S 108 15, 100 30 S 90 53, 78 45 Z" isHighlighted={highlightFinger === 'left-middle'} />
                    <Finger path="M 104 53 C 98 48, 98 22, 107 12 S 118 -5, 125 0 S 135 22, 128 35 S 118 60, 104 53 Z" isHighlighted={highlightFinger === 'left-index'} />

                    {/* Thumb */}
                    <Finger path="M 125 90 C 130 80, 145 80, 150 90 S 150 105, 142 110 S 125 115, 120 105 S 120 95, 125 90 Z" isHighlighted={isThumb} />

                </g>
            </svg>

            {/* Right Hand */}
            <svg viewBox="0 0 150 120" className="h-full w-auto scale-x-[-1]">
                <g>
                    {/* Palm */}
                    <path d="M 110 118 C 80 125, 40 120, 20 95 S 10 50, 45 45 S 85 30, 100 50 S 135 60, 125 90 Z" className="fill-card-foreground/5" />

                    {/* Fingers */}
                    <Finger path="M 28 70 C 20 65, 18 45, 25 30 S 35 12, 42 15 S 50 35, 45 50 S 40 75, 28 70 Z" isHighlighted={highlightFinger === 'right-pinky'} />
                    <Finger path="M 52 52 C 45 45, 45 25, 53 13 S 65 -2, 72 2 S 82 23, 75 38 S 65 60, 52 52 Z" isHighlighted={highlightFinger === 'right-ring'} />
                    <Finger path="M 78 45 C 72 38, 72 15, 80 3 S 90 -8, 98 -5 S 108 15, 100 30 S 90 53, 78 45 Z" isHighlighted={highlightFinger === 'right-middle'} />
                    <Finger path="M 104 53 C 98 48, 98 22, 107 12 S 118 -5, 125 0 S 135 22, 128 35 S 118 60, 104 53 Z" isHighlighted={highlightFinger === 'right-index'} />

                    {/* Thumb */}
                    <Finger path="M 125 90 C 130 80, 145 80, 150 90 S 150 105, 142 110 S 125 115, 120 105 S 120 95, 125 90 Z" isHighlighted={isThumb} />
                </g>
            </svg>
        </div>
    )
}
