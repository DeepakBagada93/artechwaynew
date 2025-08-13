import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Tag } from "lucide-react";
import { Badge } from "./ui/badge";

export function RightSidebar() {
  const tags = ["AI Writing", "SaaS", "Automation", "Graphic Design", "Productivity", "Marketing", "Web Dev"]
  return (
    <aside className="sticky top-24 flex w-full flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Subscribe to Artechway
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Get the latest insights on AI for creatives and small business.
          </p>
          <form className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              className="h-10"
            />
            <Button type="submit">Subscribe</Button>
          </form>
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

      <Footer />
    </aside>
  );
}

function Footer() {
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
