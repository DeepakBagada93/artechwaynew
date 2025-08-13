import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/data";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={article.aiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <Badge variant={article.category === 'Creatives' ? 'default' : 'secondary'} className="mb-2">{article.category}</Badge>
        <CardTitle className="font-headline text-xl">{article.title}</CardTitle>
        <CardDescription className="mt-2">{article.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="link" className="p-0">Read More →</Button>
      </CardFooter>
    </Card>
  );
}
