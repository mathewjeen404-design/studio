'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Rocket, Target, BarChart, User, GraduationCap, Check } from 'lucide-react';
import { useTypingStats } from '@/hooks/use-typing-stats';
import type { UserStats } from '@/lib/types';

type OnboardingModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OnboardingModal({ isOpen, onOpenChange }: OnboardingModalProps) {
  const { saveOnboarding } = useTypingStats();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<UserStats['onboarding']['goal']>('balanced');
  const [level, setLevel] = useState<UserStats['onboarding']['level']>('beginner');

  const handleFinish = () => {
    saveOnboarding({ goal, level });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] p-0" onInteractOutside={(e) => e.preventDefault()}>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline">Welcome to TypeVerse!</DialogTitle>
            <DialogDescription>Let's personalize your typing journey. Just a couple of questions.</DialogDescription>
          </DialogHeader>

          {step === 1 && (
            <div className="py-4 space-y-4 animate-in fade-in-50">
              <h3 className="font-semibold text-lg">What's your primary goal?</h3>
              <RadioGroup value={goal} onValueChange={(value) => setGoal(value as typeof goal)}>
                <Label htmlFor="goal-speed" className="flex items-center gap-4 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
                  <Rocket className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Speed</p>
                    <p className="text-sm text-muted-foreground">I want to type as fast as possible.</p>
                  </div>
                  <RadioGroupItem value="speed" id="goal-speed" className="ml-auto" />
                </Label>
                <Label htmlFor="goal-accuracy" className="flex items-center gap-4 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
                  <Target className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Accuracy</p>
                    <p className="text-sm text-muted-foreground">I want to make fewer mistakes.</p>
                  </div>
                  <RadioGroupItem value="accuracy" id="goal-accuracy" className="ml-auto" />
                </Label>
                <Label htmlFor="goal-balanced" className="flex items-center gap-4 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
                  <BarChart className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Balanced</p>
                    <p className="text-sm text-muted-foreground">A healthy mix of speed and accuracy.</p>
                  </div>
                  <RadioGroupItem value="balanced" id="goal-balanced" className="ml-auto" />
                </Label>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="py-4 space-y-4 animate-in fade-in-50">
              <h3 className="font-semibold text-lg">What's your experience level?</h3>
              <RadioGroup value={level} onValueChange={(value) => setLevel(value as typeof level)}>
                <Label htmlFor="level-beginner" className="flex items-center gap-4 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
                   <GraduationCap className="w-8 h-8 text-primary" />
                   <div>
                    <p className="font-medium">Beginner</p>
                    <p className="text-sm text-muted-foreground">I'm new to touch typing.</p>
                  </div>
                  <RadioGroupItem value="beginner" id="level-beginner" className="ml-auto" />
                </Label>
                <Label htmlFor="level-intermediate" className="flex items-center gap-4 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
                   <User className="w-8 h-8 text-primary" />
                   <div>
                    <p className="font-medium">Intermediate</p>
                    <p className="text-sm text-muted-foreground">I know the basics but want to improve.</p>
                  </div>
                  <RadioGroupItem value="intermediate" id="level-intermediate" className="ml-auto" />
                </Label>
                <Label htmlFor="level-advanced" className="flex items-center gap-4 p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
                   <Rocket className="w-8 h-8 text-primary" />
                   <div>
                    <p className="font-medium">Advanced</p>
                    <p className="text-sm text-muted-foreground">I'm a seasoned typist aiming for mastery.</p>
                  </div>
                  <RadioGroupItem value="advanced" id="level-advanced" className="ml-auto" />
                </Label>
              </RadioGroup>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 bg-muted/50 flex justify-between">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-border'}`}></div>
                <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-primary' : 'bg-border'}`}></div>
            </div>
          {step === 1 && <Button onClick={() => setStep(2)}>Next</Button>}
          {step === 2 && <Button onClick={handleFinish}><Check className="mr-2"/>Finish</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
