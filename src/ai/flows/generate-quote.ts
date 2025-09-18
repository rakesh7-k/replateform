
'use server';

/**
 * @fileOverview Generates an inspirational quote.
 *
 * - generateQuote - A function that generates a quote.
 * - GenerateQuoteInput - The input type for the generateQuote function.
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuoteInputSchema = z.object({
  topic: z.string().describe('The topic for the quote.'),
});
export type GenerateQuoteInput = z.infer<typeof GenerateQuoteInputSchema>;

const GenerateQuoteOutputSchema = z.object({
  text: z.string().describe('The generated quote text.'),
  author: z.string().describe('The author of the quote. This can be a real person or a creative attribution like "A Grateful Neighbor".'),
});
export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;

export async function generateQuote(input: GenerateQuoteInput): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuotePrompt',
  input: {schema: GenerateQuoteInputSchema},
  output: {schema: GenerateQuoteOutputSchema},
  prompt: `You are an AI assistant that generates short, inspirational quotes. 
  
  The quote should be uplifting and encourage a sense of community and sharing, especially around food. 
  It should help remove the stigma for people, like busy bachelors or students, who might feel hesitant to accept help.
  
  Make the author creative, like 'A Fellow Neighbor' or 'The Spirit of Community'. Avoid using real names.
  
  Topic: {{{topic}}}
  
  Generate a quote.`,
});

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    inputSchema: GenerateQuoteInputSchema,
    outputSchema: GenerateQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    