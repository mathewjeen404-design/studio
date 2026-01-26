
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

const FINGER_TIP_COLORS: { [key in FingerName]: string } = {
    'left-pinky': 'bg-chart-1/70 border-chart-1',
    'left-ring': 'bg-chart-2/70 border-chart-2',
    'left-middle': 'bg-chart-3/70 border-chart-3',
    'left-index': 'bg-chart-4/70 border-chart-4',
    'thumb': 'bg-muted-foreground/40 border-muted-foreground',
    'right-index': 'bg-chart-4/70 border-chart-4',
    'right-middle': 'bg-chart-3/70 border-chart-3',
    'right-ring': 'bg-chart-2/70 border-chart-2',
    'right-pinky': 'bg-chart-1/70 border-chart-1',
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


const FingerTip = ({ finger, isHighlighted }: { finger: FingerName, isHighlighted: boolean}) => (
    <div className={cn(
        "absolute -top-3 w-6 h-8 rounded-b-full border-2 transition-all duration-100",
        FINGER_TIP_COLORS[finger],
        isHighlighted && "scale-110 border-accent/80 ring-2 ring-accent bg-accent/30"
    )} />
)


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
      {homeRowFinger && <FingerTip finger={homeRowFinger} isHighlighted={!!isFingerHighlighted} />}
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
              if (keyCode === 'CapsLock') className = 'flex-[1.7]';
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
