'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Timer, BookText } from 'lucide-react';
import type { TestResult, CharLog } from '@/lib/types';
import Stats from '@/components/stats';
import ResultsCard from '@/components/results-card';
import VirtualKeyboard from '@/components/virtual-keyboard';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useTypingStats } from '@/hooks/use-typing-stats';

const TEST_DURATIONS = [15, 30, 60, 120];
const TEST_MODES = [
    { value: 'words', label: 'Words' },
    { value: 'email', label: 'Email' },
    { value: 'resume', label: 'Resume' },
    { value: 'code', label: 'Code' },
];

export default function TypingTest() {
  const { stats, getNewTestText, saveTestResult } = useTypingStats();
  
  const [text, setText] = useState('');
  const [typed, setTyped] = useState('');
  const [charLogs, setCharLogs] = useState<CharLog[]>([]);
  const [lastCharTime, setLastCharTime] = useState<number | null>(null);
  
  const [startTime, setStartTime] = useState<number | null>(null);
  const [testDuration, setTestDuration] = useState(60);
  const [mode, setMode] = useState('words');
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [errors, setErrors] = useState(0);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testFinished, setTestFinished] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);
  
  const showFingerZones = stats.onboarding?.level === 'beginner';

  const resetTest = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    setText(getNewTestText(mode));
    setTyped('');
    setStartTime(null);
    setTimeLeft(testDuration);
    setErrors(0);
    setConsecutiveErrors(0);
    setIsShaking(false);
    setWpm(0);
    setAccuracy(100);
    setTestFinished(false);
    setResult(null);
    setPressedKey(null);
    setCharLogs([]);
    setLastCharTime(null);
  }, [testDuration, getNewTestText, mode]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

  const endTest = useCallback(() => {
    if (timerInterval.current) clearInterval(timerInterval.current);
    if (!startTime) return;

    setTestFinished(true);
    const elapsedTime = (Date.now() - startTime) / 1000;
    const correctChars = typed.split('').filter((char, index) => char === text[index]).length;
    const grossTyped = typed.length;
    
    const finalWpm = (correctChars / 5) / (Math.min(elapsedTime, testDuration) / 60);
    const rawWpm = (grossTyped / 5) / (Math.min(elapsedTime, testDuration) / 60);
    const finalAccuracy = grossTyped > 0 ? (correctChars / grossTyped) * 100 : 100;
    
    const charTimes = charLogs.filter(log => log.state === 'correct' && log.time > 0 && log.time < 1000).map(log => log.time);
    let consistency = 0;
    if (charTimes.length > 2) {
        const meanTime = charTimes.reduce((a, b) => a + b, 0) / charTimes.length;
        const stdDevTime = Math.sqrt(charTimes.map(t => Math.pow(t - meanTime, 2)).reduce((a, b) => a + b, 0) / charTimes.length);
        consistency = meanTime > 0 ? Math.max(0, 100 - (stdDevTime / meanTime) * 100) : 100;
    }

    const finalResult: TestResult = {
      wpm: Math.round(finalWpm),
      rawWpm: Math.round(rawWpm),
      accuracy: Math.round(finalAccuracy),
      errors,
      time: testDuration,
      charLogs,
      timestamp: Date.now(),
      consistency: Math.round(consistency),
      mode,
    };
    setResult(finalResult);
    saveTestResult(finalResult);
    setWpm(finalResult.wpm);
    setAccuracy(finalResult.accuracy);
  }, [startTime, typed, text, errors, testDuration, charLogs, saveTestResult, mode]);

  useEffect(() => {
    if (startTime && !testFinished) {
      timerInterval.current = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const newTimeLeft = Math.max(0, testDuration - elapsedTime);
        setTimeLeft(Math.round(newTimeLeft));

        const grossTyped = typed.length;
        const currentWpm = elapsedTime > 0 ? (grossTyped / 5) / (elapsedTime / 60) : 0;
        setWpm(Math.round(currentWpm));
        
        const correctChars = typed.split('').filter((char, i) => char === text[i]).length;
        const currentAccuracy = grossTyped > 0 ? (correctChars / grossTyped) * 100 : 100;
        setAccuracy(Math.round(currentAccuracy));

        if (newTimeLeft <= 0 || (mode !== 'words' && typed.length === text.length)) {
          endTest();
        }
      }, 1000);
    }
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [startTime, testFinished, testDuration, typed, text, endTest, mode]);

  useEffect(() => {
    if (consecutiveErrors >= 3) {
      setIsShaking(true);
      const shakeTimer = setTimeout(() => {
        setIsShaking(false);
      }, 820);
      return () => clearTimeout(shakeTimer);
    }
  }, [consecutiveErrors]);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (mode === 'code' && e.key === 'Tab') {
        e.preventDefault();
        // A simple tab implementation (e.g., 2 spaces), real editors are more complex
        setTyped(prev => prev + '  ');
        return;
    }
    e.preventDefault();
    if (testFinished) return;

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
        setConsecutiveErrors(prev => prev + 1);
      } else {
        setConsecutiveErrors(0);
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
      setConsecutiveErrors(0);
    }
  }, [typed, text, startTime, testFinished, charLogs, lastCharTime, mode]);

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

  if (testFinished && result) {
    return <ResultsCard result={result} onRestart={resetTest} />;
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <Stats wpm={wpm} accuracy={accuracy} errors={errors} time={timeLeft} />
        <Card className="p-3 md:p-4 flex items-center justify-around gap-2">
            <div className="flex items-center gap-2">
              <BookText className="h-6 w-6 text-muted-foreground" />
               <Select
                value={mode}
                onValueChange={(val) => setMode(val)}
                disabled={!!startTime}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  {TEST_MODES.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="h-6 w-6 text-muted-foreground" />
              <Select
                value={String(testDuration)}
                onValueChange={(val) => {
                  setTestDuration(Number(val));
                  setTimeLeft(Number(val));
                }}
                disabled={!!startTime}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {TEST_DURATIONS.map((duration) => (
                    <SelectItem key={duration} value={String(duration)}>
                      {duration}s
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={resetTest} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
        </Card>
      </div>

      <div
        ref={textDisplayRef}
        className={cn("relative text-2xl md:text-3xl leading-relaxed tracking-wider p-4 md:p-8 bg-card border rounded-lg max-h-[17rem] overflow-auto focus:outline-none",
            mode === 'code' ? 'font-code whitespace-pre-wrap text-lg' : 'font-mono',
            isShaking && 'animate-shake'
        )}
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
              {isCurrent && <span className="cursor absolute -left-[1px] top-0 bottom-0 w-[2px] bg-primary animate-pulse rounded-full" />}
              {char === ' ' && isIncorrect ? <span className='bg-destructive/50 rounded-[3px]'>{char}</span> : char}
            </span>
          );
        })}
      </div>
      <VirtualKeyboard pressedKey={pressedKey} fingerZones={showFingerZones} targetKey={text[typed.length]} />
    </div>
  );
}
