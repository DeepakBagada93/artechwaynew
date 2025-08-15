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

export function ManageBlogs() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('dpost')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                 const formattedArticles: Article[] = data?.map(post => ({
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    category: post.category,
                    imageUrl: post.imageUrl,
                    aiHint: 'user generated content', // Or generate a hint from keywords
                    createdAt: new Date(post.created_at).toLocaleDateString(),
                })) || [];
                setArticles(formattedArticles);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

  if (loading) return <p>Loading posts...</p>

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
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                 <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
