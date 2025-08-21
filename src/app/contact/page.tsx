
import { AppHeader } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeftSidebar } from "@/components/left-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function ContactPage() {
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
                    <Mail className="h-8 w-8" /> Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none text-lg">
                  <p>
                    We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to talk about AI, feel free to reach out.
                  </p>
                  <p>
                    The best way to get in touch is by sending an email to:
                  </p>
                  <p className="text-center">
                    <a
                      href="mailto:artechway@gmail.com"
                      className="text-primary text-xl font-bold hover:underline"
                    >
                      artechway@gmail.com
                    </a>
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
