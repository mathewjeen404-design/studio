
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

const keyDisplayMap: { [key: string]: string } = {
  Backquote: '`', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0', Minus: '-', Equal: '=', Backspace: 'Backspace',
  Tab: 'Tab', KeyQ: 'Q', KeyW: 'W', KeyE: 'E', KeyR: 'R', KeyT: 'T', KeyY: 'Y', KeyU: 'U', KeyI: 'I', KeyO: 'O', KeyP: 'P', BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  CapsLock: 'Caps Lock', KeyA: 'A', KeyS: 'S', KeyD: 'D', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyJ: 'J', KeyK: 'K', KeyL: 'L', Semicolon: ';', Quote: '\'', Enter: 'Enter',
  ShiftLeft: 'Shift', KeyZ: 'Z', KeyX: 'X', KeyC: 'C', KeyV: 'V', KeyB: 'B', KeyN: 'N', KeyM: 'M', Comma: ',', Period: '.', Slash: '/', ShiftRight: 'Shift',
  ControlLeft: 'Ctrl', AltLeft: 'Alt', Space: ' ', AltRight: 'Alt', ControlRight: 'Ctrl',
};

const FINGER_COLORS: { [key in FingerName]: string } = {
    'left-pinky': 'bg-chart-1/10',
    'left-ring': 'bg-chart-2/10',
    'left-middle': 'bg-chart-3/10',
    'left-index': 'bg-chart-4/10',
    'thumb': 'bg-muted/30',
    'right-index': 'bg-chart-4/10',
    'right-middle': 'bg-chart-3/10',
    'right-ring': 'bg-chart-2/10',
    'right-pinky': 'bg-chart-1/10',
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


const Finger = ({ finger, isHighlighted }: { finger: FingerName; isHighlighted: boolean }) => {
    const fingerColorMap: { [key in FingerName]: string } = {
        'left-pinky': 'hsl(var(--chart-1))',
        'left-ring': 'hsl(var(--chart-2))',
        'left-middle': 'hsl(var(--chart-3))',
        'left-index': 'hsl(var(--chart-4))',
        'thumb': 'hsl(var(--muted-foreground))',
        'right-index': 'hsl(var(--chart-4))',
        'right-middle': 'hsl(var(--chart-3))',
        'right-ring': 'hsl(var(--chart-2))',
        'right-pinky': 'hsl(var(--chart-1))',
    };

    const transform: { [key in FingerName]?: string } = {
        'left-pinky': 'rotate(-20deg)',
        'left-ring': 'rotate(-10deg)',
        'left-middle': 'rotate(0deg)',
        'left-index': 'rotate(10deg)',
        'thumb': 'rotate(60deg) scale(0.8)',
        'right-index': 'rotate(-10deg) scale(-1, 1)',
        'right-middle': 'rotate(0deg) scale(-1, 1)',
        'right-ring': 'rotate(10deg) scale(-1, 1)',
        'right-pinky': 'rotate(20deg) scale(-1, 1)',
    };

    const position: { [key in FingerName]?: string } = {
        'left-pinky': '-top-7 left-1',
        'left-ring': '-top-8 left-0',
        'left-middle': '-top-9 left-0',
        'left-index': '-top-8 left-0',
        'thumb': '-top-4 left-4',
        'right-index': '-top-8 right-0',
        'right-middle': '-top-9 right-0',
        'right-ring': '-top-8 right-0',
        'right-pinky': '-top-7 right-1',
    }

    const color = fingerColorMap[finger];

    return (
        <div className={cn('absolute w-8 h-16 pointer-events-none z-10', position[finger])}
            style={{ transform: transform[finger] }}
        >
            <svg
                viewBox="0 0 40 80"
                className={cn(
                    'w-full h-full transition-all duration-150 drop-shadow-lg',
                    isHighlighted && "scale-110 opacity-100 drop-shadow-[0_0_10px_hsl(var(--accent))] -translate-y-1"
                )}
            >
                <path
                    d="M20,80 C31.045695,80 40,71.045695 40,60 L40,20 C40,8.954305 31.045695,0 20,0 C8.954305,0 0,8.954305 0,20 L0,60 C0,71.045695 8.954305,80 20,80 Z"
                    fill={isHighlighted ? 'hsl(var(--accent))' : color}
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1.5"
                    strokeOpacity="0.1"
                />
                <path
                    d="M30,20 C30,14.4771525 25.5228475,10 20,10 C14.4771525,10 10,14.4771525 10,20 L10,30 L30,30 L30,20 Z"
                    fill="white"
                    fillOpacity={isHighlighted ? "0.5" : "0.2"}
                />
            </svg>
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
  targetFinger
}: {
  keyCode: string;
  display: string;
  pressedKey: string | null;
  highlightKeys?: string[];
  targetKey?: string | null;
  fingerZones?: boolean;
  className?: string;
  targetFinger?: FingerName | null;
}) => {
  const isPressed = pressedKey === keyCode;
  const char = display.toLowerCase();
  
  const fingerInfo = KEY_TO_FINGER_MAP[char];
  const fingerColor = fingerInfo && fingerZones ? FINGER_COLORS[fingerInfo.finger] : '';
  
  const isHighlight = highlightKeys?.includes(char);
  
  const isShiftNeeded = targetKey && targetKey >= 'A' && targetKey <= 'Z';
  const isShiftTarget = (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') && isShiftNeeded;

  const isTarget = (targetKey?.toLowerCase() === char) || isShiftTarget;

  const homeRowFinger = fingerZones ? HOME_ROW_FINGERS[keyCode] : null;
  const isFingerHighlighted = homeRowFinger && targetFinger === homeRowFinger;

  return (
    <div
      className={cn(
        'relative h-12 flex items-center justify-center rounded-md border-b-4 bg-secondary text-secondary-foreground font-medium transition-all duration-75',
        'border-primary/20',
        fingerColor,
        isHighlight && !isTarget && 'bg-accent/50 border-accent/70',
        isTarget && 'bg-accent text-accent-foreground scale-110 border-accent',
        isPressed ? 'translate-y-0.5 border-b-2 bg-primary text-primary-foreground' : 'hover:bg-primary/20',
        className
      )}
    >
      {homeRowFinger && <Finger finger={homeRowFinger} isHighlighted={!!isFingerHighlighted} />}
      <span className={cn(homeRowFinger && 'mt-2')}>{display}</span>
    </div>
  );
};

export default function VirtualKeyboard({ 
    pressedKey, 
    highlightKeys,
    targetKey,
    fingerZones = false
}: { 
    pressedKey: string | null;
    highlightKeys?: string[];
    targetKey?: string | null;
    fingerZones?: boolean;
}) {
  const targetFinger: FingerName | null = targetKey ? KEY_TO_FINGER_MAP[targetKey.toLowerCase()]?.finger ?? null : null;

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-4">
      <div className="w-full p-2 space-y-2 bg-card rounded-lg border">
        {keyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((keyCode) => {
              let className = 'flex-1';
              if (['Backspace', 'Tab', 'Enter', 'ShiftLeft', 'ShiftRight'].includes(keyCode)) className = 'flex-[1.5]';
              if (keyCode === 'CapsLock') className = 'flex-[1.T]';
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
              />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
