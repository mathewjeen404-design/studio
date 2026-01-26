'use server';
/**
 * @fileOverview An AI typing coach that provides personalized feedback and drills.
 *
 * - getCoachingTip - A function that analyzes user stats and returns a coaching tip.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoachingInputSchema = z.object({
  overallWpm: z.number().describe("The user's average words per minute."),
  overallAccuracy: z.number().describe("The user's average accuracy percentage."),
  consistency: z.number().describe("The user's typing rhythm consistency score."),
  topMistypedKeys: z.array(z.string()).describe("The top 3-5 most frequently mistyped keys."),
  weakestFinger: z.string().describe("The name of the finger with the lowest performance (e.g., 'left-pinky')."),
});
type CoachingInput = z.infer<typeof CoachingInputSchema>;

const CoachingOutputSchema = z.object({
  feedback: z.string().describe("A short, encouraging, and personalized paragraph of feedback for the user (2-3 sentences max). Address the user directly with a motivational, coaching-oriented tone. Start with a positive reinforcement, then gently introduce the area for improvement."),
  drill: z.string().describe("A custom-generated practice text (around 20-30 words) that specifically targets the user's weak keys and fingers. It should be a coherent sentence or two."),
});
type CoachingOutput = z.infer<typeof CoachingOutputSchema>;

const coachingPrompt = ai.definePrompt({
    name: 'coachingPrompt',
    input: { schema: CoachingInputSchema },
    output: { schema: CoachingOutputSchema },
    prompt: `You are 'Verse', an expert typing coach. Your tone is always encouraging, insightful, and human. You are here to build confidence and guide the user to improvement, not to criticize.

A user has the following typing profile:
- Average Speed: {{overallWpm}} WPM
- Average Accuracy: {{overallAccuracy}}%
- Rhythm/Consistency: {{consistency}}%
- Weakest Finger: {{weakestFinger}}
- Most Mistyped Keys: {{#each topMistypedKeys}}{{{this}}}{{/each}}

Based on this, provide a short paragraph of personalized, coaching-style feedback. Start with something positive about their strengths before pointing out their biggest area for improvement in a gentle, constructive way. For example: "You've got some great speed developing! To make your typing even smoother, let's focus on..."

Then, create a custom practice drill. The drill should be a normal-sounding sentence or two that naturally incorporates their specific weak keys, helping them practice in a real-world context.
`,
  });

const coachFlow = ai.defineFlow(
  {
    name: 'coachFlow',
    inputSchema: CoachingInputSchema,
    outputSchema: CoachingOutputSchema,
  },
  async (input) => {
    const { output } = await coachingPrompt(input);
    return output!;
  }
);

export async function getCoachingTip(input: CoachingInput): Promise<CoachingOutput> {
  return coachFlow(input);
}
