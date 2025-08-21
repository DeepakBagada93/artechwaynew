
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Newspaper } from "lucide-react";
import { Badge } from "./ui/badge";
import type { Article } from "@/lib/data";

function SidebarFooter() {
    return (
        <div className="text-xs text-muted-foreground space-y-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Cookie Policy</a>
                <a href="#" className="hover:underline">Accessibility</a>
                <a href="#" className="hover:underline">Ads info</a>
            </div>
            <p>© {new Date().getFullYear()} Artechway, Inc.</p>
        </div>
    )
}


export function RightSidebar() {
  const tags = ["AI Writing", "SaaS", "Automation", "Graphic Design", "Productivity", "Marketing", "Web Dev"];
  const [recentPosts, setRecentPosts] = useState<Article[]>([]);

  useEffect(() => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    const fetchRecentPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('title, slug')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching recent posts:", error);
      } else {
        setRecentPosts(data as Article[]);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <aside className="sticky top-24 flex w-full flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-xl">
            <Newspaper className="h-5 w-5" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {recentPosts.length > 0 ? (
                recentPosts.map(post => (
                    <Link href={`/posts/${post.slug}`} key={post.slug} className="hover:underline">
                        {post.title}
                    </Link>
                ))
            ) : (
                <p className="text-muted-foreground text-sm">No recent posts yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <Tag className="h-5 w-5" />
                Popular Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">{tag}</Badge>
                ))}
            </div>
          </CardContent>
      </Card>

      <SidebarFooter />
    </aside>
  );
}
