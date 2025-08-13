import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export function RightSidebar() {
  return (
    <aside className="sticky top-0 h-screen w-80 flex-col gap-8 p-4 hidden xl:flex">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search" className="pl-10 h-12 rounded-full" />
      </div>

      <Card className="bg-card/30">
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
            />
            <Button type="submit">Subscribe</Button>
          </form>
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
