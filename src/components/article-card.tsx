
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
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const postUrl = `/posts/${article.slug}`;

  return (
    <Card className="overflow-hidden transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1">
      {article.imageUrl && (
        <div className="relative w-full aspect-video">
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={article.aiHint}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-bold">Artechway</span>
            <p className="text-sm text-muted-foreground">@artechway</p>
          </div>
        </div>
        <div className="mt-4">
            <Badge variant={article.category === 'Creatives' ? 'default' : 'secondary'} className="mb-2">{article.category}</Badge>
            <CardTitle className="font-headline text-2xl">
                <Link href={postUrl}>{article.title}</Link>
            </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{article.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end items-center">
        <Button asChild variant="ghost">
          <Link href={postUrl}>
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
