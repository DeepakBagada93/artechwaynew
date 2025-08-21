
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import type { Article } from "@/lib/data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export function ManageBlogs() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      toast({
        variant: "destructive",
        title: "Error fetching posts",
        description: error.message,
      });
    } else {
      const formattedArticles: Article[] = data?.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        description: post.description,
        category: post.category,
        imageUrl: post.imageUrl,
        aiHint: 'user generated content',
        createdAt: new Date(post.created_at).toLocaleDateString(),
      })) || [];
      setArticles(formattedArticles);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (articleId: string, imageUrl: string) => {
    // First, delete the database record
    const { error: dbError } = await supabase
      .from('posts')
      .delete()
      .match({ id: articleId });

    if (dbError) {
      console.error('Error deleting post:', dbError);
      toast({
        variant: "destructive",
        title: "Error deleting post",
        description: dbError.message,
      });
      return;
    }

    // Then, delete the image from storage, if it's not a placeholder
    if (imageUrl && !imageUrl.includes('placehold.co')) {
      const imagePath = imageUrl.split('/').pop();
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from('blog_images')
          .remove([imagePath]);

        if (storageError) {
          console.error('Error deleting image from storage:', storageError);
          // Non-critical error, so we just log it and show a warning
          toast({
            variant: "default",
            title: "Warning",
            description: "Post deleted, but failed to remove image from storage.",
          });
        }
      }
    }

    toast({
      title: "Post Deleted",
      description: "The blog post has been successfully deleted.",
    });

    // Refresh the list of posts
    fetchPosts();
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <Table>
      <TableCaption>A list of your recent blog posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-medium">{article.title}</TableCell>
            <TableCell>
              <Badge variant={article.category === 'Creatives' ? 'default' : 'secondary'}>{article.category}</Badge>
            </TableCell>
            <TableCell>{article.createdAt}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the post
                      and remove its image from storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(article.id, article.imageUrl)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
