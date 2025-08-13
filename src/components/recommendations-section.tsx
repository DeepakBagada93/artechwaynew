"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2, Loader2, BookOpen } from "lucide-react";
import { getPersonalizedRecommendations } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { mockArticles } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const recommendationSchema = z.object({
  interests: z
    .string()
    .min(10, { message: "Describe your interests in at least 10 characters." })
    .max(500, { message: "Interests cannot exceed 500 characters." }),
  readingHistory: z.array(z.string()).optional(),
  numberOfRecommendations: z.number().min(1).max(5).default(3),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;
type RecommendationsOutput = { recommendations: string[] };

export function RecommendationsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      interests: "",
      readingHistory: [],
      numberOfRecommendations: 3,
    },
  });

  async function onSubmit(data: RecommendationFormValues) {
    setIsLoading(true);
    setRecommendations(null);

    const result = await getPersonalizedRecommendations({
      ...data,
      readingHistory: data.readingHistory || [],
    });

    if (result.success && result.data) {
      setRecommendations(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Could not fetch recommendations.",
      });
    }
    setIsLoading(false);
  }

  return (
    <section id="recommender" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <Wand2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 font-headline text-4xl font-bold md:text-5xl">
          Your Personal AI Curator
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Tell us what you're interested in and what you've read. Our AI will suggest articles tailored just for you.
        </p>
      </div>

      <Card className="mx-auto mt-12 max-w-4xl border-2 border-primary/20 shadow-xl shadow-primary/5">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="readingHistory"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-lg font-semibold">1. Your Reading History</FormLabel>
                          <FormDescription>
                            Select articles you've enjoyed.
                          </FormDescription>
                        </div>
                        <div className="max-h-60 overflow-y-auto pr-4 space-y-2">
                        {mockArticles.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="readingHistory"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.title)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item.title,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.title
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm">
                                    {item.title}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-6">
                   <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">2. Your Interests</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'generative art with Python', 'AI ethics in healthcare', 'the future of machine learning'"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                         <FormDescription>
                           Tell us what topics you are passionate about.
                         </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfRecommendations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">3. How many recommendations?</FormLabel>
                         <FormControl>
                          <div className="flex items-center gap-4 pt-2">
                            <Slider
                              min={1}
                              max={5}
                              step={1}
                              value={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                            <span className="font-bold text-lg text-primary">{field.value}</span>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="text-center pt-4">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-5 w-5" />
                  )}
                  Generate Recommendations
                </Button>
              </div>
            </form>
          </Form>

          {recommendations && recommendations.recommendations.length > 0 && (
            <div className="mt-12">
               <Separator className="my-8"/>
              <h3 className="text-center font-headline text-2xl font-bold">
                Curated For You
              </h3>
              <ul className="mt-6 space-y-4">
                {recommendations.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card/50">
                    <BookOpen className="h-5 w-5 flex-shrink-0 mt-1 text-primary"/>
                    <p>{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
