import { ArticleCard } from "@/components/article-card";
import { mockArticles } from "@/lib/data";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { AppHeader } from "@/components/header";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <LeftSidebar />
      <div className="flex-1">
        <AppHeader />
        <main className="container mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              {mockArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <RightSidebar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
