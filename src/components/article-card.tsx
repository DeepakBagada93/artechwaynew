
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
import { MessageCircle, Heart, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const postUrl = `/posts/${article.slug}`;

  return (
    <Card className="overflow-hidden transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1">
      {article.imageUrl && (
        <div className="relative h-64 w-full">
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
            <p className="text-sm text-muted-foreground">@artechway · 1h ago</p>
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
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
                <MessageCircle className="h-5 w-5" />
                <span>12</span>
            </div>
             <div className="flex items-center gap-1">
                <Heart className="h-5 w-5" />
                <span>42</span>
            </div>
             <div className="flex items-center gap-1">
                <Share2 className="h-5 w-5" />
            </div>
        </div>
        <Button asChild variant="ghost">
          <Link href={postUrl}>
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
