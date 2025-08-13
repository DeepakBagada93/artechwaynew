import { ArticleCard } from "@/components/article-card";
import { mockArticles } from "@/lib/data";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { AppHeader } from "@/components/header";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center">
      <AppHeader />
      <LeftSidebar />
      <main className="w-full max-w-2xl border-x border-border/40">
        <div className="sticky top-0 z-10 border-b border-border/40 bg-background/60 p-4 backdrop-blur-md hidden md:block">
          <h1 className="font-headline text-xl font-bold">Home</h1>
        </div>
        <div className="flex flex-col pt-16 md:pt-0">
          {mockArticles.map((article) => (
            <div key={article.id} className="border-b border-border/40">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </main>
      <RightSidebar />
    </div>
  );
}
