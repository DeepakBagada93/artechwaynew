'use server';
/**
 * @fileOverview An image generation AI flow.
 *
 * - generateImage - A function that handles the image generation process.
 * - ImageGenerationInput - The input type for the generateImage function.
 * - ImageGenerationOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageGenerationInputSchema = z.object({
  sourceImage: z
    .string()
    .describe(
      "A source photo as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prompt: z.string().describe('The prompt to guide the image generation.'),
});
export type ImageGenerationInput = z.infer<typeof ImageGenerationInputSchema>;

const ImageGenerationOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
});
export type ImageGenerationOutput = z.infer<
  typeof ImageGenerationOutputSchema
>;

export async function generateImage(
  input: ImageGenerationInput
): Promise<ImageGenerationOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: ImageGenerationInputSchema,
    outputSchema: ImageGenerationOutputSchema,
  },
  async ({sourceImage, prompt}) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: sourceImage}},
        {text: prompt},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      imageUrl: media.url,
    };
  }
);
