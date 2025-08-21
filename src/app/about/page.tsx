
import { AppHeader } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeftSidebar } from "@/components/left-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1">
          <LeftSidebar />
          <div className="flex flex-1 flex-col">
            <AppHeader />
            <main className="flex-grow container mx-auto max-w-5xl px-4 py-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline text-3xl">
                    <Info className="h-8 w-8" /> About Artechway
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none text-lg">
                  <p>
                    Welcome to Artechway, your premier destination for exploring the intersection of artificial intelligence, creativity, and business automation.
                  </p>
                  <p>
                    Our mission is to demystify AI and empower creative professionals and small business owners to leverage cutting-edge technology. We provide insightful articles, practical guides, and expert analysis to help you stay ahead in a rapidly evolving digital landscape.
                  </p>
                   <p>
                    Whether you're looking to automate workflows, generate innovative content, or understand the latest AI trends, Artechway is your trusted resource for navigating the future of technology.
                  </p>
                </CardContent>
              </Card>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
