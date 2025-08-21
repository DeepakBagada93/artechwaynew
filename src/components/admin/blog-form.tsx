
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import slugify from "slugify";

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
import { generateImage } from "@/ai/flows/image-generation-flow";
import { Loader2, Wand2 } from "lucide-react";
import { generateBlogPost } from "@/ai/flows/blog-generation-flow";
import { createBrowserClient } from "@supabase/ssr";

const formSchema = z.object({
  topic: z.string().optional(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imagePrompt: z.string().min(2, { message: "Image prompt must be at least 2 characters."}),
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
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      title: "",
      description: "",
      imagePrompt: "a web development company logo on the image",
      category: "Creatives",
      content: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setGeneratedImageUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleBlogGeneration = async () => {
    const topic = form.getValues("topic");
    if (!topic) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a topic to generate the blog post.",
      });
      return;
    }

    setIsGeneratingBlog(true);
    try {
      const result = await generateBlogPost({ topic });
      form.setValue("title", result.title);
      form.setValue("description", result.description);
      form.setValue("content", result.content);
      form.setValue("seoTitle", result.seoTitle);
      form.setValue("seoDescription", result.seoDescription);
      form.setValue("seoKeywords", result.seoKeywords);
      toast({
        title: "Blog Post Generated!",
        description: "The AI has successfully generated the blog post content.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate blog post. Please try again.",
      });
    } finally {
      setIsGeneratingBlog(false);
    }
  };

  const handleImageGeneration = async () => {
    if (!sourceImage) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please upload a source image first.",
        });
        return;
    }
    const imagePrompt = form.getValues("imagePrompt");
    if (!imagePrompt) {
         toast({
            variant: "destructive",
            title: "Error",
            description: "Please provide a prompt for image generation.",
        });
        return;
    }

    setIsGeneratingImage(true);
    try {
        const result = await generateImage({ sourceImage, prompt: imagePrompt });
        if (result.imageUrl) {
            setGeneratedImageUrl(result.imageUrl);
            toast({
                title: "Image Generated",
                description: "The new image has been successfully generated.",
            });
        }
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate image. Please try again.",
        });
    } finally {
        setIsGeneratingImage(false);
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    let publicUrl = 'https://placehold.co/600x400.png';
    const imageToUpload = generatedImageUrl || sourceImage;

    if (imageToUpload) {
      try {
        const response = await fetch(imageToUpload);
        const blob = await response.blob();
        const fileExtension = blob.type.split('/')[1];
        // Ensure file extension is valid, default to 'png'
        const validExtension = ['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension) ? fileExtension : 'png';
        const fileName = `${uuidv4()}.${validExtension}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('blog_images')
          .upload(fileName, blob, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('blog_images')
          .getPublicUrl(uploadData.path);
        
        publicUrl = urlData.publicUrl;

      } catch (error: any) {
        console.error('Error uploading image:', error);
        toast({
          variant: 'destructive',
          title: 'Error uploading image',
          description: error.message || 'Please check the console for more details.',
        });
        setIsSubmitting(false);
        return;
      }
    }
    
    const slug = slugify(values.title, { lower: true, strict: true });

    const finalValues = {
      ...values,
      imageUrl: publicUrl,
      slug: slug,
    };

    const { error } = await supabase.from('posts').insert([
        { 
            title: finalValues.title,
            description: finalValues.description,
            content: finalValues.content,
            imageUrl: finalValues.imageUrl,
            category: finalValues.category,
            seoTitle: finalValues.seoTitle,
            seoDescription: finalValues.seoDescription,
            seoKeywords: finalValues.seoKeywords,
            slug: finalValues.slug,
         }
    ]);

    if (error) {
        console.error('Error inserting post:', error);
        toast({
            variant: "destructive",
            title: "Error inserting post",
            description: error.message || "Please check the console for more details.",
        });
    } else {
        toast({
          title: "Blog Post Submitted!",
          description: "Your new blog post has been created successfully.",
        });
        form.reset();
        setSourceImage(null);
        setGeneratedImageUrl(null);
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Generate with AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Blog Post Topic</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 'How AI is changing graphic design'" {...field} />
                            </FormControl>
                             <FormDescription>
                                Enter a topic and let AI write the post for you.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="button" onClick={handleBlogGeneration} disabled={isGeneratingBlog} className="w-full">
                         {isGeneratingBlog && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                         <Wand2 className="mr-2 h-4 w-4" />
                        Generate Blog Post
                    </Button>
                </CardContent>
            </Card>
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
                   <FormDescription>
                    Example: `# Headline`, `**bold**`, `*italic*`, `[Link](https://...)`
                  </FormDescription>
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
                    <FormItem>
                        <FormLabel>Source Image</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </FormControl>
                         <FormDescription>
                            This will be the base for the generated image.
                        </FormDescription>
                    </FormItem>
                    
                     <FormField
                        control={form.control}
                        name="imagePrompt"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Image Generation Prompt</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g. 'saasnext- web development company'" {...field} />
                            </FormControl>
                            <FormDescription>Describe how to modify the image.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="button" onClick={handleImageGeneration} disabled={isGeneratingImage || !sourceImage} className="w-full">
                        {isGeneratingImage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate Image
                    </Button>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Image Preview</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {sourceImage && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Source</p>
                                    <Image src={sourceImage} alt="Source Preview" width={200} height={150} className="rounded-md object-cover aspect-[4/3]" />
                                </div>
                            )}
                            {generatedImageUrl && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Generated</p>
                                    <Image src={generatedImageUrl} alt="Generated Preview" width={200} height={150} className="rounded-md object-cover aspect-[4/3]" />
                                </div>
                            )}
                        </div>
                         {!sourceImage && !generatedImageUrl && (
                            <div className="text-xs text-muted-foreground text-center col-span-2 pt-4">
                                Upload a source image to see a preview.
                            </div>
                         )}
                    </div>

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
        <Button type="submit" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Post
        </Button>
      </form>
    </Form>
  );
}
