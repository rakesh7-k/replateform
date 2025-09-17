'use server';

/**
 * @fileOverview Suggests food types and quantities based on location and historical data.
 *
 * - suggestFoodTypes - A function that suggests food types and quantities.
 * - SuggestFoodTypesInput - The input type for the suggestFoodTypes function.
 * - SuggestFoodTypesOutput - The return type for the suggestFoodTypes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFoodTypesInputSchema = z.object({
  location: z
    .string()
    .describe('The current location of the donor.'),
  historicalData: z
    .string()
    .describe('Historical donation data for the donor.'),
});
export type SuggestFoodTypesInput = z.infer<typeof SuggestFoodTypesInputSchema>;

const SuggestFoodTypesOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('Suggested food types and quantities.'),
});
export type SuggestFoodTypesOutput = z.infer<typeof SuggestFoodTypesOutputSchema>;

export async function suggestFoodTypes(input: SuggestFoodTypesInput): Promise<SuggestFoodTypesOutput> {
  return suggestFoodTypesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFoodTypesPrompt',
  input: {schema: SuggestFoodTypesInputSchema},
  output: {schema: SuggestFoodTypesOutputSchema},
  prompt: `You are an AI assistant that suggests food types and quantities based on the donor's location and historical donation data.

  Location: {{{location}}}
  Historical Data: {{{historicalData}}}

  Suggest food types and quantities that the donor can donate.`,
});

const suggestFoodTypesFlow = ai.defineFlow(
  {
    name: 'suggestFoodTypesFlow',
    inputSchema: SuggestFoodTypesInputSchema,
    outputSchema: SuggestFoodTypesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
