'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { TestResult, CharLog } from '@/lib/types';
import type { Level } from '@/lib/curriculum';
import ResultsCard from '@/components/results-card';
import VirtualKeyboard from '@/components/virtual-keyboard';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';

type LessonViewProps = {
  level: Level;
};

export function LessonView({ level }: LessonViewProps) {
  const { completeLevel } = useTypingStats();
  const [stage, setStage] = useState<'intro' | 'practice' | 'results'>('intro');

  const [text, setText] = useState('');
  const [typed, setTyped] = useState('');
  const [charLogs, setCharLogs] = useState<CharLog[]>([]);
  const [lastCharTime, setLastCharTime] = useState<number | null>(null);
  
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const textDisplayRef = useRef<HTMLDivElement>(null);

  const resetTest = useCallback(() => {
    setText(level.practiceText);
    setTyped('');
    setStartTime(null);
    setErrors(0);
    setResult(null);
    setPressedKey(null);
    setCharLogs([]);
    setLastCharTime(null);
    setStage('intro');
  }, [level]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

  const endTest = useCallback(() => {
    if (!startTime) return;

    setStage('results');
    const elapsedTime = (Date.now() - startTime) / 1000;
    const correctChars = typed.split('').filter((char, index) => char === text[index]).length;
    const grossTyped = typed.length;
    
    const finalWpm = (correctChars / 5) / (elapsedTime / 60);
    const rawWpm = (grossTyped / 5) / (elapsedTime / 60);
    const finalAccuracy = grossTyped > 0 ? (correctChars / grossTyped) * 100 : 100;
    
    const finalResult: TestResult = {
      wpm: Math.round(finalWpm),
      rawWpm: Math.round(rawWpm),
      accuracy: Math.round(finalAccuracy),
      errors,
      time: Math.round(elapsedTime),
      charLogs,
    };
    setResult(finalResult);

    if (finalAccuracy >= 90) {
        completeLevel(level.level);
    }
  }, [startTime, typed, text, errors, charLogs, level, completeLevel]);

  useEffect(() => {
    if (stage === 'practice' && typed.length > 0 && typed.length === text.length) {
      endTest();
    }
  }, [typed, text, stage, endTest]);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (stage !== 'practice') return;

    const { key } = e;
    setPressedKey(e.code);
    
    const currentTime = Date.now();
    if (!startTime) {
      setStartTime(currentTime);
      setLastCharTime(currentTime);
    }

    const charTime = lastCharTime ? currentTime - lastCharTime : 0;
    setLastCharTime(currentTime);

    if (key.length === 1 && typed.length < text.length) {
      const isCorrect = key === text[typed.length];
      if (!isCorrect) {
        setErrors(prev => prev + 1);
      }
      setCharLogs(prev => [...prev, { char: text[typed.length], time: charTime, state: isCorrect ? 'correct' : 'incorrect' }]);
      setTyped(prev => prev + key);
    } else if (key === 'Backspace') {
      if (typed.length > 0) {
        setTyped(prev => prev.slice(0, -1));
        const lastLog = charLogs.pop();
        if (lastLog && lastLog.state === 'incorrect') {
            const correctedLog = { ...lastLog, state: 'corrected' as const, time: charTime };
            setCharLogs([...charLogs, correctedLog]);
        }
      }
    }
  }, [typed, text, startTime, stage, charLogs, lastCharTime]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  useEffect(() => {
    const keyUpTimeout = setTimeout(() => setPressedKey(null), 100);
    return () => clearTimeout(keyUpTimeout);
  }, [pressedKey]);

  useEffect(() => {
    const textEl = textDisplayRef.current;
    if (textEl) {
      const cursorEl = textEl.querySelector('.cursor');
      cursorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [typed]);

  if (stage === 'intro') {
      return (
          <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                  <CardTitle className='flex items-center gap-3'><BookOpen /> Lesson: {level.title}</CardTitle>
                  <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className='space-y-4'>
                    <h3 className="font-semibold">New keys to learn:</h3>
                    <VirtualKeyboard highlightKeys={level.keys} pressedKey={null} fingerZones={true} />
                  </div>
                  <Button onClick={() => setStage('practice')} size="lg">Start Practice</Button>
              </CardContent>
          </Card>
      )
  }

  if (stage === 'results' && result) {
    const passed = result.accuracy >= 90;
    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            <ResultsCard result={result} onRestart={resetTest} />
            <Card className={cn(passed ? 'bg-success/10 border-green-500/50' : 'bg-destructive/10 border-destructive/50')}>
                <CardHeader>
                    <CardTitle>{passed ? 'Level Complete!' : 'Practice Again'}</CardTitle>
                    <CardDescription>
                        {passed ? `Great job! You've unlocked the next level. You passed with ${result.accuracy}% accuracy.` : `You need at least 90% accuracy to pass. You got ${result.accuracy}%.`}
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex gap-4'>
                    <Button onClick={resetTest}>Try again</Button>
                    <Link href="/lessons">
                        <Button variant="outline">Back to Lessons</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 items-center">
      <Card className="p-3 md:p-4 w-full">
        <p className="text-muted-foreground text-center">Type the following text. Accuracy is key!</p>
      </Card>
      
      <div
        ref={textDisplayRef}
        className="relative text-2xl md:text-3xl leading-relaxed tracking-wider font-mono p-4 md:p-8 bg-card border rounded-lg max-h-[17rem] overflow-hidden focus:outline-none"
        tabIndex={0}
      >
        {text.split('').map((char, index) => {
          const isTyped = index < typed.length;
          const isCorrect = isTyped && typed[index] === char;
          const isIncorrect = isTyped && typed[index] !== char;
          const isCurrent = index === typed.length;

          return (
            <span
              key={index}
              className={cn('transition-colors duration-150', {
                'text-success': isCorrect,
                'text-destructive': isIncorrect,
                'text-muted-foreground/60': !isTyped,
              })}
            >
              {isCurrent && <span className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-accent animate-pulse rounded-full" />}
              {char === ' ' && isIncorrect ? <span className='bg-destructive/50 rounded-[3px]'>{char}</span> : char}
            </span>
          );
        })}
      </div>
      <VirtualKeyboard pressedKey={pressedKey} fingerZones={true} targetKey={text[typed.length]} />
    </div>
  );
}
