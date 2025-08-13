'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized article recommendations based on user reading history and interests.
 *
 * @exports personalizedArticleRecommendations - An async function that takes user reading history and interests as input and returns personalized article recommendations.
 * @exports PersonalizedArticleRecommendationsInput - The input type for the personalizedArticleRecommendations function.
 * @exports PersonalizedArticleRecommendationsOutput - The output type for the personalizedArticleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedArticleRecommendationsInputSchema = z.object({
  readingHistory: z
    .array(z.string())
    .describe('An array of article titles or IDs representing the user\'s reading history.'),
  interests: z
    .array(z.string())
    .describe('An array of keywords or topics representing the user\'s interests.'),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of article recommendations to return.'),
});
export type PersonalizedArticleRecommendationsInput = z.infer<
  typeof PersonalizedArticleRecommendationsInputSchema
>;

const PersonalizedArticleRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of article titles or summaries recommended for the user.'),
});
export type PersonalizedArticleRecommendationsOutput = z.infer<
  typeof PersonalizedArticleRecommendationsOutputSchema
>;

export async function personalizedArticleRecommendations(
  input: PersonalizedArticleRecommendationsInput
): Promise<PersonalizedArticleRecommendationsOutput> {
  return personalizedArticleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedArticleRecommendationsPrompt',
  input: {schema: PersonalizedArticleRecommendationsInputSchema},
  output: {schema: PersonalizedArticleRecommendationsOutputSchema},
  prompt: `You are an AI article recommendation system.  Given a user's reading history and interests, you will recommend a list of articles that they might be interested in.

Reading History:
{{#each readingHistory}}
- {{this}}
{{/each}}

Interests:
{{#each interests}}
- {{this}}
{{/each}}

Please provide {{numberOfRecommendations}} article recommendations.  The output should be an array of article titles or summaries.
`,
});

const personalizedArticleRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedArticleRecommendationsFlow',
    inputSchema: PersonalizedArticleRecommendationsInputSchema,
    outputSchema: PersonalizedArticleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
