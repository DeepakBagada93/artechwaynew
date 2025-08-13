'use server';
/**
 * @fileOverview A blog post generation AI flow.
 *
 * - generateBlogPost - A function that handles the blog post generation process.
 * - BlogGenerationInput - The input type for the generateBlogPost function.
 * - BlogGenerationOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogGenerationInputSchema = z.object({
  topic: z.string().describe('The topic for the blog post.'),
});
export type BlogGenerationInput = z.infer<typeof BlogGenerationInputSchema>;

const BlogGenerationOutputSchema = z.object({
  title: z.string().describe('The generated title of the blog post.'),
  description: z
    .string()
    .describe('A short summary of the post for the article card.'),
  content: z
    .string()
    .describe(
      'The full content of the blog post, written in Markdown format.'
    ),
  seoTitle: z.string().describe('The SEO-optimized title for the blog post.'),
  seoDescription: z
    .string()
    .describe('The meta description for SEO purposes.'),
  seoKeywords: z
    .string()
    .describe('A comma-separated list of relevant SEO keywords.'),
});
export type BlogGenerationOutput = z.infer<typeof BlogGenerationOutputSchema>;

export async function generateBlogPost(
  input: BlogGenerationInput
): Promise<BlogGenerationOutput> {
  return blogGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'blogGenerationPrompt',
  input: {schema: BlogGenerationInputSchema},
  output: {schema: BlogGenerationOutputSchema},
  prompt: `You are an expert content creator and SEO specialist for a blog called "Artechway".
Your audience consists of creative professionals and small business owners.
Your task is to write a high-quality, engaging, and SEO-optimized blog post on the given topic.

The blog post must be written in a human-like, conversational tone. It should be informative, easy to read, and provide real value to the target audience.
The content should be structured with headings, subheadings, and paragraphs, all formatted in Markdown.

For the given topic: '{{{topic}}}', generate the following:

1.  **Blog Post Title:** A catchy and relevant title.
2.  **Short Description:** A concise summary (2-3 sentences) for the article preview card.
3.  **Full Content:** A comprehensive blog post (at least 500 words) in Markdown format. Use headings (#, ##), bold, italics, and lists where appropriate to improve readability.
4.  **SEO Title:** A title optimized for search engines (50-60 characters).
5.  **SEO Description:** A meta description for search engine snippets (150-160 characters).
6.  **SEO Keywords:** A comma-separated list of 5-7 relevant keywords.`,
});

const blogGenerationFlow = ai.defineFlow(
  {
    name: 'blogGenerationFlow',
    inputSchema: BlogGenerationInputSchema,
    outputSchema: BlogGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
