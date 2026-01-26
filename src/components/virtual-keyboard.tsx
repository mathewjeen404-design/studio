import { cn } from '@/lib/utils';
import React from 'react';

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

const Key = ({ keyCode, display, pressedKey, className = '' }: { keyCode: string; display: string; pressedKey: string | null; className?: string }) => {
  const isPressed = pressedKey === keyCode;
  return (
    <div
      className={cn(
        'h-12 flex items-center justify-center rounded-md border-b-4 bg-secondary text-secondary-foreground font-medium transition-all duration-75',
        'border-primary/20',
        className,
        isPressed ? 'translate-y-0.5 border-b-2 bg-primary text-primary-foreground' : 'hover:bg-primary/20'
      )}
    >
      {display}
    </div>
  );
};

export default function VirtualKeyboard({ pressedKey }: { pressedKey: string | null }) {
  return (
    <div className="w-full max-w-4xl p-2 space-y-2 bg-card rounded-lg border">
      {keyLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((keyCode) => {
            let className = 'flex-1';
            if (['Backspace', 'Tab', 'Enter', 'ShiftLeft', 'ShiftRight'].includes(keyCode)) className = 'flex-[1.5]';
            if (keyCode === 'CapsLock') className = 'flex-[1.7]';
            if (keyCode === 'Space') className = 'flex-[5]';

            return <Key key={keyCode} keyCode={keyCode} display={keyDisplayMap[keyCode]} pressedKey={pressedKey} className={className} />;
          })}
        </div>
      ))}
    </div>
  );
}
