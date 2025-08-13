import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/data";
import { MessageCircle, Heart, Share2 } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-colors duration-200 ease-in-out bg-transparent border-0 shadow-none rounded-none hover:bg-card/30">
      <div className="p-4">
        <div className="flex items-start gap-4">
           <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />
           <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">Artechway</span>
              <span className="text-sm text-muted-foreground">@artechway · 1h</span>
            </div>
            <p className="mt-1">{article.title}</p>
          </div>
        </div>
      </div>
      <CardContent className="px-4 pt-0">
        <div className="relative mt-2 ml-16 border rounded-lg overflow-hidden border-border/40">
          <div className="relative h-56 w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={article.aiHint}
            />
          </div>
          <div className="p-4 border-t border-border/40">
              <Badge variant={article.category === 'Creatives' ? 'default' : 'secondary'} className="mb-2">{article.category}</Badge>
              <CardTitle className="font-headline text-lg">{article.title}</CardTitle>
              <CardDescription className="mt-1 text-sm">{article.description}</CardDescription>
          </div>
        </div>
      </CardContent>
       <div className="px-4 pb-2 ml-16">
          <div className="flex justify-between items-center text-muted-foreground max-w-sm">
              <Button variant="ghost" size="icon" className="flex items-center gap-2 text-sm hover:text-primary">
                  <MessageCircle className="h-5 w-5" />
                  <span>12</span>
              </Button>
              <Button variant="ghost" size="icon" className="flex items-center gap-2 text-sm hover:text-green-500">
                  <Heart className="h-5 w-5" />
                  <span>42</span>
              </Button>
               <Button variant="ghost" size="icon" className="flex items-center gap-2 text-sm hover:text-blue-500">
                  <Share2 className="h-5 w-5" />
              </Button>
          </div>
      </div>
    </Card>
  );
}
