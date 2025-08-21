
import { createBrowserClient } from "@supabase/ssr";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const POSTS_PER_PAGE = 10;

export function ManageBlogs() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [filterCategory, setFilterCategory] = useState('All');
  const { toast } = useToast();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchPosts = async () => {
    setLoading(true);
    const from = (currentPage - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' });

    if (filterCategory !== 'All') {
      query = query.eq('category', filterCategory);
    }
    
    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error, count } = await query;

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
      setTotalPosts(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, filterCategory]);

  const handleDelete = async (articleId: string, imageUrl: string) => {
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

    if (imageUrl && !imageUrl.includes('placehold.co')) {
      const imagePath = imageUrl.split('/').pop();
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from('blog_images')
          .remove([imagePath]);

        if (storageError) {
          console.error('Error deleting image from storage:', storageError);
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

    fetchPosts();
  };
  
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
        <div className="mb-4">
            <Select onValueChange={setFilterCategory} defaultValue={filterCategory}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Creatives">Creatives</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
            </Select>
        </div>
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
        <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
                <Button 
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    </div>
  );
}
