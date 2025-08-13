import { ArticleCard } from "@/components/article-card";
import { mockArticles } from "@/lib/data";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center">
      <LeftSidebar />
      <main className="w-full max-w-2xl border-x border-border/40">
        <div className="sticky top-0 z-10 border-b border-border/40 bg-background/60 p-4 backdrop-blur-md">
          <h1 className="font-headline text-xl font-bold">Home</h1>
        </div>
        <div className="flex flex-col">
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
