import { ArticleCard } from "@/components/article-card";
import { RightSidebar } from "@/components/right-sidebar";
import { AppHeader } from "@/components/header";
import { createBrowserClient } from "@supabase/ssr";
import type { Article } from "@/lib/data";
import { Footer } from "@/components/footer";
import { LeftSidebar } from "@/components/left-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Home() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
  const { data: articles, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    // Handle error appropriately
  }
  
  const formattedArticles: Article[] = articles?.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    category: post.category,
    imageUrl: post.imageUrl,
    aiHint: 'user generated content', // Or generate a hint from keywords
  })) || [];


  return (
    <SidebarProvider>
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1">
        <LeftSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <div className="container mx-auto max-w-7xl flex-1 px-4 py-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <main className="lg:col-span-8">
                <div className="space-y-8">
                  {formattedArticles.length > 0 ? (
                  formattedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))
                  ) : (
                  <div className="text-center text-muted-foreground">
                    <p>No articles found. Check back later!</p>
                  </div>
                  )}
                </div>
              </main>
              <aside className="lg:col-span-4">
                <RightSidebar />
              </aside>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
}
