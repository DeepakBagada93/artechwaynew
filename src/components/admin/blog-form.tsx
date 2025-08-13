"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
  aiHint: z.string().min(2, { message: "AI hint must be at least 2 characters." }),
  category: z.enum(["Creatives", "Business"]),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  seoTitle: z.string().min(2, {
    message: "SEO Title must be at least 2 characters.",
  }),
  seoDescription: z.string().min(10, {
    message: "SEO Description must be at least 10 characters.",
  }),
  seoKeywords: z.string().min(2, {
    message: "SEO Keywords must be at least 2 characters.",
  }),
});

export function BlogForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      aiHint: "",
      category: "Creatives",
      content: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Blog Post Submitted!",
      description: "Your new blog post has been created successfully.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the blog post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief summary of the post for the article card"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the full content of your blog post here. Markdown is supported."
                      className="min-h-[250px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8 lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Post Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Creatives">AI for Creatives</SelectItem>
                            <SelectItem value="Business">AI for Business</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://placehold.co/600x400.png" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="aiHint"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image AI Hint</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. camera lens" {...field} />
                        </FormControl>
                        <FormDescription>Two keywords for image search.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <FormField
                    control={form.control}
                    name="seoTitle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>SEO Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the SEO title" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="seoDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>SEO Description</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Enter the meta description for SEO"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="seoKeywords"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>SEO Keywords</FormLabel>
                        <FormControl>
                            <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
             </Card>
          </div>
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
}
