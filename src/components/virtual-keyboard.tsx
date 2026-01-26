
import { cn } from '@/lib/utils';
import React from 'react';
import { KEY_TO_FINGER_MAP } from '@/lib/key-map';
import type { FingerName } from '@/lib/types';

const keyLayout = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
  ['ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight'],
];

export const keyDisplayMap: { [key: string]: string } = {
  Backquote: '`', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0', Minus: '-', Equal: '=', Backspace: 'Backspace',
  Tab: 'Tab', KeyQ: 'Q', KeyW: 'W', KeyE: 'E', KeyR: 'R', KeyT: 'T', KeyY: 'Y', KeyU: 'U', KeyI: 'I', KeyO: 'O', KeyP: 'P', BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  CapsLock: 'Caps Lock', KeyA: 'A', KeyS: 'S', KeyD: 'D', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyJ: 'J', KeyK: 'K', KeyL: 'L', Semicolon: ';', Quote: '\'', Enter: 'Enter',
  ShiftLeft: 'Shift', KeyZ: 'Z', KeyX: 'X', KeyC: 'C', KeyV: 'V', KeyB: 'B', KeyN: 'N', KeyM: 'M', Comma: ',', Period: '.', Slash: '/', ShiftRight: 'Shift',
  ControlLeft: 'Ctrl', AltLeft: 'Alt', Space: ' ', AltRight: 'Alt', ControlRight: 'Ctrl',
};


const HOME_ROW_FINGERS: {[key: string]: FingerName} = {
    'KeyA': 'left-pinky',
    'KeyS': 'left-ring',
    'KeyD': 'left-middle',
    'KeyF': 'left-index',
    'KeyJ': 'right-index',
    'KeyK': 'right-middle',
    'KeyL': 'right-ring',
    'Semicolon': 'right-pinky',
    'Space': 'thumb'
}

const fingerDimensions: { [key: string]: { w: number; h: number } } = {
  pinky: { w: 22, h: 36 },
  ring: { w: 24, h: 42 },
  middle: { w: 26, h: 46 },
  index: { w: 26, h: 44 },
  thumb: { w: 32, h: 28 },
};

const Finger = ({ finger, isHighlighted }: { finger: FingerName; isHighlighted: boolean }) => {
    const fingerType = finger.replace(/left-|right-/, '');
    const { w, h } = fingerDimensions[fingerType as keyof typeof fingerDimensions] || fingerDimensions['middle'];

    const transform: { [key in FingerName]?: string } = {
        'left-pinky': 'rotate(-25deg)',
        'left-ring': 'rotate(-10deg)',
        'left-middle': 'rotate(0deg)',
        'left-index': 'rotate(10deg)',
        'thumb': 'rotate(60deg)',
        'right-index': 'rotate(-10deg) scaleX(-1)',
        'right-middle': 'rotate(0deg) scaleX(-1)',
        'right-ring': 'rotate(10deg) scaleX(-1)',
        'right-pinky': 'rotate(25deg) scaleX(-1)',
    };

    const position: { [key in FingerName]?: string } = {
        'left-pinky': '-top-6 left-1',
        'left-ring': '-top-8 left-0',
        'left-middle': '-top-9 left-0',
        'left-index': '-top-8 left-0',
        'thumb': '-top-4 left-4',
        'right-index': '-top-8 right-0',
        'right-middle': '-top-9 right-0',
        'right-ring': '-top-8 right-0',
        'right-pinky': '-top-6 right-1',
    }
    
    return (
        <div 
            className={cn('absolute pointer-events-none z-10 transition-all duration-150', position[finger])}
            style={{ 
                width: `${w}px`, 
                height: `${h}px`,
                transform: `${transform[finger]} ${isHighlighted ? 'scale(1.1) translateY(-4px)' : 'scale(1)'}`,
            }}
        >
            <div className={cn(
                'w-full h-full rounded-full border-2 transition-colors',
                isHighlighted 
                    ? 'bg-accent/50 border-accent drop-shadow-[0_0_8px_hsl(var(--accent))]' 
                    : 'bg-primary/10 border-primary/40'
            )}></div>
        </div>
    );
};


const Key = ({
  keyCode,
  display,
  pressedKey,
  highlightKeys,
  targetKey,
  fingerZones,
  className = '',
  targetFinger,
  heatmapColor,
}: {
  keyCode: string;
  display: string;
  pressedKey: string | null;
  highlightKeys?: string[];
  targetKey?: string | null;
  fingerZones?: boolean;
  className?: string;
  targetFinger?: FingerName | null;
  heatmapColor?: string;
}) => {
  const isPressed = pressedKey === keyCode;
  const char = display.toLowerCase();
  
  const isHighlight = highlightKeys?.includes(char);
  
  const isShiftNeeded = targetKey && targetKey >= 'A' && targetKey <= 'Z';
  const isShiftTarget = (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') && isShiftNeeded;

  const isTarget = (targetKey?.toLowerCase() === char) || isShiftTarget;

  const homeRowFinger = fingerZones ? HOME_ROW_FINGERS[keyCode] : null;
  const isFingerHighlighted = homeRowFinger && targetFinger === homeRowFinger;

  return (
    <div
      className={cn(
        'relative h-10 md:h-12 flex items-center justify-center rounded-md border-b-4 bg-secondary text-secondary-foreground font-medium transition-all duration-75',
        'border-primary/20',
        isHighlight && !isTarget && 'bg-accent/50 border-accent/70',
        isTarget && 'bg-accent text-accent-foreground scale-110 border-accent',
        isPressed ? 'translate-y-0.5 border-b-2 bg-primary text-primary-foreground' : 'hover:bg-primary/20',
        className
      )}
      style={{ backgroundColor: heatmapColor }}
    >
      {homeRowFinger && <Finger finger={homeRowFinger} isHighlighted={!!isFingerHighlighted} />}
      <span className={cn('text-xs md:text-base', homeRowFinger && 'mt-2')}>{display}</span>
    </div>
  );
};

export default function VirtualKeyboard({ 
    pressedKey, 
    highlightKeys,
    targetKey,
    fingerZones = false,
    keyColors
}: { 
    pressedKey: string | null;
    highlightKeys?: string[];
    targetKey?: string | null;
    fingerZones?: boolean;
    keyColors?: { [keyCode: string]: string };
}) {
  const targetFinger: FingerName | null = targetKey ? KEY_TO_FINGER_MAP[targetKey.toLowerCase()]?.finger ?? null : null;

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-1 md:gap-4">
      <div className="w-full p-1 md:p-2 space-y-1 md:space-y-2 bg-card rounded-lg border">
        {keyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 md:gap-2">
            {row.map((keyCode) => {
              let className = 'flex-1';
              if (['Backspace', 'Tab', 'Enter', 'ShiftLeft', 'ShiftRight'].includes(keyCode)) className = 'flex-[1.5]';
              if (keyCode === 'CapsLock') className = 'flex-[1.8]';
              if (keyCode === 'Space') className = 'flex-[5]';

              return <Key 
                key={keyCode} 
                keyCode={keyCode} 
                display={keyDisplayMap[keyCode]} 
                pressedKey={pressedKey} 
                highlightKeys={highlightKeys}
                targetKey={targetKey}
                fingerZones={fingerZones}
                className={className} 
                targetFinger={targetFinger}
                heatmapColor={keyColors?.[keyCode]}
              />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
