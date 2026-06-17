import { useEffect, useRef } from 'react';

const KONAMI_CODE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a'
];

export function useKonami(callback) {
  const inputSequence = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      inputSequence.current.push(key);
      
      // Keep only the last N keys (matching the length of the Konami code)
      if (inputSequence.current.length > KONAMI_CODE.length) {
        inputSequence.current.shift();
      }

      // Check if it matches
      const isMatch = inputSequence.current.every((val, index) => val === KONAMI_CODE[index]);

      if (isMatch && inputSequence.current.length === KONAMI_CODE.length) {
        callback();
        inputSequence.current = []; // Reset sequence
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
}
