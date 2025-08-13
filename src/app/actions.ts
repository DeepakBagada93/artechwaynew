"use server";

import {
  personalizedArticleRecommendations,
  PersonalizedArticleRecommendationsInput,
} from "@/ai/flows/personalized-article-recommendations";
import { z } from "zod";

const recommendationSchema = z.object({
  interests: z.array(z.string()),
  readingHistory: z.array(z.string()),
  numberOfRecommendations: z.number(),
});

export async function getPersonalizedRecommendations(
  input: PersonalizedArticleRecommendationsInput
) {
  try {
    const validatedInput = recommendationSchema.parse(input);
    const result = await personalizedArticleRecommendations(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input." };
    }
    return { success: false, error: "Failed to get recommendations." };
  }
}
