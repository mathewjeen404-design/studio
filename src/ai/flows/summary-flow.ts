'use server';
/**
 * @fileOverview A flow for generating a smart summary after a typing test.
 *
 * - getSessionSummary - A function that analyzes a test result and returns a smart summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummaryInputSchema = z.object({
  wpm: z.number().describe("The user's words per minute in the last test."),
  accuracy: z.number().describe("The user's accuracy percentage in the last test."),
  consistency: z.number().describe("The user's consistency/rhythm score in the last test."),
  improvement: z.number().describe("The user's WPM improvement percentage compared to their average. Can be negative."),
  weakestKeys: z.array(z.string()).describe("The top 2-3 most frequently mistyped keys in this specific session."),
});
type SummaryInput = z.infer<typeof SummaryInputSchema>;

const SummaryOutputSchema = z.object({
  insight: z.string().describe("A single, concise, data-driven insight about the user's performance in this specific session. Frame it in a positive and encouraging, coaching-style tone. Maximum one sentence."),
  focus: z.string().describe("A single, actionable goal for the user's next session, based on their performance. Maximum one sentence."),
});
type SummaryOutput = z.infer<typeof SummaryOutputSchema>;

const summaryPrompt = ai.definePrompt({
    name: 'summaryPrompt',
    input: { schema: SummaryInputSchema },
    output: { schema: SummaryOutputSchema },
    prompt: `You are 'Verse', an expert typing coach with an encouraging and insightful tone. A user just finished a typing test.
Here is their performance for this session:
- WPM: {{wpm}}
- Accuracy: {{accuracy}}%
- Rhythm Score: {{consistency}}%
- Improvement vs. Average: {{improvement}}%
- Keys they struggled with this time: {{#each weakestKeys}}{{{this}}}{{/each}}

Based *only* on this session's data, provide:
1.  **Today's Insight:** A single, positive, and insightful sentence about their performance. What went well? What does the data show? (e.g., "Your speed on the 'E' key was outstanding today." or "You showed great consistency, even on tricky words.")
2.  **Tomorrow's Focus:** A single, encouraging sentence suggesting a focus for their next session. (e.g., "For your next round, let's focus on landing the 'S' key a little more gently." or "Let's see if we can keep that great rhythm and push the speed just a bit.")
`,
  });

const summaryFlow = ai.defineFlow(
  {
    name: 'summaryFlow',
    inputSchema: SummaryInputSchema,
    outputSchema: SummaryOutputSchema,
  },
  async (input) => {
    const { output } = await summaryPrompt(input);
    return output!;
  }
);

export async function getSessionSummary(input: SummaryInput): Promise<SummaryOutput> {
  return summaryFlow(input);
}
