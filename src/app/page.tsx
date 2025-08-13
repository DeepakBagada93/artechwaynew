import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleCard } from "@/components/article-card";
import { mockArticles } from "@/lib/data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center md:py-32">
          <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-7xl">
            Where AI Meets Human Creativity
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Artechway is your guide to the evolving landscape of artificial intelligence and its impact on the creative world. Discover articles, insights, and the tools shaping our future.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">
              Explore Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section id="articles" className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="mb-12 text-center font-headline text-4xl font-bold md:text-5xl">
            Featured Insights
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section id="newsletter" className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">
              Stay Ahead of the Curve
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Subscribe to our newsletter for the latest articles, analysis, and news in the world of creative AI.
            </p>
            <form className="mx-auto mt-8 flex max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                aria-label="Email for newsletter"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
