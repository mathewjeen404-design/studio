import type { FingerName, HandName } from './types';

export const KEY_TO_FINGER_MAP: { [key: string]: { finger: FingerName; hand: HandName } } = {
  // Left Hand
  'q': { finger: 'left-pinky', hand: 'left' }, 'a': { finger: 'left-pinky', hand: 'left' }, 'z': { finger: 'left-pinky', hand: 'left' }, '`': { finger: 'left-pinky', hand: 'left' }, '~': { finger: 'left-pinky', hand: 'left' }, '1': { finger: 'left-pinky', hand: 'left' }, '!': { finger: 'left-pinky', hand: 'left' },
  'w': { finger: 'left-ring', hand: 'left' }, 's': { finger: 'left-ring', hand: 'left' }, 'x': { finger: 'left-ring', hand: 'left' }, '2': { finger: 'left-ring', hand: 'left' }, '@': { finger: 'left-ring', hand: 'left' },
  'e': { finger: 'left-middle', hand: 'left' }, 'd': { finger: 'left-middle', hand: 'left' }, 'c': { finger: 'left-middle', hand: 'left' }, '3': { finger: 'left-middle', hand: 'left' }, '#': { finger: 'left-middle', hand: 'left' },
  'r': { finger: 'left-index', hand: 'left' }, 'f': { finger: 'left-index', hand: 'left' }, 'v': { finger: 'left-index', hand: 'left' }, '4': { finger: 'left-index', hand: 'left' }, '$': { finger: 'left-index', hand: 'left' },
  't': { finger: 'left-index', hand: 'left' }, 'g': { finger: 'left-index', hand: 'left' }, 'b': { finger: 'left-index', hand: 'left' }, '5': { finger: 'left-index', hand: 'left' }, '%': { finger: 'left-index', hand: 'left' },
  
  // Right Hand
  'y': { finger: 'right-index', hand: 'right' }, 'h': { finger: 'right-index', hand: 'right' }, 'n': { finger: 'right-index', hand: 'right' }, '6': { finger: 'right-index', hand: 'right' }, '^': { finger: 'right-index', hand: 'right' },
  'u': { finger: 'right-index', hand: 'right' }, 'j': { finger: 'right-index', hand: 'right' }, 'm': { finger: 'right-index', hand: 'right' }, '7': { finger: 'right-index', hand: 'right' }, '&': { finger: 'right-index', hand: 'right' },
  'i': { finger: 'right-middle', hand: 'right' }, 'k': { finger: 'right-middle', hand: 'right' }, ',': { finger: 'right-middle', hand: 'right' }, '<': { finger: 'right-middle', hand: 'right' }, '8': { finger: 'right-middle', hand: 'right' }, '*': { finger: 'right-middle', hand: 'right' },
  'o': { finger: 'right-ring', hand: 'right' }, 'l': { finger: 'right-ring', hand: 'right' }, '.': { finger: 'right-ring', hand: 'right' }, '>': { finger: 'right-ring', hand: 'right' }, '9': { finger: 'right-ring', hand: 'right' }, '(': { finger: 'right-ring', hand: 'right' },
  'p': { finger: 'right-pinky', hand: 'right' }, ';': { finger: 'right-pinky', hand: 'right' }, ':': { finger: 'right-pinky', hand: 'right' }, '/': { finger: 'right-pinky', hand: 'right' }, '?': { finger: 'right-pinky', hand: 'right' }, '0': { finger: 'right-pinky', hand: 'right' }, ')': { finger: 'right-pinky', hand: 'right' }, '-': { finger: 'right-pinky', hand: 'right' }, '_': { finger: 'right-pinky', hand: 'right' }, '=': { finger: 'right-pinky', hand: 'right' }, '+': { finger: 'right-pinky', hand: 'right' }, '[': { finger: 'right-pinky', hand: 'right' }, '{': { finger: 'right-pinky', hand: 'right' }, ']': { finger: 'right-pinky', hand: 'right' }, '}': { finger: 'right-pinky', hand: 'right' }, '\\': { finger: 'right-pinky', hand: 'right' }, '|': { finger: 'right-pinky', hand: 'right' }, '\'': { finger: 'right-pinky', hand: 'right' }, '"': { finger: 'right-pinky', hand: 'right' },

  // Thumbs
  ' ': { finger: 'thumb', hand: 'left' }, // This is an assumption
};
