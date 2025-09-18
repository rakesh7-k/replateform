
'use server';

/**
 * @fileOverview Generates an inspirational quote for donating food.
 *
 * - generateDonationQuote - A function that generates a quote.
 * - GenerateDonationQuoteInput - The input type for the generateDonationQuote function.
 * - GenerateDonationQuoteOutput - The return type for the generateDonationQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDonationQuoteInputSchema = z.object({
  topic: z.string().describe('The topic for the quote.'),
});
export type GenerateDonationQuoteInput = z.infer<typeof GenerateDonationQuoteInputSchema>;

const GenerateDonationQuoteOutputSchema = z.object({
  text: z.string().describe('The generated quote text.'),
  author: z.string().describe('The author of the quote. This can be a real person or a creative attribution like "A Grateful Neighbor".'),
});
export type GenerateDonationQuoteOutput = z.infer<typeof GenerateDonationQuoteOutputSchema>;

export async function generateDonationQuote(input: GenerateDonationQuoteInput): Promise<GenerateDonationQuoteOutput> {
  return generateDonationQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDonationQuotePrompt',
  input: {schema: GenerateDonationQuoteInputSchema},
  output: {schema: GenerateDonationQuoteOutputSchema},
  prompt: `You are an AI assistant that generates short, inspirational quotes to motivate users to donate food. 
  
  The quote should be uplifting and highlight the positive impact of sharing and generosity.
  
  Make the author creative, like 'A Hopeful Human' or 'The Joy of Giving'. Avoid using real names.
  
  Topic: {{{topic}}}
  
  Generate a quote.`,
});

const generateDonationQuoteFlow = ai.defineFlow(
  {
    name: 'generateDonationQuoteFlow',
    inputSchema: GenerateDonationQuoteInputSchema,
    outputSchema: GenerateDonationQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
